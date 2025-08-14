<?php

namespace App\Http\Controllers\academy;

use App\Models\AcademyAward;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Pagination\Paginator;

class AwardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $awards = AcademyAward::with('adminStudent', 'adminTeacher', 'academySubject')->get();

        return response()->json([
            'count' => $awards->count(),
            'data' => $awards
        ]);
    }

    /**
     * Display a custom listing of the resource.
     */
    public function custom(Request $request)
    {
        $itemsPerPage = (int) $request->get('itemsPerPage', 10);
        $page = (int) ($request->get('page', 1));
        $sortBy = $request->get('sortBy', '');
        $orderBy = $request->get('orderBy', 'asc');
        $search = $request->get('q', '');
        $admin_student_id = $request->get('adminStudentId');
        $semester = $request->get('semester');
        $academy_subject_id = $request->get('academySubjectId');

        // 💥 Override page resolver
        Paginator::currentPageResolver(function () use ($page) {
            return $page > 0 ? $page : 1;
        });

        $query = AcademyAward::with('adminStudent', 'adminTeacher', 'academySubject')
            ->select('academy_awards.*');

        // Search
        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('semester', 'like', "%{$search}%")
                    ->orWhere('item', 'like', "%{$search}%");
            });
        }

        // Filter by student
        if ($admin_student_id) {
            $query->where('admin_student_id', $admin_student_id);
        }

        // Filter by semester
        if ($semester) {
            $query->where('semester', $semester);
        }

        // Filter by subject
        if ($academy_subject_id) {
            $query->where('academy_subject_id', $academy_subject_id);
        }

        // Sorting — handle kolom relasi
        if ($sortBy) {
            if ($sortBy === 'admin_teacher.nickname') {
                $query->join('admin_teachers', 'academy_awards.admin_teacher_id', '=', 'admin_teachers.id')
                    ->orderBy('admin_teachers.nickname', $orderBy);
            } elseif ($sortBy === 'admin_student.name') {
                $query->join('admin_students', 'academy_awards.admin_student_id', '=', 'admin_students.id')
                    ->orderBy('admin_students.name', $orderBy);
            } elseif ($sortBy === 'academy_subject.name') {
                $query->join('academy_subjects', 'academy_awards.academy_subject_id', '=', 'academy_subjects.id')
                    ->orderBy('academy_subjects.name', $orderBy);
            } else {
                $query->orderBy($sortBy, $orderBy);
            }
        } else {
            $query->orderBy('academy_awards.id', 'desc');
        }

        $awards = $query->paginate($itemsPerPage);

        return response()->json([
            'count' => $awards->total(),
            'data' => $awards->items(),
            'totalPages' => $awards->lastPage(),
            'page' => $awards->currentPage(),
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
            'academy_subject_id' => 'required|integer',
            'item' => 'required|string|max:255',
            'rate' => 'required|integer',
            'result' => 'required|string|max:255',
            'admin_teacher_id' => 'required|integer',
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
        $award->update($request->all());

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
