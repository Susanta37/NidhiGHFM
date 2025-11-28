<?php

namespace App\Http\Controllers\SuperAdmin;

use App\Http\Controllers\Controller;
use App\Models\ComplianceRecord;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ComplianceController extends Controller
{
    public function index(Request $request)
    {
        $query = ComplianceRecord::with(['user', 'verifier']);

        if ($request->search) {
            $query->whereHas('user', function ($q) use ($request) {
                $q->where('name', 'LIKE', "%{$request->search}%")
                  ->orWhere('email', 'LIKE', "%{$request->search}%");
            });
        }

        if ($request->status) {
            $query->where('status', $request->status);
        }

        if ($request->type) {
            $query->where('certificate_type', $request->type);
        }

        if ($request->from) {
            $query->whereDate('expiry_date', '>=', $request->from);
        }

        if ($request->to) {
            $query->whereDate('expiry_date', '<=', $request->to);
        }

        $records = $query->orderBy('expiry_date')->paginate(10)->withQueryString();

        return Inertia::render('SuperAdmin/Compliance/Index', [
            'records' => $records,
            'filters' => $request->all(),
            'types'   => ComplianceRecord::select('certificate_type')->distinct()->pluck('certificate_type'),
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'user_id'         => 'required',
            'certificate_type'=> 'required',
            'file'            => 'required|file',
            'expiry_date'     => 'required|date',
        ]);

        $data['file_path'] = $request->file('file')->store('compliance', 'public');
        $data['status']    = 'pending';

        ComplianceRecord::create($data);

        return back()->with('success', 'Record added');
    }

    public function destroy(ComplianceRecord $record)
    {
        $record->delete();

        return back()->with('success', 'Record deleted.');
    }
}
