<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SuperAdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\User::where('email', 'superadmin1@gmail.com')->delete();

        \App\Models\User::factory()->withoutTwoFactor()->create([
            'name' => 'Super Admin',
            'email' => 'superadmin1@gmail.com',
            'password' => '12345678',
            'role' => 'superadmin',
        ]);
    }
}
