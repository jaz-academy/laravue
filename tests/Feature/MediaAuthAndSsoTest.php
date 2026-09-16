<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class MediaAuthAndSsoTest extends TestCase
{
    use DatabaseTransactions;

    protected function createMediaUser(array $overrides = []): User
    {
        $unique = Str::random(8);
        return User::create(array_merge([
            'name' => 'Test Media User',
            'email' => "user_{$unique}@example.com",
            'username' => "testuser_{$unique}",
            'password' => Hash::make('secret123'),
            'media_role' => 'member',
            'role' => 1,
        ], $overrides));
    }

    public function test_user_can_register_via_media_api(): void
    {
        $unique = Str::random(8);
        $payload = [
            'name' => 'Registration Tester',
            'email' => "reg_{$unique}@jazacademy.id",
            'username' => "reg_{$unique}",
            'password' => 'password123',
        ];

        $response = $this->postJson('/api/media/auth/register', $payload);

        $response->assertStatus(201)
            ->assertJson([
                'success' => true,
            ])
            ->assertJsonStructure([
                'success',
                'token',
                'user' => ['id', 'name', 'username', 'email', 'role'],
            ]);

        $this->assertDatabaseHas('users', [
            'email' => $payload['email'],
            'username' => $payload['username'],
        ]);

        // Non-jazacademy email should be rejected
        $badResponse = $this->postJson('/api/media/auth/register', [
            'name' => 'Bad User',
            'email' => "bad_{$unique}@gmail.com",
            'username' => "bad_{$unique}",
            'password' => 'password123',
        ]);
        $badResponse->assertStatus(422);
    }

    public function test_user_can_login_via_email(): void
    {
        $user = $this->createMediaUser(['password' => Hash::make('password123')]);

        $response = $this->postJson('/api/media/auth/login', [
            'username' => $user->email,
            'password' => 'password123',
        ]);

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
            ])
            ->assertJsonStructure([
                'success',
                'token',
                'user' => ['id', 'name', 'email'],
            ]);
    }

    public function test_user_can_login_via_username(): void
    {
        $user = $this->createMediaUser(['password' => Hash::make('password123')]);

        $response = $this->postJson('/api/media/auth/login', [
            'username' => $user->username,
            'password' => 'password123',
        ]);

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'user' => [
                    'username' => $user->username,
                ],
            ]);
    }

    public function test_login_fails_with_invalid_credentials(): void
    {
        $user = $this->createMediaUser(['password' => Hash::make('password123')]);

        $response = $this->postJson('/api/media/auth/login', [
            'username' => $user->username,
            'password' => 'wrongpassword',
        ]);

        $response->assertStatus(401)
            ->assertJson([
                'success' => false,
            ]);
    }

    public function test_authenticated_user_can_create_sso_ticket(): void
    {
        $user = $this->createMediaUser();
        Sanctum::actingAs($user);

        $response = $this->postJson('/api/media/auth/sso-ticket');

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
            ])
            ->assertJsonStructure([
                'success',
                'ticket',
                'redirectUrl',
            ]);

        $ticket = $response->json('ticket');
        $this->assertTrue(str_starts_with($ticket, 'sso_'));
        $this->assertEquals($user->id, Cache::get("jazmedia_sso_ticket:{$ticket}"));
    }

    public function test_sso_ticket_can_be_exchanged_for_token(): void
    {
        $user = $this->createMediaUser();
        Sanctum::actingAs($user);

        // 1. Create SSO Ticket
        $ticketRes = $this->postJson('/api/media/auth/sso-ticket');
        $ticket = $ticketRes->json('ticket');

        // 2. Exchange Ticket (unauthenticated client, as Next.js server will do)
        $exchangeRes = $this->postJson('/api/media/auth/sso-exchange', [
            'ticket' => $ticket,
        ]);

        $exchangeRes->assertStatus(200)
            ->assertJson([
                'success' => true,
                'user' => [
                    'id' => (string) $user->id,
                    'email' => $user->email,
                ],
            ])
            ->assertJsonStructure([
                'success',
                'token',
                'user',
            ]);
    }

    public function test_sso_ticket_cannot_be_reused_replay_prevention(): void
    {
        $user = $this->createMediaUser();
        Sanctum::actingAs($user);

        $ticketRes = $this->postJson('/api/media/auth/sso-ticket');
        $ticket = $ticketRes->json('ticket');

        // First exchange should succeed
        $first = $this->postJson('/api/media/auth/sso-exchange', ['ticket' => $ticket]);
        $first->assertStatus(200);

        // Second exchange must fail (single-use)
        $second = $this->postJson('/api/media/auth/sso-exchange', ['ticket' => $ticket]);
        $second->assertStatus(400)
            ->assertJson([
                'success' => false,
            ]);
    }

    public function test_invalid_sso_ticket_fails(): void
    {
        $response = $this->postJson('/api/media/auth/sso-exchange', [
            'ticket' => 'sso_non_existent_fake_ticket',
        ]);

        $response->assertStatus(400)
            ->assertJson([
                'success' => false,
            ]);
    }
}
