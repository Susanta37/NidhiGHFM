<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use App\Models\User;
use Inertia\Inertia;

class DashboardController extends Controller
{
     public function superAdmin()
    {
        return Inertia::render('SuperAdmin/Dashboard', [

            // ------------------ KPI ------------------
            'kpi' => [
                'total_users'   => User::count(),
                'active_today'  => Attendance::whereDate('date', today())->count(),
                'present_today' => Attendance::whereDate('date', today())
                                    ->whereNotNull('check_in_time')
                                    ->count(),
                'system_health' => 98,
            ],

            // ------------------ Role Count ------------------
            'roles' => [
                'hr'          => User::where('role', 'hr')->count(),
                'sitemanager' => User::where('role', 'sitemanager')->count(),
                'supervisor'  => User::where('role', 'supervisor')->count(),
                'fieldstaff'  => User::where('role', 'fieldstaff')->count(),
            ],

            // ------------------ User Growth Graph ------------------
            'userGraph' => User::selectRaw('DATE(created_at) as date, COUNT(*) as total')
                ->groupBy('date')
                ->orderBy('date')
                ->limit(12)
                ->get(),

            // ------------------ Attendance Table ------------------
            'attendance' => Attendance::with('user')
                ->latest()
                ->limit(20)
                ->get()
                ->map(function ($a) {
                    return [
                        'user'            => $a->user?->name,
                        'check_in'        => optional($a->check_in_time)->format('h:i A'),
                        'check_out'       => optional($a->check_out_time)->format('h:i A'),
                        'checkin_photo'   => $a->check_in_image ? asset('storage/' . $a->check_in_image) : null,
                        'checkout_photo'  => $a->check_out_image ? asset('storage/' . $a->check_out_image) : null,
                        'hours'           => $a->worked_hours,
                        'overtime'        => $a->ot_hours,
                        'status'          => $this->statusFromAttendance($a),
                    ];
                }),
        ]);
    }

    private function statusFromAttendance($a)
    {
        if (!$a->check_in_time) return "absent";
        if ($a->worked_hours < 7) return "late";
        return "present";
    }


    public function supervisor()
    {
        return Inertia::render('Supervisor/Dashboard');
    }

    public function hr()
    {
        return Inertia::render('Hr/Dashboard');
    }

    public function siteManager()
    {
        return Inertia::render('SiteManager/Dashboard');
    }

    public function accountant()
    {
        return Inertia::render('Accountant/Dashboard');
    }

    public function fieldStaff()
    {
        return Inertia::render('FieldStaff/Dashboard');
    }
}
