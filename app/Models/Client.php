<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    protected $fillable = [
        'name',
        'address',
        'contact_person',
        'phone',
        'email',
        'gst_no',
        'status',
    ];

    public function sites()
    {
        return $this->hasMany(Site::class);
    }
}
