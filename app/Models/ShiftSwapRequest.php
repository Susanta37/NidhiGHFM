<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;              // Add this
use App\Models\ShiftAssignment;   // Add this (for assignment relationship)

class ShiftSwapRequest extends Model
{
    protected $fillable = [
        'from_user_id',
        'to_user_id',
        'shift_assignment_id',
        'status',
    ];

    public function fromUser()
    {
        return $this->belongsTo(User::class, 'from_user_id');
    }

    public function toUser()
    {
        return $this->belongsTo(User::class, 'to_user_id');
    }

    public function assignment()
    {
        return $this->belongsTo(ShiftAssignment::class, 'shift_assignment_id');
    }
}
