<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\media\LikeController;
use App\Http\Controllers\admin\EventController;
use App\Http\Controllers\media\StoryController;
use App\Http\Controllers\admin\SchoolController;
use App\Http\Controllers\project\PlanController;
use App\Http\Controllers\project\TaskController;
use App\Http\Controllers\academy\AwardController;
use App\Http\Controllers\academy\ScoreController;
use App\Http\Controllers\admin\StudentController;
use App\Http\Controllers\admin\TeacherController;
use App\Http\Controllers\media\CommentController;
use App\Http\Controllers\academy\CourseController;
use App\Http\Controllers\media\BookmarkController;
use App\Http\Controllers\payment\SavingController;
use App\Http\Controllers\academy\SubjectController;
use App\Http\Controllers\finance\AccountController;
use App\Http\Controllers\finance\FinanceController;
use App\Http\Controllers\payment\BillingController;
use App\Http\Controllers\payment\PaymentController;
use App\Http\Controllers\payment\DiscountController;
use App\Http\Controllers\media\ParticipantController;
use App\Http\Controllers\academy\CompetenceController;
use App\Http\Controllers\home\DashboardController;
use SebastianBergmann\CodeCoverage\Report\Html\Dashboard;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::get('login', function () {
  return response()->json(['message' => 'Welcome to the API']);
})->name('login-api');

Route::group(['prefix' => 'public'], function () {
  Route::get('students', [StudentController::class, 'index']);
  Route::get('student/{id}', [StudentController::class, 'show']);
  Route::get('students-show', [StudentController::class, 'showAll']);
  Route::get('teachers', [TeacherController::class, 'index']);
  Route::get('teacher/{id}', [TeacherController::class, 'show']);
  Route::get('teachers-show', [TeacherController::class, 'showAll']);
  Route::get('home-tasks-with-all', [TaskController::class, 'homeTasksWithAll']);
  Route::get('upload-tasks-with-all', [TaskController::class, 'uploadTasksWithAll']);
  Route::get('instagram-tasks-with-all', [TaskController::class, 'instagramTasksWithAll']);
  Route::get('plans-with-tasks', [PlanController::class, 'planWithTasks']);
  Route::get('plans', [PlanController::class, 'index']);
  Route::get('tasks', [TaskController::class, 'index']);
  Route::get('all-tasks', [TaskController::class, 'allTasks']);
  Route::get('task-by-student/{id}', [TaskController::class, 'getTaskByStudent']);
  Route::get('task-by-teacher/{id}', [TaskController::class, 'getTaskByTeacher']);
  Route::get('task-by-plan/{id}', [TaskController::class, 'getTaskByProjectPlan']);
  Route::post('sign-in-participant', [ParticipantController::class, 'signIn']);
  Route::get('bookmarks-by-participant/{id}', [BookmarkController::class, 'getByParticipant']);
  Route::post('update-task-accepted/{task}', [TaskController::class, 'updateTaskAccepted']);
  Route::apiResource('bookmarks', BookmarkController::class);
  Route::apiResource('participants', ParticipantController::class);
  Route::get('students/years', [StudentController::class, 'years']);
});

Route::group(['prefix' => 'auth'], function () {
  Route::post('login', [AuthController::class, 'login']);
  Route::post('register', [AuthController::class, 'register']);
});

Route::group(['middleware' => 'auth:sanctum'], function () {
  Route::get('logout', [AuthController::class, 'logout']);
  Route::get('user', [AuthController::class, 'user']);
  Route::get('users', [AuthController::class, 'users']);
  Route::patch('users/{user}', [AuthController::class, 'update']);
  Route::delete('users/{user}', [AuthController::class, 'destroy']);
  Route::put('user/password', [AuthController::class, 'updatePassword']);
  Route::put('user/role', [AuthController::class, 'updateRole']);
  Route::put('user/profile', [AuthController::class, 'updateProfile']);

  Route::get('dashboard-academic', [DashboardController::class, 'academy']);
  Route::get('dashboard-project', [DashboardController::class, 'project']);

  Route::apiResource('likes', LikeController::class);
  Route::apiResource('comments', CommentController::class);
  Route::apiResource('stories', StoryController::class);

  Route::apiResource('schools', SchoolController::class);
  Route::apiResource('students', StudentController::class);
  Route::apiResource('teachers', TeacherController::class);

  Route::apiResource('events', EventController::class);
  Route::apiResource('plans', PlanController::class);
  Route::apiResource('tasks', TaskController::class);
  Route::delete('tasks/{id}', [TaskController::class, 'destroy']);

  Route::apiResource('courses', CourseController::class);
  Route::get('courses-distinct', [CourseController::class, 'distinct']);
  Route::get('courses-by-name/{name}', [CourseController::class, 'byName']);
  Route::get('courses-custom', [CourseController::class, 'custom']);
  Route::apiResource('awards', AwardController::class);
  Route::get('awards-custom', [AwardController::class, 'custom']);
  Route::apiResource('subjects', SubjectController::class);
  Route::apiResource('competences', CompetenceController::class);
  Route::apiResource('scores', ScoreController::class);
  Route::get('scores-distinct', [ScoreController::class, 'distinct']);
  Route::get('scores-by-serial/{serial}', [ScoreController::class, 'scoreBySerial']);
  Route::post('scores/bulk-store', [ScoreController::class, 'bulkStore']);
  Route::get('scores-by-person', [ScoreController::class, 'scoreByPerson']);

  Route::apiResource('accounts', AccountController::class);
  Route::apiResource('finances', FinanceController::class);
  Route::get('finances-distinct', [FinanceController::class, 'distinct']);
  Route::get('finances-by-invoice/{invoice}', [FinanceController::class, 'financeByInvoice']);
  Route::post('finances/bulk-store', [FinanceController::class, 'bulkStore']);

  Route::apiResource('savings', SavingController::class);
  Route::apiResource('discounts', DiscountController::class);
  Route::get('discounts-by-year/{year}/{studentId}', [DiscountController::class, 'discountByYear']);
  Route::apiResource('billings', BillingController::class);
  Route::get('billings-distinct', [BillingController::class, 'distinct']);
  Route::get('billings-by-year/{year}/{category}', [BillingController::class, 'billingByYear']);
  Route::post('billings/bulk-store', [BillingController::class, 'bulkStore']);

  Route::apiResource('payments', PaymentController::class);
  Route::get('payments-distinct', [PaymentController::class, 'distinct']);
  Route::get('payments-by-invoice/{invoice}', [PaymentController::class, 'paymentByInvoice']);
  Route::get('payments-by-year/{year}/{studentId}', [PaymentController::class, 'paymentByYear']);
  Route::get('payments-by-student/{studentId}', [PaymentController::class, 'paymentByStudent']);
  Route::post('payments/bulk-store', [PaymentController::class, 'bulkStore']);

  Route::get('/notifications', function () {
    return response()->json(auth()->user()->notifications);
  });

  Route::get('/notifications/unread', function () {
    return response()->json(auth()->user()->unreadNotifications);
  });

  Route::post('/notifications/{id}/read', fn($id) => tap(auth()->user()->notifications()->findOrFail($id))->markAsRead());
  Route::post('/notifications/{id}/unread', fn($id) => auth()->user()->notifications()->where('id', $id)->update(['read_at' => null]));

  Route::delete('/notifications/{id}', fn($id) => auth()->user()->notifications()->where('id', $id)->delete());
});
