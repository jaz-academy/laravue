<?php

namespace App\Http\Controllers\payment;

use App\Models\PaymentItem;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Faker\Provider\ar_EG\Payment;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Illuminate\Pagination\Paginator;

class PaymentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $payments = PaymentItem::with('adminStudent')->get();

        return response()->json([
            'count' => $payments->count(),
            'data' => $payments
        ]);
    }

    /**
     * Display a distinct listing of the resource.
     */
    public function distinct(Request $request)
    {
        $search = $request->get('q');
        $date = $request->get('date');
        $student = $request->get('student');
        $amount = $request->get('amount');
        $page = $request->get('page');
        $itemsPerPage = $request->get('itemsPerPage');
        $sortBy = $request->get('sortBy');
        $orderBy = $request->get('orderBy');

        // 💥 Override page resolver
        Paginator::currentPageResolver(function () use ($page) {
            return $page > 0 ? $page : 1;
        });

        $query = PaymentItem::query()
            ->join('admin_students', 'payment_items.admin_student_id', '=', 'admin_students.id')
            ->selectRaw("
                invoice,
                MIN(date) as date,
                MIN(period) as period,
                MIN(billing) as billing,
                admin_student_id as admin_student_id,
                admin_students.name as student,
                COUNT(payment_items.id) as total_items,
                SUM(amount) as total_amount
            ")
            ->groupBy('invoice', 'admin_student_id', 'admin_students.name');

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('admin_students.name', 'like', "%{$search}%")
                    ->orWhere('invoice', 'like', "%{$search}%");
            });
        }

        if ($date) {
            $query->where('date', $date);
        }

        if ($student) {
            $query->where('admin_students.name', $student);
        }

        if ($amount) {
            $query->where('amount', $amount);
        }

        if ($sortBy) {
            $query->orderBy($sortBy, $orderBy);
        } else {
            $query->orderBy('date', 'desc');
        }

        try {
            $payments = $query->paginate($itemsPerPage);
            return response()->json($payments);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error fetching payments: ' . $e->getMessage()], 500);
        }
    }

    /**
     * Store Bulk Data
     */
    public function bulkStore(Request $request)
    {
        $request->validate([
            'header' => 'required|array',
            'header.admin_student_id' => 'required|exists:admin_students,id',
            'paymentItem' => 'present|array',
        ]);

        $header = $request->input('header');
        $paymentItems = $request->input('paymentItem');

        // Jika invoice tidak ada di request header, atau adalah 'new', buat invoice baru.
        $invoice = ($header['invoice'] && $header['invoice'] !== 'new')
            ? $header['invoice']
            : 'PY' . strtoupper(Str::random(8));

        // log payload masuk
        Log::info('bulkStore called', [
            'header' => $header,
            'paymentItemCount' => count($paymentItems),
            'invoice' => $invoice,
        ]);

        DB::beginTransaction();
        try {
            // Hapus semua item lama yang terkait dengan invoice ini untuk menangani update dan delete.
            paymentItem::where('invoice', $invoice)->delete();

            // Buat ulang semua item dari payload.
            foreach ($paymentItems as $data) {
                $payload = [
                    'invoice' => $invoice,
                    'date' => $header['date'] ?? null,
                    'period' => $header['period'],
                    'admin_student_id' => $header['admin_student_id'],
                    'finance_account_id' => $data['finance_account_id'],
                    'billing' => $data['billing'],
                    'amount' => $data['amount'] ?? 0,
                    'is_once' => $data['is_once'] ?? 0,
                    'is_monthly' => $data['is_monthly'] ?? 0,
                    'admin' => auth()->user()->name ?? null, // Ambil admin yang sedang login
                ];

                // log tiap payload siswa
                Log::debug('Processing: ', $payload);

                paymentItem::create($payload);
            }

            DB::commit();

            Log::info('bulkStore success', ['invoice' => $invoice]);

            return response()->json(['message' => 'Payment saved successfully.', 'data' => ['invoice' => $invoice]], 200);
        } catch (\Exception $e) {
            DB::rollBack();

            // log error lengkap
            Log::error('bulkStore failed: ' . $e->getMessage(), [
                'trace' => $e->getTraceAsString(),
                'payload' => $request->all(),
            ]);

            return response()->json(['message' => 'Failed to save Payment.', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Read Payment By Invoice
     */
    public function paymentByInvoice($invoice)
    {
        $payments = PaymentItem::with('adminStudent', 'financeAccount')->where('invoice', $invoice)->get();
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
            'period' => 'required|integer|min:2000|max:' . date('Y'),
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
     * Display the specified resource.
     */
    public function paymentByYear($year, $studentId)
    {
        if ($year === 'last' || !$year) {
            $year = PaymentItem::where('admin_student_id', $studentId)->max('period');
        }

        $payments = PaymentItem::with('adminStudent', 'financeAccount')
            ->where('admin_student_id', $studentId)
            ->where('period', $year)
            ->get();

        return response()->json([
            'count' => $payments->count(),
            'data' => $payments
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function paymentByStudent($studentId)
    {
        $payments = PaymentItem::with('adminStudent', 'financeAccount')
            ->where('admin_student_id', $studentId)
            ->get();

        return response()->json([
            'count' => $payments->count(),
            'data' => $payments
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
            'period' => 'required|integer|min:2000|max:' . date('Y'),
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
