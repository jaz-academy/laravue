<?php

namespace App\Http\Controllers\academy;

use App\Http\Controllers\Controller;
use App\Models\AcademyCourse;
use Illuminate\Http\Request;

class CourseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $courses = AcademyCourse::all();

        return response()->json([
            'count' => $courses->count(),
            'data' => $courses
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $fields = $request->validate([
            'name' => 'required|string|max:255',
            'subject' => 'required|string|max:255',
            'note' => 'required|string|max:255',
            'author' => 'required|string|max:255',
            'title' => 'required|string|max:255',
            'section' => 'required|string|max:255',
            'description' => 'nullable|string',
            'video_url' => 'nullable|url|max:255',
            'video_duration' => 'nullable|string|max:255',
        ]);

        $course = AcademyCourse::create($fields);

        return response()->json([
            'message' => 'Course created Successfully.',
            'data' => $course
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(AcademyCourse $course)
    {
        return response()->json([
            'message' => $course->exists ? 'Course founded' : 'Course not found',
            'data' => $course
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, AcademyCourse $course)
    {
        $fields = $request->validate([
            'name' => 'required|string|max:255',
            'subject' => 'required|string|max:255',
            'note' => 'required|string|max:255',
            'author' => 'required|string|max:255',
            'title' => 'required|string|max:255',
            'section' => 'required|string|max:255',
            'description' => 'nullable|string',
            'video_url' => 'nullable|url|max:255',
            'video_duration' => 'nullable|string|max:255',
        ]);

        $course->update($fields);

        return response()->json([
            'message' => 'Course updated Successfully.',
            'data' => $course
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(AcademyCourse $course)
    {
        $course->delete();

        return response()->json([
            'message' => 'Course deleted Successfully.',
            'count' => AcademyCourse::count()
        ]);
    }
}
