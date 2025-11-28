<?php

namespace App\Http\Controllers\SuperAdmin;

use App\Http\Controllers\Controller;
use App\Models\Attendance;
use App\Models\FaceSetting;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\UserFaceEmbedding;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class FaceRecognitionController extends Controller
{
public function faceRecords()
{
    $users = User::with(['profile', 'face'])->orderBy('name')->get();

    return Inertia::render('SuperAdmin/Face/Records', [
        'users' => $users,
    ]);
}


    public function registerFace(Request $request, User $user)
    {
        $request->validate([
            'image' => 'required|string',
        ]);

        // Send to Python Microservice
        $response = Http::post('http://127.0.0.1:5000/encode', [
            'image' => $request->image,
        ]);

        if ($response->failed()) {
            return back()->withErrors(['face' => 'Unable to process face. Try again.']);
        }

        $embedding = $response->json()['embedding'];

        // Save face image
        $imageData = base64_decode(explode(',', $request->image)[1]);
        $path = "faces/user-{$user->id}.jpg";
        Storage::disk('public')->put($path, $imageData);

        // Save or update embedding
        UserFaceEmbedding::updateOrCreate(
            ['user_id' => $user->id],
            [
                'embedding' => json_encode($embedding),
                'registered_image' => $path,
            ]
        );

        return back()->with('success', 'Face registered successfully!');
    }

    public function faceLogs()
{
    $logs =Attendance::with(['user'])
        ->orderBy('created_at', 'desc')
        ->take(200)
        ->get();

    return Inertia::render('SuperAdmin/Face/Logs', [
        'logs' => $logs,
    ]);
}


public function settingsPage()
{
    $settings = FaceSetting::first();

    return Inertia::render("SuperAdmin/Face/Settings", [
        "settings" => $settings,
    ]);
}

public function saveSettings(Request $request)
{
    $validated = $request->validate([
        "face_enabled" => "required|boolean",
        "match_threshold" => "required|numeric|min:0.1|max:1",
        "model" => "required|string",
        "auto_check_interval" => "required|integer|min:5|max:300",
    ]);

    FaceSetting::updateOrCreate(["id" => 1], $validated);

    return back()->with("success", "Face recognition settings updated!");
}


}
