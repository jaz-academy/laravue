<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MediaLike extends Model
{
    use HasFactory;

    protected $table = 'media_likes';

    protected $fillable = [
        'media_participant_id',
        'project_task_id',
    ];

    public function mediaParticipant() {
        return $this->belongsTo(MediaParticipant::class);
    }

    public function projectTask() {
        return $this->belongsTo(ProjectTask::class);
    }
}
