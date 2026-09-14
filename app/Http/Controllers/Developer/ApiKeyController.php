<?php

namespace App\Http\Controllers\Developer;

use App\Http\Controllers\Controller;
use App\Models\DeveloperApiKey;
use Illuminate\Http\Request;

class ApiKeyController extends Controller
{
    /**
     * Display a listing of API keys.
     */
    public function index(Request $request)
    {
        $user = $request->user();

        $query = DeveloperApiKey::query()->with('user:id,name,email');

        // Non-programmers only see their own keys
        if ($user->role < 5) {
            $query->where('user_id', $user->id);
        }

        $keys = $query->withCount('logs')
            ->orderByDesc('created_at')
            ->get();

        return response()->json($keys);
    }

    /**
     * Store a newly created API key.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:100',
            'scopes' => 'nullable|array',
            'tier' => 'nullable|string|in:standard,partner,unlimited',
            'rate_limit_per_minute' => 'nullable|integer|min:10|max:5000',
            'expires_days' => 'nullable|integer|min:1|max:365',
        ]);

        $user = $request->user();
        $scopes = $request->input('scopes', ['*']);
        $tier = $request->input('tier', 'standard');
        
        $rateLimit = $request->input('rate_limit_per_minute');
        if (!$rateLimit) {
            $rateLimit = match ($tier) {
                'partner' => 600,
                'unlimited' => 2000,
                default => 120,
            };
        }

        $expiresAt = null;
        if ($request->filled('expires_days')) {
            $expiresAt = now()->addDays((int) $request->input('expires_days'));
        }

        $result = DeveloperApiKey::createKey(
            userId: $user->id,
            name: $request->input('name'),
            scopes: $scopes,
            tier: $tier,
            rateLimit: $rateLimit,
            expiresAt: $expiresAt
        );

        return response()->json([
            'message' => 'API Key created successfully. Store the secret token securely; it will not be shown again.',
            'key' => $result['apiKey'],
            'plain_secret' => $result['plainSecret'],
        ], 201);
    }

    /**
     * Update an API key's configuration or active status.
     */
    public function update(Request $request, $id)
    {
        $user = $request->user();
        $apiKey = DeveloperApiKey::findOrFail($id);

        if ($user->role < 5 && $apiKey->user_id !== $user->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'name' => 'sometimes|string|max:100',
            'scopes' => 'sometimes|array',
            'is_active' => 'sometimes|boolean',
            'rate_limit_per_minute' => 'sometimes|integer|min:10|max:5000',
            'tier' => 'sometimes|string|in:standard,partner,unlimited',
        ]);

        $apiKey->update($validated);

        return response()->json([
            'message' => 'API Key updated successfully.',
            'key' => $apiKey,
        ]);
    }

    /**
     * Regenerate secret for an API key.
     */
    public function regenerate(Request $request, $id)
    {
        $user = $request->user();
        $apiKey = DeveloperApiKey::findOrFail($id);

        if ($user->role < 5 && $apiKey->user_id !== $user->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $newSecret = $apiKey->regenerateSecret();

        return response()->json([
            'message' => 'Secret regenerated successfully. Update your applications immediately.',
            'key' => $apiKey,
            'plain_secret' => $newSecret,
        ]);
    }

    /**
     * Revoke / delete an API key.
     */
    public function destroy(Request $request, $id)
    {
        $user = $request->user();
        $apiKey = DeveloperApiKey::findOrFail($id);

        if ($user->role < 5 && $apiKey->user_id !== $user->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $apiKey->delete();

        return response()->json([
            'message' => 'API Key revoked and deleted successfully.',
        ]);
    }
}