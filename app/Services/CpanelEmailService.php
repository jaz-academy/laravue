<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Exception;

class CpanelEmailService
{
    protected $host;
    protected $username;
    protected $token;
    protected $domain;

    public function __construct()
    {
        $this->host = env('CPANEL_HOST');
        $this->username = env('CPANEL_USERNAME');
        $this->token = env('CPANEL_API_TOKEN');
        $this->domain = env('MAIL_CUSTOM_DOMAIN', 'jazacademy.id');
    }

    protected function request($module, $function, $params = [])
    {
        if (!$this->host || !$this->token) {
            throw new Exception("cPanel configuration is missing");
        }

        // URL to cPanel UAPI
        $url = rtrim($this->host, '/') . '/execute/' . $module . '/' . $function;
        
        $response = Http::withoutVerifying()->withHeaders([
            'Authorization' => 'cpanel ' . $this->username . ':' . $this->token
        ])->get($url, $params);

        if ($response->failed()) {
            throw new Exception("cPanel API Request Failed: " . $response->body());
        }

        $data = $response->json();
        
        if (isset($data['errors']) && count($data['errors']) > 0) {
            throw new Exception("cPanel API Error: " . implode(", ", $data['errors']));
        }

        return $data['data'] ?? $data;
    }

    public function addPop($emailPrefix, $password, $quotaMb = 1000)
    {
        return $this->request('Email', 'add_pop', [
            'email' => $emailPrefix,
            'password' => $password,
            'domain' => $this->domain,
            'quota' => $quotaMb,
        ]);
    }

    public function deletePop($emailPrefix)
    {
        return $this->request('Email', 'delete_pop', [
            'email' => $emailPrefix,
            'domain' => $this->domain,
        ]);
    }

    public function listPops()
    {
        return $this->request('Email', 'list_pops', [
            'domain' => $this->domain,
        ]);
    }

    public function checkEmailAvailable($emailPrefix)
    {
        try {
            $pops = $this->listPops();
            foreach ($pops as $pop) {
                if ($pop['email'] === $emailPrefix . '@' . $this->domain) {
                    return false; // Email already exists in cPanel
                }
            }
            return true;
        } catch (Exception $e) {
            // Log error, assume unavailable if API fails for safety
            return false;
        }
    }
}
