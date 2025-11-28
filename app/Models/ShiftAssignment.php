<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ShiftAssignment extends Model
{
    protected $fillable = [
        'shift_id',
        'user_id',
        'date',
        'status',
        'approved_by',
    ];
    public function user() {
    return $this->belongsTo(User::class);
}
public function shift() {
    return $this->belongsTo(Shift::class);
}

}

