<?php

namespace App\Http\Controllers\academy;

use App\Http\Controllers\Controller;
use App\Models\MediaProject;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PlanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {
            $projects = MediaProject::with([
                'tasks.user.adminStudent',
                'tasks.collaborators.adminStudent',
                'mentor.adminTeacher',
                'mentorTeacher',
            ])
            ->orderByDesc('id')
            ->get();

            $data = $projects->map(function ($p) {
                $parts = explode(' - ', $p->title, 2);
                $subject = count($parts) > 1 ? trim($parts[0]) : $p->title;
                $theme = count($parts) > 1 ? trim($parts[1]) : $p->title;
                $mentorName = $p->mentorTeacher?->name ?: ($p->mentor?->adminTeacher?->name ?: ($p->mentor?->name ?: ''));

                return [
                    'id' => $p->id,
                    'theme' => $theme,
                    'subject' => $subject,
                    'description' => $p->description ?: '',
                    'is_active' => $p->status === 'active' ? 1 : 0,
                    'status' => $p->status,
                    'admin_teacher_id' => $p->admin_teacher_id ?: ($p->mentor?->admin_teacher_id),
                    'mentor_name' => $mentorName,
                    'start_date' => $p->created_at?->toDateString() ?: now()->toDateString(),
                    'end_date' => Carbon::now()->addMonths(6)->toDateString(),
                    'tasks_count' => $p->tasks->count(),
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
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $fields = $request->validate([
            'theme' => 'nullable|string|max:255',
            'subject' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'is_active' => 'nullable',
            'admin_teacher_id' => 'nullable',
            'start_date' => 'nullable|string',
            'end_date' => 'nullable|string',
        ]);

        $title = $request->theme ?: ($request->subject ?: 'New Project Plan');
        if ($request->subject && $request->theme && $request->subject !== $request->theme) {
            $title = $request->subject . ' - ' . $request->theme;
        }
        $status = ($request->has('is_active') && !$request->is_active) ? 'archived' : 'active';
        $creatorId = Auth::id() ?: \App\Models\User::first()?->id;

        $adminTeacherId = $request->admin_teacher_id ? (int) $request->admin_teacher_id : null;
        $mentorUser = $adminTeacherId ? \App\Models\User::where('admin_teacher_id', $adminTeacherId)->first() : null;

        $project = MediaProject::create([
            'title' => $title,
            'description' => $request->description ?: '',
            'status' => $status,
            'creator_id' => $creatorId,
            'admin_teacher_id' => $adminTeacherId,
            'mentor_id' => $mentorUser?->id,
        ]);

        $parts = explode(' - ', $project->title, 2);
        $subject = count($parts) > 1 ? trim($parts[0]) : $project->title;
        $theme = count($parts) > 1 ? trim($parts[1]) : $project->title;

        return response()->json([
            'success' => true,
            'message' => 'Project plan created successfully.',
            'data' => [
                'id' => $project->id,
                'theme' => $theme,
                'subject' => $subject,
                'description' => $project->description,
                'is_active' => $project->status === 'active' ? 1 : 0,
                'start_date' => $project->created_at?->toDateString(),
                'end_date' => Carbon::now()->addMonths(6)->toDateString(),
            ],
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $project = MediaProject::with([
            'tasks.user.adminStudent',
            'tasks.collaborators.adminStudent',
            'mentor.adminTeacher',
        ])->find($id);

        if (!$project) {
            return response()->json(['success' => false, 'message' => 'Project plan not found'], 404);
        }

        $parts = explode(' - ', $project->title, 2);
        $subject = count($parts) > 1 ? trim($parts[0]) : $project->title;
        $theme = count($parts) > 1 ? trim($parts[1]) : $project->title;

        return response()->json([
            'success' => true,
            'data' => [
                'id' => $project->id,
                'theme' => $theme,
                'subject' => $subject,
                'description' => $project->description,
                'is_active' => $project->status === 'active' ? 1 : 0,
                'start_date' => $project->created_at?->toDateString(),
                'end_date' => Carbon::now()->addMonths(6)->toDateString(),
            ],
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $project = MediaProject::find($id);
        if (!$project) {
            return response()->json(['success' => false, 'message' => 'Project plan not found'], 404);
        }

        if ($request->has('theme') || $request->has('subject')) {
            $newSubject = $request->input('subject');
            $newTheme = $request->input('theme');
            if ($newSubject && $newTheme && $newSubject !== $newTheme) {
                $project->title = $newSubject . ' - ' . $newTheme;
            } else {
                $project->title = $newTheme ?: ($newSubject ?: $project->title);
            }
        }

        if ($request->has('description')) {
            $project->description = $request->description ?: '';
        }

        if ($request->has('is_active')) {
            $project->status = $request->is_active ? 'active' : 'archived';
        }

        if ($request->has('admin_teacher_id')) {
            $project->admin_teacher_id = $request->admin_teacher_id ? (int) $request->admin_teacher_id : null;
            $mentorUser = $project->admin_teacher_id ? \App\Models\User::where('admin_teacher_id', $project->admin_teacher_id)->first() : null;
            $project->mentor_id = $mentorUser?->id;
        }

        $project->save();

        $parts = explode(' - ', $project->title, 2);
        $subject = count($parts) > 1 ? trim($parts[0]) : $project->title;
        $theme = count($parts) > 1 ? trim($parts[1]) : $project->title;
        $mentorName = $project->mentorTeacher?->name ?: ($project->mentor?->adminTeacher?->name ?: ($project->mentor?->name ?: ''));

        return response()->json([
            'success' => true,
            'message' => 'Project plan updated successfully.',
            'data' => [
                'id' => $project->id,
                'theme' => $theme,
                'subject' => $subject,
                'description' => $project->description,
                'is_active' => $project->status === 'active' ? 1 : 0,
                'status' => $project->status,
                'admin_teacher_id' => $project->admin_teacher_id ?: ($project->mentor?->admin_teacher_id),
                'mentor_name' => $mentorName,
                'start_date' => $project->created_at?->toDateString(),
                'end_date' => Carbon::now()->addMonths(6)->toDateString(),
            ],
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $project = MediaProject::find($id);
        if (!$project) {
            return response()->json(['success' => false, 'message' => 'Project plan not found'], 404);
        }

        $project->delete();

        return response()->json([
            'success' => true,
            'message' => 'Project plan deleted successfully.',
        ]);
    }
}
