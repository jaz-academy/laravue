<?php

namespace App\Http\Controllers\academy;

use Illuminate\Http\Request;
use App\Models\AcademyCourse;
use App\Http\Controllers\Controller;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\Facades\Storage;

class CourseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $courses = AcademyCourse::all();

        return response()->json([
            'count' => $courses->count(),
            'data' => $courses
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
        $name = $request->get('name');
        $subject = $request->get('subject');
        $section = $request->get('section');

        // 💥 Override page resolver
        Paginator::currentPageResolver(function () use ($page) {
            return $page > 0 ? $page : 1;
        });

        $query = AcademyCourse::query();

        // Search
        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('title', 'like', "%{$search}%");
            });
        }

        // Filter by name
        if ($name) {
            $query->where('name', $name);
        }

        // Filter by subject
        if ($subject) {
            $query->where('subject', $subject);
        }

        // Filter by section
        if ($section) {
            $query->where('section', $section);
        }

        // Sorting
        if ($sortBy) {
            $query->orderBy($sortBy, $orderBy);
        } else {
            $query->orderBy('id', 'desc'); // default sorting
        }

        $courses = $query->paginate($itemsPerPage);

        return response()->json([
            'count' => $courses->total(),
            'data' => $courses->items(),
            'totalPages' => $courses->lastPage(),
            'page' => $courses->currentPage(),
        ]);
    }

    /**
     * Display a distinct listing of the resource.
     */
    public function distinct(Request $request)
    {
        $itemsPerPage = (int) $request->get('itemsPerPage', 10);
        $page = (int) ($request->get('page', 1));
        $search = $request->get('q', '');
        $subject = $request->get('subject');

        // 💥 Override page resolver
        Paginator::currentPageResolver(function () use ($page) {
            return $page > 0 ? $page : 1;
        });

        $query = AcademyCourse::select('name', 'subject', 'note', 'author')
            ->selectRaw('MIN(id) as first_id')
            ->selectRaw('COUNT(*) as course_count')
            ->selectRaw('SUM(CAST(video_duration AS UNSIGNED)) as total_video_duration')
            ->groupBy('name', 'note', 'subject', 'author');

        // Search
        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('note', 'like', "%{$search}%");
            });
        }

        // Filter by subject
        if ($subject) {
            $query->where('subject', $subject);
        }

        $courses = $query->paginate($itemsPerPage);

        return response()->json([
            'count' => $courses->total(),
            'data' => $courses->items(),
            'totalPages' => $courses->lastPage(),
            'page' => $courses->currentPage(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $fields = $request->validate([
            'name' => 'required|string|max:255',
            'subject' => 'required|string|max:255',
            'note' => 'required|string|max:255',
            'author' => 'required|string|max:255',
            'title' => 'required|string|max:255',
            'section' => 'required|string|max:255',
            'description' => 'nullable|string',
            'video_url' => 'nullable|url|max:255',
            'video_duration' => 'nullable|string|max:255',
        ]);

        // validasi file tapi jangan ikut ke $fields
        $request->validate([
            'photo' => 'nullable|image|mimes:png,jpg,jpeg|max:2048',
        ]);

        // simpan data course
        $course = AcademyCourse::create($fields);

        // jika ada file photo
        if ($request->hasFile('photo')) {
            $filename = $request->name . '.png';
            $path = "courses/$filename";

            // hapus file lama kalau ada
            if (Storage::disk('public')->exists($path)) {
                Storage::disk('public')->delete($path);
            }

            // simpan file baru
            $request->file('photo')->storeAs('courses', $filename, 'public');
        }

        return response()->json([
            'message' => 'Course created Successfully.',
            'data' => $course
        ]);
    }

    public function byName($name)
    {
        if (!$name) {
            return response()->json(['message' => 'Course name is required'], 400);
        }

        $course = AcademyCourse::where('name', $name)
            ->orderBy('section')
            ->orderBy('title')
            ->get();

        if ($course->isEmpty()) {
            return response()->json(['message' => 'Course not found'], 404);
        }

        return response()->json([
            'message' => 'Course found',
            'data' => $course
        ]);
    }


    /**
     * Display the specified resource.
     */
    public function show(AcademyCourse $course)
    {
        return response()->json([
            'message' => $course->exists ? 'Course founded' : 'Course not found',
            'data' => $course
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, AcademyCourse $course)
    {
        $fields = $request->validate([
            'name' => 'required|string|max:255',
            'subject' => 'required|string|max:255',
            'note' => 'required|string|max:255',
            'author' => 'required|string|max:255',
            'title' => 'required|string|max:255',
            'section' => 'required|string|max:255',
            'description' => 'nullable|string',
            'video_url' => 'nullable|url|max:255',
            'video_duration' => 'nullable|string|max:255',
        ]);

        // validasi file tapi jangan ikut ke $fields
        $request->validate([
            'photo' => 'nullable|image|mimes:png,jpg,jpeg|max:2048',
        ]);

        $course->update($fields);

        if ($request->hasFile('photo')) {
            $filename = $request->name . '.png';
            $path = "courses/$filename";

            if (Storage::disk('public')->exists($path)) {
                Storage::disk('public')->delete($path);
            }

            $request->file('photo')->storeAs('courses', $filename, 'public');
        }

        return response()->json([
            'message' => 'Course updated Successfully.',
            'data' => $course
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(AcademyCourse $course)
    {
        $course->delete();

        return response()->json([
            'message' => 'Course deleted Successfully.',
            'count' => AcademyCourse::count()
        ]);
    }
}
