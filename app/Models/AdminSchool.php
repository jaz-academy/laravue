<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AdminSchool extends Model
{
    use HasFactory;

    protected $table = 'admin_schools';

    protected $fillable = [
        'name',
        'nickname',
        'npsn',
        'organization',
        'permit',
        'address',
        'map',
        'phone',
        'email',
        'motto',
        'period',
        'head',
        'contact',
        'notes',
        'logo',
    ];
    
}
