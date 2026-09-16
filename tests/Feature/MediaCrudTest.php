<?php

namespace Tests\Feature;

use App\Models\MediaBlog;
use App\Models\MediaProject;
use App\Models\MediaTask;
use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class MediaCrudTest extends TestCase
{
    use DatabaseTransactions;

    protected function createMediaUser(string $role = 'member'): User
    {
        $unique = Str::random(8);
        return User::create([
            'name' => "User {$unique}",
            'email' => "user_{$unique}@example.com",
            'username' => "user_{$unique}",
            'password' => Hash::make('secret123'),
            'media_role' => $role,
            'role' => $role === 'admin' ? 4 : ($role === 'mentor' ? 3 : 1),
        ]);
    }

    protected function createMediaProject(User $creator): MediaProject
    {
        return MediaProject::create([
            'title' => 'Sample Test Project',
            'description' => 'Test project description',
            'status' => 'active',
            'creator_id' => $creator->id,
            'mentor_id' => $creator->id,
        ]);
    }

    public function test_user_can_create_and_list_tasks(): void
    {
        $user = $this->createMediaUser('member');
        $project = $this->createMediaProject($user);
        Sanctum::actingAs($user);

        // 1. Create Task
        $taskPayload = [
            'projectId' => $project->id,
            'mediaType' => 'image',
            'caption' => 'My awesome project showcase',
            'mediaUrls' => ['https://drive.google.com/test-image.jpg'],
        ];

        $createRes = $this->postJson('/api/media/tasks', $taskPayload);
        $createRes->assertStatus(201)
            ->assertJson([
                'success' => true,
            ]);

        $taskId = $createRes->json('taskId');
        $this->assertNotEmpty($taskId);

        // 2. Feed Tasks List
        $feedRes = $this->getJson('/api/media/tasks');
        $feedRes->assertStatus(200)
            ->assertJsonStructure([
                'data',
                'nextPage',
            ]);

        $this->assertTrue(collect($feedRes->json('data'))->contains('id', (string) $taskId));
    }

    public function test_user_can_toggle_like_and_add_comment_on_task(): void
    {
        $user = $this->createMediaUser('member');
        $project = $this->createMediaProject($user);
        Sanctum::actingAs($user);

        $task = MediaTask::create([
            'media_project_id' => $project->id,
            'user_id' => $user->id,
            'media_type' => 'image',
            'caption' => 'Like and comment test',
            'status' => 'pending',
        ]);

        // 1. Toggle Like ON
        $likeRes = $this->postJson("/api/media/tasks/{$task->id}/like");
        $likeRes->assertStatus(200)
            ->assertJson([
                'success' => true,
                'isLikedByMe' => true,
                'likesCount' => 1,
            ]);

        // 2. Toggle Like OFF
        $unlikeRes = $this->postJson("/api/media/tasks/{$task->id}/like");
        $unlikeRes->assertStatus(200)
            ->assertJson([
                'success' => true,
                'isLikedByMe' => false,
                'likesCount' => 0,
            ]);

        // 3. Add Comment
        $commentRes = $this->postJson("/api/media/tasks/{$task->id}/comments", [
            'content' => 'Great work on this task!',
        ]);
        $commentRes->assertStatus(200)
            ->assertJson([
                'success' => true,
            ]);

        // 4. Get Comments
        $getCommentsRes = $this->getJson("/api/media/tasks/{$task->id}/comments");
        $getCommentsRes->assertStatus(200)
            ->assertJson([
                'success' => true,
            ]);
        $this->assertCount(1, $getCommentsRes->json('data'));
    }

    public function test_mentor_can_review_task(): void
    {
        $mentor = $this->createMediaUser('mentor');
        $student = $this->createMediaUser('member');
        $project = $this->createMediaProject($mentor);

        $task = MediaTask::create([
            'media_project_id' => $project->id,
            'user_id' => $student->id,
            'media_type' => 'image',
            'caption' => 'Ready for review',
            'status' => 'pending',
        ]);

        Sanctum::actingAs($mentor);

        $reviewRes = $this->putJson("/api/media/tasks/{$task->id}/review", [
            'grade' => 95,
            'comment' => 'Excellent execution and attention to detail!',
            'status' => 'reviewed',
        ]);

        $reviewRes->assertStatus(200)
            ->assertJson([
                'success' => true,
            ]);

        $task->refresh();
        $this->assertEquals('reviewed', $task->status);
        $this->assertEquals(95, (int) $task->grade);
        $this->assertEquals('Excellent execution and attention to detail!', $task->review_comment);
    }

    public function test_project_crud(): void
    {
        $admin = $this->createMediaUser('admin');
        Sanctum::actingAs($admin);

        // 1. Create Project
        $createRes = $this->postJson('/api/media/projects', [
            'title' => 'New Fullstack Showcase',
            'description' => 'Building modern web apps',
            'status' => 'active',
        ]);
        $createRes->assertStatus(201)
            ->assertJson(['success' => true]);

        $project = MediaProject::where('title', 'New Fullstack Showcase')->first();
        $this->assertNotNull($project);

        // 2. Get Public Projects
        $listRes = $this->getJson('/api/media/projects');
        $listRes->assertStatus(200)
            ->assertJson(['success' => true]);

        // 3. Show Project by ID
        $showRes = $this->getJson("/api/media/projects/{$project->id}");
        $showRes->assertStatus(200)
            ->assertJson([
                'success' => true,
                'data' => [
                    'id' => (string) $project->id,
                    'title' => 'New Fullstack Showcase',
                ],
            ]);
    }

    public function test_blog_crud_and_interaction(): void
    {
        $user = $this->createMediaUser('member');
        Sanctum::actingAs($user);

        // 1. Create Blog
        $unique = Str::random(6);
        $createRes = $this->postJson('/api/media/blogs', [
            'title' => "Mastering Laravel and Next.js {$unique}",
            'category' => 'Technology',
            'excerpt' => 'A guide on fullstack architecture',
            'content' => '<p>Here is full tutorial content.</p>',
            'image' => 'https://images.unsplash.com/photo-1',
            'readTime' => '5 min read',
        ]);
        $createRes->assertStatus(201)
            ->assertJson(['success' => true]);

        $blogId = $createRes->json('data.id');
        $this->assertNotEmpty($blogId);

        // 2. List Blogs
        $listRes = $this->getJson('/api/media/blogs');
        $listRes->assertStatus(200)
            ->assertJson(['success' => true]);

        // 3. Like Blog
        $likeRes = $this->postJson("/api/media/blogs/{$blogId}/like");
        $likeRes->assertStatus(200)
            ->assertJson([
                'success' => true,
                'isLiked' => true,
            ]);

        // 4. Add Blog Comment
        $commentRes = $this->postJson("/api/media/blogs/{$blogId}/comments", [
            'content' => 'Insightful article, thanks for sharing!',
        ]);
        $commentRes->assertStatus(200)
            ->assertJson(['success' => true]);

        // 5. Get Blog Comments
        $getCommentsRes = $this->getJson("/api/media/blogs/{$blogId}/comments");
        $getCommentsRes->assertStatus(200)
            ->assertJson(['success' => true]);
        $this->assertCount(1, $getCommentsRes->json('data'));
    }

    public function test_public_endpoints(): void
    {
        $user = $this->createMediaUser('member');

        // Public Members
        $membersRes = $this->getJson('/api/public/members');
        $membersRes->assertStatus(200)
            ->assertJson(['success' => true]);

        // Public Best Tasks
        $bestTasksRes = $this->getJson('/api/public/tasks/best');
        $bestTasksRes->assertStatus(200)
            ->assertJson(['success' => true]);
    }
}
