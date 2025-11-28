<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class UserProfile extends Model
{
    protected $fillable = [
        'user_id',
        'address',
        'emergency_contact',
        'dob',
        'bank_account_no',
        'ifsc',
        'pan_no',
        'aadhaar_no',
        'joining_date',
        'blood_group',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
