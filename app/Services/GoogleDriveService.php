<?php

namespace App\Services;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class GoogleDriveService
{
    /**
     * Get or refresh Google Drive OAuth2 Access Token with caching
     */
    public static function getAccessToken(): ?string
    {
        return Cache::remember('google_drive_access_token', 3300, function () {
            $clientId = config('services.google_drive.client_id') ?: env('GOOGLE_DRIVE_CLIENT_ID');
            $clientSecret = config('services.google_drive.client_secret') ?: env('GOOGLE_DRIVE_CLIENT_SECRET');
            $refreshToken = config('services.google_drive.refresh_token') ?: env('GOOGLE_DRIVE_REFRESH_TOKEN');

            if (!$clientId || !$clientSecret || !$refreshToken) {
                Log::warning('Google Drive credentials not set.');
                return null;
            }

            try {
                $response = Http::withoutVerifying()->asForm()->post('https://oauth2.googleapis.com/token', [
                    'client_id' => $clientId,
                    'client_secret' => $clientSecret,
                    'refresh_token' => $refreshToken,
                    'grant_type' => 'refresh_token',
                ]);

                if ($response->successful()) {
                    return $response->json('access_token');
                }

                Log::error('Google Drive token refresh failed: ' . $response->body());
                return null;
            } catch (\Throwable $e) {
                Log::error('Google Drive token exception: ' . $e->getMessage());
                return null;
            }
        });
    }

    /**
     * Get file metadata from Google Drive API
     */
    public static function getFileMetadata(string $fileId): ?array
    {
        $token = self::getAccessToken();
        if (!$token) {
            return null;
        }

        return Cache::remember("gdrive_meta_{$fileId}", 86400, function () use ($fileId, $token) {
            try {
                $res = Http::withoutVerifying()
                    ->withToken($token)
                    ->get("https://www.googleapis.com/drive/v3/files/{$fileId}?fields=id,name,mimeType,size");

                if ($res->successful()) {
                    return $res->json();
                }

                // If token expired, clear cache and retry once
                if ($res->status() === 401) {
                    Cache::forget('google_drive_access_token');
                    $newToken = self::getAccessToken();
                    if ($newToken) {
                        $retry = Http::withoutVerifying()
                            ->withToken($newToken)
                            ->get("https://www.googleapis.com/drive/v3/files/{$fileId}?fields=id,name,mimeType,size");
                        return $retry->successful() ? $retry->json() : null;
                    }
                }

                return null;
            } catch (\Throwable $e) {
                Log::error("Failed to get gdrive metadata for {$fileId}: " . $e->getMessage());
                return null;
            }
        });
    }

    /**
     * Stream file from Google Drive directly to client with Range support and chunked output
     */
    public static function streamFile(string $fileId, $request)
    {
        $token = self::getAccessToken();
        if (!$token) {
            return redirect()->to("https://drive.usercontent.google.com/download?id={$fileId}&export=download");
        }

        $metadata = self::getFileMetadata($fileId);
        $fileSize = isset($metadata['size']) ? (int) $metadata['size'] : 0;
        $mimeType = $metadata['mimeType'] ?? 'video/mp4';

        $range = $request->header('Range');
        $start = 0;
        $end = $fileSize > 0 ? $fileSize - 1 : 0;
        $status = 200;

        $gdriveHeaders = [
            'Authorization' => "Bearer {$token}",
        ];

        if ($range && preg_match('/bytes=(\d+)-(\d*)/', $range, $matches)) {
            $start = (int) $matches[1];
            if (!empty($matches[2])) {
                $end = (int) $matches[2];
            }
            $status = 206;
            $gdriveHeaders['Range'] = "bytes={$start}-{$end}";
        }

        $responseHeaders = [
            'Content-Type' => $mimeType,
            'Accept-Ranges' => 'bytes',
            'Access-Control-Allow-Origin' => '*',
            'Access-Control-Allow-Headers' => 'Range, Content-Type, Authorization',
            'Access-Control-Expose-Headers' => 'Content-Range, Content-Length, Accept-Ranges',
        ];

        if ($status === 206 && $fileSize > 0) {
            $responseHeaders['Content-Range'] = "bytes {$start}-{$end}/{$fileSize}";
            $responseHeaders['Content-Length'] = (string) ($end - $start + 1);
        } elseif ($fileSize > 0) {
            $responseHeaders['Content-Length'] = (string) $fileSize;
            $responseHeaders['Cache-Control'] = 'public, max-age=31536000, immutable';
        }

        return response()->stream(function () use ($fileId, $gdriveHeaders) {
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, "https://www.googleapis.com/drive/v3/files/{$fileId}?alt=media");
            curl_setopt($ch, CURLOPT_HTTPHEADER, array_map(
                fn($k, $v) => "{$k}: {$v}",
                array_keys($gdriveHeaders),
                array_values($gdriveHeaders)
            ));
            curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
            curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
            curl_setopt($ch, CURLOPT_WRITEFUNCTION, function ($curlHandle, $chunk) {
                echo $chunk;
                if (ob_get_level() > 0) {
                    ob_flush();
                }
                flush();
                return strlen($chunk);
            });
            curl_exec($ch);
            curl_close($ch);
        }, $status, $responseHeaders);
    }
}
