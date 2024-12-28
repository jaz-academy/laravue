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
    public function index()
    {
        $tasks = Task::all();

        return response()->json([
            'count' => $tasks->count(),
            'data' => $tasks
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
}