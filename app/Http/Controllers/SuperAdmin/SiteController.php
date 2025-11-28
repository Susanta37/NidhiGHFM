<?php

namespace App\Http\Controllers\SuperAdmin;

use App\Http\Controllers\Controller;
use App\Models\Site;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SiteController extends Controller
{
    public function index(Request $request)
    {
         $query = Site::with('client');

        // Filters
        if ($request->search) {
            $query->where('site_name', 'like', "%{$request->search}%")
                  ->orWhere('address', 'like', "%{$request->search}%");
        }

        if ($request->client_id) {
            $query->where('client_id', $request->client_id);
        }

        $sites = $query->orderBy('id', 'desc')->paginate(10)->withQueryString();

        return Inertia::render('SuperAdmin/Sites/Index', [
            'sites'   => $sites,
            'filters' => $request->only('search', 'client_id'),
            'clients' => \App\Models\Client::select('id', 'name')->get(),
            'kpi' => [
                'total'   => Site::count(),
                'active'  => Site::whereNotNull('geo_lat')->count(),
                'clients' => Site::distinct('client_id')->count('client_id'),
            ]
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'client_id' => 'required|integer',
            'site_name' => 'required|string|max:255',
            'address'   => 'nullable|string',
            'geo_lat'   => 'nullable',
            'geo_lng'   => 'nullable',
        ]);

        Site::create($data);

        return back()->with('success', 'Site created successfully');
    }

    public function update(Request $request, Site $site)
    {
        $data = $request->validate([
            'client_id' => 'required|integer',
            'site_name' => 'required|string|max:255',
            'address'   => 'nullable|string',
            'geo_lat'   => 'nullable',
            'geo_lng'   => 'nullable',
        ]);

        $site->update($data);

        return back()->with('success', 'Site updated successfully');
    }

    public function destroy(Site $site)
    {
        $site->delete();

        return back()->with('success', 'Site deleted successfully');
    }
}
