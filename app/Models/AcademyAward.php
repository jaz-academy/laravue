<?php

namespace App\Models;

use App\Models\AdminStudent;
use App\Models\AdminTeacher;
use App\Models\AcademySubject;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class AcademyAward extends Model
{
    use HasFactory;

    protected $fillable = [
        'date',
        'admin_student_id',
        'semester',
        'academy_subject_id',
        'item',
        'rate',
        'result',
        'admin_teacher_id',
        'remark',
    ];

    public function adminStudent()
    {
        return $this->belongsTo(AdminStudent::class);
    }

    public function adminTeacher()
    {
        return $this->belongsTo(AdminTeacher::class);
    }

    public function academySubject()
    {
        return $this->belongsTo(AcademySubject::class);
    }
}
