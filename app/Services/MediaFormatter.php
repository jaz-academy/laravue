<?php

namespace App\Services;

use Carbon\Carbon;

class MediaFormatter
{
    public static function timeAgo($date): string
    {
        if (!$date) return 'baru saja';
        $carbon = $date instanceof Carbon ? $date : Carbon::parse($date);
        $diffInSeconds = max(0, abs(now()->diffInSeconds($carbon)));

        if ($diffInSeconds < 60) return "{$diffInSeconds} detik yang lalu";
        $diffInMinutes = floor($diffInSeconds / 60);
        if ($diffInMinutes < 60) return "{$diffInMinutes} menit yang lalu";
        $diffInHours = floor($diffInMinutes / 60);
        if ($diffInHours < 24) return "{$diffInHours} jam yang lalu";
        $diffInDays = floor($diffInHours / 24);
        if ($diffInDays < 30) return "{$diffInDays} hari yang lalu";
        $diffInMonths = floor($diffInDays / 30);
        if ($diffInMonths < 12) return "{$diffInMonths} bulan yang lalu";
        $diffInYears = floor($diffInDays / 365);
        return "{$diffInYears} tahun yang lalu";
    }

    public static function formatAvatarUrl(?string $image): ?string
    {
        if (empty($image)) {
            return '/no-photo.png';
        }

        // If explicitly set to no-photo
        if ($image === '/no-photo.png' || $image === 'no-photo' || str_contains($image, 'no-photo')) {
            return '/no-photo.png';
        }

        // If it's an absolute URL (Google Drive, HTTPS, etc.) or internal stream
        if (str_starts_with($image, 'http://') || str_starts_with($image, 'https://') || str_starts_with($image, '/api/')) {
            return $image;
        }

        // If it's a local storage path (e.g. avatars/teacher/... or avatars/student/...)
        $relativePath = ltrim(str_replace('storage/', '', $image), '/');
        if (file_exists(storage_path('app/public/' . $relativePath))) {
            $baseUrl = config('app.url') ?: url('');
            return rtrim($baseUrl, '/') . '/storage/' . $relativePath;
        }

        // Image was specified but not found on disk (like legacy avatars/teacher/1.png)
        // Return null so frontend displays the user's initials instead of a 404 error
        return null;
    }

    public static function formatUser($user): ?array
    {
        if (!$user) return null;

        $student = $user->adminStudent;
        $teacher = $user->adminTeacher;

        // Image comes from student or teacher profile!
        $avatarImage = $student?->image ?: ($teacher?->image ?: null);

        // Bio comes from student note/ambition or teacher note
        $bio = $student?->note ?: ($student?->ambition ?: ($teacher?->note ?: ($user->bio ?: '')));

        // Skills from student or user
        $skills = [];
        if ($student && !empty($student->skills)) {
            $skills = is_array($student->skills) ? $student->skills : (json_decode($student->skills, true) ?: []);
        } elseif (is_array($user->skills)) {
            $skills = $user->skills;
        }

        // Role mapping:
        // Teacher / Manager -> mentor / admin
        // Student -> member
        if ($user->role >= 4 || $user->media_role === 'admin') {
            $role = 'admin';
        } elseif ($teacher || $user->admin_teacher_id || $user->media_role === 'mentor') {
            $role = 'mentor';
        } else {
            $role = 'member';
        }

        return [
            'id' => (string) $user->id,
            '_id' => (string) ($user->mongodb_id ?: $user->id),
            'student_id' => $student?->id,
            'teacher_id' => $teacher?->id,
            'name' => $student?->name ?: ($teacher?->name ?: $user->name),
            'username' => $user->username ?: ($student?->nickname ?: ''),
            'email' => $user->email,
            'image' => self::formatAvatarUrl($avatarImage),
            'bio' => $bio,
            'skills' => $skills,
            'role' => $role,
            'student_role' => $student?->role,
            'instagramId' => $student?->instagram ?: $user->instagram_id,
        ];
    }

