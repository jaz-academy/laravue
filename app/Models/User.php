<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens as HasSanctumApiTokens;
use Laravel\Passport\HasApiTokens as HasPassportApiTokens;

class User extends Authenticatable
{
    use HasSanctumApiTokens, HasPassportApiTokens, HasFactory, Notifiable {
        HasSanctumApiTokens::tokens insteadof HasPassportApiTokens;
        HasPassportApiTokens::tokens as passportTokens;
        HasSanctumApiTokens::tokenCan insteadof HasPassportApiTokens;
        HasPassportApiTokens::tokenCan as passportTokenCan;
        HasSanctumApiTokens::createToken insteadof HasPassportApiTokens;
        HasPassportApiTokens::createToken as createPassportToken;
        HasPassportApiTokens::withAccessToken insteadof HasSanctumApiTokens;
    }

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'mongodb_id',
        'admin_student_id',
        'admin_teacher_id',
        'name',
        'username',
        'email',
        'password',
        'role',
        'media_role',
        'access',
        'image',
        'bio',
        'skills',
        'instagram_id',
        'email_provisioned_at',
        'email_status',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'admin_student_id' => 'integer',
        'admin_teacher_id' => 'integer',
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        'role' => 'integer',
        'skills' => 'array',
    ];

    public function adminStudent()
    {
        return $this->hasOne(AdminStudent::class, 'id', 'admin_student_id');
    }

    public function adminTeacher()
    {
        return $this->hasOne(AdminTeacher::class, 'id', 'admin_teacher_id');
    }

    public function emailAccount()
    {
        return $this->hasOne(EmailAccount::class);
    }

    public function mediaProjects()
    {
        return $this->belongsToMany(MediaProject::class, 'media_project_participants', 'user_id', 'media_project_id');
    }

    public function mediaTasks()
    {
        return $this->hasMany(MediaTask::class, 'user_id');
    }

    public function mediaBlogs()
    {
        return $this->hasMany(MediaBlog::class, 'user_id');
    }

    public function mediaNotifications()
    {
        return $this->hasMany(MediaNotification::class, 'recipient_id');
    }

    public function reflections()
    {
        return $this->hasMany(Reflection::class);
    }
}

