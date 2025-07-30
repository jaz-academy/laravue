<?php

namespace App\Http\Controllers\academy;

use App\Http\Controllers\Controller;
use App\Models\AcademyAward;
use Illuminate\Http\Request;

class AwardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $awards = AcademyAward::all();

        return response()->json([
            'count' => $awards->count(),
            'data' => $awards
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $fields = $request->validate([
            'date' => 'required|string|max:255',
            'admin_student_id' => 'required|integer',
            'semester' => 'required|integer',
            'subject' => 'required|string|max:255',
            'item' => 'required|string|max:255',
            'rate' => 'required|integer',
            'result' => 'required|string|max:255',
            'mentor' => 'required|string|max:255',
            'remark' => 'required|string|max:255',
        ]);

        $award = AcademyAward::create($fields);

        return response()->json([
            'message' => 'Award created Successfully.',
            'data' => $award
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(AcademyAward $award)
    {
        $award->load('adminStudent');
        
        return response()->json([
            'message' => $award->exists ? 'Award founded' : 'Award not founded',
            'data' => $award
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, AcademyAward $award)
    {
        $fields = $request->validate([
            'date' => 'required|string|max:255',
            'admin_student_id' => 'required|integer',
            'semester' => 'required|integer',
            'subject' => 'required|string|max:255',
            'item' => 'required|string|max:255',
            'rate' => 'required|integer',
            'result' => 'required|string|max:255',
            'mentor' => 'required|string|max:255',
            'remark' => 'required|string|max:255',
        ]);

        $award->update($fields);

        return response()->json([
            'message' => 'Award updated Successfully.',
            'data' => $award
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(AcademyAward $award)
    {
        $award->delete();

        return response()->json([
            'message' => 'Award deleted Successfully.',
            'count' => AcademyAward::count()
        ]);
    }
}
