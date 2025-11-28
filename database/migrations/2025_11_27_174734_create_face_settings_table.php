<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
{
    Schema::create('face_settings', function (Blueprint $table) {
        $table->id();
        $table->boolean('face_enabled')->default(true);
        $table->float('match_threshold')->default(0.45); 
        $table->string('model')->default('facenet');
        $table->integer('auto_check_interval')->default(30);
        $table->timestamps();
    });
}


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('face_settings');
    }
};
