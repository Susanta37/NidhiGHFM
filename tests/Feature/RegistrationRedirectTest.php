<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RegistrationRedirectTest extends TestCase
{
    use RefreshDatabase;

    public function test_new_user_redirected_to_supervisor_dashboard()
    {
        $response = $this->post('/register', [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'password',
            'password_confirmation' => 'password',
        ]);

        $this->assertDatabaseHas('users', [
            'email' => 'test@example.com',
            'role' => 'supervisor',
        ]);

        $response->assertRedirect(route('supervisor.dashboard'));
    }
}
