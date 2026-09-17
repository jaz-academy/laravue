<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\admin\EventController;
use App\Http\Controllers\admin\SchoolController;
use App\Http\Controllers\academy\AwardController;
use App\Http\Controllers\academy\ScoreController;
use App\Http\Controllers\admin\StudentController;
use App\Http\Controllers\admin\TeacherController;
use App\Http\Controllers\academy\CourseController;
use App\Http\Controllers\payment\SavingController;
use App\Http\Controllers\academy\SubjectController;
use App\Http\Controllers\academy\PlanController;
use App\Http\Controllers\academy\TaskController;
use App\Http\Controllers\academy\ReflectionController;
use App\Http\Controllers\finance\AccountController;
use App\Http\Controllers\finance\FinanceController;
use App\Http\Controllers\payment\BillingController;
use App\Http\Controllers\payment\PaymentController;
use App\Http\Controllers\payment\DiscountController;
use App\Http\Controllers\academy\CompetenceController;
use App\Http\Controllers\finance\DepositController;
use App\Http\Controllers\home\DashboardController;
use App\Http\Controllers\Api\Media\PublicMediaController;
use App\Http\Controllers\Api\Media\TaskMediaController;
use App\Http\Controllers\Api\Media\ProjectMediaController;
use App\Http\Controllers\Api\Media\BlogMediaController;
use App\Http\Controllers\Api\Media\ExploreMediaController;
use App\Http\Controllers\Api\Media\NotificationMediaController;
use App\Http\Controllers\Api\Media\UserMediaController;
use App\Http\Controllers\Api\Media\AdminMediaController;
use App\Http\Controllers\Api\Media\AuthMediaController;
use App\Http\Controllers\Api\Media\DriveMediaController;
use App\Http\Controllers\Api\Media\ReflectionMediaController;
use App\Models\FinanceDeposit;
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
  Route::get('tasks/best', [PublicMediaController::class, 'bestTasks']);
  Route::get('tasks/all', [PublicMediaController::class, 'allMediaTasks']);
  Route::get('members', [PublicMediaController::class, 'members']);
  Route::get('members/{id}', [PublicMediaController::class, 'memberById']);
  Route::get('tasks/member/{id}', [PublicMediaController::class, 'tasksByMember']);
  Route::get('media/stream/{id}', [PublicMediaController::class, 'streamMedia']);
  Route::get('media/image/{id}', [PublicMediaController::class, 'proxyImage']);
  Route::get('media/proxy-pdf', [PublicMediaController::class, 'proxyPdf']);
  Route::get('drive/stream/{id}', [PublicMediaController::class, 'streamMedia']);
  Route::get('proxy-pdf', [PublicMediaController::class, 'proxyPdf']);

  Route::get('students', [StudentController::class, 'index']);
  Route::get('student/{id}', [StudentController::class, 'show']);
  Route::get('students-show', [StudentController::class, 'showAll']);
  Route::get('teachers', [TeacherController::class, 'index']);
  Route::get('teacher/{id}', [TeacherController::class, 'show']);
  Route::get('teachers-show', [TeacherController::class, 'showAll']);
  Route::get('students/years', [StudentController::class, 'years']);

  Route::get('task-by-student/{id}', [PublicMediaController::class, 'taskByStudent']);
  Route::get('task-by-teacher/{id}', [PublicMediaController::class, 'taskByTeacher']);
  Route::get('plans-with-tasks', [PublicMediaController::class, 'plansWithTasks']);
  Route::get('plans', [PublicMediaController::class, 'plans']);
  Route::get('all-tasks', [PublicMediaController::class, 'allTasks']);
  Route::get('tasks', [PublicMediaController::class, 'publicTasks']);
  Route::get('home-tasks-with-all', [PublicMediaController::class, 'homeTasksWithAll']);
  Route::get('upload-tasks-with-all', [PublicMediaController::class, 'uploadTasksWithAll']);
  Route::get('instagram-tasks-with-all', [PublicMediaController::class, 'instagramTasksWithAll']);
});

