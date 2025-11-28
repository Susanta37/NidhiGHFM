<?php

namespace App\Http\Controllers\SuperAdmin;

use App\Http\Controllers\Controller;
use App\Models\LeaveRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LeaveController extends Controller
{
    public function index()
    {
       $requests = LeaveRequest::with(['user', 'type', 'approver'])
        ->latest()
        ->get();

    $leaveTypes = \App\Models\LeaveType::all();  

    return Inertia::render('SuperAdmin/Leaves/Index', [
        'requests' => $requests,
        'leaveTypes' => $leaveTypes
    ]);
    }

    public function approve(LeaveRequest $leave)
    {
        $leave->update([
            'status' => 'approved',
            'approved_by' => auth()->id(),
            'approved_at' => now()
        ]);

        return back()->with('success', 'Leave approved successfully.');
    }

    public function reject(LeaveRequest $leave)
    {
        $leave->update([
            'status' => 'rejected',
            'approved_by' => auth()->id(),
            'approved_at' => now()
        ]);

        return back()->with('success', 'Leave rejected.');
    }
}
