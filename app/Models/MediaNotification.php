<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MediaNotification extends Model
{
    use HasFactory;

    protected $table = 'media_notifications';

    protected $fillable = [
        'mongodb_id',
        'recipient_id',
        'sender_id',
        'type',
        'title',
        'message',
        'link',
        'is_read',
        'related_id',
    ];

    protected $casts = [
        'is_read' => 'boolean',
    ];

    public function recipient()
    {
        return $this->belongsTo(User::class, 'recipient_id');
    }

    public function sender()
    {
        return $this->belongsTo(User::class, 'sender_id');
    }
}
