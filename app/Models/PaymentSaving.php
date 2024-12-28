<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PaymentSaving extends Model
{
    use HasFactory;

    protected $fillable = [
        'invoice',
        'date',
        'admin_student_id',
        'credit',
        'debit',
        'note',
        'admin',
    ];

    public function adminStudent()
    {
        return $this->belongsTo(AdminStudent::class);
    }

    public function getBalance()
    {
        return $this->credit - $this->debit;
    }
}