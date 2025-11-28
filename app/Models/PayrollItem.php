<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PayrollItem extends Model
{
    protected $fillable = [
        'payroll_run_id',
        'label',
        'type',
        'amount',
    ];

    public function payrollRun() { return $this->belongsTo(PayrollRun::class); }
}
