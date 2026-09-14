<?php

namespace App\Http\Controllers\Developer;

use App\Http\Controllers\Controller;
use App\Models\ApiRequestLog;
use App\Models\DeveloperApiKey;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ApiAnalyticsController extends Controller
{
    /**
     * Get aggregate overview statistics.
     */
    public function overview(Request $request)
    {
        $since24h = now()->subHours(24);

        $totalRequests24h = ApiRequestLog::where('created_at', '>=', $since24h)->count();
        $totalRequestsAllTime = ApiRequestLog::count();

        $successCount24h = ApiRequestLog::where('created_at', '>=', $since24h)
            ->whereBetween('status_code', [200, 399])
            ->count();

        $errorCount24h = ApiRequestLog::where('created_at', '>=', $since24h)
            ->where('status_code', '>=', 400)
            ->count();

        $successRate = $totalRequests24h > 0 
            ? round(($successCount24h / $totalRequests24h) * 100, 1) 
            : 100.0;

        $avgLatency = (int) round(
            ApiRequestLog::where('created_at', '>=', $since24h)->avg('duration_ms') ?: 0
        );

        $activeKeysCount = DeveloperApiKey::where('is_active', true)->count();

        // Tier Breakdown
        $tierBreakdown = ApiRequestLog::where('created_at', '>=', $since24h)
            ->select('tier', DB::raw('count(*) as count'))
            ->groupBy('tier')
            ->pluck('count', 'tier')
            ->toArray();

        // Top Endpoints
        $topEndpoints = ApiRequestLog::where('created_at', '>=', $since24h)
            ->select('endpoint', 'method', DB::raw('count(*) as hits'), DB::raw('round(avg(duration_ms)) as avg_latency'))
            ->groupBy('endpoint', 'method')
            ->orderByDesc('hits')
            ->limit(8)
            ->get();

        // Status code breakdown
        $statusBreakdown = ApiRequestLog::where('created_at', '>=', $since24h)
            ->select(DB::raw('floor(status_code / 100) * 100 as status_group'), DB::raw('count(*) as count'))
            ->groupBy('status_group')
            ->pluck('count', 'status_group')
            ->toArray();

        return response()->json([
            'total_requests_24h' => $totalRequests24h,
            'total_requests_all_time' => $totalRequestsAllTime,
            'success_rate' => $successRate,
            'avg_latency_ms' => $avgLatency,
            'active_keys_count' => $activeKeysCount,
            'tier_breakdown' => [
                'public' => $tierBreakdown['public'] ?? 0,
                'restricted' => $tierBreakdown['restricted'] ?? 0,
                'private' => $tierBreakdown['private'] ?? 0,
            ],
            'status_breakdown' => [
                '2xx' => $statusBreakdown[200] ?? 0,
                '3xx' => $statusBreakdown[300] ?? 0,
                '4xx' => $statusBreakdown[400] ?? 0,
                '5xx' => $statusBreakdown[500] ?? 0,
            ],
            'top_endpoints' => $topEndpoints,
        ]);
    }

    /**
     * Get timeseries request volume.
     */
    public function timeseries(Request $request)
    {
        // 24 hours hourly buckets
        $since = now()->subHours(24);
        
        $logs = ApiRequestLog::where('created_at', '>=', $since)
            ->select(
                DB::raw('strftime("%Y-%m-%d %H:00", created_at) as hour_bucket'),
                'tier',
                DB::raw('count(*) as count')
            )
            ->groupBy('hour_bucket', 'tier')
            ->orderBy('hour_bucket')
            ->get();

        return response()->json($logs);
    }

    /**
     * Get recent logs with search and filter.
     */
    public function logs(Request $request)
    {
        $query = ApiRequestLog::query()->with('apiKey:id,name,key_prefix');

        if ($request->filled('tier')) {
            $query->where('tier', $request->input('tier'));
        }

        if ($request->filled('status')) {
            $status = (int) $request->input('status');
            if ($status === 200) {
                $query->whereBetween('status_code', [200, 299]);
            } elseif ($status === 400) {
                $query->whereBetween('status_code', [400, 499]);
            } elseif ($status === 500) {
                $query->where('status_code', '>=', 500);
            } else {
                $query->where('status_code', $status);
            }
        }

        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('endpoint', 'like', "%{$search}%")
                  ->orWhere('ip_address', 'like', "%{$search}%")
                  ->orWhere('request_id', 'like', "%{$search}%");
            });
        }

        $logs = $query->orderByDesc('created_at')->paginate(15);

        return response()->json($logs);
    }
}