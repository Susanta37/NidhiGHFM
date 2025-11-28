<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Shift extends Model
{
    protected $fillable = [
        'client_id',
        'site_id',
        'name',
        'start_time',
        'end_time',
        'break_minutes',
        'tasks',
        'auto_assign_rules',
    ];

    protected $casts = [
        'tasks' => 'array',
        'auto_assign_rules' => 'array',
    ];
    public function client()
    {
        return $this->belongsTo(Client::class);
    }

    public function site()
    {
        return $this->belongsTo(Site::class);
    }
}

