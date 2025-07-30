<?php

namespace App\Http\Controllers\media;

use App\Http\Controllers\Controller;
use App\Models\MediaLike;
use Illuminate\Http\Request;

class LikeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $mediaLike = MediaLike::all();

        return response()->json([
            'count' => $mediaLike->count(),
            'data' => $mediaLike
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

        $mediaLike = MediaLike::create($fields);

        return response()->json([
            'message' => 'You Like this Task.',
            'data' => $mediaLike
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $mediaLike = MediaLike::findOrFail($id);

        return response()->json([
            'message' => 'Like founded',
            'data' => $mediaLike
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $mediaLike = MediaLike::findOrFail($id);

        $fields = $request->validate([
            'media_participant_id' => 'required|exists:media_participants,id',
            'project_task_id' => 'required|exists:project_tasks,id',
        ]);

        $mediaLike->update($fields);

        return response()->json([
            'message' => 'Your like updated.',
            'data' => $mediaLike
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $mediaLike = MediaLike::findOrFail($id);
        $mediaLike->delete();

        return response()->json([
            'message' => 'Your Like deleted.',
            'count' => MediaLike::count()
        ]);
    }
}
