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
            'name' => 'required',
            'nickname' => 'nullable|string',
            'npsn' => 'nullable|string',
            'organization' => 'nullable|string',
            'permit' => 'nullable|string',
            'address' => 'nullable|string',
            'map' => 'nullable|string',
            'phone' => 'nullable|string',
            'email' => 'nullable|email',
            'motto' => 'nullable|string',
            'period' => 'nullable|string',
            'head' => 'nullable|string',
            'contact' => 'nullable|string',
            'note' => 'nullable|string',
            'logo' => 'nullable|string'
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
        try {
            $school->update($request->all());
    
            return response()->json([
                'status' => 'success',
                'message' => 'School data updated successfully',
                'data' => $school
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to update school data: ' . $e->getMessage()
            ], 500);
        }
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
