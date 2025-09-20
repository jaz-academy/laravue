<?php

namespace App\Http\Controllers\payment;

use App\Http\Controllers\Controller;
use App\Models\PaymentDiscount;
use Illuminate\Http\Request;

class DiscountController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $discounts = PaymentDiscount::with('adminStudent')->get();

        return response()->json([
            'count' => $discounts->count(),
            'data' => $discounts
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $fields = $request->validate([
            'admin_student_id' => 'required|exists:admin_students,id',
            'year' => 'required|integer|min:2000|max:' . date('Y'),
            'finance_account_id' => 'nullable|exists:finance_accounts,id',
            'billing' => 'nullable|string|max:255',
            'amount' => 'required|integer|min:0',
            'note' => 'nullable|string|max:255',
            'admin' => 'nullable|string|max:255',
        ]);

        $discount = PaymentDiscount::create($fields);

        return response()->json([
            'message' => 'Discount created Successfully.',
            'data' => $discount
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(PaymentDiscount $discount)
    {
        return response()->json([
            'message' => $discount->exists ? 'Discount founded' : 'Discount not found',
            'data' => $discount
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function discountByYear($year, $studentId)
    {
        if ($year === 'last' || !$year) {
            $year = PaymentDiscount::where('admin_student_id', $studentId)->max('year');
        }

        $discounts = PaymentDiscount::with('adminStudent', 'financeAccount')
            ->where('admin_student_id', $studentId)
            ->where('year', $year)
            ->get();

        return response()->json([
            'count' => $discounts->count(),
            'data' => $discounts
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, PaymentDiscount $discount)
    {
        $fields = $request->validate([
            'admin_student_id' => 'required|exists:admin_students,id',
            'year' => 'required|integer|min:2000|max:' . date('Y'),
            'finance_account_id' => 'nullable|exists:finance_accounts,id',
            'billing' => 'nullable|string|max:255',
            'amount' => 'required|integer|min:0',
            'note' => 'nullable|string|max:255',
            'admin' => 'nullable|string|max:255',
        ]);

        $discount->update($fields);

        return response()->json([
            'message' => 'Discount updated Successfully.',
            'data' => $discount
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PaymentDiscount $discount)
    {
        $discount->delete();

        return response()->json([
            'message' => 'Discount deleted Successfully.',
            'count' => PaymentDiscount::count()
        ]);
    }
}
