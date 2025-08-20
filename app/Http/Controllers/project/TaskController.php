<?php

namespace App\Http\Controllers\project;

use App\Models\User;
use Illuminate\Http\Request;
use App\Models\ProjectTask as Task;
use App\Http\Controllers\Controller;
use App\Models\AdminTeacher;
use App\Notifications\ProjectReminder;

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
        $sortBy = $request->get('sortBy', 'name'); // default sort field
        $orderBy = $request->get('orderBy', 'asc'); // default order
        $status = $request->get('status', ''); // default status
        $media = $request->get('media', ''); // default media
        $accepted = $request->get('accepted', ''); // default accepted
        $admin_student_id = $request->get('admin_student_id', ''); // default admin_student_id
        $rates = $request->get('rates', ''); // default rates

        $query = Task::with('projectPlan', 'adminStudent', 'adminTeacher');

        if ($admin_student_id) {
            $query->where('admin_student_id', $admin_student_id);
        }

        // Filter by status
        if ($status) {
            $query->where('status', $status);
        }

        // Filter by media
        if ($media) {
            $query->where('media', $media);
        }

        // Filter by accepted
        if ($request->filled('accepted')) {
            $query->where('accepted', $accepted);
        }

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
        } else if ($rates) {
            $query->where('rate', $rates);
        }

        // Sorting
        if ($sortBy) {
            $query->orderBy($sortBy, $orderBy);
        } else {
            $query->orderBy('id', 'desc'); // default sorting
        }

        // return $query->paginate($perPage, ['*'], 'page', $page);
        $tasks = $query->paginate($perPage, ['*'], 'page', $page);
        return response()->json([
            'count' => $tasks->total(),
            'data' => $tasks->items(),
            'totalPages' => $tasks->lastPage(),
            'page' => $tasks->currentPage(),
        ]);
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

        $user = User::where('admin_student_id', $fields['admin_student_id'])->first();
        if ($user) {
            $user->notify(new ProjectReminder(
                'New Task Created!',
                $fields['name'],
                $user->image ? "/storage/{$user->image}" : null,
                $user->name,
                '/academy/project/tasks'
            ));
        }

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
        $task->update($request->all());

        return response()->json([
            'message' => 'Task updated successfully',
            'data' => $task
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, $id)
    {
        $task = Task::findOrFail($id);

        // simpan data penting sebelum delete
        $userData = $request->cookie('userData');
        $currentUser = json_decode($userData, true);
        $teacher_id = $currentUser['admin_teacher_id'] ?? null;
        $student_id = $task->admin_student_id;
        $taskName  = $task->name;

        $task->delete(); // hapus task

        $teacher = AdminTeacher::find($teacher_id);
        $user = User::where('admin_student_id', $student_id)->first();

        if ($user) {
            $user->notify(new ProjectReminder(
                'Task Deleted by ' . $teacher->nickname ?? 'Teacher',
                $taskName . ' ☹ was deleted.',
                $teacher && $teacher->image ? "/storage/{$teacher->image}" : null,
                null,
                null,
            ));
        }

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

        $student_id = $task->admin_student_id;
        $teacher = AdminTeacher::find($fields['admin_teacher_id']);
        $user = User::where('admin_student_id', $student_id)->first();
        $user->notify(new ProjectReminder(
            'Task Accepted by ' . $teacher->nickname,
            $task->name . ' 🙂 has been accepted.',
            $teacher->image ? "/storage/{$teacher->image}" : null,
            $teacher->nickname,
            '/?search=' . $task->id
        ));

        return response()->json([
            'message' => 'Task accepted status updated successfully',
            'data' => $task
        ]);
    }
}