    public static function formatTask($task, $currentUserId = null): array
    {
        $student = $task->student ?: ($task->user?->adminStudent ?: null);
        if ($student) {
            $authorFormatted = [
                'id' => (string) $student->id,
                '_id' => (string) $student->id,
                'name' => $student->name,
                'nickname' => $student->nickname ?: $student->name,
                'username' => $student->nickname ?: ($student->user?->username ?: ''),
                'image' => self::formatAvatarUrl($student->image ?: ($student->user?->image ?: null)),
                'email' => $student->email ?: ($student->user?->email ?: ''),
                'type' => 'student',
            ];
        } else {
            $author = $task->user;
            $authorFormatted = [
                'id' => $author ? (string) $author->id : '',
                '_id' => $author ? (string) ($author->mongodb_id ?: $author->id) : '',
                'name' => $author ? $author->name : 'Member',
                'nickname' => $author ? ($author->nickname ?: $author->name) : 'Member',
                'username' => $author ? ($author->username ?: '') : '',
                'image' => self::formatAvatarUrl($author ? $author->image : null),
                'email' => $author ? $author->email : '',
                'type' => 'user',
            ];
        }

        $collaborators = [];
        if ($task->relationLoaded('studentCollaborators') && $task->studentCollaborators->isNotEmpty()) {
            $collaborators = $task->studentCollaborators->map(function ($c) {
                return [
                    'id' => (string) $c->id,
                    '_id' => (string) $c->id,
                    'name' => $c->name,
                    'nickname' => $c->nickname ?: $c->name,
                    'username' => $c->nickname ?: ($c->user?->username ?: ''),
                    'image' => self::formatAvatarUrl($c->image ?: ($c->user?->image ?: null)),
                    'type' => 'student',
                ];
            })->values()->all();
        } elseif ($task->relationLoaded('collaborators') && $task->collaborators->isNotEmpty()) {
            $collaborators = $task->collaborators->map(function ($c) {
                $st = $c->adminStudent;
                if ($st) {
                    return [
                        'id' => (string) $st->id,
                        '_id' => (string) $st->id,
                        'name' => $st->name,
                        'nickname' => $st->nickname ?: $st->name,
                        'username' => $st->nickname ?: ($c->username ?: ''),
                        'image' => self::formatAvatarUrl($st->image ?: ($c->image ?: null)),
                        'type' => 'student',
                    ];
                }
                return [
                    'id' => (string) $c->id,
                    '_id' => (string) ($c->mongodb_id ?: $c->id),
                    'name' => $c->name,
                    'nickname' => $c->nickname ?: $c->name,
                    'username' => $c->username ?: '',
                    'image' => self::formatAvatarUrl($c->image ?: null),
                    'type' => 'user',
                ];
            })->values()->all();
        }

        $project = $task->project;
        $projectFormatted = $project ? [
            'id' => (string) ($project->mongodb_id ?: $project->id),
            'title' => $project->title,
            'managerId' => $project->project_manager_id ? (string) $project->project_manager_id : null,
        ] : null;

        $likes = $task->likes->map(function ($u) {
            return [
                'id' => (string) $u->id,
                '_id' => (string) ($u->mongodb_id ?: $u->id),
                'name' => $u->name,
                'username' => $u->username ?: '',
                'image' => $u->image ?: '/no-photo.png',
                'email' => $u->email,
            ];
        })->values()->all();

        $isLikedByMe = false;
        if ($currentUserId) {
            $isLikedByMe = $task->likes->contains(function ($u) use ($currentUserId) {
                return (string) $u->id === (string) $currentUserId || (string) $u->mongodb_id === (string) $currentUserId;
            });
        }

        $comments = $task->comments->map(function ($c) {
            $cAuthor = $c->user;
            return [
                'id' => (string) $c->id,
                '_id' => (string) ($c->mongodb_id ?: $c->id),
                'content' => $c->content,
                'authorId' => [
                    'id' => $cAuthor ? (string) $cAuthor->id : '',
                    '_id' => $cAuthor ? (string) ($cAuthor->mongodb_id ?: $cAuthor->id) : '',
                    'name' => $cAuthor ? $cAuthor->name : 'Anonim',
                    'username' => $cAuthor ? ($cAuthor->username ?: '') : '',
                    'image' => self::formatAvatarUrl($cAuthor ? $cAuthor->image : null),
                    'email' => $cAuthor ? $cAuthor->email : '',
                ],
                'createdAt' => $c->created_at ? $c->created_at->toISOString() : null,
            ];
        })->values()->all();

        $mediaUrls = $task->media_urls ?: ($task->media_url ? [$task->media_url] : []);

        $review = null;
        if ($task->grade !== null || $task->review_comment) {
            $teacher = $task->mentorTeacher ?: ($task->mentor?->adminTeacher ?: null);
            $mentorName = $teacher ? $teacher->name : ($task->mentor ? $task->mentor->name : 'Mentor');
            $mentorNickname = $teacher ? ($teacher->nickname ?: $teacher->name) : $mentorName;
            $mentorImage = $teacher && $teacher->image ? $teacher->image : ($task->mentor && $task->mentor->image ? $task->mentor->image : null);
            $mentorId = $teacher ? (string) $teacher->id : ($task->mentor_id ? (string) $task->mentor_id : null);

            $review = [
                'grade' => $task->grade !== null ? (float) $task->grade : null,
                'comment' => $task->review_comment,
                'mentorName' => $mentorName,
                'mentorNickname' => $mentorNickname,
                'mentorImage' => self::formatAvatarUrl($mentorImage),
                'mentorId' => $mentorId,
                'reviewedAt' => $task->reviewed_at ? $task->reviewed_at->toISOString() : null,
            ];
        }

        return [
            'id' => (string) $task->id,
            '_id' => (string) ($task->mongodb_id ?: $task->id),
            'author' => [
                'id' => $authorFormatted['id'],
                'name' => $authorFormatted['name'],
                'image' => $authorFormatted['image'],
            ],
            'authorId' => $authorFormatted,
            'collaborators' => $collaborators,
            'projectTitle' => $project ? $project->title : 'Project',
            'project' => $projectFormatted,
            'mediaUrl' => $task->media_url ?: ($mediaUrls[0] ?? ''),
            'mediaUrls' => $mediaUrls,
            'mediaType' => $task->media_type ?: 'image',
            'caption' => $task->caption ?: '',
            'timeAgo' => self::timeAgo($task->created_at),
            'review' => $review,
            'likes' => $likes,
            'likesCount' => count($likes),
            'isLikedByMe' => $isLikedByMe,
            'comments' => $comments,
            'commentsCount' => count($comments),
            'status' => $task->status ?: 'pending',
            'createdAt' => $task->created_at ? $task->created_at->toISOString() : null,
            'updatedAt' => $task->updated_at ? $task->updated_at->toISOString() : null,
        ];
    }