/*
|--------------------------------------------------------------------------
| JazMedia Integration API Routes
|--------------------------------------------------------------------------
*/
Route::group(['prefix' => 'media'], function () {
  // Auth & Instagram (Public)
  Route::post('auth/register', [AuthMediaController::class, 'register']);
  Route::post('auth/login', [AuthMediaController::class, 'login']);
  Route::post('auth/sso-exchange', [AuthMediaController::class, 'exchangeSsoTicket']);
  Route::post('auth/instagram/exchange-code', [AuthMediaController::class, 'exchangeInstagramCode']);

  // Public / Read Endpoints
  Route::get('tasks', [TaskMediaController::class, 'index']);
  Route::get('tasks/best-performance', [TaskMediaController::class, 'bestPerformance']);
  Route::get('tasks/user/{userId}', [TaskMediaController::class, 'userTasks']);
  Route::get('tasks/{id}/comments', [TaskMediaController::class, 'getComments']);

  Route::get('projects', [ProjectMediaController::class, 'index']);
  Route::get('projects/{id}', [ProjectMediaController::class, 'show']);

  Route::get('blogs', [BlogMediaController::class, 'index']);
  Route::get('blogs/categories', [BlogMediaController::class, 'categories']);
  Route::get('blogs/{idOrSlug}', [BlogMediaController::class, 'show']);
  Route::get('blogs/{id}/comments', [BlogMediaController::class, 'getComments']);

  Route::get('explore/tasks', [ExploreMediaController::class, 'searchTasks']);
  Route::get('explore/users', [ExploreMediaController::class, 'searchUsers']);
  Route::get('explore/projects', [ExploreMediaController::class, 'searchProjects']);
  Route::get('explore/streaks', [ExploreMediaController::class, 'getStreaks']);

  Route::get('users/{id}/public', [UserMediaController::class, 'publicProfile']);

  // Reflections (Public Feed)
  Route::get('reflections', [ReflectionMediaController::class, 'index']);
  Route::get('reflections/{id}', [ReflectionMediaController::class, 'show']);

  // Authenticated Endpoints (Sanctum & Passport)
  Route::group(['middleware' => 'auth:sanctum,api'], function () {
    // Tasks
    Route::post('tasks', [TaskMediaController::class, 'store']);
    Route::get('tasks/form-data', [TaskMediaController::class, 'formData']);
    Route::post('tasks/{id}/like', [TaskMediaController::class, 'toggleLike']);
    Route::post('tasks/{id}/comments', [TaskMediaController::class, 'addComment']);
    Route::put('tasks/{id}/caption', [TaskMediaController::class, 'updateCaption']);
    Route::put('tasks/{id}/review', [TaskMediaController::class, 'submitReview']);
    Route::put('tasks/{id}/approve', [TaskMediaController::class, 'approveTask']);
    Route::delete('tasks/{id}', [TaskMediaController::class, 'destroy']);

    // Projects
    Route::post('projects', [ProjectMediaController::class, 'store']);
    Route::put('projects/{id}', [ProjectMediaController::class, 'update']);
    Route::delete('projects/{id}', [ProjectMediaController::class, 'destroy']);

    // Blogs
    Route::post('blogs', [BlogMediaController::class, 'store']);
    Route::put('blogs/{id}', [BlogMediaController::class, 'update']);
    Route::delete('blogs/{id}', [BlogMediaController::class, 'destroy']);
    Route::post('blogs/{id}/like', [BlogMediaController::class, 'toggleLike']);
    Route::post('blogs/{id}/comments', [BlogMediaController::class, 'addComment']);

    // Notifications
    Route::get('notifications/pending-tasks', [NotificationMediaController::class, 'pendingTasks']);
    Route::get('notifications/reviewed-tasks', [NotificationMediaController::class, 'reviewedTasks']);
    Route::get('notifications/system-reminders', [NotificationMediaController::class, 'systemReminders']);
    Route::get('notifications/unread-count', [NotificationMediaController::class, 'unreadCount']);

    // Profile & Users
    Route::get('profile', [UserMediaController::class, 'profile']);
    Route::put('profile', [UserMediaController::class, 'updateProfile']);
    Route::post('profile/upload-picture', [UserMediaController::class, 'uploadPicture']);

    // Instagram Account Link / Unlink & SSO Ticket
    Route::post('auth/sso-ticket', [AuthMediaController::class, 'createSsoTicket']);
    Route::post('auth/instagram/link', [AuthMediaController::class, 'linkInstagram']);
    Route::post('auth/instagram/unlink', [AuthMediaController::class, 'unlinkInstagram']);

    // Reflections
    Route::post('reflections', [ReflectionMediaController::class, 'store']);
    Route::get('reflections/user/me', [ReflectionMediaController::class, 'myReflections']);

    // Google Drive Upload
    Route::post('drive/upload-session', [DriveMediaController::class, 'createUploadSession']);
    Route::post('drive/finalize', [DriveMediaController::class, 'finalizeUpload']);

    // Admin Master Data
    Route::get('admin/users', [AdminMediaController::class, 'users']);
    Route::put('admin/users/{id}/role', [AdminMediaController::class, 'updateRole']);
    Route::delete('admin/users/{id}', [AdminMediaController::class, 'deleteUser']);
    Route::get('admin/mentors', [AdminMediaController::class, 'mentors']);
    Route::get('admin/users-select', [AdminMediaController::class, 'usersForSelect']);
    Route::get('admin/projects', [AdminMediaController::class, 'projects']);
    Route::get('admin/tasks', [AdminMediaController::class, 'tasks']);
  });
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
  Route::get('dashboard-finance', [DashboardController::class, 'finance']);

  Route::apiResource('schools', SchoolController::class);
  Route::apiResource('students', StudentController::class);
  Route::apiResource('teachers', TeacherController::class);

  Route::apiResource('events', EventController::class);

  Route::apiResource('courses', CourseController::class);
  Route::get('courses-distinct', [CourseController::class, 'distinct']);
  Route::get('courses-by-name/{name}', [CourseController::class, 'byName']);
  Route::get('courses-custom', [CourseController::class, 'custom']);
  Route::apiResource('awards', AwardController::class);
  Route::get('awards-custom', [AwardController::class, 'custom']);
  Route::apiResource('subjects', SubjectController::class);
  Route::apiResource('plans', PlanController::class);
  Route::apiResource('tasks', TaskController::class);
  Route::apiResource('competences', CompetenceController::class);
  Route::apiResource('scores', ScoreController::class);
  Route::get('scores-distinct', [ScoreController::class, 'distinct']);
  Route::get('scores-by-serial/{serial}', [ScoreController::class, 'scoreBySerial']);
  Route::post('scores/bulk-store', [ScoreController::class, 'bulkStore']);
  Route::get('scores-by-person', [ScoreController::class, 'scoreByPerson']);
  Route::get('reflections/timeline', [ReflectionController::class, 'timeline']);
  Route::apiResource('reflections', ReflectionController::class);

  Route::apiResource('accounts', AccountController::class);
  Route::apiResource('deposits', DepositController::class);
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

  // OAuth Clients Developer Portal API
  Route::get('oauth/clients', [\App\Http\Controllers\admin\OAuthClientController::class, 'index']);
  Route::post('oauth/clients', [\App\Http\Controllers\admin\OAuthClientController::class, 'store']);
  Route::put('oauth/clients/{id}', [\App\Http\Controllers\admin\OAuthClientController::class, 'update']);
  Route::post('oauth/clients/{id}/regenerate-secret', [\App\Http\Controllers\admin\OAuthClientController::class, 'regenerateSecret']);
  Route::delete('oauth/clients/{id}', [\App\Http\Controllers\admin\OAuthClientController::class, 'destroy']);
});

