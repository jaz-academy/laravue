<?php

namespace App\Http\Controllers\academy;

use App\Http\Controllers\Controller;
use App\Models\AcademyCompetence;
use Illuminate\Http\Request;

class CompetenceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $semester = $request->get('semester');
        $query = AcademyCompetence::with('academySubject', 'adminTeacher');

        if ($semester) {
            $query->where('semester', $semester);
        }

        $competences = $query->get();

        return response()->json([
            'count' => $competences->count(),
            'data' => $competences
        ]);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $fields = $request->validate([
            'academy_subject_id' => 'required|exists:academy_subjects,id',
            'semester' => 'required|integer',
            'admin_teacher_id' => 'required|exists:admin_teachers,id',
            'competence_1' => 'nullable|string',
            'competence_2' => 'nullable|string',
            'competence_3' => 'nullable|string',
        ]);

        $competence = AcademyCompetence::create($fields);

        return response()->json([
            'message' => 'Competence created Successfully.',
            'data' => $competence
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(AcademyCompetence $competence)
    {
        return response()->json([
            'message' => $competence->exists ? 'Competence founded' : 'Competence not found',
            'data' => $competence
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, AcademyCompetence $competence)
    {
        $fields = $request->validate([
            'academy_subject_id' => 'required|exists:academy_subjects,id',
            'semester' => 'required|integer',
            'admin_teacher_id' => 'required|exists:admin_teachers,id',
            'competence_1' => 'nullable|string',
            'competence_2' => 'nullable|string',
            'competence_3' => 'nullable|string',
        ]);

        $competence->update($fields);

        return response()->json([
            'message' => 'Competence updated Successfully.',
            'data' => $competence
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(AcademyCompetence $competence)
    {
        $competence->delete();

        return response()->json([
            'message' => 'Competence deleted Successfully.',
            'count' => AcademyCompetence::count()
        ]);
    }
}