    public static function formatBlog($blog, $currentUserId = null): array
    {
        $author = $blog->user;
        $resolvedAuthorName = $blog->author_name ?: ($author ? $author->name : 'Tim Jazmedia');
        $resolvedAuthorAvatar = self::formatAvatarUrl($blog->author_avatar ?: ($author ? $author->image : null));
        $resolvedAuthorId = $blog->user_id ? (string) $blog->user_id : null;

        $likedBy = $blog->userLikes->map(function ($u) {
            return (string) $u->id;
        })->all();

        $isLikedByMe = false;
        if ($currentUserId) {
            $isLikedByMe = in_array((string) $currentUserId, $likedBy);
        }

        return [
            'id' => (string) $blog->id,
            '_id' => (string) ($blog->mongodb_id ?: $blog->id),
            'title' => $blog->title ?: '',
            'slug' => $blog->slug ?: '',
            'excerpt' => $blog->excerpt ?: '',
            'content' => $blog->content ?: '',
            'image' => $blog->image ?: '',
            'category' => $blog->category ?: 'General',
            'date' => $blog->date ?: '',
            'readTime' => $blog->read_time ?: '3 min read',
            'likes' => (int) ($blog->likes ?: 0),
            'rating' => (float) ($blog->rating ?: 4.9),
            'reviewsCount' => (int) ($blog->reviews_count ?: 0),
            'authorId' => $resolvedAuthorId,
            'authorName' => $resolvedAuthorName,
            'authorAvatar' => $resolvedAuthorAvatar,
            'status' => $blog->status ?: 'PUBLISHED',
            'likedBy' => $likedBy,
            'isLikedByMe' => $isLikedByMe,
            'createdAt' => $blog->created_at ? $blog->created_at->toISOString() : null,
        ];
    }

