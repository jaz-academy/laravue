<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MediaParticipant extends Model
{
    use HasFactory;

    protected $table = 'media_participants';

    protected $fillable = [
        'name',
        'username',
        'password',
        'role',
        'image',
    ];
    
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
    
    public function mediaStory()
    {
        return $this->hasMany(MediaStory::class);
    }
}