Route::get('/register/check-username', [\App\Http\Controllers\AuthController::class, 'checkUsername']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/mail/account', [\App\Http\Controllers\MailController::class, 'account']);
    Route::get('/mail', [\App\Http\Controllers\MailController::class, 'index']);
    Route::get('/mail/{folder}', [\App\Http\Controllers\MailController::class, 'index']);
    Route::post('/mail/send', [\App\Http\Controllers\MailController::class, 'send']);
    Route::get('/mail/{folder}/{uid}', [\App\Http\Controllers\MailController::class, 'show']);
    Route::delete('/mail/{folder}/{uid}', [\App\Http\Controllers\MailController::class, 'destroy']);
});

// OAuth2 / OpenID Connect UserInfo Endpoint (RFC 6749)
Route::middleware('auth:api')->get('/oauth/user', [\App\Http\Controllers\OAuth\OAuthUserController::class, 'user']);

/*
|--------------------------------------------------------------------------
| Developer Platform & Standardized 3-Tier Architecture API Routes (v1)
|--------------------------------------------------------------------------
*/

// --- Developer Portal Management API (Sanctum Authenticated) ---
Route::middleware('auth:sanctum')->prefix('developer')->group(function () {
    Route::get('keys', [\App\Http\Controllers\Developer\ApiKeyController::class, 'index']);
    Route::post('keys', [\App\Http\Controllers\Developer\ApiKeyController::class, 'store']);
    Route::put('keys/{id}', [\App\Http\Controllers\Developer\ApiKeyController::class, 'update']);
    Route::post('keys/{id}/regenerate', [\App\Http\Controllers\Developer\ApiKeyController::class, 'regenerate']);
    Route::delete('keys/{id}', [\App\Http\Controllers\Developer\ApiKeyController::class, 'destroy']);

    Route::get('analytics/overview', [\App\Http\Controllers\Developer\ApiAnalyticsController::class, 'overview']);
    Route::get('analytics/timeseries', [\App\Http\Controllers\Developer\ApiAnalyticsController::class, 'timeseries']);
    Route::get('analytics/logs', [\App\Http\Controllers\Developer\ApiAnalyticsController::class, 'logs']);

    Route::get('docs', [\App\Http\Controllers\Developer\ApiDocumentationController::class, 'index']);
});

