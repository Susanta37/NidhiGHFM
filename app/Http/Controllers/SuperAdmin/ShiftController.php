<?php

namespace App\Http\Controllers\SuperAdmin;

use App\Http\Controllers\Controller;
use App\Models\Shift;
use App\Models\Client;
use App\Models\Site;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ShiftController extends Controller
{
    public function index(Request $request)
    {
        $query = Shift::with(['client', 'site']);

        if ($request->search) {
            $query->where('name', 'like', "%{$request->search}%");
        }

        if ($request->client_id) {
            $query->where('client_id', $request->client_id);
        }

        if ($request->site_id) {
            $query->where('site_id', $request->site_id);
        }

        $shifts = $query->orderBy('id', 'desc')->paginate(10)->withQueryString();

        return Inertia::render('SuperAdmin/Shifts/Index', [
            'shifts' => $shifts,
            'filters' => $request->only('search', 'client_id', 'site_id'),
            'clients' => Client::select('id', 'name')->get(),
            'sites' => Site::select('id', 'site_name')->get(),
            'kpi' => [
                'total' => Shift::count(),
                'byClients' => Shift::distinct('client_id')->count('client_id'),
                'bySites' => Shift::distinct('site_id')->count('site_id'),
            ]
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'client_id' => 'required|integer',
            'site_id' => 'required|integer',
            'name' => 'required|string|max:255',
            'start_time' => 'required',
            'end_time' => 'required',
            'break_minutes' => 'nullable|integer',
            'tasks' => 'nullable|array',
            'tasks.*' => 'string',
            'auto_assign_rules' => 'nullable|array',
        ]);

        Shift::create($data);

        return back()->with('success', 'Shift created.');
    }

    public function update(Request $request, Shift $shift)
    {
        $data = $request->validate([
            'client_id' => 'required|integer',
            'site_id' => 'required|integer',
            'name' => 'required|string|max:255',
            'start_time' => 'required',
            'end_time' => 'required',
            'break_minutes' => 'nullable|integer',
            'tasks' => 'nullable|array',
            'auto_assign_rules' => 'nullable|array',
        ]);

        $shift->update($data);

        return back()->with('success', 'Shift updated.');
    }

    public function destroy(Shift $shift)
    {
        $shift->delete();
        return back()->with('success', 'Shift deleted.');
    }
}
