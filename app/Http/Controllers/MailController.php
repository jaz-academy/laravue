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
        return Auth::user()->emailAccount;
    }

    public function index(Request $request, $folder = 'INBOX')
    {
        $account = $this->getAccount();
        if (!$account) return response()->json(['error' => 'No email account provisioned'], 404);

        // Sync briefly
        if ($folder === 'INBOX') {
            $this->imapService->syncFolder($account, 'INBOX');
        }

        $emails = Email::where('email_account_id', $account->id)
            ->where('folder', $folder)
            ->orderBy('received_at', 'desc')
            ->paginate(15);

        return response()->json($emails);
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
        } catch (\Exception $e) {
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
