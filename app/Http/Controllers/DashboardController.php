<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class DashboardController extends Controller
{
    public function superAdmin()
    {
        return Inertia::render('SuperAdmin/Dashboard');
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
