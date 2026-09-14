<?php

namespace App\Http\Controllers\Developer;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ApiDocumentationController extends Controller
{
    /**
     * Return the complete API Platform Catalog and Standards Specification.
     */
    public function index(Request $request)
    {
        $standards = [
            'gateway' => [
                'name' => 'JazAcademy Unified API Gateway',
                'description' => 'Platform entrypoint providing centralized routing, request tracing, rate limiting, and CORS enforcement.',
                'headers' => [
                    ['header' => 'X-Request-Id', 'direction' => 'Bidirectional', 'description' => 'Unique UUID generated per request for distributed tracing across services.'],
                    ['header' => 'X-Api-Version', 'direction' => 'Response', 'description' => 'Explicit API version semantic string (e.g. 1.0.0).'],
                    ['header' => 'X-API-Key', 'direction' => 'Request', 'description' => 'Mandatory authentication token for Tier 2 (Restricted) endpoints.'],
                    ['header' => 'X-RateLimit-Limit', 'direction' => 'Response', 'description' => 'Maximum allowed requests per minute window.'],
                    ['header' => 'X-RateLimit-Remaining', 'direction' => 'Response', 'description' => 'Remaining quota in the current 60-second window.'],
                ],
                'error_format' => [
                    'standard' => 'RFC 7807 (Problem Details for HTTP APIs)',
                    'sample' => [
                        'type' => 'https://jazacademy.id/errors/rate-limit-exceeded',
                        'title' => 'Rate Limit Exceeded',
                        'status' => 429,
                        'detail' => 'Quota exceeded (120 req/min). Please retry in 24 seconds.',
                        'request_id' => '9d1c9258-292b-4e4b-91f0-a7d0e417a80b',
                    ],
                ],
            ],
            'versioning' => [
                'strategy' => 'URI Path Versioning (/api/v1/...) with Semantic Evolution',
                'backward_compatibility_policy' => 'Additive changes (new non-mandatory fields) occur in minor revisions without changing URI. Breaking structural changes trigger new major version path.',
                'deprecation_headers' => [
                    ['header' => 'Deprecation: @<timestamp>', 'description' => 'RFC 8594 header indicating an endpoint or feature is marked deprecated.'],
                    ['header' => 'Sunset: <HTTP-date>', 'description' => 'Definitive cutoff date when the deprecated endpoint will cease functioning.'],
                    ['header' => 'Link: <url>; rel="deprecation"', 'description' => 'URI reference to migration documentation and replacement endpoints.'],
                ],
            ],
            'observability' => [
                'telemetry' => 'Automatic metrics logging on every inbound request.',
                'tracked_dimensions' => ['Request ID', 'Method', 'Endpoint', 'Duration (ms)', 'HTTP Status Code', 'API Key / Client ID', 'IP Address', 'User Agent'],
                'slo_target' => 'P95 Latency < 250ms, 99.9% Availability for Public & Restricted Tiers.',
            ],
        ];

        $tiers = [
            'public' => [
                'title' => 'Tier 1: Public (Without Key)',
                'badge' => 'Open Access',
                'color' => 'success',
                'description' => 'Public read-only endpoints accessible without authentication. Protected by IP-based rate limiting (60 req/min) and edge cache.',
                'auth' => 'None required',
                'rate_limit' => '60 requests / minute / IP',
                'endpoints' => [
                    [
                        'id' => 'pub_1',
                        'method' => 'GET',
                        'path' => '/api/v1/public/tasks/best',
                        'summary' => 'Best Performing Tasks',
                        'description' => 'Returns top curated student tasks with highest ratings and feedback.',
                        'parameters' => [],
                        'response_sample' => [
                            'status' => 'success',
                            'data' => [
                                ['id' => 12, 'title' => 'Belajar Figma Auto Layout', 'author' => 'Ahmad Santoso', 'score' => 98],
                            ],
                        ],
                    ],
                    [
                        'id' => 'pub_2',
                        'method' => 'GET',
                        'path' => '/api/v1/public/members',
                        'summary' => 'Public Member Directory',
                        'description' => 'List publicly visible student & teacher profiles.',
                        'parameters' => [
                            ['name' => 'page', 'type' => 'integer', 'in' => 'query', 'required' => false, 'description' => 'Page number'],
                            ['name' => 'search', 'type' => 'string', 'in' => 'query', 'required' => false, 'description' => 'Keyword search'],
                        ],
                        'response_sample' => [
                            'data' => [
                                ['id' => 1, 'name' => 'Budi Pratama', 'role' => 'Student', 'avatar' => '/images/avatars/avatar-1.png'],
                            ],
                        ],
                    ],
                    [
                        'id' => 'pub_3',
                        'method' => 'GET',
                        'path' => '/api/v1/public/blogs',
                        'summary' => 'Published Articles & Tutorials',
                        'description' => 'Retrieve published blog articles with category filters.',
                        'parameters' => [
                            ['name' => 'category', 'type' => 'string', 'in' => 'query', 'required' => false, 'description' => 'Category slug'],
                        ],
                        'response_sample' => [
                            'status' => 'success',
                            'articles' => [
                                ['id' => 5, 'title' => 'Panduan Memulai SSO OAuth2', 'published_at' => '2026-09-12'],
                            ],
                        ],
                    ],
                    [
                        'id' => 'pub_4',
                        'method' => 'GET',
                        'path' => '/api/v1/public/students',
                        'summary' => 'Public Student Profiles',
                        'description' => 'Public portfolio summary of students.',
                        'parameters' => [],
                        'response_sample' => [
                            ['id' => 10, 'name' => 'Fauzi Rahman', 'school' => 'SMK Jaz Academy'],
                        ],
                    ],
                ],
            ],

            'restricted' => [
                'title' => 'Tier 2: Restricted (With Key)',
                'badge' => 'API Key Required',
                'color' => 'primary',
                'description' => 'Protected endpoints for third-party integrations, mobile clients, and partner services (e.g. JazMedia, JazFlix). Authenticated via header X-API-Key with granular scopes.',
                'auth' => 'Header: X-API-Key: jaz_live_xxx',
                'rate_limit' => 'Tiered (Standard: 120 rpm, Partner: 600 rpm, Unlimited: 2000 rpm)',
                'endpoints' => [
                    [
                        'id' => 'res_1',
                        'method' => 'GET',
                        'path' => '/api/v1/restricted/projects',
                        'summary' => 'List Projects Catalog',
                        'scope' => 'media:read',
                        'description' => 'Fetch community and curriculum project list with task counts.',
                        'parameters' => [
                            ['name' => 'limit', 'type' => 'integer', 'in' => 'query', 'required' => false, 'description' => 'Number of records (max 100)'],
                        ],
                        'response_sample' => [
                            'data' => [
                                ['id' => 101, 'name' => 'JazMedia Social Stream', 'tasks_count' => 34, 'status' => 'active'],
                            ],
                        ],
                    ],
                    [
                        'id' => 'res_2',
                        'method' => 'GET',
                        'path' => '/api/v1/restricted/tasks',
                        'summary' => 'Fetch Project Tasks',
                        'scope' => 'media:read',
                        'description' => 'Retrieve tasks with submission status, attachments, and feedback.',
                        'parameters' => [
                            ['name' => 'project_id', 'type' => 'integer', 'in' => 'query', 'required' => false],
                        ],
                        'response_sample' => [
                            'data' => [
                                ['id' => 502, 'title' => 'Integrasi SSO OAuth2', 'status' => 'approved'],
                            ],
                        ],
                    ],
                    [
                        'id' => 'res_3',
                        'method' => 'POST',
                        'path' => '/api/v1/restricted/tasks',
                        'summary' => 'Submit New Task (Partner Sync)',
                        'scope' => 'media:write',
                        'description' => 'Allows partner platforms or CLI tools to programmatically register task submissions.',
                        'parameters' => [],
                        'request_sample' => [
                            'project_id' => 101,
                            'title' => 'Implementasi API Gateway',
                            'description' => 'Menambahkan middleware tracing X-Request-Id',
                            'link' => 'https://github.com/jaz-academy/gateway',
                        ],
                        'response_sample' => [
                            'success' => true,
                            'message' => 'Task successfully submitted',
                            'task_id' => 503,
                        ],
                    ],
                    [
                        'id' => 'res_4',
                        'method' => 'GET',
                        'path' => '/api/v1/restricted/courses',
                        'summary' => 'Academy Courses & Curricula',
                        'scope' => 'academy:read',
                        'description' => 'List official academy learning tracks and modules.',
                        'parameters' => [],
                        'response_sample' => [
                            ['id' => 1, 'name' => 'Fullstack Web Engineer', 'total_subjects' => 12],
                        ],
                    ],
                ],
            ],

            'private' => [
                'title' => 'Tier 3: Private (Only For This App)',
                'badge' => 'Internal SPA Only',
                'color' => 'warning',
                'description' => 'Internal sensitive endpoints reserved exclusively for the official JazAcademy web application. Rejects raw external API keys; strictly requires active Sanctum session and CSRF cookie validation.',
                'auth' => 'Sanctum Session Cookie + CSRF Header (Internal Origin Guard)',
                'rate_limit' => 'Session Throttled (Internal User Limits)',
                'endpoints' => [
                    [
                        'id' => 'priv_1',
                        'method' => 'GET',
                        'path' => '/api/v1/private/dashboard-academic',
                        'summary' => 'Academic Analytics & KPIs',
                        'description' => 'Real-time internal statistics for admin teachers and managers.',
                        'parameters' => [],
                        'response_sample' => [
                            'total_students' => 1420,
                            'active_classes' => 28,
                            'average_score' => 88.4,
                        ],
                    ],
                    [
                        'id' => 'priv_2',
                        'method' => 'POST',
                        'path' => '/api/v1/private/scores/bulk-store',
                        'summary' => 'Bulk Student Assessment Grading',
                        'description' => 'Batch entry of exam and assignment scores by authorized teachers.',
                        'parameters' => [],
                        'request_sample' => [
                            'course_id' => 3,
                            'scores' => [
                                ['student_id' => 21, 'score' => 95, 'note' => 'Excellent performance'],
                            ],
                        ],
                        'response_sample' => [
                            'success' => true,
                            'recorded_count' => 1,
                        ],
                    ],
                    [
                        'id' => 'priv_3',
                        'method' => 'GET',
                        'path' => '/api/v1/private/finances',
                        'summary' => 'Institutional Financial Ledger',
                        'description' => 'Internal cashflow and billing records accessible only by Finance Administrators.',
                        'parameters' => [],
                        'response_sample' => [
                            ['id' => 91, 'invoice' => 'INV-2026-0914', 'total' => 2500000, 'status' => 'paid'],
                        ],
                    ],
                ],
            ],
        ];

        return response()->json([
            'platform' => 'JazAcademy Developer Platform',
            'version' => '1.0.0',
            'standards' => $standards,
            'tiers' => $tiers,
        ]);
    }
}