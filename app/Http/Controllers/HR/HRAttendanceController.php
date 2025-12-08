<?php

namespace App\Http\Controllers\HR;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Attendance;
use Inertia\Inertia;

class HRAttendanceController extends Controller
{
      public function daily(Request $request)
    {
        $date = $request->query('date', now()->toDateString());

        $records = Attendance::with(['user'])
            ->whereDate('created_at', $date)
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Hr/Attendance/Daily', [
            'records' => $records,
            'selectedDate' => $date
        ]);
    }
}
