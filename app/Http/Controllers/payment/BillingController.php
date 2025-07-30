<?php

namespace App\Http\Controllers\payment;

use App\Http\Controllers\Controller;
use App\Models\PaymentBilling;
use Illuminate\Http\Request;

class BillingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $billings = PaymentBilling::all();

        return response()->json([
            'count' => $billings->count(),
            'data' => $billings
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $fields = $request->validate([
            'year' => 'required|integer|min:2000|max:'.date('Y'),
            'category' => 'required|string|max:255',
            'finance_account_id' => 'required|exists:finance_accounts,id',
            'name' => 'required|string|max:255',
            'amount' => 'required|integer|min:0',
            'is_once' => 'required|boolean',
            'is_monthly' => 'required|boolean',
            'note' => 'nullable|string|max:255',
        ]);

        $billing = PaymentBilling::create($fields);

        return response()->json([
            'message' => 'Billing created Successfully.',
            'data' => $billing
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(PaymentBilling $billing)
    {
        return response()->json([
            'message' => $billing->exists ? 'Billing founded' : 'Billing not found',
            'data' => $billing
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, PaymentBilling $billing)
    {
        $fields = $request->validate([
            'year' => 'required|integer|min:2000|max:'.date('Y'),
            'category' => 'required|string|max:255',
            'finance_account_id' => 'required|exists:finance_accounts,id',
            'name' => 'required|string|max:255',
            'amount' => 'required|integer|min:0',
            'is_once' => 'required|boolean',
            'is_monthly' => 'required|boolean',
            'note' => 'nullable|string|max:255',
        ]);

        $billing->update($fields);

        return response()->json([
            'message' => 'Billing updated Successfully.',
            'data' => $billing
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PaymentBilling $billing)
    {
        $billing->delete();

        return response()->json([
            'message' => 'Billing deleted Successfully.',
            'count' => PaymentBilling::count()
        ]);
    }
}
