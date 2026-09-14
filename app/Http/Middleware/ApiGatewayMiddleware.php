<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\Response;
use App\Models\ApiRequestLog;

class ApiGatewayMiddleware
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
    {
        $startTime = microtime(true);

        // Assign or retrieve Request ID
        $requestId = $request->header('X-Request-Id') ?: (string) Str::uuid();
        $request->headers->set('X-Request-Id', $requestId);
        $request->attributes->set('start_time', $startTime);
        $request->attributes->set('request_id', $requestId);

        $response = $next($request);

        // Gateway Headers (Platform Standards)
        $response->headers->set('X-Request-Id', $requestId);
        $response->headers->set('X-Api-Version', '1.0.0');
        $response->headers->set('X-Platform-Name', 'JazAcademy Gateway');

        return $response;
    }

    /**
     * Perform any final actions for the request lifecycle (Observability).
     */
    public function terminate(Request $request, Response $response): void
    {
        try {
            $startTime = $request->attributes->get('start_time', microtime(true));
            $durationMs = (int) round((microtime(true) - $startTime) * 1000);
            $requestId = $request->attributes->get('request_id');

            $path = $request->path();
            $tier = 'private';
            if (str_contains($path, '/public/') || str_starts_with($path, 'api/v1/public') || str_starts_with($path, 'api/public')) {
                $tier = 'public';
            } elseif (str_contains($path, '/restricted/') || str_starts_with($path, 'api/v1/restricted')) {
                $tier = 'restricted';
            }

            $apiKey = $request->attributes->get('api_key');

            // Skip logging swagger or developer asset polling if necessary, but log all API calls
            if (str_starts_with($path, 'api/')) {
                ApiRequestLog::create([
                    'api_key_id' => $apiKey ? $apiKey->id : null,
                    'user_id' => $request->user()?->id,
                    'tier' => $tier,
                    'method' => $request->method(),
                    'endpoint' => '/' . ltrim($path, '/'),
                    'status_code' => $response->getStatusCode(),
                    'duration_ms' => $durationMs,
                    'ip_address' => $request->ip(),
                    'user_agent' => substr((string) $request->userAgent(), 0, 500),
                    'request_id' => $requestId,
                ]);
            }
        } catch (\Throwable $e) {
            // Silently catch logging errors to never disrupt API response
        }
    }
}