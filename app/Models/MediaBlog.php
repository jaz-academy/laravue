<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MediaBlog extends Model
{
    use HasFactory;

    protected $table = 'media_blogs';

    protected $fillable = [
        'mongodb_id',
        'title',
        'slug',
        'excerpt',
        'content',
        'image',
        'category',
        'date',
        'read_time',
        'likes',
        'rating',
        'reviews_count',
        'user_id',
        'author_name',
        'author_avatar',
        'status',
    ];

    protected $casts = [
        'likes' => 'integer',
        'rating' => 'float',
        'reviews_count' => 'integer',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function userLikes()
    {
        return $this->belongsToMany(User::class, 'media_blog_likes', 'media_blog_id', 'user_id');
    }

    public function comments()
    {
        return $this->hasMany(MediaBlogComment::class, 'media_blog_id');
    }
}
