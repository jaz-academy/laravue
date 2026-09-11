<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\ImapService;
use App\Services\SmtpService;
use App\Models\Email;
use App\Models\EmailAccount;
use Illuminate\Support\Facades\Auth;

class MailController extends Controller
{
    protected $imapService;
    protected $smtpService;

    public function __construct(ImapService $imapService, SmtpService $smtpService)
    {
        $this->imapService = $imapService;
        $this->smtpService = $smtpService;
    }

    protected function getAccount()
    {
        $user = Auth::user();
        if (!$user) return null;

        $account = $user->emailAccount;
        if (!$account && $user->email) {
            $account = EmailAccount::create([
                'user_id' => $user->id,
                'email' => $user->email,
                'imap_host' => env('IMAP_HOST', '195.88.211.20'),
                'imap_port' => (int) env('IMAP_PORT', 993),
                'encryption' => env('IMAP_ENCRYPTION', 'ssl'),
                'smtp_host' => env('SMTP_HOST', '195.88.211.20'),
                'smtp_port' => (int) env('SMTP_PORT', 465),
                'password' => env('DEFAULT_EMAIL_PASSWORD', 'Administrator*2025'),
                'quota_mb' => 1000,
            ]);
        }

        return $account;
    }

    public function account()
    {
        $account = $this->getAccount();
        if (!$account) {
            return response()->json(['error' => 'No email account provisioned'], 404);
        }

        return response()->json([
            'id' => $account->id,
            'email' => $account->email,
            'imap_host' => $account->imap_host,
            'smtp_host' => $account->smtp_host,
            'quota_mb' => $account->quota_mb,
        ]);
    }

    public function index(Request $request, $folder = 'INBOX')
    {
        $folder = strtoupper($folder) === 'INBOX' ? 'INBOX' : ucfirst($folder);
        $account = $this->getAccount();
        if (!$account) {
            return response()->json([
                'current_page' => 1,
                'data' => [],
                'total' => 0,
                'last_page' => 1,
                'message' => 'No email account provisioned',
            ]);
        }

        // Only sync with remote IMAP if explicitly requested via ?sync=1 or if INBOX is empty
        $existingCount = Email::where('email_account_id', $account->id)->where('folder', $folder)->count();
        if ($folder === 'INBOX' && ($request->boolean('sync') || $existingCount === 0)) {
            try {
                $this->imapService->syncFolder($account, 'INBOX');
            } catch (\Throwable $e) {
                \Illuminate\Support\Facades\Log::warning('IMAP sync failed: ' . $e->getMessage());
            }
        }

        // If INBOX is empty for this user, seed an initial welcome email so user always has valid INBOX data
        if ($folder === 'INBOX') {
            $currentCount = Email::where('email_account_id', $account->id)->where('folder', 'INBOX')->count();
            if ($currentCount === 0) {
                Email::firstOrCreate(
                    [
                        'email_account_id' => $account->id,
                        'uid' => 'welcome_' . $account->id,
                        'folder' => 'INBOX',
                    ],
                    [
                        'subject' => 'Selamat Datang di JazMail (JazAcademy Email Client)',
                        'from' => 'admin@jazacademy.id',
                        'to' => $account->email,
                        'body' => '<p>Halo <strong>' . e($account->user?->name ?: 'Siswa/Guru') . '</strong>,</p><p>Selamat datang di layanan <strong>JazMail</strong> JazAcademy! Akun email resmi Anda (<code>' . e($account->email) . '</code>) telah aktif dan siap digunakan untuk komunikasi akademik, proyek, dan pengumuman.</p><p>Salam hangat,<br><strong>Tim JazAcademy</strong></p>',
                        'is_read' => false,
                        'has_attachment' => false,
                        'received_at' => now(),
                    ]
                );
            }
        }

        try {
            $emails = Email::where('email_account_id', $account->id)
                ->where('folder', $folder)
                ->orderBy('received_at', 'desc')
                ->paginate(15);

            return response()->json($emails);
        } catch (\Throwable $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function send(Request $request)
    {
        $request->validate([
            'to' => 'required|email',
            'subject' => 'required|string',
            'body' => 'required|string',
            'attachments.*' => 'nullable|file|max:5120'
        ]);

        $account = $this->getAccount();
        if (!$account) return response()->json(['error' => 'No email account provisioned'], 404);

        try {
            $this->smtpService->send(
                $account, 
                $request->to, 
                $request->subject, 
                $request->body, 
                $request->file('attachments', [])
            );
            return response()->json(['message' => 'Email sent successfully']);
        } catch (\Throwable $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function show($folder, $uid)
    {
        $account = $this->getAccount();
        $email = Email::where('email_account_id', $account->id)
            ->where('uid', $uid)
            ->firstOrFail();

        if (!$email->is_read) {
            $email->update(['is_read' => true]);
            // Ideally sync this back to IMAP as well
        }

        return response()->json($email);
    }

    public function destroy($folder, $uid)
    {
        $account = $this->getAccount();
        $email = Email::where('email_account_id', $account->id)
            ->where('uid', $uid)
            ->firstOrFail();

        if ($email->folder !== 'Trash') {
            $email->update(['folder' => 'Trash']);
        } else {
            $email->delete();
        }

        return response()->json(['message' => 'Email moved to trash or deleted']);
    }
}
