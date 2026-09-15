<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MediaTask extends Model
{
    use HasFactory;

    protected $table = 'media_tasks';

    protected $fillable = [
        'mongodb_id',
        'media_project_id',
        'user_id',
        'admin_student_id',
        'media_url',
        'media_urls',
        'media_type',
        'caption',
        'status',
        'mentor_id',
        'admin_teacher_id',
        'grade',
        'review_comment',
        'reviewed_at',
    ];

    protected $casts = [
        'media_urls' => 'array',
        'grade' => 'float',
        'reviewed_at' => 'datetime',
    ];

    public function project()
    {
        return $this->belongsTo(MediaProject::class, 'media_project_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function student()
    {
        return $this->belongsTo(AdminStudent::class, 'admin_student_id');
    }

    public function mentor()
    {
        return $this->belongsTo(User::class, 'mentor_id');
    }

    public function mentorTeacher()
    {
        return $this->belongsTo(AdminTeacher::class, 'admin_teacher_id');
    }

    public function collaborators()
    {
        return $this->belongsToMany(User::class, 'media_task_collaborators', 'media_task_id', 'user_id');
    }

    public function studentCollaborators()
    {
        return $this->belongsToMany(AdminStudent::class, 'media_task_collaborators', 'media_task_id', 'admin_student_id');
    }

    public function likes()
    {
        return $this->belongsToMany(User::class, 'media_task_likes', 'media_task_id', 'user_id');
    }

    public function comments()
    {
        return $this->hasMany(MediaComment::class, 'media_task_id');
    }
}
