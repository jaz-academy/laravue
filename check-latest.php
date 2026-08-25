<?php
require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$latestUser = App\Models\User::orderBy('id', 'desc')->first();
echo "Latest User ID: {$latestUser->id}\n";
echo "Email: {$latestUser->email}\n";
echo "Email Status: {$latestUser->email_status}\n";

$account = $latestUser->emailAccount;
if ($account) {
    echo "Email Account ID: {$account->id}\n";
    echo "IMAP Host: {$account->imap_host}\n";
} else {
    echo "NO EMAIL ACCOUNT FOUND FOR THIS USER.\n";
}

$failedJobs = \Illuminate\Support\Facades\DB::table('failed_jobs')->count();
echo "Total Failed Jobs: $failedJobs\n";
