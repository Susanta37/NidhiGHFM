<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserFaceEmbedding extends Model
{
    protected $fillable = [
        'user_id',
        'embedding',
        'registered_image',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
