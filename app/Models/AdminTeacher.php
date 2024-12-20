<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AdminTeacher extends Model
{
    use HasFactory;

    protected $table = 'admin_teachers';

    protected $fillable = [
        'nig',
        'name',
        'nickname',
        'gender',
        'status',
        'birth_place',
        'birth_date',
        'address',
        'hamlet',
        'village',
        'district',
        'city',
        'postal_code',
        'phone',
        'registered',
        'grade',
        'resign',
        'update_job',
        'image',
        'note',
    ];
    
    public function projectTask()
    {
        return $this->hasMany(ProjectTask::class);
    }

    public function academyCompetence()
    {
        return $this->hasMany(AcademyCompetence::class);
    }

}
