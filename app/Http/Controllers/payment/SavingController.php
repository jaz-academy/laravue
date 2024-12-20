<?php

namespace App\Http\Controllers\payment;

use App\Http\Controllers\Controller;
use App\Models\PaymentSaving;
use Illuminate\Http\Request;

class SavingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $savings = PaymentSaving::all();

        return response()->json([
            'count' => $savings->count(),
            'data' => $savings
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $fields = $request->validate([
            'invoice' => 'nullable|string|max:255',
            'date' => 'required|date',
            'admin_student_id' => 'required|exists:admin_students,id',
            'credit' => 'nullable|integer|min:0',
            'debit' => 'nullable|integer|min:0',
            'note' => 'nullable|string|max:255',
            'admin' => 'nullable|string|max:255',
        ]);

        $saving = PaymentSaving::create($fields);

        return response()->json([
            'message' => 'Saving created Successfully.',
            'data' => $saving
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(PaymentSaving $saving)
    {
        return response()->json([
            'message' => $saving->exists ? 'Saving founded' : 'Saving not found',
            'data' => $saving
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, PaymentSaving $saving)
    {
        $fields = $request->validate([
            'invoice' => 'nullable|string|max:255',
            'date' => 'required|date',
            'admin_student_id' => 'required|exists:admin_students,id',
            'credit' => 'nullable|integer|min:0',
            'debit' => 'nullable|integer|min:0',
            'note' => 'nullable|string|max:255',
            'admin' => 'nullable|string|max:255',
        ]);

        $saving->update($fields);

        return response()->json([
            'message' => 'Saving updated Successfully.',
            'data' => $saving
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PaymentSaving $saving)
    {
        $saving->delete();

        return response()->json([
            'message' => 'Saving deleted Successfully.',
            'count' => PaymentSaving::count()
        ]);
    }
}
