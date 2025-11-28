<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\OnboardingController;
use App\Http\Controllers\SuperAdmin\AttendanceController;
use App\Http\Controllers\SuperAdmin\ClientController;
use App\Http\Controllers\SuperAdmin\ComplianceController;
use App\Http\Controllers\SuperAdmin\FaceRecognitionController;
use App\Http\Controllers\SuperAdmin\InventoryController;
use App\Http\Controllers\SuperAdmin\JobAssignmentController;
use App\Http\Controllers\SuperAdmin\JobController;
use App\Http\Controllers\SuperAdmin\JobLogController;
use App\Http\Controllers\SuperAdmin\LeaveController;
use App\Http\Controllers\SuperAdmin\LeaveTypeController;
use App\Http\Controllers\SuperAdmin\ShiftAssignmentController;
use App\Http\Controllers\SuperAdmin\ShiftController;
use App\Http\Controllers\SuperAdmin\ShiftSwapController;
use App\Http\Controllers\SuperAdmin\SiteController;
use App\Http\Controllers\SuperAdmin\SiteInventoryStockController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\SuperAdmin\UserManagementController;

Route::get('/', function () {
    if (Auth::check()) {
        $role = Auth::user()->role;
        return match ($role) {
            'superadmin'  => redirect()->route('dashboard.superadmin'),
            'supervisor'  => redirect()->route('dashboard.supervisor'),
            'hr'          => redirect()->route('dashboard.hr'),
            'sitemanager' => redirect()->route('dashboard.sitemanager'),
            'accountant'  => redirect()->route('dashboard.accountant'),
            'fieldstaff'  => redirect()->route('dashboard.fieldstaff'),
            default       => redirect()->route('dashboard.fieldstaff'),
        };
    }

    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::get('/onboarding', fn () =>
    Inertia::render('Onboarding/Welcome')
)->middleware(['auth'])->name('onboarding.show');
Route::post('/onboarding/skip', [OnboardingController::class, 'skip'])
    ->middleware('auth')
    ->name('onboarding.skip');


Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('/super-admin/dashboard', [DashboardController::class, 'superAdmin'])->middleware('role:superadmin')->name('dashboard.superadmin');
    Route::resource('super-admin/users', UserManagementController::class)->middleware('role:superadmin');
    Route::post('super-admin/users/{user}/documents',[UserManagementController::class, 'uploadDocuments'])->middleware('role:superadmin')->name('users.documents.upload');
    Route::get('super-admin/face/records',[FaceRecognitionController::class, 'faceRecords'])->middleware('role:superadmin')->name('face.records');
    Route::post('/super-admin/users/{user}/face-register',[FaceRecognitionController::class, 'registerFace'])->middleware('role:superadmin')->name('users.face.register');
    Route::get('/super-admin/face/logs',[FaceRecognitionController::class, 'faceLogs'])->middleware('role:superadmin')->name('face.logs');
    Route::get('/super-admin/face/settings',[FaceRecognitionController::class, 'settingsPage'])->middleware('role:superadmin')->name('face.settings');
    Route::post('/super-admin/face/settings/save',[FaceRecognitionController::class, 'saveSettings'])->middleware('role:superadmin')->name('face.settings.save');
    Route::get('/super-admin/attendance/daily',[AttendanceController::class, 'daily'])->middleware('role:superadmin')->name('attendance.daily');
 // Leave Requests
    Route::get('/super-admin/leaves', [LeaveController::class, 'index'])->name('leaves.index');
    Route::post('/super-admin/leaves/{leave}/approve', [LeaveController::class, 'approve'])->name('leaves.approve');
    Route::post('/super-admin/leaves/{leave}/reject', [LeaveController::class, 'reject'])->name('leaves.reject');
    // Leave Types
    Route::resource('/super-admin/leave-types', LeaveTypeController::class);
     Route::get('/super-admin/compliance', [ComplianceController::class, 'index'])
        ->name('compliance.index');
    Route::post('/super-admin/compliance', [ComplianceController::class, 'store'])
        ->name('compliance.store');
    Route::put('/super-admin/compliance/{record}', [ComplianceController::class, 'update'])
        ->name('compliance.update');
    Route::delete('/super-admin/compliance/{record}', [ComplianceController::class, 'destroy'])
        ->name('compliance.delete');
    Route::post('/super-admin/compliance/{record}/verify', [ComplianceController::class, 'verify'])
        ->name('compliance.verify');
    Route::resource('/super-admin/inventory', InventoryController::class);
    Route::resource('/super-admin/site-inventory-stock', SiteInventoryStockController::class);
    Route::resource('/super-admin/sites', SiteController::class);
    Route::resource('/super-admin/clients', ClientController::class);
   // Shift Management
Route::resource('/super-admin/shifts', ShiftController::class)->except(['show']);

// Shift Assignments
Route::get('/super-admin/shifts/assignments', [ShiftAssignmentController::class, 'index'])
    ->name('shifts.assignments');
Route::post('/super-admin/shifts/assignments', [ShiftAssignmentController::class, 'store']);
Route::put('/super-admin/shifts/assignments/{assignment}', [ShiftAssignmentController::class, 'update']);
Route::delete('/super-admin/shifts/assignments/{assignment}', [ShiftAssignmentController::class, 'destroy']);

// Shift Swap Requests
Route::get('/super-admin/shifts/swaps', [ShiftSwapController::class, 'index'])
    ->name('shifts.swaps');
Route::post('/super-admin/shifts/swaps/{swap}/approve', [ShiftSwapController::class, 'approve']);
Route::post('/super-admin/shifts/swaps/{swap}/reject', [ShiftSwapController::class, 'reject']);
Route::resource('/super-admin/jobs', JobController::class)->except(['show']);
Route::prefix('/super-admin/job-assignments')->group(function () {
    Route::get('/', [JobAssignmentController::class, 'index']);
    Route::post('/', [JobAssignmentController::class, 'store']);
    Route::put('/{assignment}', [JobAssignmentController::class, 'update']);
    Route::delete('/{assignment}', [JobAssignmentController::class, 'destroy']);
});
Route::prefix('/super-admin/job-logs')->group(function () {
    Route::get('/', [JobLogController::class, 'index']);
});
















    Route::get('/supervisor/dashboard', [DashboardController::class, 'supervisor'])
        ->middleware('role:supervisor')
        ->name('dashboard.supervisor');

    Route::get('/hr/dashboard', [DashboardController::class, 'hr'])
        ->middleware('role:hr')
        ->name('dashboard.hr');

    Route::get('/sitemanager/dashboard', [DashboardController::class, 'siteManager'])
        ->middleware('role:sitemanager')
        ->name('dashboard.sitemanager');

    Route::get('/accountant/dashboard', [DashboardController::class, 'accountant'])
        ->middleware('role:accountant')
        ->name('dashboard.accountant');

    Route::get('/fieldstaff/dashboard', [DashboardController::class, 'fieldStaff'])
        ->middleware('role:fieldstaff')
        ->name('dashboard.fieldstaff');
        
});


require __DIR__.'/settings.php';
