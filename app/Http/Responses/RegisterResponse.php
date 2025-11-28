<?php

namespace App\Http\Responses;

use Laravel\Fortify\Contracts\RegisterResponse as RegisterResponseContract;

class RegisterResponse implements RegisterResponseContract
{
    public function toResponse($request)
    {
        $role = $request->user()->role;

        return match ($role) {
            'superadmin'  => redirect()->intended(route('dashboard.superadmin')),
            'supervisor'  => redirect()->intended(route('dashboard.supervisor')),
            'hr'          => redirect()->intended(route('dashboard.hr')),
            'sitemanager' => redirect()->intended(route('dashboard.sitemanager')),
            'accountant'  => redirect()->intended(route('dashboard.accountant')),
            'fieldstaff'  => redirect()->intended(route('dashboard.fieldstaff')),
            default       => redirect()->intended(route('dashboard.fieldstaff')), 
        };
    }
}
