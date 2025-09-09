<?php

use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/test-log', function () {
    Log::info('Test log dari Windows Ayah 😎');
    return 'Cek storage/logs/laravel.log';
});

Route::get('{any?}', function () {
    return view('application');
})->where('any', '.*');
