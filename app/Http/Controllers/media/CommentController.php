<?php

namespace App\Http\Controllers\media;

use App\Http\Controllers\Controller;
use App\Models\MediaComment;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $mediaComment = MediaComment::all();

        return response()->json([
            'count' => $mediaComment->count(),
            'data' => $mediaComment
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
            'content' => 'required',
        ]);

        $mediaComment = MediaComment::create($fields);

        return response()->json([
            'message' => 'You Comment this Task.',
            'data' => $mediaComment
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $mediaComment = MediaComment::findOrFail($id);

        return response()->json([
            'message' => 'Comment founded',
            'data' => $mediaComment
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $mediaComment = MediaComment::findOrFail($id);

        $fields = $request->validate([
            'media_participant_id' => 'required|exists:media_participants,id',
            'project_task_id' => 'required|exists:project_tasks,id',
            'content' => 'required',
        ]);

        $mediaComment->update($fields);

        return response()->json([
            'message' => 'Your comment updated.',
            'data' => $mediaComment
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $mediaComment = MediaComment::findOrFail($id);
        $mediaComment->delete();

        return response()->json([
            'message' => 'Your comment deleted.',
            'count' => MediaComment::count()
        ]);
    }
}
