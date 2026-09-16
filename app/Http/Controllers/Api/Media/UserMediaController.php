<?php

namespace App\Http\Controllers\Api\Media;

use App\Http\Controllers\Controller;
use App\Models\AdminStudent;
use App\Models\AdminTeacher;
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

            // Sync with AdminStudent if user is student
            if ($user->adminStudent) {
                $student = $user->adminStudent;
                if ($request->has('name')) $student->name = $request->name;
                if ($request->has('bio')) $student->note = $request->bio;
                if ($request->has('skills')) {
                    $skills = $request->skills;
                    $student->skills = is_string($skills) ? $skills : json_encode($skills);
                }
                if ($request->has('instagram') || $request->has('instagramId')) {
                    $student->instagram = $request->input('instagram', $request->input('instagramId'));
                }
                $student->save();
            }

            // Sync with AdminTeacher if user is teacher
            if ($user->adminTeacher) {
                $teacher = $user->adminTeacher;
                if ($request->has('name')) $teacher->name = $request->name;
                if ($request->has('bio')) $teacher->note = $request->bio;
                $teacher->save();
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
     * Get public profile by user or student ID with their tasks
     */
    public function publicProfile($userId)
    {
        try {
            $student = null;
            $user = null;
            $currentUserId = Auth::guard('sanctum')->id();

            // First check if $userId is a direct student ID
            if (is_numeric($userId)) {
                $student = AdminStudent::find((int)$userId);
            }

            if ($student) {
                $user = User::where('admin_student_id', $student->id)->first();
                $sId = $student->id;

                $tasks = MediaTask::with(['student', 'mentorTeacher', 'studentCollaborators', 'project', 'likes', 'comments.user'])
                    ->where('admin_student_id', $sId)
                    ->orWhereHas('studentCollaborators', function ($q) use ($sId) {
                        $q->where('admin_student_id', $sId);
                    })
                    ->orderByDesc('created_at')
                    ->get();

                $skills = [];
                if (!empty($student->skills)) {
                    $skills = is_array($student->skills) ? $student->skills : (json_decode($student->skills, true) ?: []);
                } elseif ($user && is_array($user->skills)) {
                    $skills = $user->skills;
                }

                $profileData = [
                    'id' => (string) ($user ? $user->id : $student->id),
                    '_id' => (string) ($user ? ($user->mongodb_id ?: $user->id) : $student->id),
                    'student_id' => $student->id,
                    'name' => $student->name,
                    'username' => $user ? ($user->username ?: $student->nickname) : ($student->nickname ?: ''),
                    'email' => $user ? $user->email : ($student->email ?: ''),
                    'image' => MediaFormatter::formatAvatarUrl($student->image),
                    'bio' => $student->note ?: ($student->ambition ?: ($user?->bio ?: '')),
                    'skills' => $skills,
                    'role' => 'member',
                    'student_role' => $student->role,
                    'instagramId' => $student->instagram ?: ($user?->instagram_id),
                ];
            } else {
                // Resolve as User
                $user = $this->resolveUser($userId);
                if (!$user) {
                    return response()->json(['success' => false, 'error' => 'User tidak ditemukan'], 404);
                }

                $profileData = MediaFormatter::formatUser($user);

                if ($user->admin_student_id) {
                    $sId = $user->admin_student_id;
                    $tasks = MediaTask::with(['student', 'mentorTeacher', 'studentCollaborators', 'project', 'likes', 'comments.user'])
                        ->where('admin_student_id', $sId)
                        ->orWhereHas('studentCollaborators', function ($q) use ($sId) {
                            $q->where('admin_student_id', $sId);
                        })
                        ->orderByDesc('created_at')
                        ->get();
                } elseif ($user->admin_teacher_id) {
                    $tId = $user->admin_teacher_id;
                    $tasks = MediaTask::with(['student', 'mentorTeacher', 'studentCollaborators', 'project', 'likes', 'comments.user'])
                        ->where('admin_teacher_id', $tId)
                        ->orderByDesc('created_at')
                        ->get();
                } else {
                    $uId = $user->id;
                    $tasks = MediaTask::with(['student', 'mentorTeacher', 'studentCollaborators', 'project', 'likes', 'comments.user'])
                        ->where('user_id', $uId)
                        ->orWhereHas('collaborators', function ($q) use ($uId) {
                            $q->where('user_id', $uId);
                        })
                        ->orderByDesc('created_at')
                        ->get();
                }
            }

            $formattedTasks = $tasks->map(function ($task) use ($currentUserId) {
                return MediaFormatter::formatTask($task, $currentUserId);
            });

            return response()->json([
                'success' => true,
                'data' => [
                    'user' => $profileData,
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

            // Sync with student / teacher
            if ($user->adminStudent) {
                $user->adminStudent->image = $url;
                $user->adminStudent->save();
            }
            if ($user->adminTeacher) {
                $user->adminTeacher->image = $url;
                $user->adminTeacher->save();
            }

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
