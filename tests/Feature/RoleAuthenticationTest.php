<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RoleAuthenticationTest extends TestCase
{
    use RefreshDatabase;

    public function test_superadmin_redirected_to_superadmin_dashboard()
    {
        $user = User::factory()->create(['role' => 'superadmin']);

        $response = $this->post('/login', [
            'email' => $user->email,
            'password' => 'password',
        ]);

        $response->assertRedirect(route('super-admin.dashboard'));
    }

    public function test_supervisor_redirected_to_supervisor_dashboard()
    {
        $user = User::factory()->create(['role' => 'supervisor']);

        $response = $this->post('/login', [
            'email' => $user->email,
            'password' => 'password',
        ]);

        $response->assertRedirect(route('supervisor.dashboard'));
    }

    public function test_user_cannot_access_other_dashboard()
    {
        $user = User::factory()->create(['role' => 'supervisor']);

        $this->actingAs($user)
            ->get(route('super-admin.dashboard'))
            ->assertForbidden();
    }

    public function test_superadmin_can_access_superadmin_dashboard()
    {
        $user = User::factory()->create(['role' => 'superadmin']);

        $this->actingAs($user)
            ->get(route('super-admin.dashboard'))
            ->assertOk();
    }
}
