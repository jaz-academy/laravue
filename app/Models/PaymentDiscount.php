<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PaymentDiscount extends Model
{
    use HasFactory;

    protected $fillable = [
        'admin_student_id',
        'year',
        'finance_account_id',
        'billing',
        'amount',
        'note',
        'admin',
    ];

    public function adminStudent()
    {
        return $this->belongsTo(AdminStudent::class);
    }

    public function financeAccount()
    {
        return $this->belongsTo(FinanceAccount::class);
    }

    public function paymentBilling()
    {
        return $this->belongsTo(PaymentBilling::class);
    }
}
