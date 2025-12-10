<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\FaceApiController;
use App\Http\Controllers\Api\FaceAttendanceController;
use App\Http\Controllers\Api\FieldStaffShiftController;
use App\Http\Controllers\Api\ProfileController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

// Authentication
Route::post('/login', [AuthController::class, 'login']);

// Protected Routes
Route::middleware('auth:sanctum')->group(function () {

    // Auth & Profile
    Route::get('/check-first-login', [AuthController::class, 'checkFirstLogin']);
    Route::get('/profile', [ProfileController::class, 'getProfile']);

    // Face Recognition
    Route::post('/face/enroll', [FaceApiController::class, 'enrollFace']);

    // Attendance
    Route::get('/attendance/status', [FaceAttendanceController::class, 'status']);
    Route::post('/attendance/check-in', [FaceAttendanceController::class, 'checkIn']);
    Route::post('/attendance/check-out', [FaceAttendanceController::class, 'checkOut']);

    // Field Staff Shifts
    Route::prefix('shifts')->group(function () {
        Route::get('/', [FieldStaffShiftController::class, 'getAssignedShifts']);
        Route::get('/today', [FieldStaffShiftController::class, 'getTodayShift']);
        Route::get('/upcoming', [FieldStaffShiftController::class, 'getUpcomingShifts']);
        Route::get('/stats', [FieldStaffShiftController::class, 'getShiftStats']);
        Route::get('/{id}', [FieldStaffShiftController::class, 'getShiftDetails']);

        //fieldstaff can apply for shift swap requests
        Route::post('/swap-request', [FieldStaffShiftController::class, 'apply']);
    });
});
