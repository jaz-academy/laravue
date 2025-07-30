<?php

namespace App\Http\Controllers\academy;

use App\Http\Controllers\Controller;
use App\Models\AcademyScore;
use Illuminate\Http\Request;

class ScoreController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $scores = AcademyScore::all();

        return response()->json([
            'count' => $scores->count(),
            'data' => $scores
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $fields = $request->validate([
            'serial' => 'required|string|max:255',
            'admin_student_id' => 'required|exists:admin_students,id',
            'semester' => 'required|integer',
            'academy_competence_id' => 'required|exists:academy_competences,id',
            'month_1' => 'nullable|integer',
            'month_2' => 'nullable|integer',
            'month_3' => 'nullable|integer',
            'month_4' => 'nullable|integer',
            'month_5' => 'nullable|integer',
            'month_6' => 'nullable|integer',
            'is_ok_1' => 'required|boolean',
            'competence_1' => 'nullable|string',
            'is_ok_2' => 'required|boolean',
            'competence_2' => 'nullable|string',
            'is_ok_3' => 'required|boolean',
            'competence_3' => 'nullable|string',
        ]);

        $score = AcademyScore::create($fields);

        return response()->json([
            'message' => 'Score created Successfully.',
            'data' => $score
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(AcademyScore $score)
    {
        return response()->json([
            'message' => $score->exists ? 'Score founded' : 'Score not found',
            'data' => $score
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, AcademyScore $score)
    {
        $fields = $request->validate([
            'serial' => 'required|string|max:255',
            'admin_student_id' => 'required|exists:admin_students,id',
            'semester' => 'required|integer',
            'academy_competence_id' => 'required|exists:academy_competences,id',
            'month_1' => 'nullable|integer',
            'month_2' => 'nullable|integer',
            'month_3' => 'nullable|integer',
            'month_4' => 'nullable|integer',
            'month_5' => 'nullable|integer',
            'month_6' => 'nullable|integer',
            'is_ok_1' => 'required|boolean',
            'competence_1' => 'nullable|string',
            'is_ok_2' => 'required|boolean',
            'competence_2' => 'nullable|string',
            'is_ok_3' => 'required|boolean',
            'competence_3' => 'nullable|string',
        ]);

        $score->update($fields);

        return response()->json([
            'message' => 'Score updated Successfully.',
            'data' => $score
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(AcademyScore $score)
    {
        $score->delete();

        return response()->json([
            'message' => 'Score deleted Successfully.',
            'count' => AcademyScore::count()
        ]);
    }
}
