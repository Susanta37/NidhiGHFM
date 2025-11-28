<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AttendanceRateCard extends Model
{
    protected $fillable = [
        'user_id',
        'salary_type',
        'base_salary',
        'allowances',
        'deductions',
    ];

    protected $casts = [
        'allowances' => 'array',
        'deductions' => 'array',
    ];

    public function user() { return $this->belongsTo(User::class); }
}
