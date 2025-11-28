<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AttendanceLog extends Model
{
    protected $fillable = [
        'attendance_id',
        'action',
        'old_data',
        'new_data',
        'performed_by',
    ];

    protected $casts = [
        'old_data' => 'array',
        'new_data' => 'array',
    ];

    public function attendance() { return $this->belongsTo(Attendance::class); }
    public function performer() { return $this->belongsTo(User::class, 'performed_by'); }
}
