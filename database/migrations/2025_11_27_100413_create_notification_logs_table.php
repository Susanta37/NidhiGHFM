<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateNotificationLogsTable extends Migration
{
    public function up()
    {
        Schema::create('notification_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained()->onDelete('set null');
            $table->string('title');
            $table->text('message');
            $table->string('type')->default('push'); // whatsapp/sms/push/email
            $table->json('payload')->nullable();
            $table->string('status')->default('pending'); // pending/sent/failed
            $table->timestamp('schedule_time')->nullable();
            $table->timestamps();
            $table->index('status');
        });
    }

    public function down()
    {
        Schema::dropIfExists('notification_logs');
    }
}
