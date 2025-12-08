<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    public function getProfile(Request $request)
    {
        $user = $request->user();

        // Load relations
        $user->load([
            'profile',
            'face',
            'documents',
            'attendances',
            'rateCard',
        ]);

        return response()->json([
            'status' => true,
            'message' => 'Profile fetched successfully',
            'data' => $user,
        ]);
    }
}
