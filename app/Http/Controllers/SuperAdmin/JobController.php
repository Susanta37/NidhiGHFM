<?php

namespace App\Http\Controllers\SuperAdmin;

use App\Http\Controllers\Controller;
use App\Models\SiteJob;
use App\Models\Site;
use Illuminate\Http\Request;
use Inertia\Inertia;

class JobController extends Controller
{
    public function index(Request $request)
    {
        $query = SiteJob::with('site');

        if ($request->search) {
            $query->where('title', 'like', "%{$request->search}%");
        }

        if ($request->site_id) {
            $query->where('site_id', $request->site_id);
        }

        $jobs = $query->orderBy('id', 'desc')->paginate(10)->withQueryString();

        return Inertia::render('SuperAdmin/Jobs/Index', [
            'jobs' => $jobs,
            'sites' => Site::select('id', 'site_name')->get(),
            'filters' => $request->only('search', 'site_id'),
            'kpi' => [
                'total' => SiteJob::count(),
                'sites' => SiteJob::distinct('site_id')->count('site_id'),
                'highBilling' => SiteJob::where('billing_rate', '>', 500)->count(),
            ]
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'site_id' => 'required|integer',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'frequency' => 'required|string',
            'billing_rate' => 'required|numeric',
        ]);

        SiteJob::create($data);

        return back()->with('success', 'Job created successfully');
    }

    public function update(Request $request, SiteJob $job)
    {
        $data = $request->validate([
            'site_id' => 'required|integer',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'frequency' => 'required|string',
            'billing_rate' => 'required|numeric',
        ]);

        $job->update($data);

        return back()->with('success', 'Job updated successfully');
    }

    public function destroy(SiteJob $job)
    {
        $job->delete();
        return back()->with('success', 'Job deleted successfully');
    }
}
