<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\TwoFactorAuthenticatable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasApiTokens,HasFactory, Notifiable, TwoFactorAuthenticatable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'is_first_login',
        'reports_to',
        'salary_type',
        'base_salary',
        'per_day_rate',
        'per_hour_rate',
        'ot_rate',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'two_factor_secret',
        'two_factor_recovery_codes',
        'remember_token',
    ];

    public function profile()
    {
        return $this->hasOne(UserProfile::class);
    }

    public function documents()
    {
        return $this->hasMany(UserDocument::class);
    }
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'two_factor_confirmed_at' => 'datetime',
        ];
    }
    public function face() { return $this->hasOne(UserFaceEmbedding::class); }
    public function attendances() { return $this->hasMany(Attendance::class); }
    public function rateCard() { return $this->hasOne(AttendanceRateCard::class); }
    // Each user reports to someone
    public function manager()
    {
        return $this->belongsTo(User::class, 'reports_to');
    }

    // A manager has many subordinates
    public function subordinates()
    {
        return $this->hasMany(User::class, 'reports_to');
    }



    public function shiftAssignments()
{
    return $this->hasMany(ShiftAssignment::class, 'user_id');
}

}
