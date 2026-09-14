<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Symfony\Component\HttpFoundation\Response;
use App\Models\DeveloperApiKey;

class VerifyApiKey
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next, ?string $requiredScope = null): Response
    {
        $rawKey = $request->header('X-API-Key');

        if (!$rawKey) {
            $authHeader = $request->header('Authorization');
            if ($authHeader && str_starts_with($authHeader, 'Bearer jaz_')) {
                $rawKey = substr($authHeader, 7);
            }
        }

        if (!$rawKey) {
            return response()->json([
                'type' => 'https://jazacademy.id/errors/unauthorized',
                'title' => 'Missing API Key',
                'status' => 401,
                'detail' => 'Header X-API-Key is required for restricted platform endpoints.',
                'request_id' => $request->header('X-Request-Id'),
            ], 401);
        }

        $hash = hash('sha256', trim($rawKey));
        $apiKey = DeveloperApiKey::where('key_hash', $hash)->first();

        if (!$apiKey || !$apiKey->isValid()) {
            return response()->json([
                'type' => 'https://jazacademy.id/errors/unauthorized',
                'title' => 'Invalid or Inactive API Key',
                'status' => 401,
                'detail' => 'The provided API Key does not exist, has expired, or is currently inactive.',
                'request_id' => $request->header('X-Request-Id'),
            ], 401);
        }

        // Scope check if specified
        if ($requiredScope && !$apiKey->hasScope($requiredScope)) {
            return response()->json([
                'type' => 'https://jazacademy.id/errors/forbidden',
                'title' => 'Insufficient Scope',
                'status' => 403,
                'detail' => "This endpoint requires the '{$requiredScope}' permission scope.",
                'request_id' => $request->header('X-Request-Id'),
            ], 403);
        }

        // Rate Limiter per API Key
        $rateLimitKey = 'api_key_rate:' . $apiKey->id;
        $maxAttempts = $apiKey->rate_limit_per_minute ?: 120;

        if (RateLimiter::tooManyAttempts($rateLimitKey, $maxAttempts)) {
            $retryAfter = RateLimiter::availableIn($rateLimitKey);
            return response()->json([
                'type' => 'https://jazacademy.id/errors/rate-limit-exceeded',
                'title' => 'Rate Limit Exceeded',
                'status' => 429,
                'detail' => "Quota exceeded ({$maxAttempts} req/min). Please retry in {$retryAfter} seconds.",
                'retry_after' => $retryAfter,
                'request_id' => $request->header('X-Request-Id'),
            ], 429, [
                'Retry-After' => $retryAfter,
                'X-RateLimit-Limit' => $maxAttempts,
                'X-RateLimit-Remaining' => 0,
                'X-RateLimit-Reset' => now()->addSeconds($retryAfter)->timestamp,
            ]);
        }

        RateLimiter::hit($rateLimitKey, 60);

        // Update last_used_at
        $apiKey->update(['last_used_at' => now()]);

        // Attach to request
        $request->attributes->set('api_key', $apiKey);

        $response = $next($request);

        // Rate limit info headers
        $remaining = RateLimiter::remaining($rateLimitKey, $maxAttempts);
        $response->headers->set('X-RateLimit-Limit', (string) $maxAttempts);
        $response->headers->set('X-RateLimit-Remaining', (string) max(0, $remaining));

        return $response;
    }
}