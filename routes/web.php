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

Route::get('/logout', function (\Illuminate\Http\Request $request) {
    \Illuminate\Support\Facades\Auth::logout();
    $request->session()->invalidate();
    $request->session()->regenerateToken();

    $returnUrl = $request->query('return_url', '/login');
    return redirect($returnUrl)
        ->withoutCookie('userData')
        ->withoutCookie('accessToken')
        ->withoutCookie('userAbilityRules');
})->name('web.logout');

Route::get('/oauth/authorize', function (\Illuminate\Http\Request $request) {
    if ($request->get('prompt') === 'login') {
        \Illuminate\Support\Facades\Auth::guard('web')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        $request->session()->forget('promptedForLogin');

        $cleanParams = $request->except('prompt');
        $authorizeUrl = url('/oauth/authorize') . '?' . http_build_query($cleanParams);

        return redirect('/login?return_to=' . urlencode($authorizeUrl))
            ->withoutCookie('userData')
            ->withoutCookie('accessToken')
            ->withoutCookie('userAbilityRules');
    }

    return app(\Laravel\Passport\Http\Controllers\AuthorizationController::class)->authorize(
        app(\Psr\Http\Message\ServerRequestInterface::class),
        $request,
        app(\Laravel\Passport\ClientRepository::class),
        app(\Laravel\Passport\TokenRepository::class)
    );
})->middleware('web')->name('passport.authorizations.authorize');

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

Route::get('/sso/jazmedia', function (\Illuminate\Http\Request $request) {
    if (\Illuminate\Support\Facades\Auth::check()) {
        $user = \Illuminate\Support\Facades\Auth::user();
        $ticket = 'sso_' . \Illuminate\Support\Str::random(64);
        \Illuminate\Support\Facades\Cache::put("jazmedia_sso_ticket:{$ticket}", $user->id, 300);

        $mediaBaseUrl = env('JAZMEDIA_BASE_URL', 'http://localhost:3000');
        return redirect(rtrim($mediaBaseUrl, '/') . '/auth/sso?ticket=' . $ticket);
    }

    return redirect('/login?redirect=' . urlencode('/sso/jazmedia'));
});

Route::get('{any?}', function () {
    return view('application');
})->where('any', '.*');
