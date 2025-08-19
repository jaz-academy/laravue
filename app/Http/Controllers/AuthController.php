<?php

namespace App\Http\Controllers;

use App\Models\AdminTeacher;
use Validator;
use App\Models\User;
use App\Notifications\ProjectReminder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class AuthController extends Controller
{
    /**
     * Create user
     *
     * @param  [string] name
     * @param  [string] email
     * @param  [string] password
     * @param  [string] password_confirmation
     * @return [string] message
     */
    public function register(Request $request)
    {
        $user = new User([
            'admin_student_id'  => $request->adminStudentId,
            'admin_teacher_id'  => $request->adminTeacherId,
            'name'  => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'role' => 0,
        ]);

        if ($user->save()) {
            $tokenResult = $user->createToken('Personal Access Token');
            $token = $tokenResult->plainTextToken;
            $abilityRules = [
                [
                    'member' => $user->admin_student_id ? 'Student' : 'Teacher',
                    'action' => 'read',
                    'subject' => 'AclDemo',
                ],
            ];

            return response()->json([
                'accessToken' => $token,
                'userData' => $user,
                'userAbilityRules' => $abilityRules,
            ], 201);
        } else {
            return response()->json(['error' => 'Cannot create user, Try again leter!'], 500);
        }
    }

    /**
     * Login user and create token
     *
     * @param  [string] email
     * @param  [string] password
     * @param  [boolean] remember_me
     */

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
            'remember_me' => 'boolean'
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json([
                'message' => 'Email does not exist'
            ], 404);
        }

        if (!Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
            return response()->json([
                'message' => 'Incorrect password'
            ], 401);
        }

        $tokenResult = $user->createToken('Personal Access Token');
        $token = $tokenResult->plainTextToken;
        $abilityRules = [
            [
                'member' => $user->admin_student_id ? 'Student' : 'Teacher',
                'action' => $user->role > 0 ? 'manage' : 'read',
                'subject' => $user->role > 0 ? 'all' : 'AclDemo',
            ],
        ];

        return response()->json([
            'accessToken' => $token,
            'userData' => $user,
            'userAbilityRules' => $abilityRules,
        ]);
    }

    function updatePassword(Request $request)
    {
        $request->validate([
            'current_password' => 'required|string',
            'new_password' => 'required|string|min:6|confirmed',
        ]);

        $currentUser = json_decode(request()->cookie('userData'), false);
        $user = User::where('admin_student_id', $currentUser->admin_student_id)->first();
        $user->notify(new ProjectReminder(
            'Password Changed!',
            substr($currentUser->name, 0, strpos($currentUser->name, ' ')) . ' has changed your password.',
            $user->image ? "/storage/{$user->image}" : null,
            $user->name,
            '/academy/project/tasks'
        ));

        $user = Auth::user();

        if (!password_verify($request->current_password, $user->password)) {
            return response()->json(['message' => 'Current password is incorrect'], 401);
        }

        /** @var \App\Models\User $user */
        $user->password = bcrypt($request->new_password);
        $user->save();

        return response()->json(['message' => 'Password changed successfully']);
    }

    function updateRole(Request $request)
    {
        try {
            $request->validate([
                'role' => 'required|integer',
                'access' => 'nullable|string',
            ]);

            $user = Auth::user();
            if (!$user) {
                Log::error('User not authenticated');
                return response()->json(['error' => 'Unauthorized'], 401);
            }

            $user->role = $request->role;
            if ($request->has('access')) {
                $user->access = $request->access;
            }

            // Debug akses
            Log::debug('Updating user role', [
                'user_id' => $user->id,
                'role' => $request->role,
                'access' => $request->access
            ]);

            /** @var \App\Models\User $user */
            if ($user->save()) {
                return response()->json(['message' => 'User role updated successfully']);
            } else {
                return response()->json(['error' => 'Failed to update user role'], 500);
            }
        } catch (\Throwable $e) {
            Log::error('UpdateRole Error: ' . $e->getMessage(), [
                'trace' => $e->getTraceAsString()
            ]);
            return response()->json(['error' => 'Server Error'], 500);
        }
    }

    /**
     * Update user profile image
     *
     * @param  Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateProfile(Request $request)
    {
        $user = auth()->user();

        $member = $user->admin_student_id > 0 ? 'student' : 'teacher';

        $request->validate([
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:800',
        ]);

        if ($request->hasFile('image')) {
            $folder = 'avatars/' . $member;
            $image = $request->file('image');
            $imagePath = $image->store($folder, 'public');

            // Hapus file lama jika ada
            if ($user->image && Storage::disk('public')->exists($user->image)) {
                Storage::disk('public')->delete($user->image);
            }

            $user->image = $imagePath;
        }

        /** @var \App\Models\User $user */
        $user->save();

        // Simpan juga ke student atau teacher
        if ($member === 'student' && $user->admin_student_id > 0) {
            $student = $user->adminStudent;
            if ($student) {
                $student->image = $user->image;
                $student->save();
            }
        } else {
            $teacher = $user->adminTeacher;
            if ($teacher) {
                $teacher->image = $user->image;
                $teacher->save();
            }
        }

        return response()->json([
            'message' => 'Profile updated successfully.',
            'image' => $user->image,
            'url' => Storage::url($user->image), // frontend bisa langsung pakai
        ]);
    }

    /**
     * Get the authenticated User
     *
     * @return [json] user object
     */
    public function user(Request $request)
    {
        return response()->json($request->user());
    }

    /**
     * Display a listing of the resource.
     */
    public function users(Request $request)
    {
        $itemsPerPage = (int) $request->get('itemsPerPage', 10);
        $page = (int) ($request->get('page', 1));
        $sortBy = $request->get('sortBy', 'name'); // default sort field
        $orderBy = $request->get('orderBy', 'asc'); // default order
        $search = $request->get('q', '');

        // 💥 Override page resolver
        Paginator::currentPageResolver(function () use ($page) {
            return $page > 0 ? $page : 1;
        });

        $query = User::query();

        // Search
        if ($search) {
            $query->where('name', 'like', "%{$search}%")
                ->orWhere('nickname', 'like', "%{$search}%");
        }

        // Sorting
        if ($sortBy) {
            $query->orderBy($sortBy, $orderBy);
        } else {
            $query->orderBy('id', 'desc'); // default sorting
        }

        $users = $query->paginate($itemsPerPage);

        return response()->json([
            'count' => $users->total(),
            'data' => $users->items(),
            'totalPages' => $users->lastPage(),
            'page' => $users->currentPage(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        function userRole($role)
        {
            if ($role == '1') {
                return ['Guest', 'You can only view menu in our dashboard.'];
            } elseif ($role == '2') {
                return ['User', 'You can manage your own profile and data 👍'];
            } elseif ($role == '3') {
                return ['Superuser', 'You can manage your team data!'];
            } elseif ($role == '4') {
                return ['Manager', 'You can manage and delete data!'];
            } elseif ($role == '5') {
                return ['Programmer', 'You can write and manage code 😎'];
            }
            return ['Annonimous', 'Contact us for more informations.'];
        }

        if ($request->has('role') && $request->role !== $user->role) {
            $currentUser = json_decode(request()->cookie('userData'), false);
            $user->notify(
                new ProjectReminder(
                    'Role Updated to ' . userRole($request->role)[0],
                    userRole($request->role)[1],
                    $currentUser->image ? "/storage/{$currentUser->image}" : null,
                    $currentUser->name,
                    null,
                ),
            );
        }

        if ($request->has('access') && $request->access !== $user->access) {
            $currentUser = json_decode(request()->cookie('userData'), false);
            $user->notify(
                new ProjectReminder(
                    $currentUser->name . ' give you Access.',
                    'You authorized to: ' . $request->access,
                    $currentUser->image ? "/storage/{$currentUser->image}" : null,
                    $currentUser->name,
                    null,
                ),
            );
        }

        $user->update($request->all());

        return response()->json([
            'message' => 'User data updated successfully',
            'data' => $user
        ]);
    }

    /**
     * Logout user (Revoke the token)
     *
     * @return [string] message
     */
    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();

        return response()->json([
            'message' => 'Successfully logged out'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user->delete();

        return response()->json([
            'message' => 'User data deleted successfully.',
            'count' => User::count()
        ]);
    }
}
