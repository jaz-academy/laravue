<?php

namespace App\Http\Controllers\project;

use App\Http\Controllers\Controller;
use App\Models\ProjectPlan as Plan;
use Illuminate\Http\Request;

class PlanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $plans = Plan::orderBy('id', 'desc')->get();

        return response()->json([
            'count' => $plans->count(),
            'data' => $plans
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Plan $plan)
    {
        $fields = $request->validate([
            'subject' => 'required|string|max:255',
            'theme' => 'required|string|max:255',
            'description' => 'nullable|string',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'is_active' => 'nullable|boolean',
        ]);

        $plan = Plan::create($fields);

        return response()->json([
            'message' => 'Project Plan created successfully',
            'data' => $plan
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Plan $plan)
    {
        return response()->json([
            'message' => 'Project Plan founded',
            'data' => $plan
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Plan $plan)
    {
        $fields = $request->validate([
            'subject' => 'required|string|max:255',
            'theme' => 'required|string|max:255',
            'description' => 'nullable|string',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'is_active' => 'required|boolean',
        ]);

        $plan->update($fields);

        return response()->json([
            'message' => 'Project Plan updated successfully',
            'data' => $plan
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Plan $plan)
    {
        $plan->delete();

        return response()->json([
            'message' => 'Project Plan deleted successfully.',
            'count' => Plan::count()
        ]);
    }

    public function tasks(Plan $plan)
    {
        return response()->json([
            'message' => 'Project Plan tasks founded',
            'data' => $plan->projectTask
        ]);
    }

    public function planWithTasks()
    {
        $plans = Plan::with('projectTask.adminStudent')->where('is_active', true)->get();

        return response()->json([
            'message' => 'Project Plan with tasks founded',
            'data' => $plans
        ]);
    }
}
