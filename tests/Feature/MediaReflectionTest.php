<?php

namespace Tests\Feature;

use App\Models\AdminStudent;
use App\Models\Reflection;
use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Support\Str;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class MediaReflectionTest extends TestCase
{
    use DatabaseTransactions;

    protected function createStudentUser(): array
    {
        $unique = Str::random(8);
        $student = AdminStudent::create([
            'nis' => rand(100000, 999999),
            'name' => 'Reflecting Student ' . $unique,
            'nickname' => 'ReflectNick',
            'gender' => 'L',
            'role' => 'Content Creator',
            'image' => 'avatars/student/' . $unique . '.png',
            'email' => "student_{$unique}@jazacademy.id",
            'status' => 'active',
        ]);

        $user = User::create([
            'name' => $student->name,
            'email' => "student_{$unique}@jazacademy.id",
            'username' => "student_{$unique}",
            'password' => bcrypt('password123'),
            'admin_student_id' => $student->id,
            'role' => 2,
        ]);

        return [$user, $student];
    }

    public function test_user_can_create_reflection_with_metrics_and_sliders(): void
    {
        [$user, $student] = $this->createStudentUser();
        Sanctum::actingAs($user);

        $payload = [
            'date' => '2026-09-10',
            'achievement' => [
                'nilai' => 85,
                'deskripsi' => 'Berhasil merampungkan modul antarmuka tugas',
            ],
            'obstacles' => [
                'nilai' => 30,
                'deskripsi' => 'Sedikit kesulitan pada pengaturan grid responsif',
            ],
            'lessons' => [
                'nilai' => 90,
                'deskripsi' => 'Belajar trik flexbox dan tailwind container queries',
            ],
            'priority' => [
                'nilai' => 80,
                'deskripsi' => 'Mengoptimalkan performa halaman mobile',
            ],
            'health' => [
                'nilai' => 95,
                'deskripsi' => 'Kondisi tubuh sangat prima dan fit',
            ],
        ];

        $res = $this->postJson('/api/media/reflections', $payload);

        $res->assertStatus(201)
            ->assertJson([
                'success' => true,
                'data' => [
                    'date' => '2026-09-10',
                    'isFirstReflection' => true,
                    'author' => [
                        'name' => $student->name,
                        'role' => 'Content Creator',
                    ],
                    'metrics' => [
                        'achievement' => [
                            'value' => 85,
                            'delta' => null,
                        ],
                        'obstacles' => [
                            'value' => 30,
                        ],
                        'lessons' => [
                            'value' => 90,
                        ],
                        'priority' => [
                            'value' => 80,
                        ],
                        'health' => [
                            'value' => 95,
                            'delta' => null,
                        ],
                    ],
                ],
            ]);

        $this->assertDatabaseHas('reflections', [
            'user_id' => $user->id,
            'admin_student_id' => $student->id,
            'date' => '2026-09-10',
        ]);
    }

    public function test_reflection_calculates_progress_deltas_from_previous_week(): void
    {
        [$user, $student] = $this->createStudentUser();
        Sanctum::actingAs($user);

        // Week 1
        $this->postJson('/api/media/reflections', [
            'date' => '2026-09-03',
            'achievement' => ['nilai' => 70, 'deskripsi' => 'Memulai proyek baru'],
            'obstacles' => ['nilai' => 50, 'deskripsi' => 'Adaptasi framework'],
            'lessons' => ['nilai' => 75, 'deskripsi' => 'Dasar arsitektur komponen'],
            'priority' => ['nilai' => 80, 'deskripsi' => 'Menyelesaikan MVP'],
            'health' => ['nilai' => 80, 'deskripsi' => 'Kondisi cukup baik'],
        ])->assertStatus(201);

        // Week 2
        $res2 = $this->postJson('/api/media/reflections', [
            'date' => '2026-09-10',
            'achievement' => ['nilai' => 85, 'deskripsi' => 'MVP rampung dengan baik'],
            'obstacles' => ['nilai' => 30, 'deskripsi' => 'Kendala berkurang drastis'],
            'lessons' => ['nilai' => 90, 'deskripsi' => 'Manajemen state lanjutan'],
            'priority' => ['nilai' => 80, 'deskripsi' => 'Testing dan deployment'],
            'health' => ['nilai' => 90, 'deskripsi' => 'Stamina meningkat pesat'],
        ]);

        $res2->assertStatus(201)
            ->assertJson([
                'success' => true,
                'data' => [
                    'isFirstReflection' => false,
                    'metrics' => [
                        'achievement' => [
                            'value' => 85,
                            'delta' => 15.0,
                        ],
                        'obstacles' => [
                            'value' => 30,
                            'delta' => -20.0,
                        ],
                        'lessons' => [
                            'value' => 90,
                            'delta' => 15.0,
                        ],
                        'priority' => [
                            'value' => 80,
                            'delta' => 0.0,
                        ],
                        'health' => [
                            'value' => 90,
                            'delta' => 10.0,
                        ],
                    ],
                ],
            ]);
    }

    public function test_public_feed_returns_reflections_with_narrative_and_student_author(): void
    {
        [$user, $student] = $this->createStudentUser();
        Sanctum::actingAs($user);

        $this->postJson('/api/media/reflections', [
            'date' => '2026-09-15',
            'achievement' => ['nilai' => 95, 'deskripsi' => 'Rilis versi terbaru'],
            'obstacles' => ['nilai' => 10, 'deskripsi' => 'Hampir tidak ada hambatan'],
            'lessons' => ['nilai' => 95, 'deskripsi' => 'Otomasi deployment'],
            'priority' => ['nilai' => 90, 'deskripsi' => 'Dokumentasi fitur'],
            'health' => ['nilai' => 100, 'deskripsi' => 'Sangat sehat dan segar'],
        ])->assertStatus(201);

        $feed = $this->getJson('/api/media/reflections');
        $feed->assertStatus(200)
            ->assertJsonStructure([
                'success',
                'data' => [
                    '*' => [
                        'id',
                        'date',
                        'formattedDate',
                        'author' => ['id', 'name', 'username', 'image', 'role'],
                        'narrative',
                        'metrics' => [
                            'achievement',
                            'obstacles',
                            'lessons',
                            'priority',
                            'health',
                        ],
                    ],
                ],
            ]);

        $item = collect($feed->json('data'))->firstWhere('author.id', (string) $student->id);
        $this->assertNotNull($item);
        $this->assertStringContainsString('Minggu ini, saya berhasil rilis versi terbaru.', $item['narrative']);
    }
}
