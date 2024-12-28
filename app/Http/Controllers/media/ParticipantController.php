<?php

namespace App\Http\Controllers\media;

use App\Http\Controllers\Controller;
use App\Models\MediaParticipant as Participant;
use Illuminate\Http\Request;

class ParticipantController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $participant = Participant::all();

        return response()->json([
            'count' => $participant->count(),
            'data' => $participant
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $fields = $request->validate([
            'name' => 'required|string|max:255',
            'username' => 'required|string|max:255|unique:media_participants,username',
            'password' => 'required|string|min:8|confirmed',
            'role' => 'nullable|integer|min:1',
            'image' => 'nullable|string|max:255',
        ]);
    
        $participant = Participant::create($fields);
    
        return response()->json([
            'message' => 'Participant data created successfully',
            'data' => $participant
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Participant $participant)
    {
        return response()->json([
            'message' => 'Participant data founded',
            'data' => $participant
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Participant $participant)
    {
        $fields = $request->validate([
            'name' => 'required|string|max:255',
            'username' => 'required|string|max:255|unique:media_participants,username',
            'password' => 'required|string|min:8|confirmed',
            'role' => 'nullable|integer|min:1',
            'image' => 'nullable|string|max:255',
        ]);
    
        $participant->update($fields);
    
        return response()->json([
            'message' => 'Participant data updated successfully',
            'data' => $participant
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Participant $participant)
    {
        $participant->delete();

        return response()->json([
            'message' => 'Participant data deleted successfully.',
            'count' => Participant::count()
        ]);
    }
}
