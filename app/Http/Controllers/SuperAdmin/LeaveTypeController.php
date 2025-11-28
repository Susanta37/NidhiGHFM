<?php

namespace App\Http\Controllers\SuperAdmin;

use App\Http\Controllers\Controller;
use App\Models\LeaveType;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LeaveTypeController extends Controller
{
    public function index(Request $request)
{
    $query = LeaveType::query();

    if ($request->search) {
        $query->where('name', 'like', "%{$request->search}%");
    }

    if ($request->reset !== null && $request->reset !== '') {
        $query->where('annual_reset', $request->reset);
    }

    if ($request->maxDays) {
        $query->where('max_days', '<=', $request->maxDays);
    }

    $types = $query->orderBy('id', 'desc')->paginate(10)->withQueryString();

    return Inertia::render('SuperAdmin/LeaveTypes/Index', [
        'types'   => $types,
        'filters' => $request->only('search', 'reset', 'maxDays'),
        'kpi'     => [
            'total'     => LeaveType::count(),
            'resets'    => LeaveType::where('annual_reset', 1)->count(),
            'no_resets' => LeaveType::where('annual_reset', 0)->count(),
        ]
    ]);
}



    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required',
            'description' => 'nullable',
            'max_days' => 'required|integer',
            'annual_reset' => 'boolean'
        ]);

        LeaveType::create($data);
        return back()->with('success', 'Leave type created.');
    }

    public function update(Request $request, LeaveType $leaveType)
    {
        $data = $request->validate([
            'name' => 'required',
            'description' => 'nullable',
            'max_days' => 'required|integer',
            'annual_reset' => 'boolean'
        ]);

        $leaveType->update($data);
        return back()->with('success', 'Leave type updated.');
    }

    public function destroy(LeaveType $leaveType)
    {
        $leaveType->delete();
        return back()->with('success', 'Leave type deleted.');
    }
}

