<?php

namespace App\Http\Controllers\project;

use App\Http\Controllers\Controller;
use App\Models\ProjectTask as Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $perPage = $request->input('perPage', 10);
        $page = $request->input('page', 1);
        $queryInput = $request->input('search');

        $query = Task::with('projectPlan', 'adminStudent', 'adminTeacher')
            ->orderBy('id', 'DESC');

        if ($queryInput) {
            $query->where(function ($q) use ($queryInput) {
                $q->where('id', $queryInput)
                    ->orWhereHas('adminStudent', function ($q2) use ($queryInput) {
                        $q2->where('name', 'like', '%' . $queryInput . '%');
                    })
                    ->orWhereHas('adminTeacher', function ($q2) use ($queryInput) {
                        $q2->where('nickname', 'like', '%' . $queryInput . '%');
                    })
                    ->orWhereHas('projectPlan', function ($q2) use ($queryInput) {
                        $q2->where('theme', 'like', '%' . $queryInput . '%');
                    });
            });
        } else {
            $query->where('rate', '>', 4);
        }

        return $query->paginate($perPage, ['*'], 'page', $page);
    }

    public function allTasks()
    {
        $tasks = Task::with('projectPlan', 'adminStudent', 'adminTeacher')
            ->orderBy('id', 'DESC')
            ->get();

        return response()->json([
            'data' => $tasks,
            'count' => $tasks->count(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $fields = $request->validate([
            'project_plan_id' => 'required|exists:project_plans,id',
            'admin_student_id' => 'required|exists:admin_students,id',
            'semester' => 'required|integer',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'date' => 'required|date',
            'status' => 'required|in:Not Started,In Progress,Completed,On Hold,Cancelled',
            'media' => 'nullable|string|max:255',
            'embed' => 'nullable|string',
            'link' => 'nullable|string',
            'accepted' => 'nullable|boolean',
            'rate' => 'nullable|integer|min:0|max:5',
            'review' => 'nullable|string',
            'admin_teacher_id' => 'nullable|exists:admin_teachers,id',
        ]);

        $task = Task::create($fields);

        return response()->json([
            'message' => 'Task created successfully',
            'data' => $task
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        return response()->json([
            'message' => 'Task founded',
            'data' => $task
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Task $task)
    {
        $fields = $request->validate([
            'project_plan_id' => 'required',
            'admin_student_id' => 'required',
            'semester' => 'required|integer',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'date' => 'required|date',
            'status' => 'required|in:Not Started,In Progress,Completed,On Hold,Cancelled',
            'media' => 'nullable|string|max:255',
            'embed' => 'nullable|string',
            'link' => 'nullable|string',
            'accepted' => 'nullable|boolean',
            'rate' => 'nullable|integer|min:0|max:5',
            'review' => 'nullable|string',
            'admin_teacher_id' => 'nullable',
        ]);

        $task->update($fields);

        return response()->json([
            'message' => 'Task updated successfully',
            'data' => $task
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        $task->delete();

        return response()->json([
            'message' => 'Task deleted successfully.',
            'count' => Task::count()
        ]);
    }

    public function getTaskByProjectPlan($project_plan_id)
    {
        $tasks = Task::where('project_plan_id', $project_plan_id)->with('projectPlan', 'adminStudent', 'adminTeacher')->orderBy('id', 'DESC')->get();

        return response()->json([
            'count' => $tasks->count(),
            'data' => $tasks
        ]);
    }

    public function getTaskByStudent($admin_student_id)
    {
        $tasks = Task::where('admin_student_id', $admin_student_id)->with('projectPlan', 'adminStudent', 'adminTeacher')->orderBy('id', 'DESC')->get();

        return response()->json([
            'count' => $tasks->count(),
            'data' => $tasks
        ]);
    }

    public function getTaskByTeacher($admin_teacher_id)
    {
        $tasks = Task::where('admin_teacher_id', $admin_teacher_id)->with('projectPlan', 'adminStudent', 'adminTeacher')->orderBy('id', 'DESC')->get();

        return response()->json([
            'count' => $tasks->count(),
            'data' => $tasks
        ]);
    }

    public function homeTasksWithAll(Request $request)
    {
        $perPage = 15; // Number of items per page
        $page = $request->input('page', 1); // Default to page 1 if not provided

        $tasks = Task::with('projectPlan', 'adminStudent', 'adminTeacher')
            ->orderBy('id', 'DESC')
            ->paginate($perPage, ['*'], 'page', $page); // Explicitly set the page

        return response()->json([
            'data' => $tasks, // Paginated items
            'current_page' => $tasks->currentPage(),
            'last_page' => $tasks->lastPage(),
            'total' => $tasks->total(),
        ]);
    }

    public function uploadTasksWithAll(Request $request)
    {
        $perPage = 5;
        $page = $request->input('page', 1); // Default to page 1 if not provided

        $tasks = Task::where('media', '!=', 'Instagram')
            ->with('projectPlan', 'adminStudent', 'adminTeacher')
            ->orderBy('id', 'DESC')
            ->paginate($perPage);

        return response()->json([
            'data' => $tasks, // Paginated items
            'current_page' => $tasks->currentPage(),
            'last_page' => $tasks->lastPage(),
            'total' => $tasks->total(),
        ]);
    }

    public function InstagramTasksWithAll(Request $request)
    {
        $perPage = 5;
        $page = $request->input('page', 1); // Default to page 1 if not provided

        $tasks = Task::where('media', 'Instagram')
            ->with('projectPlan', 'adminStudent', 'adminTeacher')
            ->orderBy('id', 'DESC')
            ->paginate($perPage, ['*'], 'page', $page); // Explicitly set the page

        return response()->json([
            'data' => $tasks, // Paginated items
            'current_page' => $tasks->currentPage(),
            'last_page' => $tasks->lastPage(),
            'total' => $tasks->total(),
        ]);
    }

    public function updateTaskAccepted(Request $request, Task $task)
    {
        $fields = $request->validate([
            'admin_teacher_id' => 'required|exists:admin_teachers,id',
            'accepted' => 'required|boolean',
            'rate' => 'nullable|numeric|min:0|max:5',
            'review' => 'nullable|string',
        ]);

        $task->update($fields);
        $task->refresh();

        return response()->json([
            'message' => 'Task accepted status updated successfully',
            'data' => $task
        ]);
    }
}
