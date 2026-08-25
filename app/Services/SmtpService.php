<?php

namespace App\Services;

use App\Models\EmailAccount;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Mail;
use Illuminate\Mail\Message;

class SmtpService
{
    public function send(EmailAccount $account, $to, $subject, $body, $attachments = [])
    {
        // Konfigurasi dinamis mailer per user
        Config::set('mail.mailers.custom_smtp', [
            'transport' => 'smtp',
            'host' => $account->smtp_host,
            'port' => $account->smtp_port,
            'encryption' => $account->encryption,
            'username' => $account->email,
            'password' => $account->password,
            'timeout' => null,
            'auth_mode' => null,
            'stream' => [
                'ssl' => [
                    'allow_self_signed' => true,
                    'verify_peer' => false,
                    'verify_peer_name' => false,
                ],
            ],
        ]);

        Config::set('mail.from.address', $account->email);
        Config::set('mail.from.name', $account->user->name);

        Mail::mailer('custom_smtp')->html($body, function (Message $message) use ($to, $subject, $attachments) {
            $message->to($to)->subject($subject);
            foreach ($attachments as $attachment) {
                $message->attach($attachment->getRealPath(), [
                    'as' => $attachment->getClientOriginalName(),
                    'mime' => $attachment->getMimeType(),
                ]);
            }
        });

        // Simpan ke folder Sent di database lokal
        \App\Models\Email::create([
            'email_account_id' => $account->id,
            'uid' => uniqid('sent_'), // Dummy UID for local sent
            'folder' => 'Sent',
            'subject' => $subject,
            'from' => $account->email,
            'to' => $to,
            'body' => $body,
            'is_read' => true,
            'has_attachment' => count($attachments) > 0,
            'received_at' => now(),
        ]);

        return true;
    }
}
