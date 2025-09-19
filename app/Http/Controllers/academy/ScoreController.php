<?php

namespace App\Http\Controllers\academy;

use Illuminate\Support\Str;
use App\Models\AcademyScore;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Illuminate\Pagination\Paginator;

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
     * Display a custom listing of the resource.
     */
    public function distinct(Request $request)
    {
        $search = $request->get('q');
        $year = $request->get('year');
        $semester = $request->get('semester');
        $subject = $request->get('subject');
        $page = $request->get('page');
        $itemsPerPage = $request->get('itemsPerPage');
        $sortBy = $request->get('sortBy');
        $orderBy = $request->get('orderBy');

        // 💥 Override page resolver
        Paginator::currentPageResolver(function () use ($page) {
            return $page > 0 ? $page : 1;
        });

        $query = AcademyScore::query()
            ->join('academy_competences', 'academy_scores.academy_competence_id', '=', 'academy_competences.id')
            ->join('admin_students', 'academy_scores.admin_student_id', '=', 'admin_students.id')
            ->join('academy_subjects', 'academy_competences.academy_subject_id', '=', 'academy_subjects.id')
            ->join('admin_teachers', 'academy_competences.admin_teacher_id', '=', 'admin_teachers.id')
            ->select(
                'academy_scores.serial',
                'academy_scores.semester',
                'academy_subjects.name as subject',
                'admin_teachers.name as teacher',
                DB::raw('ANY_VALUE(admin_students.registered) as year'),
                DB::raw('COUNT(*) as count'),
                DB::raw('MIN(academy_scores.created_at) as created_at')
            )
            ->groupBy(
                'academy_scores.serial',
                'academy_scores.semester',
                'academy_subjects.name',
                'admin_teachers.name',
                'admin_students.registered'
            );

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('academy_subjects.name', 'like', "%{$search}%")
                    ->orWhere('admin_teachers.name', 'like', "%{$search}%");
            });
        }

        if ($semester) {
            $query->where('academy_scores.semester', $semester);
        }

        if ($year) {
            $query->where('admin_students.registered', $year);
        }

        if ($subject) {
            $query->where('academy_subjects.id', $subject);
        }

        if ($sortBy) {
            $query->orderBy($sortBy, $orderBy);
        } else {
            $query->orderBy('created_at', 'desc');
        }

        $assessments = $query->paginate($itemsPerPage);
        return response()->json($assessments);
    }

    /**
     * Store or update a batch of scores.
     */
    public function bulkStore(Request $request)
    {
        $request->validate([
            'header' => 'required|array',
            'header.academy_competence_id' => 'required|exists:academy_competences,id',
            'studentScores' => 'present|array',
            'studentScores.*.admin_student_id' => 'required|exists:admin_students,id',
        ]);

        $header = $request->input('header');
        $studentScores = $request->input('studentScores');

        // Jika serial tidak ada di request, buat serial baru. Jika ada, gunakan yang sudah ada.
        $serial = $request->input('header.serial') ?? 'AS' . strtoupper(Str::random(8));

        // log payload masuk
        Log::info('bulkStore called', [
            'header' => $header,
            'studentScoresCount' => count($studentScores),
            'serial' => $serial,
        ]);

        DB::beginTransaction();
        try {
            foreach ($studentScores as $scoreData) {
                $payload = [
                    'serial' => $serial,
                    'semester' => $header['semester'] ?? null,
                    'academy_competence_id' => $header['academy_competence_id'],
                    'admin_student_id' => $scoreData['admin_student_id'],
                    'month_1' => $scoreData['month_1'] ?? null,
                    'month_2' => $scoreData['month_2'] ?? null,
                    'month_3' => $scoreData['month_3'] ?? null,
                    'month_4' => $scoreData['month_4'] ?? null,
                    'month_5' => $scoreData['month_5'] ?? null,
                    'month_6' => $scoreData['month_6'] ?? null,
                    'final_score' => $scoreData['final_score'] ?? null,
                    'is_ok_1' => $scoreData['is_ok_1'] ?? 0,
                    'competence_1' => $scoreData['competence_1'] ?? null,
                    'is_ok_2' => $scoreData['is_ok_2'] ?? 0,
                    'competence_2' => $scoreData['competence_2'] ?? null,
                    'is_ok_3' => $scoreData['is_ok_3'] ?? 0,
                    'competence_3' => $scoreData['competence_3'] ?? null,
                ];

                // log tiap payload siswa
                Log::debug('Processing student score', $payload);

                AcademyScore::updateOrCreate(
                    ['serial' => $serial, 'admin_student_id' => $scoreData['admin_student_id']],
                    $payload
                );
            }

            $currentStudentIds = array_column($studentScores, 'admin_student_id');
            AcademyScore::where('serial', $serial)->whereNotIn('admin_student_id', $currentStudentIds)->delete();

            DB::commit();

            Log::info('bulkStore success', ['serial' => $serial]);

            return response()->json(['message' => 'Assessment saved successfully.', 'data' => ['serial' => $serial]], 200);
        } catch (\Exception $e) {
            DB::rollBack();

            // log error lengkap
            Log::error('bulkStore failed: ' . $e->getMessage(), [
                'trace' => $e->getTraceAsString(),
                'payload' => $request->all(),
            ]);

            return response()->json(['message' => 'Failed to save assessment.', 'error' => $e->getMessage()], 500);
        }
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
     * Display the specified resource.
     */
    public function scoreBySerial($serial)
    {
        $scores = AcademyScore::with('adminStudent', 'academyCompetence.adminTeacher')->where('serial', $serial)->get();
        return response()->json([
            'count' => $scores->count(),
            'data' => $scores
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function scoreByPerson(Request $request)
    {
        $studentId = $request->get('student_id');
        $semester = $request->get('semester');

        if ($semester === 'last' || !$semester) {
            $semester = AcademyScore::where('admin_student_id', $studentId)->max('semester');
        }

        $scores = AcademyScore::query()
            ->join('academy_competences', 'academy_scores.academy_competence_id', '=', 'academy_competences.id')
            ->join('academy_subjects', 'academy_competences.academy_subject_id', '=', 'academy_subjects.id')
            ->where('academy_scores.admin_student_id', $studentId)
            ->where('academy_scores.semester', $semester)
            ->orderBy('academy_subjects.number')
            ->get([
                'academy_subjects.group',
                'academy_subjects.number',
                'academy_subjects.name',
                'academy_scores.final_score',
                'academy_scores.is_ok_1',
                'academy_scores.competence_1',
                'academy_scores.is_ok_2',
                'academy_scores.competence_2',
                'academy_scores.is_ok_3',
                'academy_scores.competence_3',
                'academy_scores.created_at'
            ]);

        return response()->json([
            'count' => $scores->count(),
            'data'  => $scores,
            'semester' => $semester
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
