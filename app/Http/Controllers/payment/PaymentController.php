<?php

namespace App\Http\Controllers\payment;

use App\Http\Controllers\Controller;
use App\Models\PaymentItem;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $payments = PaymentItem::all();

        return response()->json([
            'count' => $payments->count(),
            'data' => $payments
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $fields = $request->validate([
            'invoice' => 'required|string',
            'date' => 'required|date',
            'period' => 'required|integer|min:2000|max:'.date('Y'),
            'admin_student_id' => 'required|exists:admin_students,id',
            'finance_account_id' => 'nullable|exists:finance_accounts,id',
            'payment_billing_id' => 'nullable|exists:payment_billings,id',
            'amount' => 'required|integer|min:1',
            'is_once' => 'required|boolean',
            'is_monthly' => 'required|boolean',
            'admin' => 'nullable|string|max:255',
        ]);

        $payment = PaymentItem::create($fields);

        return response()->json([
            'message' => 'Payment created Successfully.',
            'data' => $payment
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(PaymentItem $payment)
    {
        return response()->json([
            'message' => $payment->exists ? 'Payment founded' : 'Payment not found',
            'data' => $payment
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, PaymentItem $payment)
    {
        $fields = $request->validate([
            'invoice' => 'required|string',
            'date' => 'required|date',
            'period' => 'required|integer|min:2000|max:'.date('Y'),
            'admin_student_id' => 'required|exists:admin_students,id',
            'finance_account_id' => 'nullable|exists:finance_accounts,id',
            'payment_billing_id' => 'nullable|exists:payment_billings,id',
            'amount' => 'required|integer|min:1',
            'is_once' => 'required|boolean',
            'is_monthly' => 'required|boolean',
            'admin' => 'nullable|string|max:255',
        ]);

        $payment->update($fields);

        return response()->json([
            'message' => 'Payment updated Successfully.',
            'data' => $payment
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PaymentItem $payment)
    {
        $payment->delete();

        return response()->json([
            'message' => 'Payment deleted Successfully.',
            'count' => PaymentItem::count()
        ]);
    }
}
