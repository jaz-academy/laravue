<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\AdminStudent as Student;
use Illuminate\Http\Request;
use Illuminate\Pagination\Paginator;

class StudentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $currentUser = json_decode($request->cookie('userData'));

        if ($currentUser && $currentUser->admin_student_id > 0) {
            $students = Student::whereNull('graduation')->get();
        } else {
            $students = Student::all();
        }


        return response()->json([
            'count' => $students->count(),
            'data' => $students
        ]);
    }

    public function showAll(Request $request)
    {
        $itemsPerPage = (int) $request->get('itemsPerPage', 10);
        $page = (int) ($request->get('page', 1));
        $sortBy = $request->get('sortBy', 'name'); // default sort field
        $orderBy = $request->get('orderBy', 'asc'); // default order
        $search = $request->get('q', '');
        $registered = $request->get('year');
        $city = $request->get('city');
        $status = $request->get('status');

        // 💥 Override page resolver
        Paginator::currentPageResolver(function () use ($page) {
            return $page > 0 ? $page : 1;
        });

        $query = Student::query();

        // Search
        if ($search) {
            $query->where('name', 'like', "%{$search}%")
                ->orWhere('nickname', 'like', "%{$search}%");
        }

        // Filter by year
        if ($registered) {
            $query->where('registered', $registered);
        }

        // Filter by city
        if ($city) {
            $query->where('city', $city);
        }

        // Filter by status
        if ($status == 'active') {
            $query->whereNull('graduation');
        } elseif ($status == 'inactive') {
            $query->where('graduation', 0);
        } elseif ($status == 'graduated') {
            $query->where('graduation', '!=', 0)->whereNotNull('graduation');
        }


        // Sorting
        if ($sortBy) {
            $query->orderBy($sortBy, $orderBy);
        } else {
            $query->orderBy('id', 'desc'); // default sorting
        }

        $students = $query->paginate($itemsPerPage);

        return response()->json([
            'count' => $students->total(),
            'data' => $students->items(),
            'totalPages' => $students->lastPage(),
            'page' => $students->currentPage(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $fields = $request->validate([
                'nis' => 'required|unique:admin_students,nis',
                'name' => 'required',
                'nickname' => 'required|unique:admin_students,nickname',
                'gender' => 'required',
                'birth_place' => 'nullable|string',
                'birth_date' => 'nullable',
                'rumble' => 'nullable',
                'registered' => 'nullable',
                'payment_category' => 'nullable|string',
            ]);

            $student = Student::create($fields);

            return response()->json([
                'message' => 'Student data created successfully',
                'data' => $student
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $e->errors(),
            ], 422);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $student = Student::find($id);

        if (!$student) {
            return response()->json([
                'message' => 'Student not found',
            ], 404);
        }

        return response()->json([
            'message' => 'Student data found',
            'data' => $student,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Student $student)
    {
        $student->update($request->all());

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
