<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureInternalApp
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Reject if caller is attempting to use an external API Key on private core endpoints
        if ($request->header('X-API-Key') || str_starts_with((string) $request->header('Authorization'), 'Bearer jaz_')) {
            return response()->json([
                'type' => 'https://jazacademy.id/errors/forbidden',
                'title' => 'Private Endpoint Restricted',
                'status' => 403,
                'detail' => 'This private endpoint is reserved exclusively for internal JazAcademy core application sessions and cannot be accessed via external developer API Keys.',
                'request_id' => $request->header('X-Request-Id'),
            ], 403);
        }

        if (!$request->user()) {
            return response()->json([
                'type' => 'https://jazacademy.id/errors/unauthorized',
                'title' => 'Authentication Required',
                'status' => 401,
                'detail' => 'Active internal session or Sanctum credentials required.',
                'request_id' => $request->header('X-Request-Id'),
            ], 401);
        }

        return $next($request);
    }
}