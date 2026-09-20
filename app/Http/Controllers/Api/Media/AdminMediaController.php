<?php

namespace App\Http\Controllers\Api\Media;

use App\Http\Controllers\Controller;
use App\Models\MediaProject;
use App\Models\MediaTask;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AdminMediaController extends Controller
{
    protected function checkAdmin()
    {
        $user = Auth::user();
        if (!$user) return false;
        return $user->role >= 3;
    }

    /**
     * Get all users for admin table
     */
    public function users()
    {
        if (!$this->checkAdmin()) {
            return response()->json(['success' => false, 'error' => 'Unauthorized'], 403);
        }

        try {
            $users = User::with(['adminStudent', 'adminTeacher'])->orderByDesc('created_at')->get();
            $data = $users->map(function ($u) {
                $r = (int) $u->role;
                if ($r === 5) $roleSlug = 'programmer';
                elseif ($r === 4) $roleSlug = 'superadmin';
                elseif ($r === 3) $roleSlug = 'admin';
                elseif ($u->admin_teacher_id) $roleSlug = 'mentor';
                elseif ($r === 2 || $u->admin_student_id) $roleSlug = 'student';
                elseif ($r === 1) $roleSlug = 'guest';
                else $roleSlug = 'anonymous';

                $avatarImage = $u->adminStudent?->image ?: ($u->adminTeacher?->image ?: $u->image);

                return [
                    'id' => (string) ($u->mongodb_id ?: $u->id),
                    'numeric_id' => $u->id,
                    'name' => $u->name,
                    'username' => $u->username ?: '',
                    'email' => $u->email ?: '',
                    'role' => $roleSlug,
                    'role_number' => $r,
                    'image' => MediaFormatter::formatAvatarUrl($avatarImage),
                ];
            });

            return response()->json([
                'success' => true,
                'data' => $data,
            ]);
        } catch (\Throwable $e) {
            return response()->json(['success' => false, 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Update user role
     */
    public function updateRole($id, Request $request)
    {
        if (!$this->checkAdmin()) {
            return response()->json(['success' => false, 'error' => 'Unauthorized'], 403);
        }

        $request->validate(['role' => 'required|string']);

        $user = User::where('id', is_numeric($id) ? (int)$id : 0)
            ->orWhere('mongodb_id', $id)
            ->first();

        if (!$user) {
            return response()->json(['success' => false, 'error' => 'User not found'], 404);
        }

        try {
            if (is_numeric($request->role)) {
                $user->role = (int) $request->role;
            } elseif ($request->role === 'admin' || $request->role === 'superadmin' || $request->role === 'programmer') {
                $user->role = 3;
            } elseif ($request->role === 'mentor' || $request->role === 'student') {
                $user->role = 2;
            } elseif ($request->role === 'guest') {
                $user->role = 1;
            } else {
                $user->role = 0;
            }
            $user->save();

            return response()->json(['success' => true]);
        } catch (\Throwable $e) {
            return response()->json(['success' => false, 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Delete user
     */
    public function deleteUser($id)
    {
        if (!$this->checkAdmin()) {
            return response()->json(['success' => false, 'error' => 'Unauthorized'], 403);
        }

        $user = User::where('id', is_numeric($id) ? (int)$id : 0)
            ->orWhere('mongodb_id', $id)
            ->first();

        if (!$user) {
            return response()->json(['success' => false, 'error' => 'User not found'], 404);
        }

        try {
            $user->delete();
            return response()->json(['success' => true]);
        } catch (\Throwable $e) {
            return response()->json(['success' => false, 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Get all mentors for select
     */
    public function mentors()
    {
        try {
            $mentors = User::whereNotNull('admin_teacher_id')
                ->orWhere('role', '>=', 3)
                ->get(['id', 'mongodb_id', 'name']);

            $data = $mentors->map(function ($m) {
                return [
                    'id' => (string) ($m->mongodb_id ?: $m->id),
                    'numeric_id' => $m->id,
                    'name' => $m->name,
                ];
            });

            return response()->json([
                'success' => true,
                'data' => $data,
            ]);
        } catch (\Throwable $e) {
            return response()->json(['success' => false, 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Get all users for select
     */
    public function usersForSelect()
    {
        try {
            $users = User::orderBy('name')->get(['id', 'mongodb_id', 'name']);

            $data = $users->map(function ($u) {
                return [
                    'id' => (string) ($u->mongodb_id ?: $u->id),
                    'numeric_id' => $u->id,
                    'name' => $u->name,
                ];
            });

            return response()->json([
                'success' => true,
                'data' => $data,
            ]);
        } catch (\Throwable $e) {
            return response()->json(['success' => false, 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Projects master data with taskCount & myTaskCount
     */
    public function projects(Request $request)
    {
        $user = Auth::user();
        $page = (int) $request->input('page', 1);
        $limit = (int) $request->input('limit', 5);
        $skip = ($page - 1) * $limit;

        try {
            $totalProjects = MediaProject::count();

            $projects = MediaProject::with(['mentor', 'projectManager', 'tasks'])
                ->orderByDesc('created_at')
                ->skip($skip)
                ->take($limit)
                ->get();

            $userId = $user ? $user->id : 0;

            $data = $projects->map(function ($p) use ($userId) {
                $myTaskCount = $p->tasks->filter(function ($t) use ($userId) {
                    return $t->user_id === $userId || $t->collaborators->contains('id', $userId);
                })->count();

                return [
                    'id' => (string) ($p->mongodb_id ?: $p->id),
                    'numeric_id' => $p->id,
                    'title' => $p->title,
                    'description' => $p->description,
                    'status' => $p->status,
                    'mentorId' => $p->mentor_id ? (string) $p->mentor_id : '',
                    'mentorName' => $p->mentor ? $p->mentor->name : 'Belum ada mentor',
                    'projectManagerId' => $p->project_manager_id ? (string) $p->project_manager_id : '',
                    'projectManagerName' => $p->projectManager ? $p->projectManager->name : 'Belum ada PM',
                    'creatorId' => $p->creator_id ? (string) $p->creator_id : '',
                    'participantsCount' => $p->participants()->count(),
                    'taskCount' => $p->tasks->count(),
                    'myTaskCount' => $myTaskCount,
                    'createdAt' => $p->created_at?->toISOString(),
                ];
            });

            return response()->json([
                'success' => true,
                'data' => $data,
                'pagination' => [
                    'total' => $totalProjects,
                    'page' => $page,
                    'limit' => $limit,
                    'totalPages' => ceil($totalProjects / $limit),
                ],
            ]);
        } catch (\Throwable $e) {
            return response()->json(['success' => false, 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * All tasks for admin
     */
    public function tasks()
    {
        if (!$this->checkAdmin()) {
            return response()->json(['success' => false, 'error' => 'Unauthorized'], 403);
        }

        try {
            $tasks = MediaTask::with(['user', 'collaborators', 'project'])
                ->orderByDesc('created_at')
                ->get();

            $data = $tasks->map(function ($t) {
                return [
                    'id' => (string) ($t->mongodb_id ?: $t->id),
                    'numeric_id' => $t->id,
                    'mediaType' => $t->media_type,
                    'mediaUrl' => $t->media_url ?: '',
                    'mediaUrls' => $t->media_urls ?: ($t->media_url ? [$t->media_url] : []),
                    'caption' => $t->caption,
                    'status' => $t->status,
                    'author' => [
                        'name' => $t->user?->name ?: 'Unknown',
                        'image' => $t->user?->image ?: '',
                    ],
                    'collaborators' => $t->collaborators->map(fn($c) => [
                        'name' => $c->name,
                        'image' => $c->image ?: '',
                    ])->values()->all(),
                    'projectTitle' => $t->project?->title ?: 'Unknown',
                    'createdAt' => $t->created_at?->toISOString(),
                ];
            });

            return response()->json([
                'success' => true,
                'data' => $data,
            ]);
        } catch (\Throwable $e) {
            return response()->json(['success' => false, 'error' => $e->getMessage()], 500);
        }
    }
}
