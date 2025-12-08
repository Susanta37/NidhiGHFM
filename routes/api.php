<?php


use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\FaceApiController;
use App\Http\Controllers\Api\FaceAttendanceController;
use App\Http\Controllers\Api\ProfileController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->get('/check-first-login', [AuthController::class, 'checkFirstLogin']);
Route::middleware('auth:sanctum')->get('/profile', [ProfileController::class, 'getProfile']);
Route::middleware('auth:sanctum')->post('/face/enroll', [FaceApiController::class, 'enrollFace']);
Route::middleware('auth:sanctum')->get('/attendance/status', [FaceAttendanceController::class, 'status']);
Route::middleware('auth:sanctum')->post('/attendance/check-in', [FaceAttendanceController::class, 'checkIn']);
Route::middleware('auth:sanctum')->post('/attendance/check-out', [FaceAttendanceController::class, 'checkOut']);

