<?php

namespace App\Http\Controllers\media;

use App\Http\Controllers\Controller;
use App\Models\MediaStory;
use Illuminate\Http\Request;

class StoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $mediaStory = MediaStory::all();

        return response()->json([
            'count' => $mediaStory->count(),
            'data' => $mediaStory
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $fields = $request->validate([
            'media_participant_id' => 'required|exists:media_participants,id',
            'image' => 'nullable|file|mimes:jpeg,png,jpg,gif|max:2048',
            'content' => 'nullable',
        ]);

        $mediaStory = MediaStory::create($fields);

        return response()->json([
            'message' => 'You Story posted.',
            'data' => $mediaStory
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $mediaStory = MediaStory::findOrFail($id);

        return response()->json([
            'message' => 'Story founded',
            'data' => $mediaStory
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $mediaStory = MediaStory::findOrFail($id);

        $fields = $request->validate([
            'image' => 'nullable|file|mimes:jpeg,png,jpg,gif|max:2048',
            'content' => 'nullable',
        ]);

        $mediaStory->update($fields);

        return response()->json([
            'message' => 'Your story updated.',
            'data' => $mediaStory
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $mediaStory = MediaStory::findOrFail($id);
        $mediaStory->delete();

        return response()->json([
            'message' => 'Your Story deleted.',
            'count' => MediaStory::count()
        ]);
    }
}
