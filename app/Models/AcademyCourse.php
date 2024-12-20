<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AcademyCourse extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'subject',
        'note',
        'author',
        'title',
        'section',
        'description',
        'video_url',
        'video_duration',
    ];
}