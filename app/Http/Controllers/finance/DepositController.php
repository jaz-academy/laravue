<?php

namespace App\Http\Controllers\finance;

use App\Models\FinanceDeposit;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class DepositController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $deposits = FinanceDeposit::all();

        return response()->json([
            'count' => $deposits->count(),
            'data' => $deposits
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $fields = $request->validate([
            'title' => 'required|string|max:255',
            'amount' => 'required|integer',
            'icon' => 'nullable|string',
            'color' => 'nullable|string',
        ]);

        $deposit = FinanceDeposit::create($fields);

        return response()->json([
            'message' => 'deposit created Successfully.',
            'data' => $deposit
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(FinanceDeposit $deposit)
    {
        return response()->json([
            'message' => $deposit->exists ? 'deposit founded' : 'deposit not found',
            'data' => $deposit
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, FinanceDeposit $deposit)
    {
        $fields = $request->validate([
            'title' => 'required|string|max:255',
            'amount' => 'required|integer',
            'icon' => 'nullable|string',
            'color' => 'nullable|string',
        ]);

        $deposit->update($fields);

        return response()->json([
            'message' => 'Deposit updated Successfully.',
            'data' => $deposit
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(FinanceDeposit $deposit)
    {
        $deposit->delete();

        return response()->json([
            'message' => 'Deposit deleted Successfully.',
            'count' => FinanceDeposit::count()
        ]);
    }
}
