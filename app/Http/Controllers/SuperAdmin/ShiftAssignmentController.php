<?php

namespace App\Http\Controllers\SuperAdmin;

use App\Http\Controllers\Controller;
use App\Models\ShiftAssignment;
use App\Models\Shift;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ShiftAssignmentController extends Controller
{
    public function index(Request $request)
    {
        $query = ShiftAssignment::with(['shift', 'user']);

        if ($request->shift_id) {
            $query->where('shift_id', $request->shift_id);
        }

        if ($request->user_id) {
            $query->where('user_id', $request->user_id);
        }

        if ($request->date) {
            $query->where('date', $request->date);
        }

        $assignments = $query->orderBy('date', 'desc')->paginate(10)->withQueryString();

        return Inertia::render('SuperAdmin/ShiftAssignments/Index', [
            'assignments' => $assignments,
            'shifts' => Shift::select('id', 'name')->get(),
            'users' => User::select('id', 'name')->get(),
            'filters' => $request->only('shift_id', 'user_id', 'date'),
            'kpi' => [
                'total' => ShiftAssignment::count(),
                'today' => ShiftAssignment::where('date', today())->count(),
                'distinctUsers' => ShiftAssignment::distinct('user_id')->count('user_id'),
            ]
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'shift_id' => 'required',
            'user_id' => 'required',
            'date' => 'required|date',
            'status' => 'nullable|string',
        ]);

        ShiftAssignment::create($data);

        return back()->with('success', 'Shift assigned.');
    }

    public function update(Request $request, ShiftAssignment $shiftAssignment)
    {
        $data = $request->validate([
            'shift_id' => 'required',
            'user_id' => 'required',
            'date' => 'required|date',
            'status' => 'nullable|string',
        ]);

        $shiftAssignment->update($data);

        return back()->with('success', 'Updated.');
    }

    public function destroy(ShiftAssignment $shiftAssignment)
    {
        $shiftAssignment->delete();
        return back()->with('success', 'Deleted.');
    }
}
