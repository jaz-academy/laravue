<?php

namespace App\Http\Controllers\home;

use App\Models\ProjectTask;
use App\Models\AcademyScore;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Models\AdminStudent;
use App\Models\FinanceItem;
use App\Models\PaymentBilling;
use App\Models\PaymentItem;
use App\Models\ProjectPlan;
use Illuminate\Support\Facades\Auth;
use SebastianBergmann\CodeCoverage\Report\Xml\Project;

class DashboardController extends Controller
{
    public function academy(Request $request)
    {
        try {
            $studentId = $request->query('student_id');
            $semester  = $request->query('semester');

            if ($studentId) {
                // Ambil semester terakhir kalau semester kosong
                $semester = $semester ?? AcademyScore::where('admin_student_id', $studentId)->max('semester');
                $scores = AcademyScore::with('academyCompetence.academySubject')->with('adminStudent')
                    ->where('admin_student_id', $studentId)
                    ->where('semester', $semester)
                    ->get();
            } else {
                // Kalau tidak ada student_id → ambil semua data & rata-rata
                $semester = $semester ?? AcademyScore::max('semester');
                $scores = AcademyScore::with('academyCompetence.academySubject')->with('adminStudent')
                    ->where('semester', $semester)
                    ->get();
            }

            // Kelompokkan data
            $grouped = $scores->groupBy(fn($item) => $item->academy_competence_id);

            $data = [];
            foreach ($grouped as $subject => $items) {
                if ($studentId) {
                    $data[$items->first()->academyCompetence->academySubject->group . ' - ' . $items->first()->academyCompetence->academySubject->name] = [
                        $items->first()->month_1 ?? 0,
                        $items->first()->month_2 ?? 0,
                        $items->first()->month_3 ?? 0,
                        $items->first()->month_4 ?? 0,
                        $items->first()->month_5 ?? 0,
                        $items->first()->month_6 ?? 0,
                    ];
                } else {
                    // Rata-rata semua student
                    $data[$items->first()->academyCompetence->academySubject->group . ' - ' . $items->first()->academyCompetence->academySubject->name] = [
                        round($items->avg('month_1')),
                        round($items->avg('month_2')),
                        round($items->avg('month_3')),
                        round($items->avg('month_4')),
                        round($items->avg('month_5')),
                        round($items->avg('month_6')),
                    ];
                }
            }

            return response()->json([
                'semester' => $semester,
                'studentId' => $studentId,
                'studentName' => $studentId ? $scores->first()->adminStudent->name : null,
                'data' => $data
            ]);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => true,
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ], 500);
        }
    }

    public function project(Request $request)
    {
        $studentId = $request->query('student_id');
        $semester  = $request->query('semester');

        // student, task-media, task-teacher
        $students = AdminStudent::where('graduation', null)->get();
        $media = ProjectTask::select('media', DB::raw('COUNT(media) as count'))->whereNotNull('media')->groupBy('media');
        $teacher = ProjectTask::with('adminTeacher')
            ->whereNotNull('admin_teacher_id')
            ->select('admin_teacher_id', DB::raw('COUNT(admin_teacher_id) as count'))
            ->groupBy('admin_teacher_id');

        // task-completed
        $completedTasks = ProjectTask::selectRaw('
            SUM(CASE WHEN accepted = 1 THEN 1 ELSE 0 END) as accepted,
            SUM(CASE WHEN status = "Completed" THEN 1 ELSE 0 END) as completed,
            SUM(CASE WHEN status = "In Progress" THEN 1 ELSE 0 END) as progress
        ');
        $topTen = ProjectTask::with('students') // bukan adminStudent
            ->where('rate', 5)
            ->orderByDesc('id')
            ->take(10)
            ->get();

        // task-not-accepted
        $notAcceptedTasks = ProjectTask::with('students')
            ->where('accepted', 0)->get();

        // task-literasi
        $literasi = ProjectPlan::where('subject', 'Literasi')
            ->orderByDesc('id')
            ->first(); // ambil 1 data terbaru
        $literasiTasks = ProjectTask::with(['students', 'projectPlan', 'adminTeacher'])
            ->where('project_plan_id', $literasi->id)
            ->get();

        // task-social-media
        $socialMedia = ProjectPlan::where('subject', 'Social Media')
            ->orderByDesc('id')
            ->first();
        $socialMediaTasks = ProjectTask::with(['students', 'projectPlan', 'adminTeacher'])
            ->where('project_plan_id', $socialMedia->id)
            ->get();


        // task-terakhir
        $lastProject = ProjectPlan::where('subject', '<>', 'Literasi')->where('subject', '<>', 'Social Media')
            ->orderByDesc('id')
            ->first(); // ambil 1 data terbaru
        $lastProjectTasks = ProjectTask::with(['students', 'projectPlan', 'adminTeacher'])
            ->where('project_plan_id', $lastProject->id)
            ->get();

        // pengkondisian
        if ($semester) {
            $completedTasks->where('semester', $semester);
            $media->where('semester', $semester);
            $teacher->where('semester', $semester);
        } else {
            $completedTasks->whereYear('date', now()->year);
            $media->whereYear('date', now()->year);
            $teacher->whereYear('date', now()->year);
        }

        if ($studentId) {
            $completedTasks->whereHas('students', function ($q) use ($studentId) {
                $q->where('pivot_student_task.admin_student_id', $studentId);
            });
        }

        // final query
        $completedTasks = $completedTasks->get();
        $media = $media->get();
        $teacher = $teacher->orderBy('count', 'desc')->get();

        // final data
        return response()->json([
            'students' => $students,
            'completedTasks' => $completedTasks,
            'teacher' => $teacher,
            'topTen' => $topTen,
            'lastProject' => $lastProject,
            'lastProjectTasks' => $lastProjectTasks,
            'literasiTasks' => $literasiTasks,
            'notAcceptedTasks' => $notAcceptedTasks,
            'socialMediaTasks' => $socialMediaTasks,
            'media' => [
                'name'  => $media->pluck('media'),
                'count' => $media->pluck('count'),
            ],
        ]);
    }

    public function finance(Request $request)
    {
        $nonKitchen = FinanceItem::with('financeAccount')
            ->select('finance_account_id', DB::raw('SUM(amount) as amount'))
            ->whereHas('financeAccount', function ($q) {
                $q->where('allocation', '<>', '117569');
            })
            ->groupBy('finance_account_id')
            ->get();

        $houseHold = FinanceItem::query()
            ->selectRaw("
            DATE_FORMAT(date, '%Y-%m') as month,
            SUM(CASE WHEN finance_account_id = 12 THEN amount ELSE 0 END) as official,
            SUM(CASE WHEN finance_account_id = 14 THEN amount ELSE 0 END) as non_official
        ")
            ->groupBy('month')
            ->orderByDesc('month')
            ->limit(12) // ambil 12 bulan terakhir dari data yang ada
            ->get()
            ->sortBy('month') // urutkan kembali ascending
            ->values();


        // Mengambil data pembayaran berdasarkan periode tagihan (billing) untuk bulan ini.
        // Format billing diasumsikan mengandung 'M-Y', contoh: 'SPP Jul-2024'.
        $currentBillingPeriod = now()->format('M-Y');
        $payCurrentMonth = PaymentItem::where('billing', 'LIKE', '%' . $currentBillingPeriod . '%')->get();

        $students = AdminStudent::whereNull('graduation')->orderBy('name')->get();

        $billingByName = PaymentBilling::select(
            'name',
            'category',
            DB::raw('COUNT(name) as count'),
            DB::raw('SUM(amount) as amount')
        )
            ->where('is_monthly', 0)
            ->where('amount', '>', 0)
            ->groupBy('name', 'category')
            ->get();

        $payDelivery = array_map(function ($billing) use ($students) {
            return [
                'billing'    => $billing->name,
                'category'   => $billing->category,
                'count'      => $students->where('payment_category', $billing->category)->count(),
                'amount'     => $billing->amount * $students->where('payment_category', $billing->category)->count(),
                'paidCount'  => PaymentItem::where('billing', 'LIKE', '%' . $billing->name . '%')->count(),
                'paidAmount' => PaymentItem::where('billing', 'LIKE', '%' . $billing->name . '%')->sum('amount'),
            ];
        }, $billingByName->all());

        $expenses = FinanceItem::with('financeAccount')
            ->select('invoice', DB::raw('MAX(date) as date'), DB::raw('MAX(remark) as remark'), DB::raw('SUM(amount) as amount'))
            ->whereHas('financeAccount', function ($q) {
                $q->where('allocation', '117569');
            })
            ->groupBy('invoice')
            ->orderBy('date', 'desc')
            ->limit(10)
            ->get();

        $outgoings = FinanceItem::with('financeAccount')
            ->select('invoice', DB::raw('MAX(date) as date'), DB::raw('MAX(remark) as remark'), DB::raw('SUM(amount) as amount'))
            ->whereHas('financeAccount', function ($q) {
                $q->where('allocation', '<>', '117569');
            })
            ->groupBy('invoice')
            ->orderBy('date', 'desc')
            ->limit(10)
            ->get();

        $inputs = FinanceItem::with('financeAccount')
            ->select('invoice', DB::raw('MAX(date) as date'), DB::raw('MAX(remark) as remark'), DB::raw('SUM(amount) as amount'))
            ->whereHas('financeAccount', function ($q) {
                $q->where('unit', 'Pemasukan');
            })
            ->groupBy('invoice')
            ->orderBy('date', 'desc')
            ->limit(10)
            ->get();

        $allocation = [
            'payments' => PaymentItem::join('finance_accounts', 'payment_items.finance_account_id', '=', 'finance_accounts.id')
                ->select(
                    'finance_accounts.number',
                    'finance_accounts.description',
                    DB::raw('SUM(amount) as amount')
                )
                ->groupBy('finance_accounts.number', 'finance_accounts.description')
                ->get(),
            'finances' => FinanceItem::join('finance_accounts', 'finance_items.finance_account_id', '=', 'finance_accounts.id')
                ->select(
                    'finance_accounts.allocation',
                    'finance_accounts.description',
                    DB::raw('SUM(finance_items.amount) as amount')
                )
                ->groupBy('finance_accounts.allocation', 'finance_accounts.description')
                ->get(),
        ];

        return response()->json([
            'nonKitchen' => $nonKitchen,
            'houseHold' => $houseHold,
            'students' => $students,
            'payCurrentMonth' => $payCurrentMonth,
            'payDelivery' => $payDelivery,
            'expenses' => $expenses,
            'outgoings' => $outgoings,
            'inputs' => $inputs,
            'allocation' => $allocation,
        ]);
    }
}
