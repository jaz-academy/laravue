<?php

use App\Http\Controllers\academy\AwardController;
use App\Http\Controllers\academy\CompetenceController;
use App\Http\Controllers\academy\CourseController;
use App\Http\Controllers\academy\ScoreController;
use App\Http\Controllers\academy\SubjectController;
use App\Http\Controllers\admin\EventController;
use App\Http\Controllers\admin\SchoolController;
use App\Http\Controllers\admin\StudentController;
use App\Http\Controllers\admin\TeacherController;
use App\Http\Controllers\media\BookmarkController;
use App\Http\Controllers\media\CommentController;
use App\Http\Controllers\media\LikeController;
use App\Http\Controllers\media\ParticipantController;
use App\Http\Controllers\media\StoryController;
use App\Http\Controllers\project\PlanController;
use App\Http\Controllers\project\TaskController;
use App\Http\Controllers\finance\AccountController;
use App\Http\Controllers\finance\FinanceController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\payment\BillingController;
use App\Http\Controllers\payment\DiscountController;
use App\Http\Controllers\payment\PaymentController;
use App\Http\Controllers\payment\SavingController;
use Illuminate\Http\Request;

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

Route::apiResource('participants', ParticipantController::class);
Route::apiResource('bookmarks', BookmarkController::class);
Route::apiResource('likes', LikeController::class);
Route::apiResource('comments', CommentController::class);
Route::apiResource('stories', StoryController::class);

Route::apiResource('schools', SchoolController::class);
Route::apiResource('students', StudentController::class);
Route::apiResource('teachers', TeacherController::class);

Route::apiResource('events', EventController::class);
Route::apiResource('plans', PlanController::class);
Route::apiResource('tasks', TaskController::class);

Route::group(['prefix' => 'auth'], function () {
  Route::post('login', [AuthController::class, 'login']);
  Route::post('register', [AuthController::class, 'register']);

  Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::get('logout', [AuthController::class, 'logout']);
    Route::get('user', [AuthController::class, 'user']);

    Route::apiResource('courses', CourseController::class);
    Route::apiResource('awards', AwardController::class);
    Route::apiResource('subjects', SubjectController::class);
    Route::apiResource('competences', CompetenceController::class);
    Route::apiResource('scores', ScoreController::class);

    Route::apiResource('accounts', AccountController::class);
    Route::apiResource('finances', FinanceController::class);
    Route::apiResource('billings', BillingController::class);
    Route::apiResource('discounts', DiscountController::class);
    Route::apiResource('payments', PaymentController::class);
    Route::apiResource('savings', SavingController::class);
  });
});
