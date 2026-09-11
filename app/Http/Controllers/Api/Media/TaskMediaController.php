<?php

namespace App\Http\Controllers\Api\Media;

use App\Http\Controllers\Controller;
use App\Models\MediaComment;
use App\Models\MediaProject;
use App\Models\MediaTask;
use App\Models\User;
use App\Services\MediaFormatter;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TaskMediaController extends Controller
{
    protected function resolveTask($id)
    {
        return MediaTask::with(['user', 'mentor', 'collaborators', 'project', 'likes', 'comments.user'])
            ->where('id', $id)
            ->orWhere('mongodb_id', $id)
            ->first();
    }

    protected function resolveProject($id)
    {
        return MediaProject::where('id', $id)
            ->orWhere('mongodb_id', $id)
            ->first();
    }

    protected function resolveUser($id)
    {
        return User::where('id', $id)
            ->orWhere('mongodb_id', $id)
            ->first();
    }

    /**
     * Get feed tasks with pageParam pagination
     */
    public function index(Request $request)
    {
        try {
            $pageParam = (int) $request->input('pageParam', 1);
            $limit = (int) $request->input('limit', 5);
            $skip = ($pageParam - 1) * $limit;

            $currentUserId = Auth::guard('sanctum')->id();

            $query = MediaTask::with(['user', 'mentor', 'collaborators', 'project', 'likes', 'comments.user'])
                ->orderByDesc('created_at');

            // Optional status filter
            if ($request->has('status') && $request->status !== '') {
                $query->where('status', $request->status);
            }

            $tasks = $query->skip($skip)->take($limit)->get();

            $formatted = $tasks->map(function ($task) use ($currentUserId) {
                return MediaFormatter::formatTask($task, $currentUserId);
            });

            return response()->json([
                'data' => $formatted,
                'nextPage' => $tasks->count() === $limit ? $pageParam + 1 : null,
            ]);
        } catch (\Throwable $e) {
            return response()->json([
                'data' => [],
                'nextPage' => null,
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Submit new task
     */
    public function store(Request $request)
    {
        $user = Auth::user();
        if (!$user) {
            return response()->json(['success' => false, 'error' => 'Unauthorized'], 401);
        }

        $request->validate([
            'projectId' => 'required',
            'mediaType' => 'nullable|string',
            'caption' => 'nullable|string',
        ]);

        try {
            $project = $this->resolveProject($request->projectId);
            if (!$project) {
                return response()->json(['success' => false, 'error' => 'Project not found'], 404);
            }

            $mediaUrls = [];
            if ($request->has('mediaUrls') && is_array($request->mediaUrls)) {
                $mediaUrls = $request->mediaUrls;
            } elseif ($request->has('mediaUrl')) {
                $mediaUrls = [$request->mediaUrl];
            }

            // Handle file upload if direct file attached
            if ($request->hasFile('files')) {
                foreach ($request->file('files') as $file) {
                    $path = $file->store('media/tasks', 'public');
                    $mediaUrls[] = "/storage/{$path}";
                }
            }

            // Parse collaborators
            $collaboratorIds = [];
            if ($request->has('collaborators')) {
                $rawCollaborators = $request->collaborators;
                if (is_string($rawCollaborators)) {
                    $rawCollaborators = json_decode($rawCollaborators, true) ?: [];
                }
                foreach ($rawCollaborators as $c) {
                    $cId = is_array($c) ? ($c['id'] ?? $c['_id'] ?? null) : $c;
                    if ($cId) {
                        $collabUser = $this->resolveUser($cId);
                        if ($collabUser) {
                            $collaboratorIds[] = $collabUser->id;
                        }
                    }
                }
            }

            $task = MediaTask::create([
                'media_project_id' => $project->id,
                'user_id' => $user->id,
                'media_url' => $mediaUrls[0] ?? null,
                'media_urls' => $mediaUrls,
                'media_type' => $request->input('mediaType', 'image'),
                'caption' => $request->input('caption', ''),
                'status' => 'pending',
            ]);

            if (!empty($collaboratorIds)) {
                $task->collaborators()->sync($collaboratorIds);
            }

            return response()->json([
                'success' => true,
                'taskId' => (string) ($task->mongodb_id ?: $task->id),
                'task' => MediaFormatter::formatTask($task, $user->id),
            ], 201);
        } catch (\Throwable $e) {
            return response()->json(['success' => false, 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Get top 5 tasks in the last 30 days
     */
    public function bestPerformance(Request $request)
    {
        try {
            $oneMonthAgo = Carbon::now()->subDays(30);
            $currentUserId = Auth::guard('sanctum')->id();

            $tasks = MediaTask::with(['user', 'mentor', 'collaborators', 'project', 'likes', 'comments.user'])
                ->where('created_at', '>=', $oneMonthAgo)
                ->whereNotNull('grade')
                ->orderByDesc('grade')
                ->limit(5)
                ->get();

            $formatted = $tasks->map(function ($task) use ($currentUserId) {
                return MediaFormatter::formatTask($task, $currentUserId);
            });

            return response()->json([
                'success' => true,
                'data' => $formatted,
            ]);
        } catch (\Throwable $e) {
            return response()->json(['success' => false, 'data' => []], 500);
        }
    }

    /**
     * Get tasks of a specific user
     */
    public function userTasks($userId)
    {
        try {
            $user = $this->resolveUser($userId);
            if (!$user) {
                return response()->json(['success' => false, 'error' => 'User not found'], 404);
            }

            $uId = $user->id;
            $currentUserId = Auth::guard('sanctum')->id();

            $tasks = MediaTask::with(['user', 'mentor', 'collaborators', 'project', 'likes', 'comments.user'])
                ->where('user_id', $uId)
                ->orWhereHas('collaborators', function ($q) use ($uId) {
                    $q->where('user_id', $uId);
                })
                ->orderByDesc('created_at')
                ->get();

            $formatted = $tasks->map(function ($task) use ($currentUserId) {
                return MediaFormatter::formatTask($task, $currentUserId);
            });

            return response()->json([
                'success' => true,
                'data' => $formatted,
            ]);
        } catch (\Throwable $e) {
            return response()->json(['success' => false, 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Get formData for posting (active projects & users)
     */
    public function formData()
    {
        $currentUser = Auth::user();
        try {
            $projects = MediaProject::where('status', 'active')->select(['id', 'mongodb_id', 'title'])->get();
            $usersQuery = User::query();
            if ($currentUser) {
                $usersQuery->where('id', '!=', $currentUser->id);
            }
            $users = $usersQuery->select(['id', 'mongodb_id', 'name', 'username', 'image'])->get();

            return response()->json([
                'success' => true,
                'data' => [
                    'projects' => $projects->map(fn($p) => [
                        'id' => (string) ($p->mongodb_id ?: $p->id),
                        'numeric_id' => $p->id,
                        'title' => $p->title,
                    ]),
                    'users' => $users->map(fn($u) => [
                        'id' => (string) ($u->mongodb_id ?: $u->id),
                        'numeric_id' => $u->id,
                        'name' => $u->name,
                        'username' => $u->username ?: '',
                        'image' => $u->image ?: '/no-photo.png',
                    ]),
                ],
            ]);
        } catch (\Throwable $e) {
            return response()->json(['success' => false, 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Toggle like on a task
     */
    public function toggleLike($id)
    {
        $user = Auth::user();
        if (!$user) {
            return response()->json(['success' => false, 'error' => 'Unauthorized'], 401);
        }

        $task = $this->resolveTask($id);
        if (!$task) {
            return response()->json(['success' => false, 'error' => 'Task not found'], 404);
        }

        try {
            $isLiked = $task->likes()->where('user_id', $user->id)->exists();
            if ($isLiked) {
                $task->likes()->detach($user->id);
                $isLikedByMe = false;
            } else {
                $task->likes()->attach($user->id);
                $isLikedByMe = true;
            }

            $likesCount = $task->likes()->count();

            return response()->json([
                'success' => true,
                'isLikedByMe' => $isLikedByMe,
                'likesCount' => $likesCount,
            ]);
        } catch (\Throwable $e) {
            return response()->json(['success' => false, 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Get task comments
     */
    public function getComments($id)
    {
        $task = $this->resolveTask($id);
        if (!$task) {
            return response()->json(['success' => false, 'error' => 'Task not found'], 404);
        }

        try {
            $comments = MediaComment::with('user')
                ->where('media_task_id', $task->id)
                ->orderBy('created_at', 'asc')
                ->get();

            $formatted = $comments->map(function ($c) {
                return [
                    'id' => (string) ($c->mongodb_id ?: $c->id),
                    'numeric_id' => $c->id,
                    'taskId' => (string) $c->media_task_id,
                    'content' => $c->content,
                    'authorId' => [
                        'id' => (string) ($c->user?->mongodb_id ?: $c->user?->id),
                        'name' => $c->user?->name ?: 'Anonim',
                        'image' => $c->user?->image ?: '/no-photo.png',
                    ],
                    'createdAt' => $c->created_at?->toISOString(),
                ];
            });

            return response()->json([
                'success' => true,
                'data' => $formatted,
            ]);
        } catch (\Throwable $e) {
            return response()->json(['success' => false, 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Add comment to task
     */
    public function addComment($id, Request $request)
    {
        $user = Auth::user();
        if (!$user) {
            return response()->json(['success' => false, 'error' => 'Unauthorized'], 401);
        }

        $request->validate(['content' => 'required|string']);

        $task = $this->resolveTask($id);
        if (!$task) {
            return response()->json(['success' => false, 'error' => 'Task not found'], 404);
        }

        try {
            $comment = MediaComment::create([
                'media_task_id' => $task->id,
                'user_id' => $user->id,
                'content' => trim($request->content),
            ]);

            return response()->json([
                'success' => true,
                'data' => [
                    'id' => (string) $comment->id,
                    'content' => $comment->content,
                    'createdAt' => $comment->created_at?->toISOString(),
                    'author' => [
                        'name' => $user->name,
                        'image' => $user->image ?: '/no-photo.png',
                    ],
                ],
            ]);
        } catch (\Throwable $e) {
            return response()->json(['success' => false, 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Submit mentor review
     */
    public function submitReview($id, Request $request)
    {
        $user = Auth::user();
        if (!$user || (!in_array($user->media_role, ['mentor', 'admin']) && $user->role < 2)) {
            return response()->json(['success' => false, 'error' => 'Unauthorized: Only mentors or admins can review'], 403);
        }

        $task = $this->resolveTask($id);
        if (!$task) {
            return response()->json(['success' => false, 'error' => 'Task not found'], 404);
        }

        $status = $request->input('status', 'reviewed');

        try {
            if ($status === 'pending') {
                $task->mentor_id = null;
                $task->grade = null;
                $task->review_comment = null;
                $task->reviewed_at = null;
                $task->status = 'pending';
            } else {
                $task->mentor_id = $user->id;
                $task->grade = $status === 'rejected' ? 0 : (float) $request->input('grade', 0);
                $task->review_comment = $request->input('comment', '');
                $task->reviewed_at = now();
                $task->status = $status;
            }

            $task->save();

            return response()->json(['success' => true]);
        } catch (\Throwable $e) {
            return response()->json(['success' => false, 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Approve task (Admin or Project Manager)
     */
    public function approveTask($id)
    {
        $user = Auth::user();
        if (!$user) {
            return response()->json(['success' => false, 'error' => 'Unauthorized'], 401);
        }

        $task = $this->resolveTask($id);
        if (!$task) {
            return response()->json(['success' => false, 'error' => 'Task not found'], 404);
        }

        $isAdmin = $user->media_role === 'admin' || $user->role >= 4;
        $isPM = $task->project && (string) $task->project->project_manager_id === (string) $user->id;

        if (!$isAdmin && !$isPM) {
            return response()->json(['success' => false, 'error' => "Forbidden: You don't have permission to approve this task"], 403);
        }

        try {
            $task->status = 'approved';
            $task->save();

            return response()->json(['success' => true]);
        } catch (\Throwable $e) {
            return response()->json(['success' => false, 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Update task caption
     */
    public function updateCaption($id, Request $request)
    {
        $user = Auth::user();
        if (!$user) {
            return response()->json(['success' => false, 'error' => 'Unauthorized'], 401);
        }

        $task = $this->resolveTask($id);
        if (!$task) {
            return response()->json(['success' => false, 'error' => 'Task not found'], 404);
        }

        $isAdmin = $user->media_role === 'admin' || $user->role >= 4;
        if ($task->user_id !== $user->id && !$isAdmin) {
            return response()->json(['success' => false, 'error' => "Forbidden: You don't have permission to edit this post"], 403);
        }

        try {
            $task->caption = $request->input('caption', '');
            $task->save();

            return response()->json(['success' => true]);
        } catch (\Throwable $e) {
            return response()->json(['success' => false, 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Delete task
     */
    public function destroy($id)
    {
        $user = Auth::user();
        if (!$user || ($user->media_role !== 'admin' && $user->role < 4)) {
            return response()->json(['success' => false, 'error' => 'Unauthorized: Only admins can delete posts'], 403);
        }

        $task = $this->resolveTask($id);
        if (!$task) {
            return response()->json(['success' => false, 'error' => 'Task not found'], 404);
        }

        try {
            // Delete related comments
            $task->comments()->delete();
            $task->delete();

            return response()->json(['success' => true]);
        } catch (\Throwable $e) {
            return response()->json(['success' => false, 'error' => $e->getMessage()], 500);
        }
    }
}
