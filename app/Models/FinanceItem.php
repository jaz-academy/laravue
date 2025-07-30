<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FinanceItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'invoice',
        'date',
        'vendor',
        'finance_account_id',
        'remark',
        'description',
        'amount',
        'admin',
    ];

    public function financeAccount()
    {
        return $this->belongsTo(FinanceAccount::class);
    }
}
