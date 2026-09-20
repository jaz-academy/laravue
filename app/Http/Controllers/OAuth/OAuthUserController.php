<?php

namespace App\Http\Controllers\OAuth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

use App\Services\MediaFormatter;

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

        // Avatar priority: student.image -> teacher.image -> user.image
        $avatarImage = $user->adminStudent?->image ?: ($user->adminTeacher?->image ?: $user->image);
        $avatarUrl = MediaFormatter::formatAvatarUrl($avatarImage);
        if (!$avatarUrl && $avatarImage) {
            $avatarUrl = Str::startsWith($avatarImage, ['http://', 'https://'])
                ? $avatarImage
                : asset('storage/' . ltrim(str_replace('storage/', '', $avatarImage), '/'));
        }

        $rawRole = (int) $user->role;

        // Role mapping based strictly on users.role (0-5) and admin_student/teacher relations:
        // 5: Programmer
        // 4: Superadmin / Manager
        // 3: Superuser / Admin
        // 2 + admin_teacher_id: Member Mentor
        // 2 + admin_student_id (or role 2): Member Student
        // 1: Guest (parents / second account / view only)
        // 0: Anonymous (need approval)
        if ($rawRole === 5) {
            $roleName = 'Programmer';
            $roleSlug = 'admin';
            $memberType = 'Programmer';
        } elseif ($rawRole === 4) {
            $roleName = 'Superadmin';
            $roleSlug = 'admin';
            $memberType = 'Manager';
        } elseif ($rawRole === 3) {
            $roleName = 'Admin';
            $roleSlug = 'admin';
            $memberType = 'Admin';
        } elseif ($user->admin_teacher_id) {
            $roleName = 'Mentor';
            $roleSlug = 'mentor';
            $memberType = 'Teacher';
        } elseif ($rawRole === 2 || $user->admin_student_id) {
            $roleName = 'Student';
            $roleSlug = 'student';
            $memberType = 'Student';
        } elseif ($rawRole === 1) {
            $roleName = 'Guest';
            $roleSlug = 'guest';
            $memberType = 'Guest';
        } else {
            $roleName = 'Anonymous';
            $roleSlug = 'anonymous';
            $memberType = 'Anonymous';
        }

        $payload = [
            'sub' => (string) $user->id,
            'id' => $user->id,
            'name' => $user->name,
            'username' => $user->username ?: explode('@', $user->email)[0],
            'email' => $user->email,
            'email_verified' => (bool) $user->email_verified_at,
            'avatar' => $avatarUrl,
            'role' => $rawRole,
            'role_name' => $roleName,
            'role_slug' => $roleSlug,
            'member_type' => $memberType,
            'admin_student_id' => $user->admin_student_id,
            'admin_teacher_id' => $user->admin_teacher_id,
            'bio' => $user->adminStudent?->note ?: ($user->adminStudent?->ambition ?: ($user->adminTeacher?->note ?: $user->bio)),
            'skills' => $user->skills ?? [],
            'created_at' => $user->created_at ? $user->created_at->toIso8601String() : null,
        ];

        return response()->json($payload);
    }
}
