<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\AdminStudent as Student;
use Illuminate\Http\Request;

class StudentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $students = Student::all();

        return response()->json([
            'count' => $students->count(),
            'data' => $students
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $fields = $request->validate([
            'nis' => 'required|unique:admin_students,nis',
            'name' => 'required',
            'nickname' => 'required|unique:admin_students,nickname',
            'gender' => 'required'
        ]);

        $student = Student::create($fields);

        return response()->json([
            'message' => 'Student data created successfully',
            'data' => $student
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Student $student)
    {
        return response()->json([
            'message' => 'Student data founded',
            'data' => $student
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Student $student)
    {
        $fields = $request->validate([
            'name' => 'required',
            'nickname' => 'required|unique:admin_students,nickname',
            'gender' => 'required'
        ]);

        $student->update($fields);

        return response()->json([
            'message' => 'Student data updated successfully',
            'data' => $student
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Student $student)
    {
        $student->delete();

        return response()->json([
            'message' => 'Student data deleted successfully.',
            'count' => Student::count()
        ]);
    }
}
