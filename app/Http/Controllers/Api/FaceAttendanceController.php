<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Attendance;
use App\Models\UserFaceEmbedding;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;

class FaceAttendanceController extends Controller
{
    private string $serviceUrl;

    public function __construct()
    {
        $this->serviceUrl = config('services.python_microservice.url');
    }

    public function status()
    {
        $user = auth()->user();
        $today = now()->toDateString();

        $attendance = Attendance::where('user_id', $user->id)
            ->where('date', $today)
            ->first();

        if (!$attendance) {
            return response()->json([
                'status' => 'not_checked_in',
                'can_check_in' => true,
                'can_check_out' => false,
            ]);
        }

        if ($attendance->check_in_time && !$attendance->check_out_time) {
            return response()->json([
                'status' => 'checked_in',
                'check_in_time' => $attendance->check_in_time,
                'can_check_in' => false,
                'can_check_out' => true,
            ]);
        }

        return response()->json([
            'status' => 'checked_out',
            'check_in_time' => $attendance->check_in_time,
            'check_out_time' => $attendance->check_out_time,
            'worked_hours' => $attendance->worked_hours,
            'ot_hours' => $attendance->ot_hours,
            'can_check_in' => false,
            'can_check_out' => false,
        ]);
    }

    public function checkIn(Request $request)
    {
        $request->validate([
            'image' => 'required',
            'gps_lat' => 'nullable|numeric',
            'gps_lng' => 'nullable|numeric',
        ]);

        $user = auth()->user();

        $stored = UserFaceEmbedding::where('user_id', $user->id)->first();
        if (!$stored) {
            return response()->json(['error' => 'No face enrolled'], 400);
        }

        // Encode face
        $encoded = Http::post("{$this->serviceUrl}/encode", [
            'image' => $request->image
        ]);

        $encodedData = $encoded->json();

        if (!$encoded->successful() || ($encodedData['success'] ?? false) !== true) {
            return response()->json(['error' => 'No face detected', 'details' => $encodedData], 422);
        }

        // Compare face vectors
        $compare = Http::post("{$this->serviceUrl}/compare", [
            'embedding1' => json_decode($stored->embedding),
            'embedding2' => $encodedData['embedding']
        ]);

        $compareData = $compare->json();

        if (!$compare->successful() || ($compareData['success'] ?? false) !== true) {
            return response()->json(['error' => 'Face comparison failed', 'details' => $compareData], 500);
        }

        if (!($compareData['match'] ?? false)) {
            return response()->json([
                'error' => 'Face mismatch',
                'distance' => $compareData['distance'] ?? null
            ], 403);
        }

        // Save image
        $imageName = "checkin_{$user->id}_" . time() . ".jpg";
        Storage::disk('public')->put("attendance/$imageName", base64_decode($request->image));

        // Prevent second check-in
        $today = now()->toDateString();
        $existing = Attendance::where('user_id', $user->id)->where('date', $today)->first();

        if ($existing) {
            return response()->json(['error' => 'Already checked in'], 409);
        }

        Attendance::create([
            'user_id' => $user->id,
            'date' => $today,
            'check_in_time' => now()->format('H:i:s'),
            'check_in_image' => "attendance/$imageName",
            'check_in_lat' => $request->gps_lat,
            'check_in_lng' => $request->gps_lng,
            'is_face_matched' => 1,
        ]);

        return response()->json([
            'message' => 'Check-in successful',
            'type' => 'check_in',
        ]);
    }

    public function checkOut(Request $request)
    {
        $request->validate([
            'image' => 'required',
            'gps_lat' => 'nullable|numeric',
            'gps_lng' => 'nullable|numeric',
        ]);

        $user = auth()->user();

        $stored = UserFaceEmbedding::where('user_id', $user->id)->first();
        if (!$stored) {
            return response()->json(['error' => 'No face enrolled'], 400);
        }

        // Encode face
        $encoded = Http::post("{$this->serviceUrl}/encode", [
            'image' => $request->image
        ]);

        $encodedData = $encoded->json();

        if (!$encoded->successful() || ($encodedData['success'] ?? false) !== true) {
            return response()->json(['error' => 'No face detected', 'details' => $encodedData], 422);
        }

        // Compare
        $compare = Http::post("{$this->serviceUrl}/compare", [
            'embedding1' => json_decode($stored->embedding),
            'embedding2' => $encodedData['embedding']
        ]);

        $compareData = $compare->json();

        if (!$compare->successful() || ($compareData['success'] ?? false) !== true) {
            return response()->json(['error' => 'Face comparison failed', 'details' => $compareData], 500);
        }

        if (!($compareData['match'] ?? false)) {
            return response()->json(['error' => 'Face mismatch'], 403);
        }

        // Save image
        $imageName = "checkout_{$user->id}_" . time() . ".jpg";
        Storage::disk('public')->put("attendance/$imageName", base64_decode($request->image));

        // Attendance fetch
        $today = now()->toDateString();
        $attendance = Attendance::where('user_id', $user->id)->where('date', $today)->first();

        if (!$attendance) {
            return response()->json(['error' => 'You must check-in first'], 400);
        }

        if ($attendance->check_out_time) {
            return response()->json(['error' => 'Already checked out'], 409);
        }

        // Calculate hours
        $checkIn = Carbon::parse($attendance->date)->setTimeFromTimeString($attendance->check_in_time);
        $checkOut = now();

        $worked = $checkOut->diffInMinutes($checkIn) / 60;
        $ot = max(0, $worked - 8);

        $attendance->update([
            'check_out_time' => now()->format('H:i:s'),
            'check_out_image' => "attendance/$imageName",
            'check_out_lat' => $request->gps_lat,
            'check_out_lng' => $request->gps_lng,
            'worked_hours' => round($worked, 2),
            'ot_hours' => round($ot, 2),
        ]);

        return response()->json([
            'message' => 'Check-out successful',
            'type' => 'check_out',
        ]);
    }
}

