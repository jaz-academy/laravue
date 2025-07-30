<?php

namespace App\Http\Controllers\admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Pagination\Paginator;
use App\Models\AdminTeacher as Teacher;

class TeacherController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $teachers = Teacher::all();

        return response()->json([
            'count' => $teachers->count(),
            'data' => $teachers
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

        $query = Teacher::query();

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
        if ($status) {
            $query->where('status', $status);
        }

        // Sorting
        if ($sortBy) {
            $query->orderBy($sortBy, $orderBy);
        } else {
            $query->orderBy('id', 'desc'); // default sorting
        }

        $teachers = $query->paginate($itemsPerPage);

        return response()->json([
            'count' => $teachers->total(),
            'data' => $teachers->items(),
            'totalPages' => $teachers->lastPage(),
            'page' => $teachers->currentPage(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $fields = $request->validate([
                'nig' => 'required|unique:admin_teachers,nig',
                'name' => 'required',
                'nickname' => 'required|unique:admin_teachers,nickname',
                'gender' => 'required',
                'birth_place' => 'nullable|string',
                'birth_date' => 'nullable',
                'grade' => 'nullable',
                'registered' => 'nullable',
                'phone' => 'nullable|string',
            ]);

            $teacher = Teacher::create($fields);

            return response()->json([
                'message' => 'Teacher data created successfully',
                'data' => $teacher
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
        $teacher = Teacher::find($id);

        if (!$teacher) {
            return response()->json([
                'message' => 'Teacher not found',
            ], 404);
        }

        return response()->json([
            'message' => 'Teacher data found',
            'data' => $teacher,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Teacher $teacher)
    {
        $teacher->update($request->all());

        return response()->json([
            'message' => 'Teacher data updated successfully',
            'data' => $teacher
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Teacher $teacher)
    {
        $teacher->delete();

        return response()->json([
            'message' => 'Teacher data deleted successfully.',
            'count' => Teacher::count()
        ]);
    }
}
