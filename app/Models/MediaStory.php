<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MediaStory extends Model
{
    use HasFactory;

    protected $table = 'media_stories';

    protected $fillable = [
        'media_participant_id',
        'image',
        'content',
    ];

    public function mediaParticipant() {
        return $this->belongsTo(MediaParticipant::class);
    }
}
