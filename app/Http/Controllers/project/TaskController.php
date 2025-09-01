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
        $sortBy = $request->get('sortBy', 'id'); // default sort field
        $orderBy = $request->get('orderBy', 'desc'); // default order
        $status = $request->get('status', ''); // default status
        $media = $request->get('media', ''); // default media
        $accepted = $request->get('accepted', ''); // default accepted
        $student_id = $request->get('admin_student_id', ''); // default admin_student_id
        $rates = $request->get('rates', ''); // default rates

        // Load tasks dengan relasi students
        $query = Task::with('projectPlan', 'adminTeacher', 'students');

        // Filter by student id (via pivot)
        if ($student_id) {
            $query->whereHas('students', function ($q) use ($student_id) {
                $q->where('pivot_student_task.admin_student_id', $student_id);
            });
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

        // Filter by query input
        if ($queryInput) {
            $query->where(function ($q) use ($queryInput) {
                $q->where('id', $queryInput)
                    ->orWhereHas('students', function ($q2) use ($queryInput) {
                        $q2->where('name', 'like', '%' . $queryInput . '%');
                    })
                    ->orWhereHas('adminTeacher', function ($q2) use ($queryInput) {
                        $q2->where('nickname', 'like', '%' . $queryInput . '%');
                    })
                    ->orWhereHas('projectPlan', function ($q2) use ($queryInput) {
                        $q2->where('theme', 'like', '%' . $queryInput . '%');
                    });
            });
        } elseif ($rates) {
            $query->where('rate', $rates);
        }

        // Sorting
        if ($sortBy) {
            $query->orderBy($sortBy, $orderBy);
        } else {
            $query->orderBy('id', 'desc'); // default sorting
        }

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
        $tasks = Task::with('projectPlan', 'adminTeacher', 'students')
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
            'student_ids' => 'required',
            'semester' => 'required|integer',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'date' => 'required|date',
            'status' => 'required|in:Not Started,In Progress,Completed,On Hold,Cancelled',
            'media' => 'nullable|string|max:255',
            'link' => 'nullable|string',
            'accepted' => 'nullable|boolean',
            'rate' => 'nullable|integer|min:0|max:5',
            'review' => 'nullable|string',
            'admin_teacher_id' => 'nullable|exists:admin_teachers,id',
        ]);

        $task = Task::create($fields);

        // sync student ids
        if ($request->has('student_ids')) {
            $task->students()->sync($request->student_ids);
        }

        // notify users
        if (!empty($fields['student_ids'])) {
            $users = User::whereIn('admin_student_id', $fields['student_ids'])->get();

            foreach ($users as $user) {
                $user->notify(new ProjectReminder(
                    'New Task Created!',
                    $fields['name'],
                    $user->image ? "/storage/{$user->image}" : null,
                    $user->name,
                    '/academy/project/tasks'
                ));
            }
        }

        return response()->json([
            'message' => 'Task created successfully',
            'data' => $task->load('students')
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

        // sync student ids
        if ($request->has('student_ids')) {
            $task->students()->sync($request->student_ids);
        }

        return response()->json([
            'message' => 'Task updated successfully',
            'data' => $task->load('students')
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, $id)
    {
        $task = Task::with('students')->findOrFail($id);

        // simpan data penting sebelum delete
        $userData = $request->cookie('userData');
        $currentUser = json_decode($userData, true);
        $teacher_id = $currentUser['admin_teacher_id'] ?? null;
        $taskName   = $task->name;

        // simpan dulu students yg terkait sebelum detach
        $students = $task->students;

        $task->students()->detach(); // hapus relasi dulu
        $task->delete(); // hapus task

        $teacher = AdminTeacher::find($teacher_id);

        // kirim notifikasi ke semua siswa yg terkait
        foreach ($students as $student) {
            $user = User::where('admin_student_id', $student->id)->first();
            if ($user) {
                $user->notify(new ProjectReminder(
                    'Task Deleted by ' . ($teacher->nickname ?? 'Teacher'),
                    $taskName . ' ☹ was deleted.',
                    $teacher && $teacher->image ? "/storage/{$teacher->image}" : null,
                    null,
                    null,
                ));
            }
        }

        return response()->json([
            'message' => 'Task deleted successfully.',
            'count'   => Task::count()
        ]);
    }


    public function getTaskByProjectPlan($project_plan_id)
    {
        $tasks = Task::where('project_plan_id', $project_plan_id)->with('projectPlan', 'students', 'adminTeacher')->orderBy('id', 'DESC')->get();

        return response()->json([
            'count' => $tasks->count(),
            'data' => $tasks
        ]);
    }

    public function getTaskByStudent($student_id)
    {
        $tasks = Task::with('projectPlan', 'students', 'adminTeacher')
            ->whereHas('students', function ($q) use ($student_id) {
                $q->where('pivot_student_task.admin_student_id', $student_id);
            })
            ->orderBy('id', 'DESC')
            ->get();

        return response()->json([
            'count' => $tasks->count(),
            'data' => $tasks,
        ]);
    }

    public function getTaskByTeacher($admin_teacher_id)
    {
        $tasks = Task::where('admin_teacher_id', $admin_teacher_id)->with('projectPlan', 'students', 'adminTeacher')->orderBy('id', 'DESC')->get();

        return response()->json([
            'count' => $tasks->count(),
            'data' => $tasks
        ]);
    }

    public function homeTasksWithAll(Request $request)
    {
        $perPage = 15; // Number of items per page
        $page = $request->input('page', 1); // Default to page 1 if not provided

        $tasks = Task::with('projectPlan', 'students', 'adminTeacher')
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
            ->with('projectPlan', 'students', 'adminTeacher')
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
            ->with('projectPlan', 'students', 'adminTeacher')
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

        // update task
        $task->update($fields);
        $task->refresh();

        // cari guru yang menerima
        $teacher = AdminTeacher::find($fields['admin_teacher_id']);

        // ambil semua student yang terhubung ke task
        foreach ($task->students as $student) {
            // ambil user berdasarkan student id
            $user = User::where('admin_student_id', $student->id)->first();

            if ($user) {
                $user->notify(new ProjectReminder(
                    'Task Accepted by ' . $teacher->nickname,
                    $task->title . ' 🙂 has been accepted.',
                    $teacher->image ? "/storage/{$teacher->image}" : null,
                    $teacher->nickname,
                    '/?search=' . $task->id
                ));
            }
        }

        return response()->json([
            'message' => 'Task accepted status updated successfully',
            'data' => $task->load('students'),
        ]);
    }
}
