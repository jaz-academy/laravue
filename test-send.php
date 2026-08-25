<?php
require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

try {
    $latestUser = App\Models\User::orderBy('id', 'desc')->first();
    Illuminate\Support\Facades\Auth::login($latestUser);
    
    $request = Illuminate\Http\Request::create('/api/mail/send', 'POST', [
        'to' => 'test@example.com',
        'subject' => 'Test',
        'body' => 'Test body',
    ]);
    
    $controller = app()->make(App\Http\Controllers\MailController::class);
    $response = $controller->send($request);
    
    echo "Status: " . $response->getStatusCode() . "\n";
    echo "Content: " . $response->getContent() . "\n";
} catch (\Throwable $e) {
    echo "ERROR: " . $e->getMessage() . "\n";
    echo $e->getTraceAsString();
}
