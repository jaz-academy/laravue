<?php

namespace App\Http\Controllers\OAuth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class OAuthUserController extends Controller
{
    /**
     * Get the authenticated OAuth user's information (UserInfo Endpoint).
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function user(Request $request)
    {
        $user = $request->user();

        if (!$user) {
            return response()->json([
                'error' => 'unauthenticated',
                'message' => 'User is not authenticated.',
            ], 401);
        }

        $avatarUrl = null;
        if ($user->image) {
            $avatarUrl = Str::startsWith($user->image, ['http://', 'https://'])
                ? $user->image
                : asset('storage/' . $user->image);
        }

        $memberType = 'Member';
        if ($user->admin_student_id) {
            $memberType = 'Student';
        } elseif ($user->admin_teacher_id) {
            $memberType = 'Teacher';
        } elseif ($user->role > 0) {
            $memberType = 'Admin';
        }

        $resolvedMediaRole = ($user->media_role === 'admin' || $user->role >= 3)
            ? 'admin'
            : (($user->admin_teacher_id || $user->media_role === 'mentor') ? 'mentor' : 'member');

        $payload = [
            'sub' => (string) $user->id,
            'id' => $user->id,
            'name' => $user->name,
            'username' => $user->username ?: explode('@', $user->email)[0],
            'email' => $user->email,
            'email_verified' => (bool) $user->email_verified_at,
            'avatar' => $avatarUrl,
            'role' => (int) $user->role,
            'role_name' => $resolvedMediaRole === 'admin' ? 'Admin' : ($resolvedMediaRole === 'mentor' ? 'Mentor' : 'Member'),
            'media_role' => $resolvedMediaRole,
            'member_type' => $memberType,
            'bio' => $user->bio,
            'skills' => $user->skills ?? [],
            'created_at' => $user->created_at ? $user->created_at->toIso8601String() : null,
        ];

        return response()->json($payload);
    }
}
