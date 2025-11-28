<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSiteInventoryStocksTable extends Migration
{
    public function up()
    {
        Schema::create('site_inventory_stocks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('site_id')->constrained()->onDelete('cascade');
            $table->foreignId('inventory_id')->constrained()->onDelete('cascade');
            $table->decimal('quantity', 12, 2)->default(0);
            $table->foreignId('updated_by')->nullable()->constrained('users')->onDelete('set null');
            $table->timestamps();
            $table->unique(['site_id', 'inventory_id']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('site_inventory_stocks');
    }
}
