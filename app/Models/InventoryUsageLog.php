<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class InventoryUsageLog extends Model
{
    protected $fillable = [
        'site_id',
        'inventory_id',
        'used_quantity',
        'date',
        'remark',
        'used_by',
    ];

    protected $casts = [
        'date' => 'date',
    ];

    public function site() { return $this->belongsTo(Site::class); }
    public function inventory() { return $this->belongsTo(Inventory::class); }
    public function user() { return $this->belongsTo(User::class, 'used_by'); }
}
