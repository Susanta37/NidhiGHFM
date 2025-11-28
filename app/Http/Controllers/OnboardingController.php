<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class OnboardingController extends Controller
{
    public function skip(Request $request)
    {
        $user = $request->user();
        $user->update(['is_first_login' => false]);

        // Redirect by role
        return match ($user->role) {
            'superadmin'  => redirect()->route('dashboard.superadmin'),
            'supervisor'  => redirect()->route('dashboard.supervisor'),
            'hr'          => redirect()->route('dashboard.hr'),
            'sitemanager' => redirect()->route('dashboard.sitemanager'),
            'accountant'  => redirect()->route('dashboard.accountant'),
            'fieldstaff'  => redirect()->route('dashboard.fieldstaff'),
            default       => redirect()->route('dashboard.fieldstaff'),
        };
    }
}
