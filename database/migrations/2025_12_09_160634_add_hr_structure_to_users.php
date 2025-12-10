<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
      // ---------------- HIERARCHY ----------------
            $table->foreignId('reports_to')
                ->nullable()
                ->constrained('users')
                ->nullOnDelete()
                ->after('role');

            // ---------------- SALARY STRUCTURE ----------------
            $table->enum('salary_type', ['monthly', 'daily', 'hourly'])
                ->default('monthly')
                ->after('reports_to');

            $table->decimal('base_salary', 10, 2)
                ->nullable()
                ->after('salary_type');

            $table->decimal('per_day_rate', 10, 2)
                ->nullable()
                ->after('base_salary');

            $table->decimal('per_hour_rate', 10, 2)
                ->nullable()
                ->after('per_day_rate');

            $table->decimal('ot_rate', 10, 2)
                ->nullable()
                ->after('per_hour_rate');

            // performance index
            $table->index(['role', 'reports_to']);
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
           $table->dropForeign(['reports_to']);
            $table->dropColumn([
                'reports_to',
                'salary_type',
                'base_salary',
                'per_day_rate',
                'per_hour_rate',
                'ot_rate',
            ]);
    
        });
    }
};
