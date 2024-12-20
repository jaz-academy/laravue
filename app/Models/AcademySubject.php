<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AcademySubject extends Model
{
    use HasFactory;

    protected $fillable = [
        'number',
        'group',
        'name',
    ];

    public function academyCompetence()
    {
        return $this->hasMany(AcademyCompetence::class);
    }
}
