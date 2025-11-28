<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SiteJob extends Model
{
    protected $fillable = [
        'site_id',
        'title',
        'description',
        'frequency',
        'billing_rate',
    ];

    public function site()
    {
        return $this->belongsTo(Site::class);
    }
}

