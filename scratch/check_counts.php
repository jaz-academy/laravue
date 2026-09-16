<?php
require __DIR__ . '/../vendor/autoload.php';
$app = require_once __DIR__ . '/../bootstrap/app.php';
$app->make(\Illuminate\Contracts\Console\Kernel::class)->bootstrap();

$tables = [
    'admin_schools',
    'admin_events',
    'admin_students',
    'admin_teachers',
    'users',
    'academy_courses',
    'academy_subjects',
    'academy_competences',
    'academy_scores',
    'academy_awards',
    'finance_accounts',
    'finance_items',
    'finance_deposits',
    'payment_billings',
    'payment_discounts',
    'payment_items',
    'payment_savings',
    'media_projects',
    'media_project_participants',
    'media_tasks',
    'media_task_collaborators',
    'media_task_likes',
    'media_comments',
    'media_blogs',
    'media_blog_likes',
    'media_blog_comments',
    'media_notifications',
    'reflections',
    'developer_api_keys',
    'api_request_logs',
];

foreach ($tables as $t) {
    if (\Illuminate\Support\Facades\Schema::hasTable($t)) {
        $count = \Illuminate\Support\Facades\DB::table($t)->count();
        echo str_pad($t, 30) . ": $count\n";
    }
}
