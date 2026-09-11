<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EmailAccount extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'email', 'imap_host', 'imap_port', 'encryption', 
        'smtp_host', 'smtp_port', 'password', 'quota_mb'
    ];

    public function getPasswordAttribute($value)
    {
        if (empty($value)) return '';
        try {
            return \Illuminate\Support\Facades\Crypt::decryptString($value);
        } catch (\Throwable $e) {
            return $value;
        }
    }

    public function setPasswordAttribute($value)
    {
        if (empty($value)) {
            $this->attributes['password'] = '';
            return;
        }
        try {
            $this->attributes['password'] = \Illuminate\Support\Facades\Crypt::encryptString($value);
        } catch (\Throwable $e) {
            $this->attributes['password'] = $value;
        }
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function emails()
    {
        return $this->hasMany(Email::class);
    }
}
