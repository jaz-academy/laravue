<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FinanceAccount extends Model
{
    use HasFactory;

    protected $fillable = [
        'number',
        'unit',
        'description',
        'detail',
        'allocation',
    ];   

    public function financeItem()
    {
        return $this->hasMany(FinanceItem::class);
    } 

    public function paymentBilling()
    {
        return $this->hasMany(PaymentBilling::class);
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

