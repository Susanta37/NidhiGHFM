<?php

namespace App\Http\Responses;

use App\Models\LoginLog;
use Laravel\Fortify\Contracts\LoginResponse as LoginResponseContract;
use Jenssegers\Agent\Agent;
class LoginResponse implements LoginResponseContract
{
    public function toResponse($request)
    {
       $agent = new Agent();
        $ip = request()->ip();
        try {
                $location = geoip($ip);
            } catch (\Throwable $e) {
                $location = (object) ['country' => null];
            }


        LoginLog::create([
            'user_id'  => $request->user()->id,
            'ip'       => $ip,
            'device'   => $agent->device(),
            'browser'  => $agent->browser(),
            'platform' => $agent->platform(),
            'country'  => $location->country ?? null,
        ]);

        $user = $request->user();

        if ($user->is_first_login) {
            $user->update(['is_first_login' => false]);
            return redirect()->route('onboarding.show');
        }

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
