<?php

namespace App\Http\Controllers\SuperAdmin;

use App\Http\Controllers\Controller;
use App\Models\ShiftSwapRequest;
use App\Models\User;
use App\Models\ShiftAssignment;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ShiftSwapController extends Controller
{
    public function index(Request $request)
    {
        $swaps = ShiftSwapRequest::with([
            'fromUser',
            'toUser',
            'assignment.shift'
        ])->orderBy('id', 'desc')->paginate(10)->withQueryString();

        return Inertia::render('SuperAdmin/ShiftSwaps/Index', [
            'swaps' => $swaps,
            'kpi' => [
                'total' => ShiftSwapRequest::count(),
                'pending' => ShiftSwapRequest::where('status', 'pending')->count(),
                'approved' => ShiftSwapRequest::where('status', 'approved')->count(),
            ]
        ]);
    }

    public function approve(ShiftSwapRequest $swap)
    {
        $swap->update(['status' => 'approved']);
        return back()->with('success', 'Swap Approved');
    }

    public function reject(ShiftSwapRequest $swap)
    {
        $swap->update(['status' => 'rejected']);
        return back()->with('success', 'Swap Rejected');
    }
}
