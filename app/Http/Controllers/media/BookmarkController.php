<?php

namespace App\Http\Controllers\media;

use App\Http\Controllers\Controller;
use App\Models\MediaBookmark;
use Illuminate\Http\Request;

class BookmarkController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $mediaBookmark = MediaBookmark::all();

        return response()->json([
            'count' => $mediaBookmark->count(),
            'data' => $mediaBookmark
        ]);
    }

    public function getByParticipant($participant_id)
    {
        $mediaBookmarks = MediaBookmark::where('media_participant_id', $participant_id)
            ->with(['projectTask.projectPlan', 'projectTask.students', 'projectTask.adminTeacher'])
            ->get();

        return response()->json([
            'count' => $mediaBookmarks->count(),
            'data' => $mediaBookmarks
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $fields = $request->validate([
            'media_participant_id' => 'required|exists:media_participants,id',
            'project_task_id' => 'required|exists:project_tasks,id',
        ]);

        $mediaBookmark = MediaBookmark::create($fields);

        return response()->json([
            'message' => 'You Mark this Task.',
            'data' => $mediaBookmark
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $mediaBookmark = MediaBookmark::findOrFail($id);

        return response()->json([
            'message' => 'Bookmark founded',
            'data' => $mediaBookmark
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $fields = $request->validate([
            'media_participant_id' => 'required|exists:media_participants,id',
            'project_task_id' => 'required|exists:project_tasks,id',
        ]);

        $mediaBookmark = MediaBookmark::findOrFail($id);
        $mediaBookmark->update($fields);

        return response()->json([
            'message' => 'Your Bookmark updated.',
            'data' => $mediaBookmark
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $mediaBookmark = MediaBookmark::findOrFail($id);
        $mediaBookmark->delete();

        return response()->json([
            'message' => 'Your Bookmark deleted.',
            'count' => MediaBookmark::count()
        ]);
    }
}
