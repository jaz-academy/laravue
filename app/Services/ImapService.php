<?php

namespace App\Services;

use Webklex\IMAP\Facades\Client;
use App\Models\EmailAccount;
use App\Models\Email;
use Illuminate\Support\Facades\Log;

class ImapService
{
    public function syncFolder(EmailAccount $account, $folderName = 'INBOX')
    {
        try {
            $client = \Webklex\IMAP\Facades\Client::make([
                'host'          => $account->imap_host,
                'port'          => $account->imap_port,
                'encryption'    => $account->encryption,
                'validate_cert' => false,
                'username'      => $account->email,
                'password'      => $account->password,
                'protocol'      => 'imap'
            ]);

            $client->connect();
            $folder = $client->getFolder($folderName);
            
            // Ambil pesan terbaru yang belum ada di cache lokal
            $messages = $folder->messages()->all()->limit(50)->get();

            foreach ($messages as $message) {
                $uid = $message->getUid();
                
                Email::firstOrCreate(
                    [
                        'email_account_id' => $account->id,
                        'uid' => $uid,
                        'folder' => $folderName,
                    ],
                    [
                        'subject' => $message->getSubject(),
                        'from' => $message->getFrom()[0]->mail ?? '',
                        'to' => $message->getTo()[0]->mail ?? '',
                        'body' => $message->getHTMLBody() ?? $message->getTextBody(),
                        'is_read' => $message->hasFlag('Seen'),
                        'has_attachment' => $message->hasAttachments(),
                        'received_at' => $message->getDate(),
                    ]
                );
            }
            return true;
        } catch (\Exception $e) {
            Log::error('IMAP Sync Error: ' . $e->getMessage());
            return false;
        }
    }
}
