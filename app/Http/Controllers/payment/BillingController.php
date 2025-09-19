<?php

namespace App\Http\Controllers\payment;

use Illuminate\Http\Request;
use App\Models\PaymentBilling;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Illuminate\Pagination\Paginator;

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
     * Display a distinct listing of the resource.
     */
    public function distinct(Request $request)
    {
        $search = $request->get('q');
        $page = $request->get('page');
        $itemsPerPage = $request->get('itemsPerPage');
        $sortBy = $request->get('sortBy');
        $orderBy = $request->get('orderBy');

        // 💥 Override page resolver
        Paginator::currentPageResolver(function () use ($page) {
            return $page > 0 ? $page : 1;
        });

        $query = PaymentBilling::query()
            ->selectRaw("
                year,
                category,
                COUNT(CASE WHEN is_once = 1 THEN 1 END) as is_once,
                COUNT(CASE WHEN is_monthly = 1 THEN 1 END) as is_monthly,
                COUNT(id) as total_items,
                SUM(amount) as total_amount
            ")
            ->groupBy('year', 'category')
            ->orderByDesc('year')
            ->orderByDesc('category');


        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('year', 'like', "%{$search}%")
                    ->orWhere('category', 'like', "%{$search}%");
            });
        }

        if ($sortBy) {
            $query->orderBy($sortBy, $orderBy);
        } else {
            $query->orderBy('year', 'desc');
        }

        $billings = $query->paginate($itemsPerPage);
        return response()->json($billings);
    }

    /**
     * Read Billing By Year
     */
    public function billingByYear($year, $category)
    {
        if ($year === 'last' || !$year) {
            $year = PaymentBilling::where('category', $category)->max('year');
        }
        $billings = PaymentBilling::with('financeAccount')
            ->where('year', $year)
            ->where('category', $category)
            ->get();

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
            'year' => 'required|integer|min:2000|max:' . date('Y'),
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
     * Store Bulk Data
     */
    public function bulkStore(Request $request)
    {
        $request->validate([
            'header' => 'required|array',
            'billingItem' => 'present|array',
        ]);

        $header = $request->input('header');
        $billingItems = $request->input('billingItem');

        Log::info('bulkStore for billing called', [
            'header' => $header,
            'billingItemCount' => count($billingItems),
        ]);

        DB::beginTransaction();
        try {
            // Hapus semua item lama yang terkait dengan kategori dan tahun ini.
            PaymentBilling::where('year', $header['year'])
                ->where('category', $header['category'])
                ->delete();

            // Buat ulang semua item dari payload.
            foreach ($billingItems as $data) {
                $payload = array_merge($header, [
                    'finance_account_id' => $data['finance_account_id'],
                    'name' => $data['name'],
                    'amount' => $data['amount'] ?? 0,
                    'is_once' => $data['is_once'] ?? 0,
                    'is_monthly' => $data['is_monthly'] ?? 0,
                    'note' => $data['note'] ?? null,
                ]);

                PaymentBilling::create($payload);
            }

            DB::commit();
            return response()->json(['message' => 'Billing saved successfully.', 'data' => $header], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Billing bulkStore failed: ' . $e->getMessage(), ['payload' => $request->all()]);
            return response()->json(['message' => 'Failed to save Billing.', 'error' => $e->getMessage()], 500);
        }
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
            'year' => 'required|integer|min:2000|max:' . date('Y'),
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
