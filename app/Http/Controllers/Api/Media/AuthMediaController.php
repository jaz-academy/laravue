<?php

namespace App\Http\Controllers\Api\Media;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Services\MediaFormatter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;

class AuthMediaController extends Controller
{
    /**
     * Register new JazMedia user
     */
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email',
            'username' => 'required|string|max:255|unique:users,username',
            'password' => 'required|string|min:6',
        ]);

        if (!str_ends_with(strtolower($request->email), '@jazacademy.id')) {
            return response()->json([
                'success' => false,
                'error' => 'Pendaftaran hanya diperbolehkan untuk akun resmi @jazacademy.id',
            ], 422);
        }

        try {
            $student = \App\Models\AdminStudent::where('email', $request->email)->first();

            $user = User::create([
                'name' => $student ? $student->name : $request->name,
                'email' => $request->email,
                'username' => $request->username,
                'password' => Hash::make($request->password),
                'admin_student_id' => $student ? $student->id : null,
                'role' => $student ? 2 : 0,
            ]);

            $token = $user->createToken('JazMedia Access Token')->plainTextToken;

            return response()->json([
                'success' => true,
                'token' => $token,
                'user' => MediaFormatter::formatUser($user),
            ], 201);
        } catch (\Throwable $e) {
            return response()->json(['success' => false, 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Login for JazMedia user (supports email or username)
     */
    public function login(Request $request)
    {
        $request->validate([
            'username' => 'required|string',
            'password' => 'required|string',
        ]);

        try {
            $identifier = $request->username;
            $user = User::where('email', $identifier)
                ->orWhere('username', $identifier)
                ->first();

            if (!$user || !Hash::check($request->password, $user->password)) {
                return response()->json([
                    'success' => false,
                    'error' => 'Email/Username atau kata sandi tidak valid',
                ], 401);
            }

            $token = $user->createToken('JazMedia Access Token')->plainTextToken;

            return response()->json([
                'success' => true,
                'token' => $token,
                'user' => MediaFormatter::formatUser($user),
            ]);
        } catch (\Throwable $e) {
            return response()->json(['success' => false, 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Create single-use SSO Ticket for authenticated user
     */
    public function createSsoTicket(Request $request)
    {
        $user = Auth::user();
        if (!$user) {
            return response()->json(['success' => false, 'error' => 'Unauthorized'], 401);
        }

        try {
            // Generate secure ticket
            $ticket = 'sso_' . Str::random(64);

            // Store in cache for 5 minutes (300s)
            Cache::put("jazmedia_sso_ticket:{$ticket}", $user->id, 300);

            $mediaBaseUrl = env('JAZMEDIA_BASE_URL', 'http://localhost:3000');
            $redirectUrl = rtrim($mediaBaseUrl, '/') . '/auth/sso?ticket=' . $ticket;

            return response()->json([
                'success' => true,
                'ticket' => $ticket,
                'redirectUrl' => $redirectUrl,
            ]);
        } catch (\Throwable $e) {
            return response()->json(['success' => false, 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Exchange single-use SSO Ticket for user session & token
     */
    public function exchangeSsoTicket(Request $request)
    {
        $request->validate([
            'ticket' => 'required|string',
        ]);

        $ticket = $request->ticket;
        $cacheKey = "jazmedia_sso_ticket:{$ticket}";

        $userId = Cache::get($cacheKey);
        if (!$userId) {
            return response()->json([
                'success' => false,
                'error' => 'Tiket SSO tidak valid atau sudah kedaluwarsa',
            ], 400);
        }

        // Single-use: burn ticket immediately
        Cache::forget($cacheKey);

        $user = User::find($userId);
        if (!$user) {
            return response()->json([
                'success' => false,
                'error' => 'User tidak ditemukan',
            ], 404);
        }

        $token = $user->createToken('JazMedia SSO Token')->plainTextToken;

        return response()->json([
            'success' => true,
            'token' => $token,
            'user' => MediaFormatter::formatUser($user),
        ]);
    }

    /**
     * Exchange Instagram OAuth authorization code
     */
    public function exchangeInstagramCode(Request $request)
    {
        $code = $request->input('code');
        if (!$code) {
            return response()->json(['error' => 'Authorization code is required'], 400);
        }

        $clientId = env('INSTAGRAM_CLIENT_ID', '2014212106127979');
        $clientSecret = env('INSTAGRAM_CLIENT_SECRET', '');
        $redirectUri = $request->input('redirect_uri', 'https://jazmedia-02.vercel.app/auth/instagram/callback');

        $cleanCode = preg_replace('/#_$/', '', $code);

        try {
            $res = Http::asForm()->post('https://api.instagram.com/oauth/access_token', [
                'client_id' => $clientId,
                'client_secret' => $clientSecret,
                'grant_type' => 'authorization_code',
                'redirect_uri' => $redirectUri,
                'code' => $cleanCode,
            ]);

            $data = $res->json();
            if (!isset($data['access_token'])) {
                return response()->json([
                    'error' => $data['error_message'] ?? 'Gagal menukarkan kode akses dari Instagram.',
                ], 400);
            }

            // Fast path: if user already exists
            if (isset($data['user_id'])) {
                $existingUser = User::where('instagram_id', (string) $data['user_id'])->first();
                if ($existingUser) {
                    $token = $existingUser->createToken('Instagram Access Token')->plainTextToken;
                    return response()->json([
                        'success' => true,
                        'token' => $token,
                        'instagramId' => $existingUser->instagram_id,
                        'name' => $existingUser->name,
                        'username' => $existingUser->username ?: '',
                        'image' => $existingUser->image ?: '',
                        'bio' => $existingUser->bio ?: '',
                        'isReturningUser' => true,
                        'user' => MediaFormatter::formatUser($existingUser),
                    ]);
                }
            }

            // Fetch Graph API for user data
            $targetNode = $data['user_id'] ?? 'me';
            $graphRes = Http::get("https://graph.instagram.com/v21.0/{$targetNode}?fields=id,username,name,profile_picture_url&access_token={$data['access_token']}");
            $userData = $graphRes->json();

            if (!isset($userData['username'])) {
                // Fallback unversioned
                $fallbackRes = Http::get("https://graph.instagram.com/{$targetNode}?fields=id,username,name&access_token={$data['access_token']}");
                $userData = $fallbackRes->json();
            }

            $igId = (string) ($userData['id'] ?? $data['user_id'] ?? '');
            $igUsername = $userData['username'] ?? '';
            $igName = $userData['name'] ?? $igUsername ?: 'Peserta Baru';
            $igImage = $userData['profile_picture_url'] ?? "https://ui-avatars.com/api/?name=" . urlencode($igName) . "&background=e2e8f0&color=475569";
            $igBio = $userData['biography'] ?? '';

            return response()->json([
                'success' => true,
                'instagramId' => $igId,
                'name' => $igName,
                'username' => $igUsername,
                'image' => $igImage,
                'bio' => $igBio,
                'isReturningUser' => false,
            ]);
        } catch (\Throwable $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Link Instagram account to current user
     */
    public function linkInstagram(Request $request)
    {
        $user = Auth::user();
        if (!$user) {
            return response()->json(['success' => false, 'error' => 'Anda belum login'], 401);
        }

        $request->validate(['instagramId' => 'required|string']);

        try {
            $existing = User::where('instagram_id', $request->instagramId)
                ->where('id', '!=', $user->id)
                ->first();

            if ($existing) {
                return response()->json(['success' => false, 'error' => 'Akun Instagram ini sudah tertaut dengan pengguna lain'], 422);
            }

            $user->instagram_id = $request->instagramId;
            $user->save();

            return response()->json(['success' => true]);
        } catch (\Throwable $e) {
            return response()->json(['success' => false, 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Unlink Instagram account
     */
    public function unlinkInstagram()
    {
        $user = Auth::user();
        if (!$user) {
            return response()->json(['success' => false, 'error' => 'Anda belum login'], 401);
        }

        try {
            $user->instagram_id = null;
            $user->save();

            return response()->json(['success' => true]);
        } catch (\Throwable $e) {
            return response()->json(['success' => false, 'error' => $e->getMessage()], 500);
        }
    }
}
