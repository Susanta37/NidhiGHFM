<?php

namespace App\Http\Controllers\SuperAdmin;

use App\Http\Controllers\Controller;
use App\Models\JobLog;
use App\Models\SiteJob;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class JobLogController extends Controller
{
    public function index(Request $request)
    {
        $query = JobLog::with(['job', 'user']);

        if ($request->job_id) {
            $query->where('job_id', $request->job_id);
        }

        if ($request->user_id) {
            $query->where('user_id', $request->user_id);
        }

        $logs = $query->orderBy('log_time', 'desc')->paginate(10)->withQueryString();

        return Inertia::render('SuperAdmin/JobLogs/Index', [
            'logs' => $logs,
            'jobs' => SiteJob::select('id', 'title')->get(),
            'users' => User::select('id', 'name')->get(),
            'filters' => $request->only('job_id', 'user_id'),
            'kpi' => [
                'total' => JobLog::count(),
                'today' => JobLog::whereDate('log_time', today())->count(),
            ]
        ]);
    }
}
