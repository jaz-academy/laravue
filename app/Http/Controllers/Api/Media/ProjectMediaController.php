<?php

namespace App\Http\Controllers\Api\Media;

use App\Http\Controllers\Controller;
use App\Models\MediaProject;
use App\Models\MediaTask;
use App\Models\User;
use App\Services\MediaFormatter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProjectMediaController extends Controller
{
    protected function resolveProject($id)
    {
        return MediaProject::with(['mentor', 'projectManager', 'creator', 'participants', 'tasks.user'])
            ->where('id', $id)
            ->orWhere('mongodb_id', $id)
            ->first();
    }

    protected function resolveUser($id)
    {
        if (!$id) return null;
        return User::where('id', $id)->orWhere('mongodb_id', $id)->first();
    }

    /**
     * Get public projects with statusFilter
     */
    public function index(Request $request)
    {
        try {
            $statusFilter = $request->input('status', 'all');
            $query = MediaProject::with(['mentor', 'projectManager', 'creator', 'participants'])
                ->orderByDesc('created_at');

            if ($statusFilter !== 'all') {
                $query->where('status', $statusFilter);
            } else {
                $query->where('status', '!=', 'archived');
            }

            $projects = $query->get();
            $projectIds = $projects->pluck('id')->toArray();

            $tasks = MediaTask::with('user')
                ->whereIn('media_project_id', $projectIds)
                ->get();

            $tasksByProject = [];
            foreach ($tasks as $task) {
                $pid = $task->media_project_id;
                if (!isset($tasksByProject[$pid])) {
                    $tasksByProject[$pid] = [];
                }
                $tasksByProject[$pid][] = [
                    'id' => (string) ($task->mongodb_id ?: $task->id),
                    'mediaType' => $task->media_type ?: 'image',
                    'status' => $task->status ?: 'pending',
                    'authorName' => $task->user?->name ?: 'Unknown',
                    'authorUsername' => $task->user?->username ?: 'unknown',
                ];
            }

            $data = $projects->map(function ($p) use ($tasksByProject) {
                return MediaFormatter::formatProject($p, $tasksByProject);
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
     * Get project by ID
     */
    public function show($id)
    {
        try {
            $project = $this->resolveProject($id);
            if (!$project) {
                return response()->json(['success' => false, 'error' => 'Project not found'], 404);
            }

            $tasks = MediaTask::with(['user', 'mentor', 'collaborators', 'project', 'likes', 'comments.user'])
                ->where('media_project_id', $project->id)
                ->orderByDesc('created_at')
                ->get();

            $formattedTasks = $tasks->map(function ($t) {
                return MediaFormatter::formatTask($t);
            });

            $pid = (string) ($project->mongodb_id ?: $project->id);

            $data = [
                'id' => $pid,
                '_id' => $pid,
                'numeric_id' => $project->id,
                'title' => $project->title,
                'description' => $project->description,
                'status' => $project->status ?: 'active',
                'mentorName' => $project->mentor ? $project->mentor->name : 'Tanpa Mentor',
                'projectManagerId' => $project->project_manager_id ? (string) $project->project_manager_id : '',
                'projectManagerName' => $project->projectManager ? $project->projectManager->name : '',
                'createdAt' => $project->created_at ? $project->created_at->toISOString() : null,
                'participantsCount' => $project->participants()->count(),
                'tasks' => $formattedTasks,
            ];

            return response()->json([
                'success' => true,
                'data' => $data,
            ]);
        } catch (\Throwable $e) {
            return response()->json(['success' => false, 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Create project
     */
    public function store(Request $request)
    {
        $user = Auth::user();
        if (!$user || (!in_array($user->media_role, ['mentor', 'admin']) && $user->role < 2)) {
            return response()->json(['success' => false, 'error' => 'Unauthorized'], 403);
        }

        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'nullable|string',
        ]);

        try {
            $mentor = $this->resolveUser($request->input('mentorId'));
            $pm = $this->resolveUser($request->input('projectManagerId'));

            $project = MediaProject::create([
                'title' => $request->title,
                'description' => $request->input('description', ''),
                'status' => $request->input('status', 'active'),
                'creator_id' => $user->id,
                'mentor_id' => $mentor?->id,
                'project_manager_id' => $pm?->id,
            ]);

            return response()->json([
                'success' => true,
                'project' => MediaFormatter::formatProject($project),
            ], 201);
        } catch (\Throwable $e) {
            return response()->json(['success' => false, 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Update project
     */
    public function update($id, Request $request)
    {
        $user = Auth::user();
        if (!$user || (!in_array($user->media_role, ['mentor', 'admin']) && $user->role < 2)) {
            return response()->json(['success' => false, 'error' => 'Unauthorized'], 403);
        }

        $project = $this->resolveProject($id);
        if (!$project) {
            return response()->json(['success' => false, 'error' => 'Project not found'], 404);
        }

        try {
            if ($request->has('title')) $project->title = $request->title;
            if ($request->has('description')) $project->description = $request->description;
            if ($request->has('status')) $project->status = $request->status;

            if ($request->has('mentorId')) {
                $mentor = $this->resolveUser($request->mentorId);
                $project->mentor_id = $mentor?->id;
            }

            if ($request->has('projectManagerId')) {
                $pm = $this->resolveUser($request->projectManagerId);
                $project->project_manager_id = $pm?->id;
            }

            $project->save();

            return response()->json(['success' => true]);
        } catch (\Throwable $e) {
            return response()->json(['success' => false, 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Delete project
     */
    public function destroy($id)
    {
        $user = Auth::user();
        if (!$user || ($user->media_role !== 'admin' && $user->role < 4)) {
            return response()->json(['success' => false, 'error' => 'Unauthorized: Only admins can delete projects'], 403);
        }

        $project = $this->resolveProject($id);
        if (!$project) {
            return response()->json(['success' => false, 'error' => 'Project not found'], 404);
        }

        try {
            $project->delete();
            return response()->json(['success' => true]);
        } catch (\Throwable $e) {
            return response()->json(['success' => false, 'error' => $e->getMessage()], 500);
        }
    }
}
