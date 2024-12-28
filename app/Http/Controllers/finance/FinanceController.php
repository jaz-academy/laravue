<?php

namespace App\Http\Controllers\finance;

use App\Http\Controllers\Controller;
use App\Models\FinanceItem;
use Illuminate\Http\Request;

class FinanceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $finances = FinanceItem::all();

        return response()->json([
            'count' => $finances->count(),
            'data' => $finances
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $fields = $request->validate([
            'invoice' => 'required|string|max:255',
            'date' => 'required|date',
            'vendor' => 'required|string|max:255',
            'finance_account_id' => 'nullable|exists:finance_accounts,id',
            'remark' => 'required|string|max:255',
            'description' => 'required|string|max:255',
            'amount' => 'required|integer|min:0',
            'admin' => 'nullable|string|max:255',
        ]);

        $finance = FinanceItem::create($fields);

        return response()->json([
            'message' => 'Finance created Successfully.',
            'data' => $finance
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(FinanceItem $finance)
    {
        return response()->json([
            'message' => $finance->exists ? 'Finance founded' : 'Finance not found',
            'data' => $finance
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, FinanceItem $finance)
    {
        $fields = $request->validate([
            'invoice' => 'required|string|max:255',
            'date' => 'required|date',
            'vendor' => 'required|string|max:255',
            'finance_account_id' => 'nullable|exists:finance_accounts,id',
            'remark' => 'required|string|max:255',
            'description' => 'required|string|max:255',
            'amount' => 'required|integer|min:0',
            'admin' => 'nullable|string|max:255',
        ]);

        $finance->update($fields);

        return response()->json([
            'message' => 'Finance updated Successfully.',
            'data' => $finance
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(FinanceItem $finance)
    {
        $finance->delete();

        return response()->json([
            'message' => 'Finance deleted Successfully.',
            'count' => FinanceItem::count()
        ]);
    }
}
