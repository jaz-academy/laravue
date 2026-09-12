<?php

namespace App\Services;

use App\Models\EmailAccount;
use App\Models\Email;
use Illuminate\Support\Facades\Log;

class ImapService
{
    /**
     * Sync messages from remote mail server (POP3S / IMAP).
     */
    public function syncFolder(EmailAccount $account, $folderName = 'INBOX')
    {
        if ($folderName !== 'INBOX') {
            return true;
        }

        try {
            return $this->syncViaPop3($account);
        } catch (\Throwable $e) {
            Log::warning('POP3 sync failed, attempting IMAP fallback: ' . $e->getMessage());
            return $this->syncViaImap($account, $folderName);
        }
    }

    /**
     * Synchronize INBOX via POP3S (port 995).
     */
    protected function syncViaPop3(EmailAccount $account)
    {
        $host = $account->imap_host ?: '195.88.211.20';
        $port = 995;

        $context = stream_context_create([
            'ssl' => [
                'verify_peer' => false,
                'verify_peer_name' => false,
            ]
        ]);

        $fp = @stream_socket_client("ssl://{$host}:{$port}", $errno, $errstr, 4, STREAM_CLIENT_CONNECT, $context);
        if (!$fp) {
            Log::info("POP3S host {$host}:{$port} unreachable: [{$errno}] {$errstr}");
            return false;
        }

        fgets($fp); // Banner
        fputs($fp, "USER {$account->email}\r\n");
        fgets($fp);
        fputs($fp, "PASS {$account->password}\r\n");
        $loginRes = fgets($fp);

        if (!str_starts_with($loginRes, '+OK')) {
            Log::warning("POP3S login failed for {$account->email}: {$loginRes}");
            fclose($fp);
            return false;
        }

        // Get UIDLs
        fputs($fp, "UIDL\r\n");
        $uidls = [];
        fgets($fp);
        while ($line = fgets($fp)) {
            $line = trim($line);
            if ($line === '.') break;
            $parts = explode(' ', $line);
            if (count($parts) >= 2) {
                $uidls[$parts[0]] = $parts[1];
            }
        }

        $existingUids = Email::where('email_account_id', $account->id)
            ->where('folder', 'INBOX')
            ->pluck('uid')
            ->flip()
            ->toArray();

        foreach ($uidls as $msgNum => $uid) {
            if (isset($existingUids[$uid])) {
                continue;
            }

            fputs($fp, "RETR {$msgNum}\r\n");
            $raw = '';
            while ($line = fgets($fp)) {
                if (trim($line) === '.') break;
                $raw .= $line;
            }

            $parsed = $this->parseMimeMessage($raw);

            Email::create([
                'email_account_id' => $account->id,
                'uid' => $uid,
                'folder' => 'INBOX',
                'subject' => $parsed['subject'],
                'from' => $parsed['from'],
                'to' => $parsed['to'],
                'body' => $parsed['body'],
                'is_read' => false,
                'has_attachment' => $parsed['has_attachment'],
                'received_at' => $parsed['received_at'],
            ]);
        }

        fputs($fp, "QUIT\r\n");
        fclose($fp);

        return true;
    }

    /**
     * Fallback IMAP sync.
     */
    protected function syncViaImap(EmailAccount $account, $folderName = 'INBOX')
    {
        try {
            $socket = @fsockopen($account->imap_host, (int) $account->imap_port, $errno, $errstr, 1.5);
            if (!$socket) {
                return false;
            }
            fclose($socket);

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
        } catch (\Throwable $e) {
            Log::error('IMAP Sync Error: ' . $e->getMessage());
            return false;
        }
    }

    /**
     * Parse raw MIME message into array.
     */
    protected function parseMimeMessage(string $raw): array
    {
        $raw = preg_replace('/^\+OK[^\r\n]*\r\n/i', '', $raw);
        $parts = preg_split('/\r?\n\r?\n/', $raw, 2);
        $headerText = $parts[0] ?? '';
        $bodyText = $parts[1] ?? '';

        $unfoldedHeaders = preg_replace('/\r?\n[ \t]+/', ' ', $headerText);
        $headerLines = preg_split('/\r?\n/', $unfoldedHeaders);

        $headers = [];
        foreach ($headerLines as $line) {
            $pos = strpos($line, ':');
            if ($pos !== false) {
                $key = strtolower(trim(substr($line, 0, $pos)));
                $val = trim(substr($line, $pos + 1));
                $headers[$key] = iconv_mime_decode($val, ICONV_MIME_DECODE_CONTINUE_ON_ERROR, 'UTF-8');
            }
        }

        $subject = $headers['subject'] ?? '(No subject)';
        $from = $headers['from'] ?? '';
        $to = $headers['to'] ?? '';
        $date = isset($headers['date']) ? date('Y-m-d H:i:s', strtotime($headers['date'])) : now()->toDateTimeString();

        $contentType = $headers['content-type'] ?? 'text/plain';
        $isMultipart = (stripos($contentType, 'multipart/') !== false);
        $hasAttachment = false;

        $htmlBody = '';
        $plainBody = '';

        if ($isMultipart && preg_match('/boundary="?([^";]+)"?/i', $contentType, $matches)) {
            $boundary = $matches[1];
            $subParts = explode('--' . $boundary, $bodyText);
            foreach ($subParts as $subPart) {
                if (trim($subPart) === '' || trim($subPart) === '--') continue;
                $subSplit = preg_split('/\r?\n\r?\n/', $subPart, 2);
                $subHeader = $subSplit[0] ?? '';
                $subContent = $subSplit[1] ?? '';

                if (stripos($subHeader, 'content-disposition: attachment') !== false) {
                    $hasAttachment = true;
                }

                if (stripos($subHeader, 'content-transfer-encoding: base64') !== false) {
                    $subContent = base64_decode(trim($subContent));
                } elseif (stripos($subHeader, 'content-transfer-encoding: quoted-printable') !== false) {
                    $subContent = quoted_printable_decode($subContent);
                }

                if (stripos($subHeader, 'text/html') !== false) {
                    $htmlBody = $subContent;
                } elseif (stripos($subHeader, 'text/plain') !== false && empty($plainBody)) {
                    $plainBody = $subContent;
                }
            }
        } else {
            if (stripos($headers['content-transfer-encoding'] ?? '', 'base64') !== false) {
                $bodyText = base64_decode(trim($bodyText));
            } elseif (stripos($headers['content-transfer-encoding'] ?? '', 'quoted-printable') !== false) {
                $bodyText = quoted_printable_decode($bodyText);
            }

            if (stripos($contentType, 'text/html') !== false) {
                $htmlBody = $bodyText;
            } else {
                $plainBody = $bodyText;
            }
        }

        $finalBody = $htmlBody ?: (nl2br(e($plainBody)) ?: '<p>(No message body)</p>');

        return [
            'subject' => $subject,
            'from' => $from,
            'to' => $to,
            'body' => $finalBody,
            'received_at' => $date,
            'has_attachment' => $hasAttachment,
        ];
    }
}
