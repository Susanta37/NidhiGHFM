<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User; // Assuming User model is in App\Models

class UserDocument extends Model
{
    protected $fillable = [
        'user_id',
        'doc_type',
        'file_path',
        'expiry_date',
        'verified_by',
        'status',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
