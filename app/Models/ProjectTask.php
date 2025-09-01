<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProjectTask extends Model
{
    use HasFactory;

    protected $table = 'project_tasks';

    protected $fillable = [
        'project_plan_id',
        'semester',
        'name',
        'description',
        'date',
        'status',
        'media',
        'link',
        'accepted',
        'rate',
        'review',
        'admin_teacher_id',
    ];

    protected $casts = [
        'project_plan_id' => 'integer',
        'date' => 'datetime',
        'accepted' => 'integer',
        'admin_teacher_id' => 'integer',
    ];

    protected static function booted()
    {
        static::creating(function ($model) {
            $model->accepted = $model->accepted ?? 0;
            $model->rate = $model->rate ?? 0;
        });
    }

    public function students()
    {
        return $this->belongsToMany(AdminStudent::class, 'pivot_student_task', 'project_task_id', 'admin_student_id')
            ->withPivot(['role', 'progress'])
            ->withTimestamps();
    }

    public function projectPlan()
    {
        return $this->belongsTo(ProjectPlan::class);
    }

    public function adminTeacher()
    {
        return $this->belongsTo(AdminTeacher::class);
    }

    public function mediaBookmark()
    {
        return $this->hasMany(MediaBookmark::class);
    }

    public function mediaLike()
    {
        return $this->hasMany(MediaLike::class);
    }

    public function mediaComment()
    {
        return $this->hasMany(MediaComment::class);
    }
}
