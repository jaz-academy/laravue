<?php

namespace Tests\Feature;

use App\Models\AdminStudent;
use App\Models\AdminTeacher;
use App\Models\MediaProject;
use App\Models\MediaTask;
use App\Models\User;
use App\Services\MediaFormatter;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Tests\TestCase;

class MediaStudentPortfolioTest extends TestCase
{
    protected function createStudent(array $attributes = []): AdminStudent
    {
        return AdminStudent::create(array_merge([
            'nis' => rand(100000, 999999),
            'name' => 'Test Student ' . Str::random(5),
            'nickname' => 'StudentNick',
            'gender' => 'L',
            'role' => 'Content Creator',
            'skills' => json_encode([['name' => 'Video Editing', 'percentage' => 85]]),
            'image' => null,
            'email' => 'student_' . Str::random(6) . '@jazacademy.id',
            'note' => 'Student ambition and bio',
        ], $attributes));
    }

    protected function createTeacher(array $attributes = []): AdminTeacher
    {
        return AdminTeacher::create(array_merge([
            'nig' => rand(100000, 999999),
            'name' => 'Test Teacher ' . Str::random(5),
            'nickname' => 'TeacherNick',
            'gender' => 'L',
            'status' => 'Active',
            'image' => null,
            'note' => 'Teacher mentor bio',
        ], $attributes));
    }

    protected function createProject(array $attributes = []): MediaProject
    {
        return MediaProject::create(array_merge([
            'title' => 'Test Project ' . Str::random(5),
            'description' => 'Project Description',
            'status' => 'active',
        ], $attributes));
    }

    public function test_task_belongs_to_student_and_renders_without_user(): void
    {
        $student = $this->createStudent(['name' => 'Direct Student']);
        $project = $this->createProject();

        // Create task with user_id = null and admin_student_id = $student->id
        $task = MediaTask::create([
            'media_project_id' => $project->id,
            'user_id' => null,
            'admin_student_id' => $student->id,
            'media_url' => 'https://example.com/test.jpg',
            'caption' => 'A wonderful portfolio piece',
            'status' => 'pending',
        ]);

        $formatted = MediaFormatter::formatTask($task);

        $this->assertEquals((string) $student->id, $formatted['author']['id']);
        $this->assertEquals('Direct Student', $formatted['author']['name']);
        $this->assertEquals('student', $formatted['authorId']['type']);
        $this->assertEquals('/no-photo.png', $formatted['author']['image']);
    }

    public function test_public_profile_returns_student_data_and_tasks_by_student_id(): void
    {
        $student = $this->createStudent(['name' => 'Portfolio Prodigy']);
        $project = $this->createProject();

        MediaTask::create([
            'media_project_id' => $project->id,
            'user_id' => null,
            'admin_student_id' => $student->id,
            'caption' => 'Portfolio Task 1',
            'status' => 'approved',
        ]);

        $response = $this->getJson("/api/media/users/{$student->id}/public");

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'data' => [
                    'user' => [
                        'name' => 'Portfolio Prodigy',
                        'student_id' => $student->id,
                        'student_role' => 'Content Creator',
                    ],
                ],
            ]);

        $this->assertCount(1, $response->json('data.tasks'));
        $this->assertEquals('Portfolio Task 1', $response->json('data.tasks.0.caption'));
    }

    public function test_user_avatar_and_bio_are_sourced_from_student_profile(): void
    {
        $student = $this->createStudent([
            'name' => 'Synchronized Student',
            'image' => null,
            'note' => 'Passionate designer & animator',
        ]);

        $unique = Str::random(6);
        $user = User::create([
            'name' => 'Old Name',
            'email' => "sync_{$unique}@jazacademy.id",
            'username' => "sync_user_{$unique}",
            'password' => Hash::make('password'),
            'admin_student_id' => $student->id,
            'media_role' => 'member',
            'role' => 2,
            'image' => null,
            'bio' => null,
        ]);

        $formatted = MediaFormatter::formatUser($user);

        $this->assertEquals('Synchronized Student', $formatted['name']);
        $this->assertEquals('/no-photo.png', $formatted['image']);
        $this->assertEquals('Passionate designer & animator', $formatted['bio']);
        $this->assertEquals('member', $formatted['role']);
        $this->assertEquals('Content Creator', $formatted['student_role']);
    }

    public function test_streaks_are_calculated_for_students(): void
    {
        $student = $this->createStudent(['name' => 'Active Streak Student']);
        $project = $this->createProject();

        MediaTask::create([
            'media_project_id' => $project->id,
            'user_id' => null,
            'admin_student_id' => $student->id,
            'caption' => 'Streak Task',
            'status' => 'approved',
            'created_at' => now(),
        ]);

        $response = $this->getJson('/api/media/explore/streaks');

        $response->assertStatus(200);
        $streakItem = collect($response->json())->firstWhere('numeric_id', $student->id);

        $this->assertNotNull($streakItem);
        $this->assertEquals('Active Streak Student', $streakItem['name']);
        $this->assertGreaterThanOrEqual(1, $streakItem['totalTasks']);
    }
}