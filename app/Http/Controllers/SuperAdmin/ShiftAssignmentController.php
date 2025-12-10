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
        $query = ShiftAssignment::with(['shift.client', 'user']);

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
            'shifts' => Shift::with('client:id,name')
                ->select('id', 'name', 'client_id')
                ->get()
                ->map(fn($shift) => [
                    'id' => $shift->id,
                    'name' => $shift->name,
                    'client_name' => $shift->client?->name,
                    'display_name' => $shift->name . ' - ' . ($shift->client?->name ?? 'No Client')
                ]),
            'users' => User::where('role', 'fieldstaff')
                ->select('id', 'name', 'role')
                ->get(),
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
            'shift_id' => 'required|exists:shifts,id',
            'user_id' => 'required|exists:users,id',
            'date' => 'required|date',
            'status' => 'nullable|string|in:assigned,confirmed,completed,cancelled',
        ]);

        // Check if user has fieldstaff role
        $user = User::findOrFail($data['user_id']);
        if ($user->role !== 'fieldstaff') {
            return back()->withErrors(['user_id' => 'Only field staff can be assigned to shifts.']);
        }

        // Check for duplicate assignment
        $exists = ShiftAssignment::where('user_id', $data['user_id'])
            ->where('date', $data['date'])
            ->exists();

        if ($exists) {
            return back()->withErrors(['user_id' => 'This user is already assigned a shift on this date.']);
        }

        ShiftAssignment::create($data);

        return back()->with('success', 'Shift assigned successfully.');
    }

    public function update(Request $request, ShiftAssignment $assignment)
    {
        $data = $request->validate([
            'shift_id' => 'required|exists:shifts,id',
            'user_id' => 'required|exists:users,id',
            'date' => 'required|date',
            'status' => 'nullable|string|in:assigned,confirmed,completed,cancelled',
        ]);

        // Check if user has fieldstaff role
        $user = User::findOrFail($data['user_id']);
        if ($user->role !== 'fieldstaff') {
            return back()->withErrors(['user_id' => 'Only field staff can be assigned to shifts.']);
        }

        // Check for duplicate assignment (excluding current)
        $exists = ShiftAssignment::where('user_id', $data['user_id'])
            ->where('date', $data['date'])
            ->where('id', '!=', $assignment->id)
            ->exists();

        if ($exists) {
            return back()->withErrors(['user_id' => 'This user is already assigned a shift on this date.']);
        }

        $assignment->update($data);

        return back()->with('success', 'Assignment updated successfully.');
    }

    public function destroy(ShiftAssignment $assignment)
    {
        $assignment->delete();
        return back()->with('success', 'Assignment deleted successfully.');
    }
}
