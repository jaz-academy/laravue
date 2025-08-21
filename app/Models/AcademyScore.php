<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AcademyScore extends Model
{
    use HasFactory;

    protected $fillable = [
        'serial',
        'admin_student_id',
        'semester',
        'academy_competence_id',
        'month_1',
        'month_2',
        'month_3',
        'month_4',
        'month_5',
        'month_6',
        'is_ok_1',
        'competence_1',
        'is_ok_2',
        'competence_2',
        'is_ok_3',
        'competence_3',
    ];

    protected $casts = [
        'admin_student_id' => 'integer',
        'academy_competence_id' => 'integer',
    ];

    public function adminStudent()
    {
        return $this->belongsTo(AdminStudent::class);
    }

    public function academyCompetence()
    {
        return $this->belongsTo(AcademyCompetence::class);
    }
}
