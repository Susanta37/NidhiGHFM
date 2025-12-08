<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'status' => false,
                'message' => 'Invalid email or password',
            ], 401);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'status' => true,
            'message' => 'Login successful',
            'token' => $token,
            'user' => $user,
        ], 200);
    }


    // ⭐ NEW API: Check First Login Status
    public function checkFirstLogin(Request $request)
    {
        $user = $request->user();

        return response()->json([
            'status' => true,
            'is_first_login' => (int) $user->is_first_login,
            'message' => $user->is_first_login == 1
                ? 'Face enrollment completed'
                : 'Face enrollment pending',
        ], 200);
    }
}