// Public docs spec for developers without login
Route::get('developer/public-docs', [\App\Http\Controllers\Developer\ApiDocumentationController::class, 'index']);

// --- TIER 1: Public (Without Key) ---
Route::prefix('v1/public')->group(function () {
    Route::get('tasks/best', [PublicMediaController::class, 'bestTasks']);
    Route::get('members', [PublicMediaController::class, 'members']);
    Route::get('members/{id}', [PublicMediaController::class, 'memberById']);
    Route::get('tasks/member/{id}', [PublicMediaController::class, 'tasksByMember']);
    Route::get('blogs', [BlogMediaController::class, 'index']);
    Route::get('blogs/categories', [BlogMediaController::class, 'categories']);
    Route::get('blogs/{idOrSlug}', [BlogMediaController::class, 'show']);
    Route::get('students', [StudentController::class, 'index']);
    Route::get('student/{id}', [StudentController::class, 'show']);
    Route::get('teachers', [TeacherController::class, 'index']);
    Route::get('teacher/{id}', [TeacherController::class, 'show']);
    Route::get('tasks', [PublicMediaController::class, 'publicTasks']);
    Route::get('plans', [PublicMediaController::class, 'plans']);
});

// --- TIER 2: Restricted (With Key - Header X-API-Key) ---
Route::middleware('api.key')->prefix('v1/restricted')->group(function () {
    Route::get('projects', [ProjectMediaController::class, 'index']);
    Route::get('projects/{id}', [ProjectMediaController::class, 'show']);
    Route::get('tasks', [TaskMediaController::class, 'index']);
    Route::get('tasks/best-performance', [TaskMediaController::class, 'bestPerformance']);
    Route::get('tasks/user/{userId}', [TaskMediaController::class, 'userTasks']);
    Route::post('tasks', [TaskMediaController::class, 'store']);
    Route::get('courses', [CourseController::class, 'index']);
    Route::get('subjects', [SubjectController::class, 'index']);
});

// --- TIER 3: Private (Only For This App - Sanctum & Internal Guard) ---
Route::middleware(['auth:sanctum', 'api.private'])->prefix('v1/private')->group(function () {
    Route::get('dashboard-academic', [DashboardController::class, 'academy']);
    Route::get('dashboard-project', [DashboardController::class, 'project']);
    Route::get('dashboard-finance', [DashboardController::class, 'finance']);
    Route::apiResource('schools', SchoolController::class);
    Route::apiResource('students', StudentController::class);
    Route::apiResource('teachers', TeacherController::class);
    Route::apiResource('courses', CourseController::class);
    Route::apiResource('scores', ScoreController::class);
    Route::post('scores/bulk-store', [ScoreController::class, 'bulkStore']);
    Route::apiResource('finances', FinanceController::class);
    Route::apiResource('billings', BillingController::class);
    Route::apiResource('payments', PaymentController::class);
    Route::apiResource('reflections', ReflectionController::class);
});


