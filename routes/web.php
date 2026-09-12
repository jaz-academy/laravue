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

Route::get('/login', function () {
    return view('application');
})->name('login');

Route::get('/oauth/popup-callback', function () {
    return view('oauth.popup-callback');
})->name('oauth.popup-callback');

Route::get('/.well-known/openid-configuration', function () {
    return response()->json([
        'issuer' => url('/'),
        'authorization_endpoint' => url('/oauth/authorize'),
        'token_endpoint' => url('/oauth/token'),
        'userinfo_endpoint' => url('/api/oauth/user'),
        'scopes_supported' => ['profile', 'email'],
        'response_types_supported' => ['code', 'token'],
        'grant_types_supported' => ['authorization_code', 'refresh_token', 'client_credentials', 'personal_access'],
        'subject_types_supported' => ['public'],
        'id_token_signing_alg_values_supported' => ['RS256'],
        'token_endpoint_auth_methods_supported' => ['client_secret_post', 'client_secret_basic'],
    ]);
});

Route::get('{any?}', function () {
    return view('application');
})->where('any', '.*');
