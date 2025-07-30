<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AcademyAward extends Model
{
    use HasFactory;

    protected $fillable = [
        'date',
        'admin_student_id',
        'semester',
        'subject',
        'item',
        'rate',
        'result',
        'mentor',
        'remark',
    ];    

    public function adminStudent()
    {
        return $this->belongsTo(AdminStudent::class);
    }
}

