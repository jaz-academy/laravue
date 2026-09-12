<?php

namespace App\Http\Controllers\Api\Media;

use App\Http\Controllers\Controller;
use App\Models\MediaTask;
use App\Models\User;
use App\Services\MediaFormatter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class UserMediaController extends Controller
{
    protected function resolveUser($id)
    {
        return User::where('id', is_numeric($id) ? (int)$id : 0)
            ->orWhere('mongodb_id', $id)
            ->first();
    }

    /**
     * Get current authenticated user profile
     */
    public function profile()
    {
        $user = Auth::user();
        if (!$user) {
            return response()->json(['success' => false, 'error' => 'Not authenticated'], 401);
        }

        return response()->json([
            'success' => true,
            'data' => MediaFormatter::formatUser($user),
        ]);
    }

    /**
     * Update current user profile
     */
    public function updateProfile(Request $request)
    {
        $user = Auth::user();
        if (!$user) {
            return response()->json(['success' => false, 'error' => 'Not authenticated'], 401);
        }

        try {
            $email = $request->input('email');
            $username = $request->input('username');

            // Unique check
            if ($email && $email !== $user->email) {
                if (User::where('email', $email)->where('id', '!=', $user->id)->exists()) {
                    return response()->json(['success' => false, 'error' => 'Email sudah digunakan oleh pengguna lain'], 422);
                }
                $user->email = $email;
            }

            if ($username && $username !== $user->username) {
                if (User::where('username', $username)->where('id', '!=', $user->id)->exists()) {
                    return response()->json(['success' => false, 'error' => 'Username sudah digunakan oleh pengguna lain'], 422);
                }
                $user->username = $username;
            }

            if ($request->has('name')) $user->name = $request->name;
            if ($request->has('bio')) $user->bio = $request->bio;
            if ($request->has('image')) $user->image = $request->image;

            if ($request->has('role')) {
                $user->media_role = $request->role;
            }

            if ($request->has('skills')) {
                $skills = $request->skills;
                if (is_string($skills)) {
                    $skills = json_decode($skills, true) ?: [];
                }
                $user->skills = $skills;
            }

            if ($request->filled('password')) {
                $user->password = Hash::make($request->password);
            }

            $user->save();

            return response()->json([
                'success' => true,
                'data' => MediaFormatter::formatUser($user),
            ]);
        } catch (\Throwable $e) {
            return response()->json(['success' => false, 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Get public profile by user ID with their tasks
     */
    public function publicProfile($userId)
    {
        try {
            $user = $this->resolveUser($userId);
            if (!$user) {
                return response()->json(['success' => false, 'error' => 'User tidak ditemukan'], 404);
            }

            $uId = $user->id;
            $currentUserId = Auth::guard('sanctum')->id();

            $tasks = MediaTask::with(['user', 'mentor', 'collaborators', 'project', 'likes', 'comments.user'])
                ->where('user_id', $uId)
                ->orWhereHas('collaborators', function ($q) use ($uId) {
                    $q->where('user_id', $uId);
                })
                ->orderByDesc('created_at')
                ->get();

            $formattedTasks = $tasks->map(function ($task) use ($currentUserId) {
                return MediaFormatter::formatTask($task, $currentUserId);
            });

            return response()->json([
                'success' => true,
                'data' => [
                    'user' => MediaFormatter::formatUser($user),
                    'tasks' => $formattedTasks,
                ],
            ]);
        } catch (\Throwable $e) {
            return response()->json(['success' => false, 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Upload profile picture
     */
    public function uploadPicture(Request $request)
    {
        $user = Auth::user();
        if (!$user) {
            return response()->json(['success' => false, 'error' => 'Not authenticated'], 401);
        }

        $request->validate([
            'image' => 'required|image|max:5120', // 5MB max
        ]);

        try {
            $file = $request->file('image');
            $path = $file->store('profiles', 'public');
            $url = "/storage/{$path}";

            $user->image = $url;
            $user->save();

            return response()->json([
                'success' => true,
                'url' => $url,
            ]);
        } catch (\Throwable $e) {
            return response()->json(['success' => false, 'error' => $e->getMessage()], 500);
        }
    }
}
