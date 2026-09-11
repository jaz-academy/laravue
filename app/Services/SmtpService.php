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
            'port' => (int) ($account->smtp_port ?: 465),
            'encryption' => $account->encryption,
            'username' => $account->email,
            'password' => $account->password,
            'timeout' => 5,
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
        Config::set('mail.from.name', $account->user?->name ?: $account->email);

        try {
            Mail::mailer('custom_smtp')->html($body, function (Message $message) use ($to, $subject, $attachments) {
                $message->to($to)->subject($subject);
                foreach ($attachments as $attachment) {
                    $message->attach($attachment->getRealPath(), [
                        'as' => $attachment->getClientOriginalName(),
                        'mime' => $attachment->getMimeType(),
                    ]);
                }
            });
        } catch (\Throwable $e) {
            \Illuminate\Support\Facades\Log::warning("SMTP delivery warning for {$to}: " . $e->getMessage());
        }

        // Simpan ke folder Sent di database lokal pengirim
        \App\Models\Email::create([
            'email_account_id' => $account->id,
            'uid' => uniqid('sent_'),
            'folder' => 'Sent',
            'subject' => $subject,
            'from' => $account->email,
            'to' => $to,
            'body' => $body,
            'is_read' => true,
            'has_attachment' => count($attachments) > 0,
            'received_at' => now(),
        ]);

        // Jika penerima adalah user internal di JazAcademy, masukkan juga ke INBOX penerima
        $recipientAccount = \App\Models\EmailAccount::where('email', 'ilike', trim($to))->first();
        if ($recipientAccount) {
            \App\Models\Email::create([
                'email_account_id' => $recipientAccount->id,
                'uid' => uniqid('msg_'),
                'folder' => 'INBOX',
                'subject' => $subject,
                'from' => $account->email,
                'to' => $to,
                'body' => $body,
                'is_read' => false,
                'has_attachment' => count($attachments) > 0,
                'received_at' => now(),
            ]);
        }

        return true;
    }
}
