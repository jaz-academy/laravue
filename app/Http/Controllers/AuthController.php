<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Validator;

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
}
