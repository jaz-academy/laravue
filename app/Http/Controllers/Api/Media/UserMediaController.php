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

            if ($request->has('name') && $request->filled('name')) $user->name = $request->name;
            if ($request->has('bio')) $user->bio = $request->bio;
            if ($request->has('banner_image')) $user->banner_image = $request->banner_image;
            if ($request->has('headline')) $user->headline = $request->headline;
            if ($request->has('address_detail')) $user->address_detail = $request->address_detail;
            if ($request->has('phone')) $user->phone = $request->phone;
            if ($request->has('linkedin')) $user->linkedin = $request->linkedin;
            if ($request->has('github')) $user->github = $request->github;
            if ($request->has('website')) $user->website = $request->website;
            
            if ($request->has('education')) {
                $user->education = is_string($request->education) ? $request->education : json_encode($request->education);
            }
            if ($request->has('recommendations')) {
                $user->recommendations = is_string($request->recommendations) ? $request->recommendations : json_encode($request->recommendations);
            }
            if ($request->has('image')) {
                $img = $request->image ?: null;
                if ($img && preg_match('#/storage/(.+)$#', $img, $m)) {
                    $img = $m[1];
                }
                $user->image = $img;
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
                if ($request->has('name') && $request->filled('name')) $student->name = $request->name;
                if ($request->has('bio')) $student->note = $request->bio;
                if ($request->has('image')) $student->image = $user->image;
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
                if ($request->has('name') && $request->filled('name')) $teacher->name = $request->name;
                if ($request->has('bio')) $teacher->note = $request->bio;
                if ($request->has('image')) $teacher->image = $user->image;
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
    public function publicProfile(\Illuminate\Http\Request $request, $userId)
    {
        try {
            $type = $request->query('type');
            $user = null;
            $student = null;
            $teacher = null;
            $currentUserId = \Illuminate\Support\Facades\Auth::guard('sanctum')->id();

            if ($type === 'student') {
                $student = \App\Models\AdminStudent::find((int)$userId);
                if ($student) {
                    $user = \App\Models\User::where('admin_student_id', $student->id)->first();
                }
            } elseif ($type === 'teacher') {
                $teacher = \App\Models\AdminTeacher::find((int)$userId);
                if ($teacher) {
                    $user = \App\Models\User::where('admin_teacher_id', $teacher->id)->first();
                }
            } else {
                // Legacy fallback or standard user
                if (is_numeric($userId)) {
                    $student = \App\Models\AdminStudent::find((int)$userId);
                    if ($student) {
                        $user = \App\Models\User::where('admin_student_id', $student->id)->first();
                    }
                }
                if (!$user) {
                    $user = $this->resolveUser($userId);
                }
            }

            if ($user) {
                $profileData = \App\Services\MediaFormatter::formatUser($user);
            } elseif ($student) {
                // Fallback for legacy student without a user record
                $skills = [];
                if (!empty($student->skills)) {
                    $skills = is_array($student->skills) ? $student->skills : (json_decode($student->skills, true) ?: []);
                }
                $profileData = [
                    'id' => (string) $student->id,
                    '_id' => (string) $student->id,
                    'student_id' => $student->id,
                    'name' => $student->name,
                    'username' => $student->nickname ?: '',
                    'email' => $student->email ?: '',
                    'image' => \App\Services\MediaFormatter::formatAvatarUrl($student->image),
                    'bio' => $student->note ?: ($student->ambition ?: ''),
                    'skills' => $skills,
                    'role' => 'student',
                    'role_number' => 2,
                    'student_role' => $student->role,
                    'instagramId' => $student->instagram,
                    'banner_image' => null,
                    'headline' => null,
                    'address_detail' => null,
                    'education' => [],
                    'recommendations' => [],
                ];
            } elseif ($teacher) {
                // Fallback for legacy teacher without a user record
                $profileData = [
                    'id' => (string) $teacher->id,
                    '_id' => (string) $teacher->id,
                    'teacher_id' => $teacher->id,
                    'name' => $teacher->name,
                    'username' => '',
                    'email' => $teacher->email ?: '',
                    'image' => '/no-photo.png',
                    'bio' => '',
                    'skills' => [],
                    'role' => 'mentor',
                    'role_number' => 3,
                    'banner_image' => null,
                    'headline' => null,
                    'address_detail' => null,
                    'education' => [],
                    'recommendations' => [],
                ];
            } else {
                return response()->json(['success' => false, 'error' => 'Profil tidak ditemukan'], 404);
            }

            // Fetch tasks
            $tasks = collect([]);
            if (($user && $user->admin_student_id) || $student) {
                $sId = $user ? $user->admin_student_id : $student->id;
                $tasks = \App\Models\MediaTask::with(['student', 'mentorTeacher', 'studentCollaborators', 'project', 'likes', 'comments.user'])
                    ->where('admin_student_id', $sId)
                    ->orWhereHas('studentCollaborators', function ($q) use ($sId) {
                        $q->where('admin_student_id', $sId);
                    })
                    ->orderByDesc('created_at')
                    ->get();
            } elseif (($user && $user->admin_teacher_id) || $teacher) {
                $tId = $user ? $user->admin_teacher_id : $teacher->id;
                $tasks = \App\Models\MediaTask::with(['student', 'mentorTeacher', 'studentCollaborators', 'project', 'likes', 'comments.user'])
                    ->where('admin_teacher_id', $tId)
                    ->orderByDesc('created_at')
                    ->get();
            } elseif ($user) {
                $uId = $user->id;
                $tasks = \App\Models\MediaTask::with(['student', 'mentorTeacher', 'studentCollaborators', 'project', 'likes', 'comments.user'])
                    ->where('user_id', $uId)
                    ->orWhereHas('collaborators', function ($q) use ($uId) {
                        $q->where('user_id', $uId);
                    })
                    ->orderByDesc('created_at')
                    ->get();
            }

            $formattedTasks = $tasks->map(function ($task) use ($currentUserId) {
                return \App\Services\MediaFormatter::formatTask($task, $currentUserId);
            });

            return response()->json([
                'success' => true,
                'data' => [
                    'user' => $profileData,
                    'tasks' => $formattedTasks
                ]
            ]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'error' => $e->getMessage()], 500);
        }
    }

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
            $folder = 'avatars/user';
            if ($user->admin_student_id) {
                $folder = 'avatars/student';
            } elseif ($user->admin_teacher_id) {
                $folder = 'avatars/teacher';
            }

            $path = $file->store($folder, 'public');
            $fullUrl = MediaFormatter::formatAvatarUrl($path) ?: asset('storage/' . $path);

            $user->image = $path;
            $user->save();

            // Sync with student / teacher
            if ($user->adminStudent) {
                $user->adminStudent->image = $path;
                $user->adminStudent->save();
            }
            if ($user->adminTeacher) {
                $user->adminTeacher->image = $path;
                $user->adminTeacher->save();
            }

            return response()->json([
                'success' => true,
                'path' => $path,
                'url' => $fullUrl,
                'image' => $fullUrl,
            ]);
        } catch (\Throwable $e) {
            return response()->json(['success' => false, 'error' => $e->getMessage()], 500);
        }
    }
}
