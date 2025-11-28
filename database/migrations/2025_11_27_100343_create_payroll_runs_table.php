<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePayrollRunsTable extends Migration
{
    public function up()
    {
        Schema::create('payroll_runs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // user for whom payroll is run
            $table->tinyInteger('month');
            $table->smallInteger('year');
            $table->integer('total_present')->default(0);
            $table->integer('total_absent')->default(0);
            $table->decimal('ot_hours', 8, 2)->default(0);
            $table->decimal('gross_salary', 12, 2)->default(0);
            $table->decimal('net_salary', 12, 2)->default(0);
            $table->foreignId('generated_by')->nullable()->constrained('users')->onDelete('set null');
            $table->string('status')->default('draft'); // draft/confirmed/paid
            $table->timestamps();
            $table->index(['month', 'year']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('payroll_runs');
    }
}
