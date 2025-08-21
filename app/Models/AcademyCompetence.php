<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AcademyCompetence extends Model
{
    use HasFactory;

    protected $fillable = [
        'academy_subject_id',
        'semester',
        'admin_teacher_id',
        'competence_1',
        'competence_2',
        'competence_3',
    ];

    protected $casts = [
        'academy_subject_id' => 'integer',
        'admin_teacher_id' => 'integer',
    ];

    public function academySubject()
    {
        return $this->belongsTo(AcademySubject::class);
    }

    public function adminTeacher()
    {
        return $this->belongsTo(AdminTeacher::class);
    }
}
