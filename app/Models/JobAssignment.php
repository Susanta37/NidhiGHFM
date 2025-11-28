<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JobAssignment extends Model
{
    protected $fillable = [
        'job_id',
        'user_id',
        'assigned_date',
        'shift_id',
        'status',
    ];

   public function job()
{
    return $this->belongsTo(SiteJob::class, 'job_id');
}


    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

