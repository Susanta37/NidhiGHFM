<?php

namespace App\Http\Controllers\SuperAdmin;

use App\Http\Controllers\Controller;
use App\Models\JobAssignment;
use App\Models\SiteJob;
use App\Models\User;
use App\Models\Shift;
use Illuminate\Http\Request;
use Inertia\Inertia;

class JobAssignmentController extends Controller
{
    public function index(Request $request)
    {
        $query = JobAssignment::with(['job', 'user']);

        if ($request->job_id) {
            $query->where('job_id', $request->job_id);
        }

        if ($request->user_id) {
            $query->where('user_id', $request->user_id);
        }

        if ($request->shift_id) {
            $query->where('shift_id', $request->shift_id);
        }

        if ($request->assigned_date) {
            $query->where('assigned_date', $request->assigned_date);
        }

        $assignments = $query->orderBy('assigned_date', 'desc')->paginate(10)->withQueryString();

        return Inertia::render('SuperAdmin/JobAssignments/Index', [
            'assignments' => $assignments,
            'jobs' => SiteJob::select('id', 'title')->get(),
            'users' => User::select('id', 'name')->get(),
            'shifts' => Shift::select('id', 'name')->get(),
            'filters' => $request->only('job_id', 'user_id', 'shift_id', 'assigned_date'),
            'kpi' => [
                'total' => JobAssignment::count(),
                'today' => JobAssignment::where('assigned_date', today())->count(),
                'users' => JobAssignment::distinct('user_id')->count(),
            ]
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'job_id' => 'required|integer',
            'user_id' => 'required|integer',
            'shift_id' => 'required|integer',
            'assigned_date' => 'required|date',
            'status' => 'nullable|string',
        ]);

        JobAssignment::create($data);

        return back()->with('success', 'Job assigned successfully');
    }

    public function update(Request $request, JobAssignment $assignment)
    {
        $data = $request->validate([
            'job_id' => 'required|integer',
            'user_id' => 'required|integer',
            'shift_id' => 'required|integer',
            'assigned_date' => 'required|date',
            'status' => 'nullable|string',
        ]);

        $assignment->update($data);

        return back()->with('success', 'Job assignment updated');
    }

    public function destroy(JobAssignment $assignment)
    {
        $assignment->delete();
        return back()->with('success', 'Job assignment deleted');
    }
}
