<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PaymentItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'invoice',
        'date',
        'period',
        'admin_student_id',
        'finance_account_id',
        'payment_billing_id',
        'amount',
        'is_once',
        'is_monthly',
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

