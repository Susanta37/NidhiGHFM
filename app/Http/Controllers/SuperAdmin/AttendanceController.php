<?php

namespace App\Http\Controllers\SuperAdmin;

use App\Http\Controllers\Controller;
use App\Models;
use App\Models\Attendance;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AttendanceController extends Controller
{
    public function daily(Request $request)
    {
        $date = $request->query('date', now()->toDateString());

        $records = Attendance::with(['user'])
            ->whereDate('created_at', $date)
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('SuperAdmin/Attendance/Daily', [
            'records' => $records,
            'selectedDate' => $date
        ]);
    }
}
