<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SiteInventoryStock extends Model
{
    protected $fillable = [
        'site_id',
        'inventory_id',
        'quantity',
        'updated_by',   
    ];

    public function site() { return $this->belongsTo(Site::class); }
    public function inventory() { return $this->belongsTo(Inventory::class); }
    public function updater() { return $this->belongsTo(User::class, 'updated_by'); }
}
