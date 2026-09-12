<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Sanctum\PersonalAccessToken;

class SyncSanctumSession
{
    /**
     * Handle an incoming request.
     * Synchronize Sanctum accessToken cookie with Laravel's web guard session.
     */
    public function handle(Request $request, Closure $next)
    {
        if (Auth::guard('web')->guest()) {
            $rawToken = $request->cookie('accessToken') ?? $request->bearerToken();
            if ($rawToken) {
                $token = PersonalAccessToken::findToken($rawToken);
                if ($token && $token->tokenable) {
                    Auth::guard('web')->login($token->tokenable);
                }
            }
        }

        return $next($request);
    }
}
