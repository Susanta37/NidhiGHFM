<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HR\HRAttendanceController;
use App\Http\Controllers\HR\ManualAttendanceController;
use App\Http\Controllers\HR\HREmployeeController;
use App\Http\Controllers\HR\HRFaceRecognitionController;
use App\Http\Controllers\HR\HRUserManagementController;
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
use App\Http\Controllers\SuperAdmin\UserManagementController;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

/*
|--------------------------------------------------------------------------
| Home Redirect
|--------------------------------------------------------------------------
*/
Route::get('/', function () {
    if (Auth::check()) {
        $role = Auth::user()->role;

        return match ($role) {
            'superadmin'  => redirect()->route('dashboard.superadmin'),
            'supervisor'  => redirect()->route('dashboard.supervisor'),
            'hr'          => redirect()->route('dashboard.hr'), // FIXED
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


/*
|--------------------------------------------------------------------------
| Onboarding
|--------------------------------------------------------------------------
*/
Route::get('/onboarding', fn () =>
    Inertia::render('Onboarding/Welcome')
)->middleware(['auth'])->name('onboarding.show');

Route::post('/onboarding/skip', [OnboardingController::class, 'skip'])
    ->middleware('auth')
    ->name('onboarding.skip');


/*
|--------------------------------------------------------------------------
| Authenticated Routes
|--------------------------------------------------------------------------
*/
Route::middleware(['auth', 'verified'])->group(function () {

    /*
    |--------------------------------------------------------------------------
    | SUPER ADMIN ROUTES
    |--------------------------------------------------------------------------
    */

    Route::get('/super-admin/dashboard', [DashboardController::class, 'superAdmin'])
        ->middleware('role:superadmin')
        ->name('dashboard.superadmin');

    // Users
    Route::resource('super-admin/users', UserManagementController::class)->middleware('role:superadmin');
    Route::post('super-admin/users/{user}/documents', [UserManagementController::class, 'uploadDocuments'])->middleware('role:superadmin')->name('users.documents.upload');
    Route::post('/super-admin/users/{user}/documents/{doc}/verify', [UserManagementController::class, 'verifyDocument'])->name('users.documents.verify');
    Route::delete('/super-admin/users/{user}/documents/{doc}', [UserManagementController::class, 'removeDocument'])->middleware('role:superadmin')->name('users.documents.delete');


    // Face Recognition
    Route::get('/super-admin/face/records', [FaceRecognitionController::class, 'faceRecords'])
        ->middleware('role:superadmin')
        ->name('face.records');

    Route::post('/super-admin/users/{user}/face-register', [FaceRecognitionController::class, 'registerFace'])
        ->middleware('role:superadmin')
        ->name('users.face.register');

    Route::get('/super-admin/face/logs', [FaceRecognitionController::class, 'faceLogs'])
        ->middleware('role:superadmin')
        ->name('face.logs');

    Route::get('/super-admin/face/settings', [FaceRecognitionController::class, 'settingsPage'])
        ->middleware('role:superadmin')
        ->name('face.settings');

    Route::post('/super-admin/face/settings/save', [FaceRecognitionController::class, 'saveSettings'])
        ->middleware('role:superadmin')
        ->name('face.settings.save');

    // Attendance
    Route::get('/super-admin/attendance/daily', [AttendanceController::class, 'daily'])
        ->middleware('role:superadmin')
        ->name('attendance.daily');

    // Leaves
    Route::get('/super-admin/leaves', [LeaveController::class, 'index'])->name('leaves.index');
    Route::post('/super-admin/leaves/{leave}/approve', [LeaveController::class, 'approve'])->name('leaves.approve');
    Route::post('/super-admin/leaves/{leave}/reject', [LeaveController::class, 'reject'])->name('leaves.reject');
    Route::resource('/super-admin/leave-types', LeaveTypeController::class);

    // Compliance
    Route::get('/super-admin/compliance', [ComplianceController::class, 'index'])->name('compliance.index');
    Route::post('/super-admin/compliance', [ComplianceController::class, 'store'])->name('compliance.store');
    Route::put('/super-admin/compliance/{record}', [ComplianceController::class, 'update'])->name('compliance.update');
    Route::delete('/super-admin/compliance/{record}', [ComplianceController::class, 'destroy'])->name('compliance.delete');
    Route::post('/super-admin/compliance/{record}/verify', [ComplianceController::class, 'verify'])->name('compliance.verify');

    // Inventory
    Route::resource('/super-admin/inventory', InventoryController::class);
    Route::resource('/super-admin/site-inventory-stock', SiteInventoryStockController::class);

    // Sites & Clients
    Route::resource('/super-admin/sites', SiteController::class);
    Route::resource('/super-admin/clients', ClientController::class);

    /*
    |--------------------------------------------------------------------------
    | SHIFTS
    |--------------------------------------------------------------------------
    */
    Route::resource('/super-admin/shifts', ShiftController::class)->except(['show']);

    // Assignments (use proper route naming)
Route::get('/super-admin/shifts/assignments', [ShiftAssignmentController::class, 'index'])
    ->name('shifts.assignments');
Route::post('/super-admin/shifts/assignments', [ShiftAssignmentController::class, 'store'])
    ->name('shifts.assignments.store');
Route::put('/super-admin/shifts/assignments/{assignment}', [ShiftAssignmentController::class, 'update'])
    ->name('shifts.assignments.update');
Route::delete('/super-admin/shifts/assignments/{assignment}', [ShiftAssignmentController::class, 'destroy'])
    ->name('shifts.assignments.destroy');


    
 // Swap Requests
Route::get('/super-admin/shifts/swaps', [ShiftSwapController::class, 'index'])
    ->name('shifts.swaps');

// Load fieldstaff & show approve modal (GET)
Route::get('/super-admin/shifts/swaps/{swap}/approve', [ShiftSwapController::class, 'approve'])
    ->name('shifts.swaps.loadForApproval');

// Assign the shift to selected fieldstaff (POST)
Route::post('/super-admin/shifts/swaps/{swap}/assign', [ShiftSwapController::class, 'assign'])
    ->name('shifts.swaps.assign');

// Reject
Route::post('/super-admin/shifts/swaps/{swap}/reject', [ShiftSwapController::class, 'reject'])
    ->name('shifts.swaps.reject');


    /*
    |--------------------------------------------------------------------------
    | JOBS
    |--------------------------------------------------------------------------
    */

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

    /*
    |--------------------------------------------------------------------------
    | SUPERVISOR
    |--------------------------------------------------------------------------
    */
    Route::get('/supervisor/dashboard', [DashboardController::class, 'supervisor'])
        ->middleware('role:supervisor')
        ->name('dashboard.supervisor');

    /*
    |--------------------------------------------------------------------------
    | HR MODULE  (FIXED dashboard.hr route)
    |--------------------------------------------------------------------------
    */
    Route::prefix('hr')
        ->as('dashboard.')  // ✔ Ensures dashboard.hr exists
        ->middleware('role:hr')
        ->group(function () {

            Route::get('/dashboard', [DashboardController::class, 'hr'])
                ->name('hr');  // ✔ dashboard.hr now exists

        });

    Route::prefix('hr')
        ->as('hr.')
        ->middleware('role:hr')
        ->group(function () {

            Route::get('/attendance', [HRAttendanceController::class, 'hrAttendance'])->name('attendance');
            Route::get('/employees', [HREmployeeController::class, 'hrEmployees'])->name('employees');

            Route::get('/face/records', [HRFaceRecognitionController::class, 'faceRecords'])->name('face.records');
            Route::post('/users/{user}/face-register', [HRFaceRecognitionController::class, 'registerFace'])->name('users.face.register');
            Route::get('/face/logs', [HRFaceRecognitionController::class, 'faceLogs'])->name('face.logs');
            Route::get('/face/settings', [HRFaceRecognitionController::class, 'settingsPage'])->name('face.settings');
            Route::post('/face/settings/save', [HRFaceRecognitionController::class, 'saveSettings'])->name('face.settings.save');

            Route::resource('users', HRUserManagementController::class);

            Route::post('/users/{user}/documents', [HRUserManagementController::class, 'uploadDocuments'])->name('users.documents.upload');

            Route::get('/attendance/daily', [HRAttendanceController::class, 'daily'])->name('attendance.daily');

            Route::resource('manual-attendance', ManualAttendanceController::class);
        });

    /*
    |--------------------------------------------------------------------------
    | OTHER DASHBOARDS
    |--------------------------------------------------------------------------
    */
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
