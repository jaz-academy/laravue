<?php

namespace App\Http\Controllers\home;

use App\Models\FinanceItem;
use App\Models\PaymentItem;
use Illuminate\Support\Str;
use App\Models\AcademyScore;
use App\Models\AdminStudent;
use Illuminate\Http\Request;
use App\Models\PaymentBilling;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
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

        $students = AdminStudent::whereNull('graduation')->orderBy('name')->get();

        $tasksQuery = \App\Models\MediaTask::with([
            'user.adminStudent',
            'mentor.adminTeacher',
            'collaborators.adminStudent',
            'project',
        ]);

        if ($studentId) {
            $tasksQuery->where(function ($q) use ($studentId) {
                $q->whereHas('user', fn($uq) => $uq->where('admin_student_id', $studentId))
                  ->orWhereHas('collaborators', fn($cq) => $cq->where('admin_student_id', $studentId));
            });
        }

        $tasks = $tasksQuery->orderByDesc('created_at')->get();

        // Formatter function to match frontend dashboard expectations
        $formatTaskForDashboard = function ($task) {
            $studentsArr = [];
            if ($task->user && $task->user->adminStudent) {
                $s = $task->user->adminStudent;
                $studentsArr[] = [
                    'id' => $s->id,
                    'name' => $s->name,
                    'nickname' => $s->nickname,
                    'image' => $s->image ?: $task->user->image,
                ];
            }
            foreach ($task->collaborators as $collab) {
                if ($collab->adminStudent && !in_array($collab->adminStudent->id, array_column($studentsArr, 'id'))) {
                    $s = $collab->adminStudent;
                    $studentsArr[] = [
                        'id' => $s->id,
                        'name' => $s->name,
                        'nickname' => $s->nickname,
                        'image' => $s->image ?: $collab->image,
                    ];
                }
            }
            
            // Fallback if no adminStudent linked
            if (empty($studentsArr) && $task->user) {
                $studentsArr[] = [
                    'id' => $task->user->id,
                    'name' => $task->user->name,
                    'nickname' => $task->user->username ?: $task->user->name,
                    'image' => $task->user->image,
                ];
            }

            $rate = $task->grade ? round($task->grade / 20, 1) : 0; // 0-5 stars

            return [
                'id' => $task->id,
                'name' => $task->caption ? Str::limit(trim(preg_replace('/\s+/', ' ', $task->caption)), 60) : ($task->project?->title ?: 'Project Task'),
                'caption' => $task->caption,
                'link' => "/?search=" . $task->id,
                'date' => $task->created_at ? $task->created_at->format('Y-m-d H:i:s') : null,
                'rate' => $rate,
                'grade' => $task->grade,
                'media' => ucfirst($task->media_type),
                'status' => $task->status,
                'admin_student_id' => !empty($studentsArr) ? $studentsArr[0]['id'] : null,
                'students' => $studentsArr,
                'admin_teacher' => $task->mentor && $task->mentor->adminTeacher ? [
                    'id' => $task->mentor->adminTeacher->id,
                    'name' => $task->mentor->adminTeacher->name,
                    'nickname' => $task->mentor->adminTeacher->nickname,
                    'image' => $task->mentor->adminTeacher->image ?: $task->mentor->image,
                ] : ($task->mentor ? [
                    'id' => $task->mentor->id,
                    'name' => $task->mentor->name,
                    'nickname' => $task->mentor->name,
                    'image' => $task->mentor->image,
                ] : null),
                'project_plan' => [
                    'theme' => $task->project?->title ?: 'General Project',
                    'subject' => $task->project?->title ?: 'Social Media',
                ]
            ];
        };

        $formattedTasks = $tasks->map($formatTaskForDashboard);

        // 1. completedTasks stats
        $acceptedCount = $tasks->whereIn('status', ['approved', 'reviewed'])->where('grade', '>=', 70)->count();
        $completedCount = $tasks->where('status', 'approved')->count();
        $progressCount = $tasks->whereIn('status', ['pending', 'reviewed'])->where(fn($t) => $t->grade < 70 || is_null($t->grade))->count();

        $completedTasks = [
            [
                'accepted' => $acceptedCount,
                'completed' => $completedCount,
                'progress' => $progressCount,
            ]
        ];

        // 2. Popular Mentors
        $teacherReviews = [];
        foreach ($tasks->whereNotNull('mentor_id') as $t) {
            $mentorUser = $t->mentor;
            if ($mentorUser) {
                $teacherId = $mentorUser->admin_teacher_id ?: $mentorUser->id;
                if (!isset($teacherReviews[$teacherId])) {
                    $teacherObj = $mentorUser->adminTeacher;
                    $teacherReviews[$teacherId] = [
                        'admin_teacher_id' => $teacherId,
                        'count' => 0,
                        'admin_teacher' => [
                            'id' => $teacherId,
                            'name' => $teacherObj?->name ?: $mentorUser->name,
                            'nickname' => $teacherObj?->nickname ?: $mentorUser->name,
                            'note' => $teacherObj?->note ?: 'Mentor',
                            'image' => $teacherObj?->image ?: $mentorUser->image,
                        ]
                    ];
                }
                $teacherReviews[$teacherId]['count']++;
            }
        }
        usort($teacherReviews, fn($a, $b) => $b['count'] <=> $a['count']);

        // 3. Top Ten Tasks (by grade / rate)
        $topTen = $formattedTasks->filter(fn($t) => !empty($t['admin_student_id']))
            ->sortByDesc('grade')
            ->take(10)
            ->values()
            ->all();

        // 4. Last Project & Last Project Tasks
        $latestProject = \App\Models\MediaProject::has('tasks')->orderByDesc('id')->first()
            ?: \App\Models\MediaProject::orderByDesc('id')->first();

        $lastProjectData = [
            'theme' => $latestProject ? $latestProject->title : 'Project Edukasi',
            'subject' => $latestProject ? Str::limit($latestProject->description, 35) : 'Media Project',
        ];
        $lastProjectTasks = $formattedTasks->filter(function($t) use ($latestProject) {
            return $latestProject && $t['project_plan']['theme'] === $latestProject->title;
        })->values()->all();

        if (empty($lastProjectTasks)) {
            $lastProjectTasks = $formattedTasks->take(10)->values()->all();
        }

        // 5. Literasi Tasks (Project with 'Literasi' in title or document tasks)
        $literasiTasks = $formattedTasks->filter(function($t) {
            return stripos($t['project_plan']['theme'], 'Literasi') !== false || $t['media'] === 'Document';
        })->values()->all();

        if (empty($literasiTasks)) {
            $literasiTasks = $formattedTasks->take(5)->values()->all();
        }

        // 6. Social Media Tasks (Video & Image tasks)
        $socialMediaTasks = $formattedTasks->filter(function($t) {
            return in_array($t['media'], ['Video', 'Image']);
        })->values()->all();

        // 7. Not Accepted Tasks (Pending review or grade < 70)
        $notAcceptedTasks = $formattedTasks->filter(function($t) {
            return $t['status'] === 'pending' || (is_null($t['grade']) || $t['grade'] < 70);
        })->values()->all();

        // 8. Media Usage
        $mediaCounts = [
            'Video' => $tasks->where('media_type', 'video')->count(),
            'Image' => $tasks->where('media_type', 'image')->count(),
            'Document' => $tasks->where('media_type', 'document')->count(),
        ];

        return response()->json([
            'students' => $students,
            'completedTasks' => $completedTasks,
            'teacher' => array_values($teacherReviews),
            'topTen' => $topTen,
            'lastProject' => $lastProjectData,
            'lastProjectTasks' => $lastProjectTasks,
            'literasiTasks' => $literasiTasks,
            'notAcceptedTasks' => $notAcceptedTasks,
            'socialMediaTasks' => $socialMediaTasks,
            'media' => [
                'name'  => array_keys($mediaCounts),
                'count' => array_values($mediaCounts),
            ],
        ]);
    }


    public function finance(Request $request)
    {
        $year = $request->query('year');

        // range tahun ajaran (July - June)
        $rangeStart = $year ? $year . '-07-01' : null;
        $rangeEnd   = $year ? ($year + 1) . '-06-30' : null;

        // Non Kitchen
        $nonKitchen = FinanceItem::with('financeAccount')
            ->select('finance_account_id', DB::raw('SUM(amount) as amount'))
            ->whereHas('financeAccount', fn($q) => $q->where('allocation', '<>', '117569'));

        if ($year) {
            $nonKitchen->whereBetween('date', [$rangeStart, $rangeEnd]);
        }

        $nonKitchen = $nonKitchen->groupBy('finance_account_id')->get();

        // Household (official vs non_official)
        $houseHold = FinanceItem::query()
            ->selectRaw("
            MAX(date) as date,
            TO_CHAR(date, 'YYYY-MM') as month,
            SUM(CASE WHEN finance_account_id = 12 THEN amount ELSE 0 END) as official,
            SUM(CASE WHEN finance_account_id = 14 THEN amount ELSE 0 END) as non_official
        ");

        if ($year) {
            $houseHold->whereBetween('date', [$rangeStart, $rangeEnd]);
        }

        $houseHold = $houseHold->groupBy(DB::raw("TO_CHAR(date, 'YYYY-MM')"))
            ->orderBy(DB::raw("TO_CHAR(date, 'YYYY-MM')"), 'desc')
            ->limit(12)
            ->get()
            ->sortBy('month')
            ->values();

        // Send all payments for the selected academic year. Filtering will be done on the frontend.
        $payCurrentMonth = PaymentItem::query();
        if ($year) {
            $payCurrentMonth->whereBetween('date', [$rangeStart, $rangeEnd]);
        } else {
            // If no year is selected, get payments for the current calendar year as a fallback.
            $payCurrentMonth->whereYear('date', now()->year);
        }
        $payCurrentMonth = $payCurrentMonth->get();

        // Students
        $students = AdminStudent::whereNull('graduation')->orderBy('name')->get();

        // Billing (non monthly)
        $billingByName = PaymentBilling::select(
            'name',
            'category',
            DB::raw('MAX(year) as year'),
            DB::raw('COUNT(name) as count'),
            DB::raw('SUM(amount) as amount')
        )
            ->where('is_monthly', 0)
            ->where('amount', '>', 0);

        if ($year) {
            $billingByName->where('year', $year);
        }

        $billingByName = $billingByName->groupBy('name', 'category')->get();

        $payDelivery = array_map(function ($billing) use ($students) {
            return [
                'billing'    => $billing->name,
                'year'       => $billing->year,
                'category'   => $billing->category,
                'count'      => $students->where('payment_category', $billing->category)->count(),
                'amount'     => $billing->amount * $students->where('payment_category', $billing->category)->count(),
                'paidCount'  => PaymentItem::where('billing', 'LIKE', '%' . $billing->name . '%')->count(),
                'paidAmount' => PaymentItem::where('billing', 'LIKE', '%' . $billing->name . '%')->sum('amount'),
            ];
        }, $billingByName->all());

        // Expenses (kitchen)
        $expenses = FinanceItem::with('financeAccount')
            ->select('invoice', DB::raw('MAX(date) as date'), DB::raw('MAX(remark) as remark'), DB::raw('SUM(amount) as amount'))
            ->whereHas('financeAccount', fn($q) => $q->where('allocation', '117569'));

        if ($year) {
            $expenses->whereBetween('date', [$rangeStart, $rangeEnd]);
        }

        $expenses = $expenses->groupBy('invoice')->orderBy('date', 'desc')->limit(10)->get();

        // Outgoings (non kitchen)
        $outgoings = FinanceItem::with('financeAccount')
            ->select('invoice', DB::raw('MAX(date) as date'), DB::raw('MAX(remark) as remark'), DB::raw('SUM(amount) as amount'))
            ->whereHas('financeAccount', fn($q) => $q->where('allocation', '<>', '117569'));

        if ($year) {
            $outgoings->whereBetween('date', [$rangeStart, $rangeEnd]);
        }

        $outgoings = $outgoings->groupBy('invoice')->orderBy('date', 'desc')->limit(10)->get();

        // Inputs (pemasukan)
        $inputs = FinanceItem::with('financeAccount')
            ->select('invoice', DB::raw('MAX(date) as date'), DB::raw('MAX(remark) as remark'), DB::raw('SUM(amount) as amount'))
            ->whereHas('financeAccount', fn($q) => $q->where('unit', 'Pemasukan'));

        if ($year) {
            $inputs->whereBetween('date', [$rangeStart, $rangeEnd]);
        }

        $inputs = $inputs->groupBy('invoice')->orderBy('date', 'desc')->limit(10)->get();

        // Payments
        $payments = PaymentItem::join('finance_accounts', 'payment_items.finance_account_id', '=', 'finance_accounts.id')
            ->select(
                'finance_accounts.number',
                'finance_accounts.description',
                DB::raw('SUM(amount) as amount')
            );

        if ($year) {
            $payments->where('period', $year);
        }

        $payments = $payments->groupBy('finance_accounts.number', 'finance_accounts.description')->get();

        // Finances
        $finances = FinanceItem::join('finance_accounts', 'finance_items.finance_account_id', '=', 'finance_accounts.id')
            ->select(
                'finance_accounts.allocation',
                'finance_accounts.description',
                'finance_accounts.unit',
                DB::raw('MAX(date) as date'),
                DB::raw("SUM(CASE 
                    WHEN finance_accounts.unit = 'Pemasukan' 
                    THEN finance_items.amount * -1
                    ELSE finance_items.amount
                END) as amount")

            );

        if ($year) {
            $finances->whereBetween('date', [$rangeStart, $rangeEnd]);
        }


        $finances = $finances->groupBy('finance_accounts.allocation', 'finance_accounts.description', 'finance_accounts.unit')->get();

        return response()->json([
            'nonKitchen' => $nonKitchen,
            'houseHold' => $houseHold,
            'students' => $students,
            'payCurrentMonth' => $payCurrentMonth,
            'payDelivery' => $payDelivery,
            'expenses' => $expenses,
            'outgoings' => $outgoings,
            'inputs' => $inputs,
            'allocation' => [
                'payments' => $payments,
                'finances' => $finances,
            ],
        ]);
    }
}
