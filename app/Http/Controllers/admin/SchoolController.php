<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\AdminSchool as School;

class SchoolController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $schools = School::all();

        return response()->json([
            'count' => $schools->count(),
            'data' => $schools
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $fields = $request->validate([
            'name' => 'required'
        ]);

        $school = School::create($fields);

        return response()->json([
            'message' => 'School data created successfully',
            'data' => $school
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(School $school)
    {
        return response()->json([
            'message' => 'School data founded',
            'data' => $school
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, School $school)
    {
        $fields = $request->validate([
            'name' => 'required'
        ]);

        $school->update($fields);

        return response()->json([
            'message' => 'School data updated successfully',
            'data' => $school
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(School $school)
    {
        $school->delete();

        return response()->json([
            'message' => 'School data deleted successfully.',
            'count' => School::count()
        ]);
    }
}
