<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProjectPlan extends Model
{
    use HasFactory;

    protected $table = 'project_plans';

    protected $fillable = [
        'subject',
        'theme',
        'description',
        'start_date',
        'end_date',
        'is_active',
    ];
    
    public function projectTask()
    {
        return $this->hasMany(ProjectTask::class);
    }
}
