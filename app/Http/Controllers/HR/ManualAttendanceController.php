<?php

namespace App\Http\Controllers\HR;

use App\Http\Controllers\Controller;
use App\Models\Attendance;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ManualAttendanceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Attendance::query()
            ->with(['user', 'submittedByUser'])
            ->whereNotNull('submitted_by'); // Filter for manually added records

        if ($request->has('search')) {
            $search = $request->search;
            $query->whereHas('user', function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%");
            });
        }

        if ($request->has('date')) {
            $query->whereDate('date', $request->date);
        }

        $attendances = $query->orderBy('date', 'desc')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Hr/Attendance/ManualCorrection', [
            'attendances' => $attendances,
            'filters' => $request->only(['search', 'date']),
            'employees' => User::where('role', '!=', 'superadmin')->select('id', 'name')->get(), // For dropdown
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'date' => 'required|date',
            'check_in_time' => 'required|date_format:H:i',
            'check_out_time' => 'nullable|date_format:H:i|after:check_in_time',
            'notes' => 'nullable|string|max:255',
        ]);

        $checkIn = Carbon::parse($request->date . ' ' . $request->check_in_time);
        $checkOut = $request->check_out_time ? Carbon::parse($request->date . ' ' . $request->check_out_time) : null;

        $workedHours = 0;
        if ($checkOut) {
            $workedHours = $checkOut->diffInMinutes($checkIn) / 60;
        }

        Attendance::create([
            'user_id' => $validated['user_id'],
            'date' => $validated['date'],
            'check_in_time' => $checkIn,
            'check_out_time' => $checkOut,
            'worked_hours' => number_format($workedHours, 2),
            'notes' => $validated['notes'],
            'submitted_by' => Auth::id(),
            'is_face_matched' => false, // Manual entry
        ]);

        return redirect()->back()->with('success', 'Attendance added successfully.');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Attendance $attendance)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'date' => 'required|date',
            'check_in_time' => 'required|date_format:H:i',
            'check_out_time' => 'nullable|date_format:H:i|after:check_in_time',
            'notes' => 'nullable|string|max:255',
        ]);

        $checkIn = Carbon::parse($request->date . ' ' . $request->check_in_time);
        $checkOut = $request->check_out_time ? Carbon::parse($request->date . ' ' . $request->check_out_time) : null;

        $workedHours = 0;
        if ($checkOut) {
            $workedHours = $checkOut->diffInMinutes($checkIn) / 60;
        }

        $attendance->update([
            'user_id' => $validated['user_id'],
            'date' => $validated['date'],
            'check_in_time' => $checkIn,
            'check_out_time' => $checkOut,
            'worked_hours' => number_format($workedHours, 2),
            'notes' => $validated['notes'],
            // submitted_by remains the original submitter or could be updated to modifier?
            // Usually we keep original submitter or track modifier separately.
            // Requirement says "Save submitted_by = HR user ID" for creation.
            // For update, "HR can modify any field". I'll leave submitted_by as is or update it?
            // Let's update it to the person who last modified it as per "submitted_by = HR user ID" logic generally implies responsibility.
            'submitted_by' => Auth::id(),
        ]);

        return redirect()->back()->with('success', 'Attendance updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Attendance $attendance)
    {
        $attendance->delete();

        return redirect()->back()->with('success', 'Attendance deleted successfully.');
    }
}
