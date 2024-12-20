<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PaymentBilling extends Model
{
    use HasFactory;

    protected $fillable = [
        'year',
        'category',
        'finance_account_id',
        'name',
        'amount',
        'is_once',
        'is_monthly',
        'note',
    ];    

    public function financeAccount()
    {
        return $this->belongsTo(FinanceAccount::class);
    }
    
    public function paymentDiscount()
    {
        return $this->hasMany(PaymentDiscount::class);
    }
    
    public function paymentItem()
    {
        return $this->hasMany(PaymentItem::class);
    }
}
