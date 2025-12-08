<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Attendance extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'attendances';

    protected $fillable = [
        'user_id',
        'shift_id',
        'job_assignment_id',
        'date',
        'check_in_time',
        'check_out_time',
        'check_in_image',
        'check_in_lat',
        'check_in_lng',
        'check_out_image',
        'check_out_lat',
        'check_out_lng',
        'is_face_matched',
        'worked_hours',
        'ot_hours',
        'submitted_by',
        'approved_by',
        'notes',
    ];

    protected $casts = [
        'date' => 'date',
        'check_in_time' => 'datetime:H:i:s',
        'check_out_time' => 'datetime:H:i:s',
        'is_face_matched' => 'boolean',
        'worked_hours' => 'decimal:2',
        'ot_hours' => 'decimal:2',
        'check_in_lat' => 'decimal:7',
        'check_in_lng' => 'decimal:7',
        'check_out_lat' => 'decimal:7',
        'check_out_lng' => 'decimal:7',
    ];

    // 🔹 A user has one attendance record per day
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // 🔹 Shift Relation (Optional)
    public function shift()
    {
        return $this->belongsTo(Shift::class);
    }

    // 🔹 Job Assignment Relation (Optional)
    public function jobAssignment()
    {
        return $this->belongsTo(JobAssignment::class);
    }

    // 🔹 Submitted by (HR, Supervisor, etc.)
    public function submittedByUser()
    {
        return $this->belongsTo(User::class, 'submitted_by');
    }

    // 🔹 Approved by (Manager)
    public function approvedByUser()
    {
        return $this->belongsTo(User::class, 'approved_by');
    }
}
