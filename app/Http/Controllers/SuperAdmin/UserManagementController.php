<?php

namespace App\Http\Controllers\SuperAdmin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\UserProfile;
use App\Models\UserDocument;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Illuminate\Validation\Rule;

class UserManagementController extends Controller
{
    /**
     * Display user list + KPI.
     */
    public function index()
    {
        $users = User::with(['profile', 'documents'])
            ->where('role', '!=', 'superadmin')
            ->latest()
            ->get();

        // KPI Counts
        $kpi = [
            'totalUsers' => User::count(),
            'hr' => User::where('role', 'hr')->count(),
            'sitemanager' => User::where('role', 'sitemanager')->count(),
            'supervisor' => User::where('role', 'supervisor')->count(),
            'fieldstaff' => User::where('role', 'fieldstaff')->count(),
        ];

        return Inertia::render('SuperAdmin/Usermanagement/Index', [
            'users' => $users,
            'kpi' => $kpi,
        ]);
    }

    /**
     * Create user (In modal, handled by frontend)
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            // user table
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
            'role' => 'required|string',

            // profile table
            'address' => 'nullable|string',
            'emergency_contact' => 'nullable|string',
            'dob' => 'nullable|date',
            'bank_account_no' => 'nullable|string',
            'ifsc' => 'nullable|string',
            'pan_no' => 'nullable|string',
            'aadhaar_no' => 'nullable|string',
            'joining_date' => 'nullable|date',
            'blood_group' => 'nullable|string',

            // documents
            'documents' => 'nullable|array',
            'documents.*' => 'file|max:2048',
        ]);

        DB::transaction(function () use ($validated, $request) {
            $user = User::create([
                'name' => $validated['name'],
                'email' => $validated['email'],
                'password' => Hash::make($validated['password']),
                'role' => $validated['role'],
                'is_first_login' => true,
                'reports_to' => $request->reports_to,
                'salary_type' => $request->salary_type,
                'base_salary' => $request->base_salary,
                'per_day_rate' => $request->per_day_rate,
                'per_hour_rate' => $request->per_hour_rate,
                'ot_rate' => $request->ot_rate,
            ]);

            $user->profile()->create([
                'address' => $validated['address'] ?? null,
                'emergency_contact' => $validated['emergency_contact'] ?? null,
                'dob' => $validated['dob'] ?? null,
                'bank_account_no' => $validated['bank_account_no'] ?? null,
                'ifsc' => $validated['ifsc'] ?? null,
                'pan_no' => $validated['pan_no'] ?? null,
                'aadhaar_no' => $validated['aadhaar_no'] ?? null,
                'joining_date' => $validated['joining_date'] ?? null,
                'blood_group' => $validated['blood_group'] ?? null,
            ]);

            if ($request->hasFile('documents')) {
                foreach ($request->file('documents') as $file) {
                    $path = $file->store('user_documents', 'public');

                    $user->documents()->create([
                        'doc_type' => 'general',
                        'file_path' => $path,
                        'status' => 'pending',
                    ]);
                }
            }
        });

        return back()->with('success', 'User created successfully');
    }

    /**
     * Update user + profile + documents
     */
    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            // user table
            'name' => 'required|string|max:255',
            'email' => [
                'required','string','email','max:255',
                Rule::unique('users')->ignore($user->id)
            ],
            'role' => 'required|string',

            // profile table
            'address' => 'nullable|string',
            'emergency_contact' => 'nullable|string',
            'dob' => 'nullable|date',
            'bank_account_no' => 'nullable|string',
            'ifsc' => 'nullable|string',
            'pan_no' => 'nullable|string',
            'aadhaar_no' => 'nullable|string',
            'joining_date' => 'nullable|date',
            'blood_group' => 'nullable|string',

            // documents
            'documents' => 'nullable|array',
            'documents.*' => 'file|max:2048',
        ]);

        DB::transaction(function () use ($validated, $request, $user) {
            $user->update([
                'name' => $validated['name'],
                'email' => $validated['email'],
                'role' => $validated['role'],
                'reports_to' => $request->reports_to,
                'salary_type' => $request->salary_type,
                'base_salary' => $request->base_salary,
                'per_day_rate' => $request->per_day_rate,
                'per_hour_rate' => $request->per_hour_rate,
                'ot_rate' => $request->ot_rate,
            ]);

            $user->profile()->updateOrCreate(
                ['user_id' => $user->id],
                [
                    'address' => $validated['address'] ?? null,
                    'emergency_contact' => $validated['emergency_contact'] ?? null,
                    'dob' => $validated['dob'] ?? null,
                    'bank_account_no' => $validated['bank_account_no'] ?? null,
                    'ifsc' => $validated['ifsc'] ?? null,
                    'pan_no' => $validated['pan_no'] ?? null,
                    'aadhaar_no' => $validated['aadhaar_no'] ?? null,
                    'joining_date' => $validated['joining_date'] ?? null,
                    'blood_group' => $validated['blood_group'] ?? null,
                ]
            );

            if ($request->hasFile('documents')) {
                foreach ($request->file('documents') as $file) {
                    $path = $file->store('user_documents', 'public');

                    $user->documents()->create([
                        'doc_type' => 'general',
                        'file_path' => $path,
                        'status' => 'pending',
                    ]);
                }
            }
        });

        return back()->with('success', 'User updated successfully');
    }

    /**
     * Delete user
     */
    public function destroy(User $user)
    {
        $user->documents()->delete();
        $user->profile()->delete();
        $user->delete();

        return back()->with('success', 'User deleted successfully');
    }

public function uploadDocuments(Request $request, User $user)
{
    $validated = $request->validate([
        'documents' => 'required|array',
        'documents.*' => 'file|max:2048',
        'doc_type' => 'required|string',
        'expiry_date' => 'nullable|date',
    ]);

    foreach ($request->file('documents') as $file) {

        $path = $file->store('user_documents', 'public');

        $user->documents()->create([
            'doc_type' => $validated['doc_type'],             
            'file_path' => $path,
            'expiry_date' => $validated['expiry_date'],        
            'status' => 'pending',
            'verified_by' => null,
        ]);
    }

    return back()->with('success', 'Documents uploaded successfully.');
}


public function verifyDocument(Request $request, User $user, UserDocument $doc)
{
    if ($doc->user_id !== $user->id) {
        return back()->with('error', 'Invalid document.');
    }

    $action = $request->action;

    $doc->update([
        'status' => $action === 'approve' ? 'approved' : 'rejected',
        'verified_by' => auth()->id(),
    ]);

    return back()->with('success', "Document {$action}d");
}


public function removeDocument(User $user, UserDocument $doc)
{
    if ($doc->user_id !== $user->id) {
        return back()->with('error', 'Invalid document.');
    }

    // Delete file from storage
    if ($doc->file_path && Storage::disk('public')->exists($doc->file_path)) {
        Storage::disk('public')->delete($doc->file_path);
    }

    // Remove DB record
    $doc->delete();

    return back()->with('success', 'Document removed successfully.');
}


}
