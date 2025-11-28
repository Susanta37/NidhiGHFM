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
            if (!Schema::hasColumn('users', 'role')) {
                $table->enum('role', [
                    'superadmin',
                    'supervisor',
                    'hr',
                    'sitemanager',
                    'accountant',
                    'fieldstaff',
                ])->default('fieldstaff')->after('email');
            } else {
                $table->enum('role', [
                    'superadmin',
                    'supervisor',
                    'hr',
                    'sitemanager',
                    'accountant',
                    'fieldstaff',
                ])->default('fieldstaff')->change();
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // Revert to simple string (if rollback happens)
            $table->string('role')->default('fieldstaff')->change();
        });
    }
};
