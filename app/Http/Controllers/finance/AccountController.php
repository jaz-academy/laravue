<?php

namespace App\Http\Controllers\finance;

use App\Http\Controllers\Controller;
use App\Models\FinanceAccount;
use Illuminate\Http\Request;

class AccountController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $accounts = FinanceAccount::all();

        return response()->json([
            'count' => $accounts->count(),
            'data' => $accounts
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $fields = $request->validate([
            'number' => 'required|integer',
            'unit' => 'required|string|max:255',
            'description' => 'required|string|max:255',
            'detail' => 'nullable|string|max:255',
            'allocation' => 'nullable|integer|min:0',
        ]);

        $account = FinanceAccount::create($fields);

        return response()->json([
            'message' => 'Account created Successfully.',
            'data' => $account
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(FinanceAccount $account)
    {
        return response()->json([
            'message' => $account->exists ? 'Account founded' : 'Account not found',
            'data' => $account
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, FinanceAccount $account)
    {
        $fields = $request->validate([
            'number' => 'required|integer',
            'unit' => 'required|string|max:255',
            'description' => 'required|string|max:255',
            'detail' => 'nullable|string|max:255',
            'allocation' => 'nullable|integer|min:0',
        ]);

        $account->update($fields);

        return response()->json([
            'message' => 'Account updated Successfully.',
            'data' => $account
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(FinanceAccount $account)
    {
        $account->delete();

        return response()->json([
            'message' => 'Account deleted Successfully.',
            'count' => FinanceAccount::count()
        ]);
    }
}
