<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class ProjectReminder extends Notification
{
    use Queueable;

    public $title;
    public $message;
    public $img;
    public $text;
    public $url;

    /**
     * Create a new notification instance.
     */
    public function __construct($title, $message, $img = null, $text = null, $url = null)
    {
        $this->title = $title;
        $this->message = $message;
        $this->img = $img;
        $this->text = $text;
        $this->url = $url;
    }

    /**
     * Tentukan channel notifikasi
     */
    public function via(object $notifiable): array
    {
        return ['database']; // nanti bisa ditambah ['broadcast'] kalau mau real-time
    }

    /**
     * Simpan ke database
     */
    public function toDatabase(object $notifiable): array
    {
        return [
            'title' => $this->title,
            'message' => $this->message,
            'img' => $this->img,
            'text' => $this->text,
            'url' => $this->url,
        ];
    }
}