    public static function formatProject($project, $tasksByProject = []): array
    {
        $pid = (string) ($project->mongodb_id ?: $project->id);

        return [
            'id' => $pid,
            '_id' => $pid,
            'numeric_id' => $project->id,
            'title' => $project->title,
            'description' => $project->description,
            'status' => $project->status ?: 'active',
            'mentorId' => $project->mentor_id ? (string) $project->mentor_id : '',
            'mentorName' => $project->mentor ? $project->mentor->name : 'Tanpa Mentor',
            'projectManagerId' => $project->project_manager_id ? (string) $project->project_manager_id : '',
            'projectManagerName' => $project->projectManager ? $project->projectManager->name : 'Belum ada PM',
            'creatorId' => $project->creator_id ? (string) $project->creator_id : '',
            'participantsCount' => $project->participants()->count(),
            'tasks' => $tasksByProject[$project->id] ?? [],
            'createdAt' => $project->created_at ? $project->created_at->toISOString() : null,
        ];
    }

    public static function formatReflection($reflection, $previousReflection = null): array
    {
        $student = $reflection->student ?: $reflection->user?->adminStudent;

        $resolvedAuthorId = (string) ($student ? $student->id : ($reflection->user?->id ?? ''));
        $resolvedAuthorName = $student ? $student->name : ($reflection->user?->name ?? 'Siswa');
        $resolvedAuthorUsername = $reflection->user?->username ?: ($student ? \Illuminate\Support\Str::slug($student->name) : 'siswa');
        $resolvedAuthorAvatar = self::formatAvatarUrl($student?->image ?: $reflection->user?->image);
        $resolvedAuthorRole = $student?->role ?: ($reflection->user?->role ?? 'member');

        $ach = is_array($reflection->achievement) ? $reflection->achievement : json_decode($reflection->achievement ?: '{}', true);
        $obs = is_array($reflection->obstacles) ? $reflection->obstacles : json_decode($reflection->obstacles ?: '{}', true);
        $les = is_array($reflection->lessons) ? $reflection->lessons : json_decode($reflection->lessons ?: '{}', true);
        $prio = is_array($reflection->priority) ? $reflection->priority : json_decode($reflection->priority ?: '{}', true);
        $hlth = is_array($reflection->health) ? $reflection->health : json_decode($reflection->health ?: '{}', true);

        $achVal = isset($ach['nilai']) ? (float) $ach['nilai'] : 0.0;
        $obsVal = isset($obs['nilai']) ? (float) $obs['nilai'] : 0.0;
        $lesVal = isset($les['nilai']) ? (float) $les['nilai'] : 0.0;
        $prioVal = isset($prio['nilai']) ? (float) $prio['nilai'] : 0.0;
        $hlthVal = isset($hlth['nilai']) ? (float) $hlth['nilai'] : 0.0;

        $achDesc = isset($ach['deskripsi']) ? trim((string) $ach['deskripsi']) : '';
        $obsDesc = isset($obs['deskripsi']) ? trim((string) $obs['deskripsi']) : '';
        $lesDesc = isset($les['deskripsi']) ? trim((string) $les['deskripsi']) : '';
        $prioDesc = isset($prio['deskripsi']) ? trim((string) $prio['deskripsi']) : '';
        $hlthDesc = isset($hlth['deskripsi']) ? trim((string) $hlth['deskripsi']) : '';

        // Previous deltas
        $prevAch = null;
        $prevObs = null;
        $prevLes = null;
        $prevPrio = null;
        $prevHlth = null;

        if ($previousReflection) {
            $pAch = is_array($previousReflection->achievement) ? $previousReflection->achievement : json_decode($previousReflection->achievement ?: '{}', true);
            $pObs = is_array($previousReflection->obstacles) ? $previousReflection->obstacles : json_decode($previousReflection->obstacles ?: '{}', true);
            $pLes = is_array($previousReflection->lessons) ? $previousReflection->lessons : json_decode($previousReflection->lessons ?: '{}', true);
            $pPrio = is_array($previousReflection->priority) ? $previousReflection->priority : json_decode($previousReflection->priority ?: '{}', true);
            $pHlth = is_array($previousReflection->health) ? $previousReflection->health : json_decode($previousReflection->health ?: '{}', true);

            $prevAch = isset($pAch['nilai']) ? (float) $pAch['nilai'] : 0.0;
            $prevObs = isset($pObs['nilai']) ? (float) $pObs['nilai'] : 0.0;
            $prevLes = isset($pLes['nilai']) ? (float) $pLes['nilai'] : 0.0;
            $prevPrio = isset($pPrio['nilai']) ? (float) $pPrio['nilai'] : 0.0;
            $prevHlth = isset($pHlth['nilai']) ? (float) $pHlth['nilai'] : 0.0;
        }

        // Compose 1 fluent narrative paragraph
        $parts = [];
        if ($achDesc !== '') {
            $parts[] = "Minggu ini, saya berhasil " . lcfirst(rtrim($achDesc, '.')) . ".";
        }
        if ($obsDesc !== '') {
            $parts[] = "Kendala yang dihadapi: " . lcfirst(rtrim($obsDesc, '.')) . ".";
        }
        if ($lesDesc !== '') {
            $parts[] = "Pelajaran yang dipetik adalah " . lcfirst(rtrim($lesDesc, '.')) . ".";
        }
        if ($prioDesc !== '') {
            $parts[] = "Fokus prioritas ke depan adalah " . lcfirst(rtrim($prioDesc, '.')) . ".";
        }
        if ($hlthDesc !== '') {
            $parts[] = "Kondisi kesehatan dan stamina: " . lcfirst(rtrim($hlthDesc, '.')) . ".";
        }
        $narrative = implode(' ', $parts);

        $avgVal = round(($achVal + $obsVal + $lesVal + $prioVal + $hlthVal) / 5, 1);
        $prevAvg = ($previousReflection) ? round(($prevAch + $prevObs + $prevLes + $prevPrio + $prevHlth) / 5, 1) : null;
        $avgDelta = ($prevAvg !== null) ? round($avgVal - $prevAvg, 1) : null;

        $dateFormatted = $reflection->date ? Carbon::parse($reflection->date)->translatedFormat('d F Y') : '';

        return [
            'id' => (string) $reflection->id,
            'numeric_id' => $reflection->id,
            'date' => $reflection->date ? Carbon::parse($reflection->date)->format('Y-m-d') : '',
            'formattedDate' => $dateFormatted,
            'timeAgo' => self::timeAgo($reflection->created_at ?: $reflection->date),
            'author' => [
                'id' => $resolvedAuthorId,
                'name' => $resolvedAuthorName,
                'username' => $resolvedAuthorUsername,
                'image' => $resolvedAuthorAvatar,
                'role' => $resolvedAuthorRole,
            ],
            'narrative' => $narrative,
            'metrics' => [
                'achievement' => [
                    'label' => 'Capaian',
                    'value' => $achVal,
                    'description' => $achDesc,
                    'delta' => $prevAch !== null ? round($achVal - $prevAch, 1) : null,
                ],
                'obstacles' => [
                    'label' => 'Kendala',
                    'value' => $obsVal,
                    'description' => $obsDesc,
                    'delta' => $prevObs !== null ? round($obsVal - $prevObs, 1) : null,
                ],
                'lessons' => [
                    'label' => 'Pelajaran',
                    'value' => $lesVal,
                    'description' => $lesDesc,
                    'delta' => $prevLes !== null ? round($lesVal - $prevLes, 1) : null,
                ],
                'priority' => [
                    'label' => 'Prioritas',
                    'value' => $prioVal,
                    'description' => $prioDesc,
                    'delta' => $prevPrio !== null ? round($prioVal - $prevPrio, 1) : null,
                ],
                'health' => [
                    'label' => 'Kesehatan',
                    'value' => $hlthVal,
                    'description' => $hlthDesc,
                    'delta' => $prevHlth !== null ? round($hlthVal - $prevHlth, 1) : null,
                ],
                'average' => [
                    'label' => 'Rata-rata',
                    'value' => $avgVal,
                    'description' => 'Skor rata-rata performa dari 5 indikator mingguan',
                    'delta' => $avgDelta,
                ],
            ],
            'isFirstReflection' => is_null($previousReflection),
            'createdAt' => $reflection->created_at ? $reflection->created_at->toISOString() : null,
        ];
    }
}
