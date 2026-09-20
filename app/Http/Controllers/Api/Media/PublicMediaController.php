<?php

namespace App\Http\Controllers\Api\Media;

use App\Http\Controllers\Controller;
use App\Models\MediaProject;
use App\Models\MediaTask;
use App\Models\User;
use App\Services\GoogleDriveService;
use App\Services\MediaFormatter;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;

class PublicMediaController extends Controller
{
    /**
     * Get 10 best tasks of all time, sorted by mentor review grade.
     */
    public function bestTasks(Request $request)
    {
        try {
            $forceRefresh = $request->boolean('refresh') || $request->has('nocache');
            $cacheKey = 'public_best_tasks_v2';
            if ($forceRefresh) {
                Cache::forget($cacheKey);
            }

            // Cache for 10 minutes (600 seconds)
            $formatted = Cache::remember($cacheKey, 600, function () {
                $tasks = MediaTask::with([
                    'student.user',
                    'mentorTeacher.user',
                    'studentCollaborators.user',
                    'user.adminStudent',
                    'mentor.adminTeacher',
                    'collaborators.adminStudent',
                    'project',
                    'likes',
                    'comments.user'
                ])
                ->whereNotNull('grade')
                ->orderByDesc('grade')
                ->limit(10)
                ->get();

                return $tasks->map(function ($task) {
                    return MediaFormatter::formatTask($task);
                })->values()->all();
            });

            return response()->json([
                'success' => true,
                'data' => $formatted,
            ])->header('Cache-Control', 'public, max-age=300, stale-while-revalidate=600');
        } catch (\Throwable $e) {
            return response()->json([
                'success' => false,
                'error' => 'Failed to fetch best tasks: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get all tasks sorted from the latest (created_at DESC).
     */
    public function allMediaTasks(Request $request)
    {
        try {
            $forceRefresh = $request->boolean('refresh') || $request->has('nocache');
            $cacheKey = 'public_all_media_tasks_v3';
            if ($forceRefresh) {
                Cache::forget($cacheKey);
            }

            $formatted = Cache::remember($cacheKey, 180, function () {
                $tasks = MediaTask::with([
                    'student.user',
                    'mentorTeacher.user',
                    'studentCollaborators.user',
                    'user.adminStudent',
                    'mentor.adminTeacher',
                    'collaborators.adminStudent',
                    'project',
                    'likes',
                    'comments.user'
                ])
                ->orderByDesc('created_at')
                ->get();

                return $tasks->map(function ($task) {
                    return MediaFormatter::formatTask($task);
                })->values()->all();
            });

            return response()->json([
                'success' => true,
                'data' => $formatted,
            ])->header('Cache-Control', 'public, max-age=60, stale-while-revalidate=180');
        } catch (\Throwable $e) {
            return response()->json([
                'success' => false,
                'error' => 'Failed to fetch all tasks: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get all members (role: "member")
     */
    public function members(Request $request)
    {
        try {
            // Cache members for 15 minutes (900 seconds)
            $data = Cache::remember('public_members_list_v1', 900, function () {
                $members = User::where('role', '<=', 2)->get();

                return $members->map(function ($user) {
                    return MediaFormatter::formatUser($user);
                })->values()->all();
            });

            return response()->json([
                'success' => true,
                'data' => $data,
            ])->header('Cache-Control', 'public, max-age=300, stale-while-revalidate=600');
        } catch (\Throwable $e) {
            return response()->json([
                'success' => false,
                'error' => 'Failed to fetch members: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get single member by ID or mongodb_id
     */
    public function memberById($id)
    {
        try {
            $user = User::where('id', $id)
                ->orWhere('mongodb_id', $id)
                ->first();

            if (!$user) {
                return response()->json([
                    'success' => false,
                    'error' => 'Member not found',
                ], 404);
            }

            return response()->json([
                'success' => true,
                'data' => MediaFormatter::formatUser($user),
            ]);
        } catch (\Throwable $e) {
            return response()->json([
                'success' => false,
                'error' => 'Failed to fetch member: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get tasks by member ID (authored or collaborated)
     */
    public function tasksByMember($id)
    {
        try {
            $user = User::where('id', $id)
                ->orWhere('mongodb_id', $id)
                ->first();

            if (!$user) {
                return response()->json([
                    'success' => false,
                    'error' => 'Member not found',
                ], 404);
            }

            $userId = $user->id;

            $tasks = MediaTask::with(['user', 'mentor', 'collaborators', 'project', 'likes', 'comments.user'])
                ->where('user_id', $userId)
                ->orWhereHas('collaborators', function ($q) use ($userId) {
                    $q->where('user_id', $userId);
                })
                ->orderByDesc('created_at')
                ->get();

            $formatted = $tasks->map(function ($task) {
                return MediaFormatter::formatTask($task);
            });

            return response()->json([
                'success' => true,
                'data' => $formatted,
            ]);
        } catch (\Throwable $e) {
            return response()->json([
                'success' => false,
                'error' => 'Failed to fetch tasks by member: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Stream media (Google Drive or direct media) with Range header support
     */
    public function streamMedia($id, Request $request)
    {
        try {
            return GoogleDriveService::streamFile($id, $request);
        } catch (\Throwable $e) {
            return redirect()->to("https://lh3.googleusercontent.com/d/{$id}=w1000");
        }
    }

    /**
     * Proxy external image with caching and fallback
     */
    public function proxyImage($id)
    {
        try {
            $cacheKey = "media_img_raw_{$id}";
            $data = Cache::remember($cacheKey, 604800, function () use ($id) {
                $urls = [
                    "https://lh3.googleusercontent.com/d/{$id}=w1000",
                    "https://drive.usercontent.google.com/download?id={$id}&export=download",
                ];
                foreach ($urls as $u) {
                    try {
                        $resp = Http::withoutVerifying()
                            ->withHeaders([
                                'User-Agent' => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                            ])
                            ->timeout(12)
                            ->get($u);

                        if ($resp->successful() && strlen($resp->body()) > 1000) {
                            return [
                                'content' => base64_encode($resp->body()),
                                'type' => $resp->header('Content-Type') ?: 'image/jpeg',
                            ];
                        }
                    } catch (\Throwable $e) {
                        continue;
                    }
                }
                return null;
            });

            if (!$data) {
                return redirect()->to("https://lh3.googleusercontent.com/d/{$id}=w1000");
            }

            return response(base64_decode($data['content']), 200, [
                'Content-Type' => $data['type'],
                'Cache-Control' => 'public, max-age=604800, immutable',
                'Access-Control-Allow-Origin' => '*',
            ]);
        } catch (\Throwable $e) {
            return redirect()->to("https://lh3.googleusercontent.com/d/{$id}=w1000");
        }
    }

    /**
     * Proxy external PDF with CORS headers
     */
    public function proxyPdf(Request $request)
    {
        $url = $request->query('url');
        if (!$url) {
            return response('Missing url parameter', 400);
        }

        try {
            preg_match('/id=([^&]+)/', $url, $m);
            $fileId = $m[1] ?? null;

            // 1. Try Google Drive API if token available
            $token = GoogleDriveService::getAccessToken();
            if ($fileId && $token) {
                $response = Http::withoutVerifying()
                    ->withToken($token)
                    ->get("https://www.googleapis.com/drive/v3/files/{$fileId}?alt=media");

                if ($response->successful()) {
                    return response($response->body(), 200, [
                        'Content-Type' => 'application/pdf',
                        'Access-Control-Allow-Origin' => '*',
                        'Cache-Control' => 'public, max-age=86400',
                    ]);
                }
            }

            // 2. Try direct download link
            $fetchUrl = $fileId
                ? "https://drive.usercontent.google.com/download?id={$fileId}&export=download"
                : $url;

            $response = Http::withoutVerifying()
                ->withHeaders([
                    'User-Agent' => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                ])
                ->get($fetchUrl);

            if ($response->successful()) {
                return response($response->body(), 200, [
                    'Content-Type' => 'application/pdf',
                    'Access-Control-Allow-Origin' => '*',
                    'Cache-Control' => 'public, max-age=86400',
                ]);
            }

            // 3. Fallback to original URL
            if ($fetchUrl !== $url) {
                $response = Http::withoutVerifying()
                    ->withHeaders([
                        'User-Agent' => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                    ])
                    ->get($url);

                if ($response->successful()) {
                    return response($response->body(), 200, [
                        'Content-Type' => 'application/pdf',
                        'Access-Control-Allow-Origin' => '*',
                        'Cache-Control' => 'public, max-age=86400',
                    ]);
                }
            }

            return response('Failed to fetch document', 502);
        } catch (\Throwable $e) {
            return response('Error fetching document: ' . $e->getMessage(), 500);
        }
    }

    protected function getStudentsFromTask($task)
    {
        $students = collect();
        if ($task->user?->adminStudent) {
            $st = $task->user->adminStudent;
            $students->push([
                'id' => $st->id,
                'name' => $st->name,
                'nickname' => $st->nickname ?: $st->name,
                'image' => $st->image,
                'role' => $st->role,
            ]);
        }
        if ($task->relationLoaded('collaborators')) {
            foreach ($task->collaborators as $c) {
                if ($c->adminStudent) {
                    $st = $c->adminStudent;
                    $students->push([
                        'id' => $st->id,
                        'name' => $st->name,
                        'nickname' => $st->nickname ?: $st->name,
                        'image' => $st->image,
                        'role' => $st->role,
                    ]);
                }
            }
        }
        return $students->unique('id')->values()->all();
    }

    protected function formatTaskForAcademy($task)
    {
        $students = $this->getStudentsFromTask($task);
        $mentorName = $task->mentor?->adminTeacher?->name ?: ($task->mentor?->name ?: 'Mentor');
        $isCompleted = in_array(strtolower($task->status ?: ''), ['approved', 'reviewed', 'completed']);

        // Resolve media display
        $mediaUrl = $task->media_url ?: '';
        $mediaType = strtolower($task->media_type ?: '');
        if (str_contains($mediaUrl, 'instagram.com') || $mediaType === 'instagram') {
            $mediaDisplay = 'Instagram';
        } elseif (str_contains($mediaUrl, 'tiktok.com') || $mediaType === 'tiktok') {
            $mediaDisplay = 'TikTok';
        } elseif (str_contains($mediaUrl, 'youtube.com') || str_contains($mediaUrl, 'youtu.be') || $mediaType === 'youtube') {
            $mediaDisplay = 'YouTube';
        } elseif (str_contains($mediaUrl, 'drive.google.com') || str_contains($mediaUrl, 'docs.google.com') || $mediaType === 'google drive') {
            $mediaDisplay = 'Google Drive';
        } else {
            $mediaDisplay = ucfirst($task->media_type ?: 'image');
        }

        $parts = explode(' - ', $task->project?->title ?: 'Project', 2);
        $projectSubject = count($parts) > 1 ? trim($parts[0]) : ($task->project?->title ?: 'Project');
        $projectTheme = count($parts) > 1 ? trim($parts[1]) : ($task->project?->title ?: 'Project');

        return [
            'id' => $task->id,
            'name' => $task->caption ?: ($task->project?->title ?: 'Task #' . $task->id),
            'caption' => $task->caption,
            'media' => $mediaDisplay,
            'media_type' => $task->media_type ?: 'image',
            'media_url' => $task->media_url,
            'media_urls' => $task->media_urls ?: [],
            'link' => $task->media_url,
            'embed' => $task->media_url,
            'date' => $task->created_at?->toDateString() ?: now()->toDateString(),
            'created_at' => $task->created_at,
            'rate' => (float) ($task->grade ?: 0),
            'grade' => (float) ($task->grade ?: 0),
            'status' => $isCompleted ? 'Completed' : 'In Progress',
            'accepted' => $isCompleted ? 1 : 0,
            'review' => $task->review_comment,
            'review_comment' => $task->review_comment,
            'project_plan_id' => $task->media_project_id,
            'admin_teacher_id' => $task->mentor?->admin_teacher_id,
            'students' => $students,
            'author' => [
                'id' => $task->user?->id,
                'name' => $task->user?->name,
                'image' => $task->user?->image,
            ],
            'project_plan' => [
                'id' => $task->project?->id,
                'theme' => $projectTheme,
                'subject' => $projectSubject,
                'description' => $task->project?->description ?: '',
            ],
            'project' => [
                'id' => $task->project?->id,
                'title' => $task->project?->title ?: 'Project',
                'description' => $task->project?->description ?: '',
            ],
            'admin_teacher' => [
                'id' => $task->mentor?->admin_teacher_id,
                'name' => $mentorName,
            ],
            'mentor' => [
                'id' => $task->mentor_id,
                'name' => $mentorName,
            ],
        ];
    }

    /**
     * Get tasks for student by admin_student_id
     */
    public function taskByStudent($studentId)
    {
        try {
            $tasks = MediaTask::with(['student', 'user.adminStudent', 'mentorTeacher', 'mentor.adminTeacher', 'studentCollaborators', 'collaborators.adminStudent', 'project'])
                ->where(function ($q) use ($studentId) {
                    $q->where('admin_student_id', $studentId)
                      ->orWhereHas('studentCollaborators', fn($cq) => $cq->where('admin_students.id', $studentId))
                      ->orWhereHas('user', fn($uq) => $uq->where('admin_student_id', $studentId))
                      ->orWhereHas('collaborators', fn($cq) => $cq->where('admin_student_id', $studentId));
                })
                ->orderByDesc('created_at')
                ->get();

            $formatted = $tasks->map(fn($t) => $this->formatTaskForAcademy($t));

            return response()->json([
                'success' => true,
                'count' => $formatted->count(),
                'data' => $formatted,
            ]);
        } catch (\Throwable $e) {
            return response()->json(['success' => false, 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Get tasks for teacher by admin_teacher_id
     */
    public function taskByTeacher($teacherId)
    {
        try {
            $tasks = MediaTask::with(['student', 'user.adminStudent', 'mentorTeacher', 'mentor.adminTeacher', 'studentCollaborators', 'collaborators.adminStudent', 'project'])
                ->where(function ($q) use ($teacherId) {
                    $q->where('admin_teacher_id', $teacherId)
                      ->orWhereHas('mentor', fn($mq) => $mq->where('admin_teacher_id', $teacherId));
                })
                ->orderByDesc('created_at')
                ->get();

            $formatted = $tasks->map(fn($t) => $this->formatTaskForAcademy($t));

            return response()->json([
                'success' => true,
                'count' => $formatted->count(),
                'data' => $formatted,
            ]);
        } catch (\Throwable $e) {
            return response()->json(['success' => false, 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Get plans with embedded tasks and student contributors
     */
    public function plansWithTasks(Request $request)
    {
        try {
            $projects = MediaProject::with([
                'tasks.user.adminStudent',
                'tasks.collaborators.adminStudent',
                'tasks.mentor.adminTeacher',
                'mentor.adminTeacher',
            ])
            ->orderByDesc('created_at')
            ->get();

            $data = $projects->map(function ($p) {
                $tasks = $p->tasks->map(function ($t) {
                    return $this->formatTaskForAcademy($t);
                });

                $parts = explode(' - ', $p->title, 2);
                $subject = count($parts) > 1 ? trim($parts[0]) : $p->title;
                $theme = count($parts) > 1 ? trim($parts[1]) : $p->title;

                return [
                    'id' => $p->id,
                    'theme' => $theme,
                    'subject' => $subject,
                    'description' => $p->description ?: 'No description provided.',
                    'status' => $p->status,
                    'is_active' => $p->status === 'active' ? 1 : 0,
                    'start_date' => $p->created_at?->toDateString(),
                    'end_date' => Carbon::now()->addMonths(6)->toDateString(),
                    'project_task' => $tasks->values()->all(),
                ];
            });

            return response()->json([
                'success' => true,
                'count' => $data->count(),
                'data' => $data,
            ]);
        } catch (\Throwable $e) {
            return response()->json(['success' => false, 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Get plans list
     */
    public function plans(Request $request)
    {
        return $this->plansWithTasks($request);
    }

    /**
     * Get all tasks
     */
    public function allTasks(Request $request)
    {
        try {
            $tasks = MediaTask::with([
                'user.adminStudent',
                'collaborators.adminStudent',
                'mentor.adminTeacher',
                'project',
            ])
            ->orderByDesc('created_at')
            ->get();

            $formatted = $tasks->map(fn($t) => $this->formatTaskForAcademy($t));

            return response()->json([
                'success' => true,
                'count' => $formatted->count(),
                'data' => $formatted,
            ]);
        } catch (\Throwable $e) {
            return response()->json(['success' => false, 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Get tasks with pagination and query filters
     */
    public function publicTasks(Request $request)
    {
        try {
            $perPage = (int) $request->input('perPage', 10);
            $page = (int) $request->input('page', 1);
            $studentId = $request->input('admin_student_id');

            $query = MediaTask::with([
                'user.adminStudent',
                'collaborators.adminStudent',
                'mentor.adminTeacher',
                'project',
            ]);

            if ($studentId) {
                $userIds = User::where('admin_student_id', $studentId)->pluck('id');
                $query->where(function ($q) use ($userIds, $studentId) {
                    if ($userIds->isNotEmpty()) {
                        $q->whereIn('user_id', $userIds)
                          ->orWhereHas('collaborators', fn($cq) => $cq->whereIn('user_id', $userIds));
                    } else {
                        $q->whereHas('user', fn($uq) => $uq->where('admin_student_id', $studentId));
                    }
                });
            }

            if ($search = $request->input('search')) {
                $query->where(function ($q) use ($search) {
                    $q->where('caption', 'ilike', "%{$search}%")
                      ->orWhereHas('user', fn($uq) => $uq->where('name', 'ilike', "%{$search}%"))
                      ->orWhereHas('project', fn($pq) => $pq->where('title', 'ilike', "%{$search}%"));
                });
            }

            if ($status = $request->input('status')) {
                if ($status === 'Completed') {
                    $query->whereIn('status', ['completed', 'reviewed', 'approved']);
                } elseif ($status === 'In Progress') {
                    $query->where('status', 'pending');
                }
            }

            if ($media = $request->input('media')) {
                $query->where(function ($q) use ($media) {
                    $q->where('media_type', 'ilike', "%{$media}%")
                      ->orWhere('caption', 'ilike', "%{$media}%")
                      ->orWhere('media_url', 'ilike', "%{$media}%");
                });
            }

            if ($request->has('accepted') && $request->input('accepted') !== '') {
                $acc = (int) $request->input('accepted');
                if ($acc === 1) {
                    $query->whereIn('status', ['approved', 'reviewed']);
                } else {
                    $query->where('status', 'pending');
                }
            }

            // Sorting
            $sortBy = $request->input('sortBy');
            $orderBy = strtolower($request->input('orderBy', 'desc')) === 'asc' ? 'asc' : 'desc';

            if ($sortBy === 'name') {
                $query->orderBy('caption', $orderBy);
            } elseif ($sortBy === 'rate') {
                $query->orderBy('grade', $orderBy);
            } elseif ($sortBy === 'id') {
                $query->orderBy('id', $orderBy);
            } elseif ($sortBy === 'status') {
                $query->orderBy('status', $orderBy);
            } else {
                $query->orderByDesc('created_at');
            }

            $total = $query->count();
            $tasks = $query->skip(($page - 1) * $perPage)->take($perPage)->get();

            $formatted = $tasks->map(fn($t) => $this->formatTaskForAcademy($t));

            return response()->json([
                'success' => true,
                'count' => $total,
                'page' => $page,
                'totalPages' => (int) ceil($total / max(1, $perPage)),
                'data' => $formatted,
            ]);
        } catch (\Throwable $e) {
            return response()->json(['success' => false, 'error' => $e->getMessage()], 500);
        }
    }

    public function homeTasksWithAll(Request $request)
    {
        return $this->publicTasks($request);
    }

    public function uploadTasksWithAll(Request $request)
    {
        return $this->publicTasks($request);
    }

    public function instagramTasksWithAll(Request $request)
    {
        return $this->publicTasks($request);
    }
}
