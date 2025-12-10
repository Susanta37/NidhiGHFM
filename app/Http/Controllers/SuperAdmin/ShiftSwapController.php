<?php

namespace App\Http\Controllers\SuperAdmin;

use App\Http\Controllers\Controller;
use App\Models\ShiftSwapRequest;
use App\Models\User;
use App\Models\ShiftAssignment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class ShiftSwapController extends Controller
{
public function index()
{
    $swaps = ShiftSwapRequest::with([
        'fromUser',
        'toUser',
        'assignment.shift'
    ])
    ->orderBy('id', 'desc')
    ->paginate(10);

    return Inertia::render('SuperAdmin/ShiftSwaps/Index', [
        'swaps' => $swaps,
        'kpi' => [
            'total' => ShiftSwapRequest::count(),
            'pending' => ShiftSwapRequest::where('status', 'pending')->count(),
            'approved' => ShiftSwapRequest::where('status', 'approved')->count(),
        ]
    ]);
}


    // STEP 1: Return all fieldstaff + their upcoming shifts (FIXED)
    public function approve(ShiftSwapRequest $swap)
    {
        $fieldstaff = User::where('role', 'fieldstaff')
            ->with(['shiftAssignments' => function ($query) {
                // Only show upcoming or current shifts
                $query->where('date', '>=', now()->toDateString())
                      ->orderBy('date', 'asc')
                      ->with('shift');
            }])
            ->get();

        // Return Inertia response with the data
        return Inertia::render('SuperAdmin/ShiftSwaps/Index', [
            'swaps' => ShiftSwapRequest::with([
                'fromUser',
                'toUser',
                'assignment.shift'
            ])
            ->orderBy('id', 'desc')
            ->paginate(10)
            ->withQueryString(),
            'kpi' => [
                'total'    => ShiftSwapRequest::count(),
                'pending'  => ShiftSwapRequest::where('status', 'pending')->count(),
                'approved' => ShiftSwapRequest::where('status', 'approved')->count(),
            ],
            'swap' => $swap->load(['fromUser', 'toUser', 'assignment.shift']),
            'fieldstaff' => $fieldstaff
        ]);
    }

    // STEP 2: Assign shift to selected fieldstaff
    public function assign(Request $request, ShiftSwapRequest $swap)
    {
        $request->validate([
            'to_user_id' => 'required|exists:users,id'
        ]);

        // Check if the new user is fieldstaff
        $newUser = User::findOrFail($request->to_user_id);
        if ($newUser->role !== 'fieldstaff') {
            return back()->withErrors(['to_user_id' => 'Only field staff can be assigned to shifts.']);
        }

        // Check if new user already has a shift on that date
        $assignment = ShiftAssignment::findOrFail($swap->shift_assignment_id);
        $existingAssignment = ShiftAssignment::where('user_id', $request->to_user_id)
            ->where('date', $assignment->date)
            ->where('id', '!=', $swap->shift_assignment_id)
            ->exists();

        if ($existingAssignment) {
            return back()->withErrors(['to_user_id' => 'This user already has a shift assigned on this date.']);
        }

        // Update swap info
        $swap->update([
            'to_user_id' => $request->to_user_id,
            'status' => 'approved'
        ]);

        // Update shift assignment table
        $assignment->update([
            'user_id' => $request->to_user_id
        ]);

        return redirect()->route('shifts.swaps')->with('success', 'Shift successfully re-assigned to selected fieldstaff!');
    }

    public function reject(ShiftSwapRequest $swap)
    {
        $swap->update(['status' => 'rejected']);
        return back()->with('success', 'Swap Rejected');
    }
}
