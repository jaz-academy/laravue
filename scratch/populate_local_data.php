<?php
require __DIR__ . '/../vendor/autoload.php';
$app = require_once __DIR__ . '/../bootstrap/app.php';
$app->make(\Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use Illuminate\Support\Facades\DB;

// 1. Insert media_projects
$projects = [
    [
        'id' => 2,
        'mongodb_id' => '6a5988d46a4783a4284fa88e',
        'title' => 'Young Forest Scientist',
        'description' => 'Meneliti ekosistem kebun & hutan',
        'status' => 'active',
        'mentor_id' => 132,
        'project_manager_id' => null,
        'creator_id' => 133,
        'admin_teacher_id' => 2, // mentor
        'created_at' => '2026-07-17 01:43:48',
        'updated_at' => '2026-07-17 01:43:48'
    ],
    [
        'id' => 3,
        'mongodb_id' => '6a5b7c4541dcef97ca4f6a3d',
        'title' => 'Young Ocean Research',
        'description' => 'Penelitian ekosistem laut',
        'status' => 'active',
        'mentor_id' => 135,
        'project_manager_id' => null,
        'creator_id' => 115,
        'admin_teacher_id' => 2, // Ms. Tia
        'created_at' => '2026-07-18 13:14:45',
        'updated_at' => '2026-07-18 13:14:45'
    ],
    [
        'id' => 4,
        'mongodb_id' => '6a5b7cb741dcef97ca4f6a3e',
        'title' => 'Math in Game',
        'description' => 'Matematika dalam Permainan',
        'status' => 'active',
        'mentor_id' => 135,
        'project_manager_id' => null,
        'creator_id' => 115,
        'admin_teacher_id' => 2,
        'created_at' => '2026-07-18 13:16:39',
        'updated_at' => '2026-07-18 13:16:39'
    ],
    [
        'id' => 5,
        'mongodb_id' => '6a5b7d6c41dcef97ca4f6a3f',
        'title' => 'Pendidikan Islam',
        'description' => 'Penelitian konsep pendidikan islam dan penerapan nya dalam lembaga',
        'status' => 'active',
        'mentor_id' => 130,
        'project_manager_id' => null,
        'creator_id' => 115,
        'admin_teacher_id' => 1, // Mr. Abukafa
        'created_at' => '2026-07-18 13:19:40',
        'updated_at' => '2026-07-18 13:19:40'
    ],
    [
        'id' => 6,
        'mongodb_id' => '6a5b7ebf796535600cffada6',
        'title' => 'Literasi',
        'description' => 'Menulis buku',
        'status' => 'active',
        'mentor_id' => 135,
        'project_manager_id' => null,
        'creator_id' => 115,
        'admin_teacher_id' => 2,
        'created_at' => '2026-07-18 13:25:19',
        'updated_at' => '2026-07-18 13:25:19'
    ],
    [
        'id' => 7,
        'mongodb_id' => '6a5b7f3a41dcef97ca4f6a40',
        'title' => 'Young Entologist',
        'description' => 'Penelitian serangga dan ekosistem nya',
        'status' => 'active',
        'mentor_id' => 135,
        'project_manager_id' => null,
        'creator_id' => 115,
        'admin_teacher_id' => 2,
        'created_at' => '2026-07-18 13:27:22',
        'updated_at' => '2026-07-18 13:27:22'
    ],
    [
        'id' => 8,
        'mongodb_id' => '6a5b7ff9796535600cffada7',
        'title' => 'Young Waste',
        'description' => 'Penelitian sampah dan dampak nya terhadap lingkungan',
        'status' => 'archived',
        'mentor_id' => 135,
        'project_manager_id' => null,
        'creator_id' => 115,
        'admin_teacher_id' => 2,
        'created_at' => '2026-07-18 13:30:33',
        'updated_at' => '2026-08-05 09:10:29'
    ],
    [
        'id' => 9,
        'mongodb_id' => '6a5b8088796535600cffada8',
        'title' => 'Website Literasi',
        'description' => 'Membuat platform literasi / e-learning',
        'status' => 'active',
        'mentor_id' => 135,
        'project_manager_id' => null,
        'creator_id' => 115,
        'admin_teacher_id' => 2,
        'created_at' => '2026-07-18 13:32:56',
        'updated_at' => '2026-07-20 16:05:26'
    ],
    [
        'id' => 10,
        'mongodb_id' => '6a5b818d41dcef97ca4f6a41',
        'title' => 'Young Math Scientist',
        'description' => 'Penelitian konsep matematika',
        'status' => 'active',
        'mentor_id' => 135,
        'project_manager_id' => null,
        'creator_id' => 115,
        'admin_teacher_id' => 2,
        'created_at' => '2026-07-18 13:37:17',
        'updated_at' => '2026-07-18 13:37:17'
    ]
];

foreach ($projects as $p) {
    // Check if mentor_id or creator_id exists in users table, else null
    if ($p['mentor_id'] && !DB::table('users')->where('id', $p['mentor_id'])->exists()) {
        $p['mentor_id'] = null;
    }
    if ($p['creator_id'] && !DB::table('users')->where('id', $p['creator_id'])->exists()) {
        $p['creator_id'] = null;
    }
    DB::table('media_projects')->updateOrInsert(['id' => $p['id']], $p);
}
DB::statement("SELECT setval('media_projects_id_seq', (SELECT COALESCE(MAX(id), 1) FROM media_projects));");
echo "Projects inserted successfully.\n";

// 2. Insert tasks, collaborators, likes
$sqlFile = 'C:/Users/user/.gemini/antigravity/brain/1fa56519-8d67-4655-859c-037fbfb117cf/scratch/import_pgadmin.sql';
if (file_exists($sqlFile)) {
    DB::unprepared(file_get_contents($sqlFile));
    echo "Media tasks, collaborators, likes inserted successfully.\n";
}

// 3. Update admin_student_id & admin_teacher_id on media_tasks
DB::statement("
    UPDATE media_tasks mt 
    SET admin_student_id = u.admin_student_id 
    FROM users u 
    WHERE mt.user_id = u.id AND u.admin_student_id IS NOT NULL;
");

DB::statement("
    UPDATE media_tasks mt 
    SET admin_teacher_id = u.admin_teacher_id 
    FROM users u 
    WHERE mt.mentor_id = u.id AND u.admin_teacher_id IS NOT NULL;
");

DB::statement("
    UPDATE media_task_collaborators mtc 
    SET admin_student_id = u.admin_student_id 
    FROM users u 
    WHERE mtc.user_id = u.id AND u.admin_student_id IS NOT NULL;
");

echo "All relations populated successfully.\n";
