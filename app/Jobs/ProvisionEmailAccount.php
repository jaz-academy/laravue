<?php

namespace App\Jobs;

use App\Models\User;
use App\Models\EmailAccount;
use App\Services\CpanelEmailService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;
use Exception;

class ProvisionEmailAccount implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $user;
    public $rawPassword;

    public function __construct(User $user, $rawPassword)
    {
        $this->user = $user;
        $this->rawPassword = $rawPassword;
    }

    public function handle(CpanelEmailService $cpanel)
    {
        try {
            $emailParts = explode('@', $this->user->email);
            $emailPrefix = $emailParts[0];

            $cpanel->addPop($emailPrefix, $this->rawPassword);

            $cpanelHost = env('CPANEL_HOST', 'mail.' . env('MAIL_CUSTOM_DOMAIN'));
            $cleanHost = preg_replace('/^https?:\/\//', '', $cpanelHost);
            $cleanHost = explode(':', $cleanHost)[0]; // Remove port if any

            // Create email account record
            EmailAccount::create([
                'user_id' => $this->user->id,
                'email' => $this->user->email,
                'imap_host' => $cleanHost,
                'imap_port' => 993,
                'encryption' => 'ssl',
                'smtp_host' => $cleanHost,
                'smtp_port' => 465,
                'password' => $this->rawPassword,
                'quota_mb' => 1000,
            ]);

            // Update user status
            $this->user->update([
                'email_status' => 'active',
                'email_provisioned_at' => now(),
            ]);

        } catch (Exception $e) {
            Log::error('Failed to provision email for user ' . $this->user->id . ': ' . $e->getMessage());
            
            $this->user->update([
                'email_status' => 'failed',
            ]);
            
            // Re-throw if you want it to retry, but for now we mark as failed.
            // throw $e; 
        }
    }
}
