<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ApiRequestLog extends Model
{
    use HasFactory;

    protected $fillable = [
        'api_key_id',
        'user_id',
        'tier',
        'method',
        'endpoint',
        'status_code',
        'duration_ms',
        'ip_address',
        'user_agent',
        'request_id',
    ];

    public function apiKey()
    {
        return $this->belongsTo(DeveloperApiKey::class, 'api_key_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}