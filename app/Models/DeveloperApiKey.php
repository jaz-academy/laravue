<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class DeveloperApiKey extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'key_prefix',
        'key_hash',
        'scopes',
        'tier',
        'rate_limit_per_minute',
        'last_used_at',
        'expires_at',
        'is_active',
    ];

    protected $casts = [
        'scopes' => 'array',
        'last_used_at' => 'datetime',
        'expires_at' => 'datetime',
        'is_active' => 'boolean',
        'rate_limit_per_minute' => 'integer',
    ];

    protected $hidden = [
        'key_hash',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function logs()
    {
        return $this->hasMany(ApiRequestLog::class, 'api_key_id');
    }

    public static function createKey($userId, $name, array $scopes = ['*'], $tier = 'standard', $rateLimit = 120, $expiresAt = null): array
    {
        $prefix = 'jaz_' . Str::lower(Str::random(10));
        $secret = Str::random(32);
        $fullKey = $prefix . '_' . $secret;
        $hash = hash('sha256', $fullKey);

        $apiKey = self::create([
            'user_id' => $userId,
            'name' => $name,
            'key_prefix' => $prefix,
            'key_hash' => $hash,
            'scopes' => $scopes,
            'tier' => $tier,
            'rate_limit_per_minute' => $rateLimit,
            'expires_at' => $expiresAt,
            'is_active' => true,
        ]);

        return [
            'apiKey' => $apiKey,
            'plainSecret' => $fullKey,
        ];
    }

    public function regenerateSecret(): string
    {
        $prefix = 'jaz_' . Str::lower(Str::random(10));
        $secret = Str::random(32);
        $fullKey = $prefix . '_' . $secret;

        $this->update([
            'key_prefix' => $prefix,
            'key_hash' => hash('sha256', $fullKey),
        ]);

        return $fullKey;
    }

    public function isValid(): bool
    {
        if (!$this->is_active) {
            return false;
        }

        if ($this->expires_at && $this->expires_at->isPast()) {
            return false;
        }

        return true;
    }

    public function hasScope(string $scope): bool
    {
        if (empty($this->scopes)) {
            return true;
        }

        if (in_array('*', $this->scopes)) {
            return true;
        }

        return in_array($scope, $this->scopes);
    }
}