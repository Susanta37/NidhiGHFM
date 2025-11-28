<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ComplianceRecord extends Model
{
    protected $fillable = [
        'user_id',
        'certificate_type',
        'file_path',
        'expiry_date',
        'status',
        'verified_by',
    ];

    protected $casts = [
        'expiry_date' => 'date',
    ];

    public function user() { return $this->belongsTo(User::class); }
    public function verifier() { return $this->belongsTo(User::class, 'verified_by'); }
}
