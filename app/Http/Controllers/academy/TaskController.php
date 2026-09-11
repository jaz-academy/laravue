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

    protected function formatTask($task)
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
     * Display a listing of the resource.
     */
    public function index(Request $request)
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
            ])->orderByDesc('created_at');

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

            $formatted = $tasks->map(fn($t) => $this->formatTask($t));

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

        // Tentukan author user
        $authorUser = null;
        if (!empty($request->student_ids)) {
            $mainStudentId = $request->student_ids[0];
            $authorUser = User::where('admin_student_id', $mainStudentId)->first();
        }
        if (!$authorUser) {
            $authorUser = Auth::user() ?: User::first();
        }

        // Tentukan mentor user
        $mentorUser = null;
        if ($request->admin_teacher_id) {
            $mentorUser = User::where('admin_teacher_id', $request->admin_teacher_id)->first();
        }

        $mediaType = $request->media ?: 'image';

        $caption = $request->name ?: ($request->description ?: 'New Task');
        $mediaUrl = $request->link ?: ($request->embed ?: null);
        $grade = $request->rate ? (float) $request->rate : null;
        $isAccepted = (bool) $request->accepted;
        $status = $isAccepted ? 'approved' : ($request->status === 'Completed' ? 'reviewed' : 'pending');

        $task = MediaTask::create([
            'media_project_id' => $projectId,
            'user_id' => $authorUser->id,
            'caption' => $caption,
            'media_url' => $mediaUrl,
            'media_type' => $mediaType,
            'status' => $status,
            'mentor_id' => $mentorUser?->id,
            'grade' => $grade,
            'review_comment' => $request->review ?: null,
            'reviewed_at' => $grade ? now() : null,
        ]);

        // Simpan collaborators
        if (!empty($request->student_ids) && count($request->student_ids) > 1) {
            $collabStudentIds = array_slice($request->student_ids, 1);
            $collabUserIds = User::whereIn('admin_student_id', $collabStudentIds)->pluck('id');
            $task->collaborators()->sync($collabUserIds);
        }

        $task->load(['user.adminStudent', 'mentor.adminTeacher', 'collaborators.adminStudent', 'project']);

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

        if ($request->has('link')) {
            $task->media_url = $request->link ?: ($request->embed ?: $task->media_url);
        }

        if ($request->has('media')) {
            $task->media_type = $request->media ?: $task->media_type;
        }

        if ($request->has('project_plan_id') && $request->project_plan_id) {
            $task->media_project_id = $request->project_plan_id;
        }

        if ($request->has('rate')) {
            $task->grade = $request->rate !== '' ? (float) $request->rate : null;
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
                $mentorUser = User::where('admin_teacher_id', $request->admin_teacher_id)->first();
                if ($mentorUser) {
                    $task->mentor_id = $mentorUser->id;
                }
            } else {
                $task->mentor_id = null;
            }
        }

        if ($request->has('student_ids') && is_array($request->student_ids) && !empty($request->student_ids)) {
            $mainStudentId = $request->student_ids[0];
            $authorUser = User::where('admin_student_id', $mainStudentId)->first();
            if ($authorUser) {
                $task->user_id = $authorUser->id;
            }

            if (count($request->student_ids) > 1) {
                $collabStudentIds = array_slice($request->student_ids, 1);
                $collabUserIds = User::whereIn('admin_student_id', $collabStudentIds)->pluck('id');
                $task->collaborators()->sync($collabUserIds);
            } else {
                $task->collaborators()->detach();
            }
        }

        $task->save();
        $task->load(['user.adminStudent', 'mentor.adminTeacher', 'collaborators.adminStudent', 'project']);

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
