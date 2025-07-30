<?php

namespace App\Http\Controllers\academy;

use App\Http\Controllers\Controller;
use App\Models\AcademySubject;
use Illuminate\Http\Request;

class SubjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $subjects = AcademySubject::all();

        return response()->json([
            'count' => $subjects->count(),
            'data' => $subjects
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $fields = $request->validate([
            'number' => 'required|string|max:255',
            'group' => 'required|string|max:255',
            'name' => 'required|string|max:255',
        ]);

        $subject = AcademySubject::create($fields);

        return response()->json([
            'message' => 'Subject created Successfully.',
            'data' => $subject
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(AcademySubject $subject)
    {
        return response()->json([
            'message' => $subject->exists ? 'Subject founded' : 'Subject not found',
            'data' => $subject
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, AcademySubject $subject)
    {
        $fields = $request->validate([
            'number' => 'required|string|max:255',
            'group' => 'required|string|max:255',
            'name' => 'required|string|max:255',
        ]);

        $subject->update($fields);

        return response()->json([
            'message' => 'Subject updated Successfully.',
            'data' => $subject
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(AcademySubject $subject)
    {
        $subject->delete();

        return response()->json([
            'message' => 'Course deleted Successfully.',
            'count' => AcademySubject::count()
        ]);
    }
}
