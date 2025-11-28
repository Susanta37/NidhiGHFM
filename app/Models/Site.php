<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Site extends Model
{ 
    protected $fillable = [
        'client_id',
        'site_name',
        'address',
        'geo_lat',
        'geo_lng',
    ];

    public function client()
    {
        return $this->belongsTo(Client::class);
    }
}
