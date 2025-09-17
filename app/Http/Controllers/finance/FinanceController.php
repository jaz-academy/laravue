<?php

namespace App\Http\Controllers\finance;

use App\Models\FinanceItem;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Illuminate\Pagination\Paginator;

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
     * Display a distinct listing of the resource.
     */
    public function distinct(Request $request)
    {
        $search = $request->get('q');
        $date = $request->get('date');
        $vendor = $request->get('vendor');
        $remark = $request->get('remark');
        $page = $request->get('page');
        $itemsPerPage = $request->get('itemsPerPage');
        $sortBy = $request->get('sortBy');
        $orderBy = $request->get('orderBy');

        // 💥 Override page resolver
        Paginator::currentPageResolver(function () use ($page) {
            return $page > 0 ? $page : 1;
        });

        $query = FinanceItem::query()
            ->selectRaw("
                invoice,
                MIN(date) as date,
                MIN(vendor) as vendor,
                MIN(remark) as remark,
                COUNT(id) as total_items,
                SUM(amount) as total_amount
            ")
            ->groupBy('invoice');

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('vendor', 'like', "%{$search}%")
                    ->orWhere('remark', 'like', "%{$search}%")
                    ->orWhere('invoice', 'like', "%{$search}%");
            });
        }

        if ($date) {
            $query->where('date', $date);
        }

        if ($vendor) {
            $query->where('vendor', $vendor);
        }

        if ($remark) {
            $query->where('remark', $remark);
        }

        if ($sortBy) {
            $query->orderBy($sortBy, $orderBy);
        } else {
            $query->orderBy('date', 'desc');
        }

        $finances = $query->paginate($itemsPerPage);
        return response()->json($finances);
    }

    /**
     * Store Bulk Data
     */
    public function bulkStore(Request $request)
    {
        $request->validate([
            'header' => 'required|array',
            'header.finance_account_id' => 'required|exists:finance_accounts,id',
            'financeItem' => 'present|array',
        ]);

        $header = $request->input('header');
        $financeItems = $request->input('financeItem');

        // Jika invoice tidak ada di request header, atau adalah 'new', buat invoice baru.
        $invoice = ($header['invoice'] && $header['invoice'] !== 'new')
            ? $header['invoice']
            : 'FN' . strtoupper(Str::random(8));

        // log payload masuk
        Log::info('bulkStore called', [
            'header' => $header,
            'financeItemCount' => count($financeItems),
            'invoice' => $invoice,
        ]);

        DB::beginTransaction();
        try {
            // Hapus semua item lama yang terkait dengan invoice ini untuk menangani update dan delete.
            FinanceItem::where('invoice', $invoice)->delete();

            // Buat ulang semua item dari payload.
            foreach ($financeItems as $data) {
                $payload = [
                    'invoice' => $invoice,
                    'date' => $header['date'] ?? null,
                    'vendor' => $header['vendor'],
                    'finance_account_id' => $header['finance_account_id'],
                    'remark' => $header['remark'],
                    'description' => $data['description'] ?? null,
                    'amount' => $data['amount'] ?? null,
                    'admin' => auth()->user()->name ?? null, // Ambil admin yang sedang login
                ];

                // log tiap payload siswa
                Log::debug('Processing: ', $payload);

                FinanceItem::create($payload);
            }

            DB::commit();

            Log::info('bulkStore success', ['invoice' => $invoice]);

            return response()->json(['message' => 'Finance saved successfully.', 'data' => ['invoice' => $invoice]], 200);
        } catch (\Exception $e) {
            DB::rollBack();

            // log error lengkap
            Log::error('bulkStore failed: ' . $e->getMessage(), [
                'trace' => $e->getTraceAsString(),
                'payload' => $request->all(),
            ]);

            return response()->json(['message' => 'Failed to save Finance.', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Read Finance By Invoice
     */
    public function financeByInvoice($invoice)
    {
        $finances = FinanceItem::with('financeAccount')->where('invoice', $invoice)->get();
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
