<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JobLog extends Model
{
    protected $fillable = [
        'job_id',
        'user_id',
        'status',
        'note',
        'log_time',
    ];

    public function job() {
        return $this->belongsTo(SiteJob::class);
    }

    public function user() {
        return $this->belongsTo(User::class);
    }
}
