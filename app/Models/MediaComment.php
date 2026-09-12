<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MediaComment extends Model
{
    use HasFactory;

    protected $table = 'media_comments';

    protected $fillable = [
        'mongodb_id',
        'media_task_id',
        'user_id',
        'content',
    ];

    public function task()
    {
        return $this->belongsTo(MediaTask::class, 'media_task_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
