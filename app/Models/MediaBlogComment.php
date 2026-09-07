<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MediaBlogComment extends Model
{
    use HasFactory;

    protected $table = 'media_blog_comments';

    protected $fillable = [
        'mongodb_id',
        'media_blog_id',
        'user_id',
        'content',
    ];

    public function blog()
    {
        return $this->belongsTo(MediaBlog::class, 'media_blog_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
