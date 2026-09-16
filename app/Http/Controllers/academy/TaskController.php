<?php

namespace App\Http\Controllers\academy;

use App\Http\Controllers\Controller;
use App\Models\MediaProject;
use App\Models\MediaTask;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TaskController extends Controller
{
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

    protected function normalizeMediaType(?string $type, ?string $url = ''): string
    {
        $t = strtolower(trim($type ?: ''));
        $u = strtolower(trim($url ?: ''));

        if ($t === 'document' || $t === 'pdf' || str_ends_with($u, '.pdf')) {
            return 'document';
        }
        if ($t === 'video' || str_contains($u, 'youtube.com') || str_contains($u, 'youtu.be') || str_contains($u, 'tiktok.com') || str_ends_with($u, '.mp4') || str_ends_with($u, '.mov')) {
            return 'video';
        }
        if ($t === 'image' || $t === 'photo' || $t === 'picture' || str_ends_with($u, '.jpg') || str_ends_with($u, '.jpeg') || str_ends_with($u, '.png') || str_ends_with($u, '.webp')) {
            return 'image';
        }

        // Fallbacks from legacy media labels
        if ($t === 'youtube' || $t === 'tiktok') {
            return 'video';
        }
        if ($t === 'google drive') {
            if (str_contains($u, 'pdf')) return 'document';
            if (str_contains($u, 'video') || str_contains($u, 'mp4')) return 'video';
        }

        return 'image';
    }

    protected function formatTask($task)
    {
        $students = $this->getStudentsFromTask($task);
        if (empty($students) && $task->student) {
            $st = $task->student;
            $students = [[
                'id' => $st->id,
                'name' => $st->name,
                'nickname' => $st->nickname ?: $st->name,
                'image' => $st->image,
                'role' => $st->role,
            ]];
        }

        $mentorName = $task->mentorTeacher?->name ?: ($task->mentor?->adminTeacher?->name ?: ($task->mentor?->name ?: 'Mentor'));
        $mentorTeacherId = $task->admin_teacher_id ?: ($task->mentor?->admin_teacher_id);
        $isCompleted = in_array(strtolower($task->status ?: ''), ['approved', 'reviewed', 'completed']);

        // Normalize media type
        $mediaType = $this->normalizeMediaType($task->media_type, $task->media_url);

        // Ensure media_urls is clean array
        $mediaUrls = $task->media_urls;
        if (is_string($mediaUrls)) {
            $decoded = json_decode($mediaUrls, true);
            if (json_last_error() === JSON_ERROR_NONE && is_array($decoded)) {
                $mediaUrls = $decoded;
            } else {
                $mediaUrls = [$mediaUrls];
            }
        }
        if (!is_array($mediaUrls)) {
            $mediaUrls = $task->media_url ? [$task->media_url] : [];
        }
        $mediaUrls = array_values(array_filter(array_map(fn($u) => is_string($u) ? stripslashes(trim($u)) : $u, $mediaUrls)));

        $parts = explode(' - ', $task->project?->title ?: 'Project', 2);
        $projectSubject = count($parts) > 1 ? trim($parts[0]) : ($task->project?->title ?: 'Project');
        $projectTheme = count($parts) > 1 ? trim($parts[1]) : ($task->project?->title ?: 'Project');

        return [
            'id' => $task->id,
            'name' => $task->caption ?: ($task->project?->title ?: 'Task #' . $task->id),
            'caption' => $task->caption,
            'media' => ucfirst($mediaType),
            'media_type' => $mediaType,
            'media_url' => $task->media_url,
            'media_urls' => $mediaUrls,
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
            'admin_teacher_id' => $mentorTeacherId,
            'students' => $students,
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
                'id' => $mentorTeacherId,
                'name' => $mentorName,
            ],
            'mentor' => [
                'id' => $task->mentor_id,
                'name' => $mentorName,
            ],
        ];
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {
            $perPage = (int) $request->input('perPage', 10);
            $page = (int) $request->input('page', 1);
            $studentId = $request->input('admin_student_id');

            $query = MediaTask::with([
                'student',
                'mentorTeacher',
                'studentCollaborators',
                'user.adminStudent',
                'collaborators.adminStudent',
                'mentor.adminTeacher',
                'project',
            ])->orderByDesc('created_at');

            if ($studentId) {
                $userIds = User::where('admin_student_id', $studentId)->pluck('id');
                $query->where(function ($q) use ($userIds, $studentId) {
                    $q->where('admin_student_id', $studentId)
                      ->orWhereHas('studentCollaborators', fn($cq) => $cq->where('admin_students.id', $studentId));
                    if ($userIds->isNotEmpty()) {
                        $q->orWhereIn('user_id', $userIds)
                          ->orWhereHas('collaborators', fn($cq) => $cq->whereIn('user_id', $userIds));
                    }
                });
            }

            if ($search = $request->input('search')) {
                $query->where(function ($q) use ($search) {
                    $q->where('caption', 'ilike', "%{$search}%")
                      ->orWhereHas('user', fn($uq) => $uq->where('name', 'ilike', "%{$search}%"))
                      ->orWhereHas('student', fn($sq) => $sq->where('name', 'ilike', "%{$search}%")->orWhere('nickname', 'ilike', "%{$search}%"))
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
                $normMedia = $this->normalizeMediaType($media);
                $query->where(function ($q) use ($normMedia, $media) {
                    $q->where('media_type', $normMedia)
                      ->orWhere('media_type', 'ilike', "%{$media}%");
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

            $formatted = $tasks->map(fn($t) => $this->formatTask($t));

            return response()->json([
                'success' => true,
                'count' => $total,
                'totalTasks' => $total,
                'page' => $page,
                'totalPages' => (int) ceil($total / max(1, $perPage)),
                'data' => $formatted,
                'tasks' => $formatted,
            ]);
        } catch (\Throwable $e) {
            return response()->json(['success' => false, 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $fields = $request->validate([
            'project_plan_id' => 'nullable',
            'name' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'media' => 'nullable|string',
            'media_type' => 'nullable|string',
            'media_url' => 'nullable|string',
            'media_urls' => 'nullable',
            'link' => 'nullable|string',
            'embed' => 'nullable|string',
            'student_ids' => 'nullable|array',
            'admin_teacher_id' => 'nullable',
            'rate' => 'nullable',
            'review' => 'nullable|string',
            'accepted' => 'nullable',
            'status' => 'nullable|string',
        ]);

        $projectId = $request->project_plan_id;
        if (!$projectId) {
            $firstProject = MediaProject::first();
            $projectId = $firstProject ? $firstProject->id : null;
        }

        // Tentukan author user & student
        $authorUser = null;
        $mainStudentId = null;
        if (!empty($request->student_ids)) {
            $mainStudentId = (int) $request->student_ids[0];
            $authorUser = User::where('admin_student_id', $mainStudentId)->first();
        }
        if (!$authorUser) {
            $authorUser = Auth::user() ?: User::first();
            if ($authorUser && !$mainStudentId) {
                $mainStudentId = $authorUser->admin_student_id;
            }
        }

        // Tentukan mentor user & teacher
        $mentorUser = null;
        $adminTeacherId = null;
        if ($request->admin_teacher_id) {
            $adminTeacherId = (int) $request->admin_teacher_id;
            $mentorUser = User::where('admin_teacher_id', $adminTeacherId)->first();
        }

        // Parse media URLs
        $mediaUrls = [];
        if ($request->has('media_urls')) {
            $rawUrls = $request->media_urls;
            if (is_string($rawUrls)) {
                $decoded = json_decode($rawUrls, true);
                if (json_last_error() === JSON_ERROR_NONE && is_array($decoded)) {
                    $mediaUrls = $decoded;
                } else {
                    $mediaUrls = array_filter(array_map('trim', explode("\n", str_replace("\r", "", $rawUrls))));
                }
            } elseif (is_array($rawUrls)) {
                $mediaUrls = $rawUrls;
            }
        }

        $mediaUrl = $request->media_url ?: ($request->link ?: ($request->embed ?: ($mediaUrls[0] ?? null)));
        if ($mediaUrl && empty($mediaUrls)) {
            $mediaUrls = [$mediaUrl];
        }

        $mediaType = $this->normalizeMediaType($request->media_type ?: $request->media, $mediaUrl);

        $caption = $request->name ?: ($request->description ?: 'New Task');
        $grade = $request->rate !== null && $request->rate !== '' ? (float) $request->rate : null;
        $isAccepted = (bool) $request->accepted;
        $status = $isAccepted ? 'approved' : ($request->status === 'Completed' ? 'reviewed' : 'pending');

        $task = MediaTask::create([
            'media_project_id' => $projectId,
            'user_id' => $authorUser?->id,
            'admin_student_id' => $mainStudentId,
            'caption' => $caption,
            'media_url' => $mediaUrl,
            'media_urls' => array_values(array_filter($mediaUrls)),
            'media_type' => $mediaType,
            'status' => $status,
            'mentor_id' => $mentorUser?->id,
            'admin_teacher_id' => $adminTeacherId,
            'grade' => $grade,
            'review_comment' => $request->review ?: null,
            'reviewed_at' => $grade ? now() : null,
        ]);

        // Simpan collaborators di pivot table
        if (!empty($request->student_ids) && count($request->student_ids) > 1) {
            $collabStudentIds = array_slice($request->student_ids, 1);
            foreach ($collabStudentIds as $sid) {
                $cUser = User::where('admin_student_id', $sid)->first();
                \Illuminate\Support\Facades\DB::table('media_task_collaborators')->insert([
                    'media_task_id' => $task->id,
                    'admin_student_id' => (int) $sid,
                    'user_id' => $cUser?->id,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }

        $task->load([
            'student',
            'mentorTeacher',
            'studentCollaborators',
            'user.adminStudent',
            'mentor.adminTeacher',
            'collaborators.adminStudent',
            'project',
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Task created successfully.',
            'data' => $this->formatTask($task),
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $task = MediaTask::with([
            'student',
            'mentorTeacher',
            'studentCollaborators',
            'user.adminStudent',
            'collaborators.adminStudent',
            'mentor.adminTeacher',
            'project',
        ])->find($id);

        if (!$task) {
            return response()->json(['success' => false, 'message' => 'Task not found'], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $this->formatTask($task),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $task = MediaTask::find($id);
        if (!$task) {
            return response()->json(['success' => false, 'message' => 'Task not found'], 404);
        }

        if ($request->has('name')) {
            $task->caption = $request->name ?: $task->caption;
        } elseif ($request->has('description') && !$task->caption) {
            $task->caption = $request->description;
        }

        // Media URLs parsing
        if ($request->has('media_urls')) {
            $rawUrls = $request->media_urls;
            if (is_string($rawUrls)) {
                $decoded = json_decode($rawUrls, true);
                if (json_last_error() === JSON_ERROR_NONE && is_array($decoded)) {
                    $task->media_urls = array_values(array_filter($decoded));
                } else {
                    $task->media_urls = array_values(array_filter(array_map('trim', explode("\n", str_replace("\r", "", $rawUrls)))));
                }
            } elseif (is_array($rawUrls)) {
                $task->media_urls = array_values(array_filter($rawUrls));
            }
        }

        if ($request->has('media_url') || $request->has('link') || $request->has('embed')) {
            $task->media_url = $request->media_url ?: ($request->link ?: ($request->embed ?: ($task->media_urls[0] ?? $task->media_url)));
            if ($task->media_url && empty($task->media_urls)) {
                $task->media_urls = [$task->media_url];
            }
        }

        if ($request->has('media_type') || $request->has('media')) {
            $task->media_type = $this->normalizeMediaType($request->media_type ?: $request->media, $task->media_url);
        }

        if ($request->has('project_plan_id') && $request->project_plan_id) {
            $task->media_project_id = $request->project_plan_id;
        }

        if ($request->has('rate')) {
            $task->grade = $request->rate !== '' && $request->rate !== null ? (float) $request->rate : null;
            if ($task->grade && !$task->reviewed_at) {
                $task->reviewed_at = now();
            }
        }

        if ($request->has('review')) {
            $task->review_comment = $request->review ?: null;
        }

        if ($request->has('accepted')) {
            $isAccepted = (bool) $request->accepted;
            $task->status = $isAccepted ? 'approved' : ($request->status === 'Completed' ? 'reviewed' : 'pending');
        }

        if ($request->has('admin_teacher_id')) {
            if ($request->admin_teacher_id) {
                $task->admin_teacher_id = (int) $request->admin_teacher_id;
                $mentorUser = User::where('admin_teacher_id', $request->admin_teacher_id)->first();
                if ($mentorUser) {
                    $task->mentor_id = $mentorUser->id;
                }
            } else {
                $task->admin_teacher_id = null;
                $task->mentor_id = null;
            }
        }

        if ($request->has('student_ids') && is_array($request->student_ids) && !empty($request->student_ids)) {
            $mainStudentId = (int) $request->student_ids[0];
            $task->admin_student_id = $mainStudentId;
            $authorUser = User::where('admin_student_id', $mainStudentId)->first();
            if ($authorUser) {
                $task->user_id = $authorUser->id;
            }

            \Illuminate\Support\Facades\DB::table('media_task_collaborators')->where('media_task_id', $task->id)->delete();
            if (count($request->student_ids) > 1) {
                $collabStudentIds = array_slice($request->student_ids, 1);
                foreach ($collabStudentIds as $sid) {
                    $cUser = User::where('admin_student_id', $sid)->first();
                    \Illuminate\Support\Facades\DB::table('media_task_collaborators')->insert([
                        'media_task_id' => $task->id,
                        'admin_student_id' => (int) $sid,
                        'user_id' => $cUser?->id,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]);
                }
            }
        }

        $task->save();
        $task->load([
            'student',
            'mentorTeacher',
            'studentCollaborators',
            'user.adminStudent',
            'mentor.adminTeacher',
            'collaborators.adminStudent',
            'project',
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Task updated successfully.',
            'data' => $this->formatTask($task),
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $task = MediaTask::find($id);
        if (!$task) {
            return response()->json(['success' => false, 'message' => 'Task not found'], 404);
        }

        $task->delete();

        return response()->json([
            'success' => true,
            'message' => 'Task deleted successfully.',
        ]);
    }
}
