<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Email extends Model
{
    use HasFactory;

    protected $fillable = [
        'email_account_id', 'uid', 'folder', 'subject', 'from', 
        'to', 'body', 'is_read', 'has_attachment', 'received_at'
    ];

    protected $casts = [
        'is_read' => 'boolean',
        'has_attachment' => 'boolean',
        'received_at' => 'datetime',
    ];

    public function emailAccount()
    {
        return $this->belongsTo(EmailAccount::class);
    }
}
