<?php

namespace App\Http\Controllers\Api\Media;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Services\MediaFormatter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;

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

        try {
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'username' => $request->username,
                'password' => Hash::make($request->password),
                'media_role' => 'member',
                'role' => 1,
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
