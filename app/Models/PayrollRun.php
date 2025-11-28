<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PayrollRun extends Model
{
    protected $fillable = [
        'user_id',
        'month',
        'year',
        'total_present',
        'total_absent',
        'ot_hours',
        'gross_salary',
        'net_salary',
        'generated_by',
        'status',
    ];

    public function user() { return $this->belongsTo(User::class); }
    public function items() { return $this->hasMany(PayrollItem::class); }
}
