<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\AdminTeacher as Teacher;
use Illuminate\Http\Request;

class TeacherController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $teachers = Teacher::all();

        return response()->json([
            'count' => $teachers->count(),
            'data' => $teachers
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $fields = $request->validate([
            'nig' => 'required|unique:admin_teachers,nis',
            'name' => 'required',
            'nickname' => 'required|unique:admin_teachers,nickname',
            'gender' => 'required'
        ]);

        $teacher = Teacher::create($fields);

        return response()->json([
            'message' => 'Teacher data created successfully',
            'data' => $teacher
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Teacher $teacher)
    {
        return response()->json([
            'message' => 'Teacher data founded',
            'data' => $teacher
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Teacher $teacher)
    {
        $fields = $request->validate([
            'name' => 'required',
            'nickname' => 'required|unique:admin_teachers,nickname',
            'gender' => 'required'
        ]);

        $teacher->update($fields);

        return response()->json([
            'message' => 'Teacher data updated successfully',
            'data' => $teacher
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Teacher $teacher)
    {
        $teacher->delete();

        return response()->json([
            'message' => 'Teacher data deleted successfully.',
            'count' => Teacher::count()
        ]);
    }
}
