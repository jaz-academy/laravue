<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MediaProject extends Model
{
    use HasFactory;

    protected $table = 'media_projects';

    protected $fillable = [
        'mongodb_id',
        'title',
        'description',
        'status',
        'mentor_id',
        'project_manager_id',
        'creator_id',
    ];

    public function mentor()
    {
        return $this->belongsTo(User::class, 'mentor_id');
    }

    public function projectManager()
    {
        return $this->belongsTo(User::class, 'project_manager_id');
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'creator_id');
    }

    public function participants()
    {
        return $this->belongsToMany(User::class, 'media_project_participants', 'media_project_id', 'user_id');
    }

    public function tasks()
    {
        return $this->hasMany(MediaTask::class, 'media_project_id');
    }
}
