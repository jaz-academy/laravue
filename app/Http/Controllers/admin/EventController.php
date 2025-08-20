<?php

namespace App\Http\Controllers\admin;

use Illuminate\Http\Request;
use App\Models\AdminEvent as Event;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;

class EventController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Event::query();

        if ($request->has('calendars')) {
            $calendars = explode(',', $request->calendars); // ambil array dari query string
            $query->whereIn('remark', $calendars);
        }

        $events = $query->get();

        return response()->json($events);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $fields = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'remark' => 'required|string|max:255',
        ]);

        $event = Event::create($fields);

        return response()->json([
            'message' => 'Event data created successfully',
            'data' => $event
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Event $event)
    {
        return response()->json([
            'message' => 'Event data founded',
            'data' => $event
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Event $event)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'remark' => 'nullable|string',
        ]);

        $event->update($validated);

        return response()->json([
            'message' => 'Event updated successfully',
            'data' => $event
        ]);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Event $event)
    {
        $event->delete();

        return response()->json([
            'message' => 'Event data deleted successfully.',
            'count' => Event::count()
        ]);
    }
}
