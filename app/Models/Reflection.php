<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reflection extends Model
{
    use HasFactory;

    protected $table = 'reflections';

    protected $fillable = [
        'user_id',
        'date',
        'achievement',
        'obstacles',
        'lessons',
        'priority',
        'health',
    ];

    protected $casts = [
        'date' => 'date:Y-m-d',
        'achievement' => 'array',
        'obstacles' => 'array',
        'lessons' => 'array',
        'priority' => 'array',
        'health' => 'array',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
