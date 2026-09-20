<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class MergeDatabasesCommand extends Command
{
    protected $signature = 'db:merge-databases';
    protected $description = 'Import MySQL dump and merge MongoDB data into PostgreSQL';

    protected array $excludedTables = [
        'project_plans',
        'project_tasks',
        'pivot_student_task',
        'media_participants',
        'media_bookmarks',
        'media_likes',
        'media_comments',
        'media_stories',
        'migrations',
    ];

    protected array $booleanColumns = [
        'academy_scores' => ['is_ok_1', 'is_ok_2', 'is_ok_3'],
        'payment_billings' => ['is_once', 'is_monthly'],
        'payment_items' => ['is_once', 'is_monthly'],
        'emails' => ['is_read', 'has_attachment'],
        'media_notifications' => ['is_read'],
    ];

    public function handle(): int
    {
        $this->info('Starting Database Merge to PostgreSQL...');

        // Disable foreign key constraints temporarily in PostgreSQL
        DB::statement("SET session_replication_role = 'replica';");

        try {
            $this->truncateAllTables();
            $this->importMysqlDump();
            $this->syncPostgresSequences();
            $this->importMongodbData();
            $this->syncPostgresSequences();
        } catch (\Throwable $e) {
            $this->error('Error occurred: ' . $e->getMessage());
            $this->error($e->getTraceAsString());
            DB::statement("SET session_replication_role = 'origin';");
            return 1;
        }

        DB::statement("SET session_replication_role = 'origin';");
        $this->info('Database merge completed successfully!');

        return 0;
    }

    protected function truncateAllTables(): void
    {
        $this->info('Cleaning target tables before import...');
        $tablesToClean = [
            'media_notifications',
            'media_blog_comments',
            'media_blog_likes',
            'media_blogs',
            'media_comments',
            'media_task_likes',
            'media_task_collaborators',
            'media_tasks',
            'media_project_participants',
            'media_projects',
            'emails',
            'email_accounts',
            'personal_access_tokens',
            'notifications',
            'payment_savings',
            'payment_items',
            'payment_discounts',
            'payment_billings',
            'finance_items',
            'finance_deposits',
            'finance_accounts',
            'academy_scores',
            'academy_competences',
            'academy_subjects',
            'academy_awards',
            'academy_courses',
            'admin_events',
            'admin_schools',
            'admin_teachers',
            'admin_students',
            'users',
        ];

        foreach ($tablesToClean as $tbl) {
            DB::statement("TRUNCATE TABLE \"{$tbl}\" RESTART IDENTITY CASCADE;");
        }
        $this->info('All tables truncated successfully.');
    }

    protected function importMysqlDump(): void
    {
        $sqlPath = base_path('database/jazacademy-old.sql');
        if (!file_exists($sqlPath)) {
            $this->error("SQL dump file not found at: {$sqlPath}");
            return;
        }

        $this->info("Parsing MySQL dump from: {$sqlPath}");

        $handle = fopen($sqlPath, 'r');
        if (!$handle) {
            $this->error("Failed to open {$sqlPath}");
            return;
        }

        $currentTable = null;
        $currentColumns = [];
        $isExcluded = false;
        $inInsert = false;
        $statementAccumulated = '';
        $importedCounts = [];

        while (($line = fgets($handle)) !== false) {
            $trimmed = trim($line);

            if (!$inInsert) {
                if (preg_match('/^INSERT INTO `([^`]+)` \(([^)]+)\) VALUES/i', $trimmed, $matches)) {
                    $currentTable = $matches[1];
                    $colString = $matches[2];
                    $currentColumns = array_map(function ($col) {
                        return trim($col, " `\t\n\r\0\x0B");
                    }, explode(',', $colString));

                    $isExcluded = in_array($currentTable, $this->excludedTables);
                    $inInsert = true;
                    $statementAccumulated = $line;
                }
            } else {
                $statementAccumulated .= $line;
            }

            if ($inInsert && str_ends_with($trimmed, ';')) {
                // Statement finished!
                if (!$isExcluded) {
                    $this->processInsertStatement($currentTable, $currentColumns, $statementAccumulated, $importedCounts);
                }
                $inInsert = false;
                $statementAccumulated = '';
                $currentTable = null;
                $currentColumns = [];
            }
        }

        fclose($handle);

        $this->info("Completed MySQL dump import!");
        foreach ($importedCounts as $tbl => $cnt) {
            $this->line(" - Table [{$tbl}]: {$cnt} rows inserted.");
        }
    }

    protected function processInsertStatement(string $table, array $columns, string $statement, array &$importedCounts): void
    {
        // Extract values part after 'VALUES'
        $valuesPos = stripos($statement, 'VALUES');
        if ($valuesPos === false) {
            return;
        }

        $valuesString = substr($statement, $valuesPos + 6);
        $tuples = $this->extractTuples($valuesString);
        $boolCols = $this->booleanColumns[$table] ?? [];

        $buffer = [];
        foreach ($tuples as $tuple) {
            $rowValues = $this->parseTupleValues($tuple);
            if (count($rowValues) === count($columns)) {
                $row = array_combine($columns, $rowValues);

                // Convert boolean columns
                foreach ($boolCols as $bCol) {
                    if (array_key_exists($bCol, $row) && $row[$bCol] !== null) {
                        $row[$bCol] = (bool) $row[$bCol];
                    }
                }

                $buffer[] = $row;

                if (count($buffer) >= 200) {
                    try {
                        DB::table($table)->insert($buffer);
                        $importedCounts[$table] = ($importedCounts[$table] ?? 0) + count($buffer);
                    } catch (\Throwable $e) {
                        $this->error("Failed inserting chunk into [{$table}]: " . $e->getMessage());
                        throw $e;
                    }
                    $buffer = [];
                }
            }
        }

        if (!empty($buffer)) {
            try {
                DB::table($table)->insert($buffer);
                $importedCounts[$table] = ($importedCounts[$table] ?? 0) + count($buffer);
            } catch (\Throwable $e) {
                $this->error("Failed inserting final chunk into [{$table}]: " . $e->getMessage());
                throw $e;
            }
            $buffer = [];
        }
    }

    protected function extractTuples(string $str): array
    {
        $tuples = [];
        $len = strlen($str);
        $inString = false;
        $escaped = false;
        $depth = 0;
        $start = -1;

        for ($i = 0; $i < $len; $i++) {
            $ch = $str[$i];

            if ($inString) {
                if ($escaped) {
                    $escaped = false;
                } elseif ($ch === '\\') {
                    $escaped = true;
                } elseif ($ch === "'") {
                    if ($i + 1 < $len && $str[$i + 1] === "'") {
                        $i++; // escaped ''
                    } else {
                        $inString = false;
                    }
                }
            } else {
                if ($ch === "'") {
                    $inString = true;
                } elseif ($ch === '(') {
                    if ($depth === 0) {
                        $start = $i;
                    }
                    $depth++;
                } elseif ($ch === ')') {
                    $depth--;
                    if ($depth === 0 && $start !== -1) {
                        $tuples[] = substr($str, $start + 1, $i - $start - 1);
                        $start = -1;
                    }
                }
            }
        }

        return $tuples;
    }

    protected function parseTupleValues(string $tuple): array
    {
        $len = strlen($tuple);
        $values = [];
        $current = '';
        $inString = false;
        $escaped = false;
        $wasString = false;

        for ($i = 0; $i < $len; $i++) {
            $ch = $tuple[$i];
            if ($inString) {
                if ($escaped) {
                    if ($ch === 'n') $current .= "\n";
                    elseif ($ch === 'r') $current .= "\r";
                    elseif ($ch === 't') $current .= "\t";
                    elseif ($ch === '0') $current .= "\0";
                    else $current .= $ch;
                    $escaped = false;
                } elseif ($ch === '\\') {
                    $escaped = true;
                } elseif ($ch === "'") {
                    if ($i + 1 < $len && $tuple[$i + 1] === "'") {
                        $current .= "'";
                        $i++;
                    } else {
                        $inString = false;
                        $wasString = true;
                    }
                } else {
                    $current .= $ch;
                }
            } else {
                if ($ch === "'") {
                    $inString = true;
                    $wasString = true;
                    $current = '';
                } elseif ($ch === ',') {
                    if ($wasString) {
                        $values[] = $current;
                    } else {
                        $trimmedVal = trim($current);
                        if (strcasecmp($trimmedVal, 'NULL') === 0) {
                            $values[] = null;
                        } elseif (is_numeric($trimmedVal)) {
                            $values[] = str_contains($trimmedVal, '.') ? (float)$trimmedVal : (int)$trimmedVal;
                        } else {
                            $values[] = $trimmedVal;
                        }
                    }
                    $current = '';
                    $wasString = false;
                } elseif (!ctype_space($ch)) {
                    $current .= $ch;
                }
            }
        }

        if ($wasString) {
            $values[] = $current;
        } else {
            $trimmedVal = trim($current);
            if (strcasecmp($trimmedVal, 'NULL') === 0) {
                $values[] = null;
            } elseif (is_numeric($trimmedVal)) {
                $values[] = str_contains($trimmedVal, '.') ? (float)$trimmedVal : (int)$trimmedVal;
            } else {
                $values[] = $trimmedVal;
            }
        }

        return $values;
    }

    protected function importMongodbData(): void
    {
        $dumpDir = base_path('database/mongodb_dump');
        if (!is_dir($dumpDir)) {
            $this->warn("MongoDB dump directory not found at: {$dumpDir}");
            return;
        }

        $this->info("Importing MongoDB data from {$dumpDir}...");

        // 1. Users
        $usersFile = "{$dumpDir}/users.json";
        if (file_exists($usersFile)) {
            $mongoUsers = json_decode(file_get_contents($usersFile), true) ?? [];
            $this->info("Processing " . count($mongoUsers) . " MongoDB users...");

            foreach ($mongoUsers as $u) {
                $mongoId = $u['_id'] ?? null;
                $email = $u['email'] ?? null;
                $username = $u['username'] ?? null;
                $name = $u['name'] ?? 'Jazacademy User';

                // Find existing user by email or username
                $existing = null;
                if (!empty($email)) {
                    $existing = DB::table('users')->where('email', $email)->first();
                }
                if (!$existing && !empty($username)) {
                    $existing = DB::table('users')->where('username', $username)->first();
                }

                $skillsJson = isset($u['skills']) ? json_encode($u['skills']) : null;

                if ($existing) {
                    DB::table('users')->where('id', $existing->id)->update([
                        'mongodb_id' => $mongoId,
                        'username' => $username ?: $existing->username,
                        'bio' => $u['bio'] ?? $existing->bio ?? null,
                        'skills' => $skillsJson ?: $existing->skills ?? null,
                        'instagram_id' => $u['instagramId'] ?? $existing->instagram_id ?? null,
                        'image' => $existing->image ?: ($u['image'] ?? null),
                    ]);
                } else {
                    $fallbackEmail = !empty($email) ? $email : ($username ? "{$username}@jazmedia.local" : "user_{$mongoId}@jazmedia.local");
                    // Ensure email uniqueness
                    if (DB::table('users')->where('email', $fallbackEmail)->exists()) {
                        $fallbackEmail = "user_{$mongoId}@jazmedia.local";
                    }

                    DB::table('users')->insert([
                        'mongodb_id' => $mongoId,
                        'name' => $name,
                        'username' => $username,
                        'email' => $fallbackEmail,
                        'password' => $u['password'] ?? bcrypt(Str::random(16)),
                        'role' => 0,
                        'bio' => $u['bio'] ?? null,
                        'skills' => $skillsJson,
                        'instagram_id' => $u['instagramId'] ?? null,
                        'image' => $u['image'] ?? null,
                        'created_at' => isset($u['createdAt']) ? date('Y-m-d H:i:s', strtotime($u['createdAt'])) : now(),
                        'updated_at' => isset($u['updatedAt']) ? date('Y-m-d H:i:s', strtotime($u['updatedAt'])) : now(),
                    ]);
                }
            }
        }

        // Build User lookup map: [mongo_id => pgsql_id]
        $userMap = DB::table('users')->whereNotNull('mongodb_id')->pluck('id', 'mongodb_id')->toArray();
        $this->info("Mapped " . count($userMap) . " users from MongoDB to PostgreSQL IDs.");

        // Fallback user ID for unmapped author/creator
        $fallbackUserId = array_values($userMap)[0] ?? DB::table('users')->value('id') ?? 1;

        // 2. Projects
        $projectMap = [];
        $projectsFile = "{$dumpDir}/projects.json";
        if (file_exists($projectsFile)) {
            $mongoProjects = json_decode(file_get_contents($projectsFile), true) ?? [];
            $this->info("Importing " . count($mongoProjects) . " projects...");

            foreach ($mongoProjects as $p) {
                $pId = DB::table('media_projects')->insertGetId([
                    'mongodb_id' => $p['_id'] ?? null,
                    'title' => $p['title'] ?? 'Untitled Project',
                    'description' => $p['description'] ?? '',
                    'status' => $p['status'] ?? 'active',
                    'mentor_id' => $userMap[$p['mentorId'] ?? ''] ?? null,
                    'project_manager_id' => $userMap[$p['projectManagerId'] ?? ''] ?? null,
                    'creator_id' => $userMap[$p['creatorId'] ?? ''] ?? $fallbackUserId,
                    'created_at' => isset($p['createdAt']) ? date('Y-m-d H:i:s', strtotime($p['createdAt'])) : now(),
                    'updated_at' => isset($p['updatedAt']) ? date('Y-m-d H:i:s', strtotime($p['updatedAt'])) : now(),
                ]);

                if (isset($p['_id'])) {
                    $projectMap[$p['_id']] = $pId;
                }

                if (!empty($p['participants']) && is_array($p['participants'])) {
                    foreach ($p['participants'] as $participantMongoId) {
                        if (isset($userMap[$participantMongoId])) {
                            DB::table('media_project_participants')->insertOrIgnore([
                                'media_project_id' => $pId,
                                'user_id' => $userMap[$participantMongoId],
                                'created_at' => now(),
                                'updated_at' => now(),
                            ]);
                        }
                    }
                }
            }
        }

        // Fallback project ID
        $fallbackProjectId = array_values($projectMap)[0] ?? DB::table('media_projects')->value('id') ?? 1;

        // 3. Tasks
        $taskMap = [];
        $tasksFile = "{$dumpDir}/tasks.json";
        if (file_exists($tasksFile)) {
            $mongoTasks = json_decode(file_get_contents($tasksFile), true) ?? [];
            $this->info("Importing " . count($mongoTasks) . " tasks...");

            foreach ($mongoTasks as $t) {
                $review = $t['review'] ?? [];
                $reviewedAt = null;
                if (!empty($review['reviewedAt'])) {
                    $reviewedAt = date('Y-m-d H:i:s', strtotime($review['reviewedAt']));
                }

                $taskId = DB::table('media_tasks')->insertGetId([
                    'mongodb_id' => $t['_id'] ?? null,
                    'media_project_id' => $projectMap[$t['projectId'] ?? ''] ?? $fallbackProjectId,
                    'user_id' => $userMap[$t['authorId'] ?? ''] ?? $fallbackUserId,
                    'media_url' => $t['mediaUrl'] ?? null,
                    'media_urls' => isset($t['mediaUrls']) ? json_encode($t['mediaUrls']) : null,
                    'media_type' => $t['mediaType'] ?? 'image',
                    'caption' => $t['caption'] ?? null,
                    'status' => $t['status'] ?? 'pending',
                    'mentor_id' => $userMap[$review['mentorId'] ?? ''] ?? null,
                    'grade' => isset($review['grade']) ? $review['grade'] : null,
                    'review_comment' => $review['comment'] ?? null,
                    'reviewed_at' => $reviewedAt,
                    'created_at' => isset($t['createdAt']) ? date('Y-m-d H:i:s', strtotime($t['createdAt'])) : now(),
                    'updated_at' => isset($t['updatedAt']) ? date('Y-m-d H:i:s', strtotime($t['updatedAt'])) : now(),
                ]);

                if (isset($t['_id'])) {
                    $taskMap[$t['_id']] = $taskId;
                }

                // Collaborators
                if (!empty($t['collaborators']) && is_array($t['collaborators'])) {
                    foreach ($t['collaborators'] as $cMongoId) {
                        if (isset($userMap[$cMongoId])) {
                            DB::table('media_task_collaborators')->insertOrIgnore([
                                'media_task_id' => $taskId,
                                'user_id' => $userMap[$cMongoId],
                                'created_at' => now(),
                                'updated_at' => now(),
                            ]);
                        }
                    }
                }

                // Likes
                if (!empty($t['likes']) && is_array($t['likes'])) {
                    foreach ($t['likes'] as $lMongoId) {
                        if (isset($userMap[$lMongoId])) {
                            DB::table('media_task_likes')->insertOrIgnore([
                                'media_task_id' => $taskId,
                                'user_id' => $userMap[$lMongoId],
                                'created_at' => now(),
                                'updated_at' => now(),
                            ]);
                        }
                    }
                }
            }
        }

        // 4. Comments
        $commentsFile = "{$dumpDir}/comments.json";
        if (file_exists($commentsFile)) {
            $mongoComments = json_decode(file_get_contents($commentsFile), true) ?? [];
            $this->info("Importing " . count($mongoComments) . " task comments...");

            foreach ($mongoComments as $c) {
                if (isset($taskMap[$c['taskId'] ?? ''])) {
                    DB::table('media_comments')->insert([
                        'mongodb_id' => $c['_id'] ?? null,
                        'media_task_id' => $taskMap[$c['taskId']],
                        'user_id' => $userMap[$c['authorId'] ?? ''] ?? $fallbackUserId,
                        'content' => $c['content'] ?? '',
                        'created_at' => isset($c['createdAt']) ? date('Y-m-d H:i:s', strtotime($c['createdAt'])) : now(),
                        'updated_at' => isset($c['updatedAt']) ? date('Y-m-d H:i:s', strtotime($c['updatedAt'])) : now(),
                    ]);
                }
            }
        }

        // 5. Blogs
        $blogMap = [];
        $blogsFile = "{$dumpDir}/blogs.json";
        if (file_exists($blogsFile)) {
            $mongoBlogs = json_decode(file_get_contents($blogsFile), true) ?? [];
            $this->info("Importing " . count($mongoBlogs) . " blogs...");

            foreach ($mongoBlogs as $b) {
                $blogId = DB::table('media_blogs')->insertGetId([
                    'mongodb_id' => $b['_id'] ?? null,
                    'title' => $b['title'] ?? 'Untitled Blog',
                    'slug' => $b['slug'] ?? Str::slug($b['title'] ?? Str::random(8)),
                    'excerpt' => $b['excerpt'] ?? '',
                    'content' => $b['content'] ?? '',
                    'image' => $b['image'] ?? null,
                    'category' => $b['category'] ?? 'General',
                    'date' => $b['date'] ?? null,
                    'read_time' => $b['readTime'] ?? null,
                    'likes' => $b['likes'] ?? 0,
                    'rating' => $b['rating'] ?? 4.9,
                    'reviews_count' => $b['reviewsCount'] ?? 0,
                    'user_id' => $userMap[$b['authorId'] ?? ''] ?? null,
                    'author_name' => $b['authorName'] ?? 'Tim Jazmedia',
                    'author_avatar' => $b['authorAvatar'] ?? null,
                    'status' => $b['status'] ?? 'PUBLISHED',
                    'created_at' => isset($b['createdAt']) ? date('Y-m-d H:i:s', strtotime($b['createdAt'])) : now(),
                    'updated_at' => isset($b['updatedAt']) ? date('Y-m-d H:i:s', strtotime($b['updatedAt'])) : now(),
                ]);

                if (isset($b['_id'])) {
                    $blogMap[$b['_id']] = $blogId;
                }

                if (!empty($b['likedBy']) && is_array($b['likedBy'])) {
                    foreach ($b['likedBy'] as $likeMongoId) {
                        if (isset($userMap[$likeMongoId])) {
                            DB::table('media_blog_likes')->insertOrIgnore([
                                'media_blog_id' => $blogId,
                                'user_id' => $userMap[$likeMongoId],
                                'created_at' => now(),
                                'updated_at' => now(),
                            ]);
                        }
                    }
                }
            }
        }

        // 6. Blog Comments
        $blogCommentsFile = "{$dumpDir}/blogcomments.json";
        if (file_exists($blogCommentsFile)) {
            $mongoBlogComments = json_decode(file_get_contents($blogCommentsFile), true) ?? [];
            $this->info("Importing " . count($mongoBlogComments) . " blog comments...");

            foreach ($mongoBlogComments as $bc) {
                if (isset($blogMap[$bc['blogId'] ?? ''])) {
                    DB::table('media_blog_comments')->insert([
                        'mongodb_id' => $bc['_id'] ?? null,
                        'media_blog_id' => $blogMap[$bc['blogId']],
                        'user_id' => $userMap[$bc['authorId'] ?? ''] ?? $fallbackUserId,
                        'content' => $bc['content'] ?? '',
                        'created_at' => isset($bc['createdAt']) ? date('Y-m-d H:i:s', strtotime($bc['createdAt'])) : now(),
                        'updated_at' => isset($bc['updatedAt']) ? date('Y-m-d H:i:s', strtotime($bc['updatedAt'])) : now(),
                    ]);
                }
            }
        }

        // 7. Notifications
        $notificationsFile = "{$dumpDir}/notifications.json";
        if (file_exists($notificationsFile)) {
            $mongoNotifications = json_decode(file_get_contents($notificationsFile), true) ?? [];
            if (!empty($mongoNotifications)) {
                $this->info("Importing " . count($mongoNotifications) . " media notifications...");
                foreach ($mongoNotifications as $n) {
                    if (isset($userMap[$n['recipientId'] ?? ''])) {
                        DB::table('media_notifications')->insert([
                            'mongodb_id' => $n['_id'] ?? null,
                            'recipient_id' => $userMap[$n['recipientId']],
                            'sender_id' => $userMap[$n['senderId'] ?? ''] ?? null,
                            'type' => $n['type'] ?? 'system',
                            'title' => $n['title'] ?? '',
                            'message' => $n['message'] ?? '',
                            'link' => $n['link'] ?? null,
                            'is_read' => (bool)($n['isRead'] ?? false),
                            'related_id' => isset($n['relatedId']) ? (string)$n['relatedId'] : null,
                            'created_at' => isset($n['createdAt']) ? date('Y-m-d H:i:s', strtotime($n['createdAt'])) : now(),
                            'updated_at' => isset($n['updatedAt']) ? date('Y-m-d H:i:s', strtotime($n['updatedAt'])) : now(),
                        ]);
                    }
                }
            }
        }

        $this->info("Completed MongoDB data import!");
    }

    protected function syncPostgresSequences(): void
    {
        $this->info("Synchronizing PostgreSQL sequences (setval)...");

        $columns = DB::select("
            SELECT table_name, column_name 
            FROM information_schema.columns 
            WHERE table_schema = 'public' 
              AND column_default LIKE 'nextval%'
        ");

        foreach ($columns as $col) {
            $tbl = $col->table_name;
            $column = $col->column_name;
            
            DB::statement("
                SELECT setval(
                    pg_get_serial_sequence('\"{$tbl}\"', '{$column}'),
                    coalesce((SELECT MAX(\"{$column}\") FROM \"{$tbl}\"), 1)
                )
            ");
            $this->line(" - Synced sequence for table [{$tbl}].{$column}");
        }

        $this->info("All PostgreSQL sequences synchronized successfully!");
    }
}
