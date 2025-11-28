<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class NotificationLog extends Model
{
    protected $fillable = [
        'user_id',
        'title',
        'message',
        'type',
        'payload',
        'status',
        'schedule_time',
    ];

    protected $casts = [
        'payload' => 'array',
        'schedule_time' => 'datetime',
    ];

    public function user() { return $this->belongsTo(User::class); }
}
