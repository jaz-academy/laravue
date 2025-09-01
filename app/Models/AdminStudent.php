<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AdminStudent extends Model
{
    use HasFactory;

    protected $table = 'admin_students';

    protected $fillable = [
        'nis',
        'name',
        'nickname',
        'gender',
        'rumble',
        'birth_place',
        'birth_date',
        'address',
        'hamlet',
        'village',
        'district',
        'city',
        'postal_code',
        'hobby',
        'sport',
        'ambition',
        'role',
        'skills',
        'own_phone',
        'email',
        'instagram',
        'father',
        'father_birth',
        'father_note',
        'mother',
        'mother_birth',
        'mother_note',
        'phone',
        'job',
        'income',
        'image',
        'payment_category',
        'registered',
        'graduation',
        'next_school',
        'next_school_address',
        'note'
    ];

    protected $casts = [
        'registered' => 'integer',
        'graduation' => 'integer',
        'birth_date' => 'datetime',
    ];

    public function tasks()
    {
        return $this->belongsToMany(ProjectTask::class, 'pivot_student_task')
            ->withPivot(['role', 'progress'])
            ->withTimestamps();
    }

    public function academyAward()
    {
        return $this->hasMany(AcademyAward::class);
    }

    public function academyScore()
    {
        return $this->hasMany(AcademyScore::class);
    }

    public function paymentDiscount()
    {
        return $this->hasMany(PaymentDiscount::class);
    }

    public function paymentItem()
    {
        return $this->hasMany(PaymentItem::class);
    }

    public function paymentSaving()
    {
        return $this->hasMany(PaymentSaving::class);
    }
}
