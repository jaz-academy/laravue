<?php

namespace App\Http\Controllers\Api\Media;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class DriveMediaController extends Controller
{
    protected function getGoogleAccessToken()
    {
        $clientId = env('GOOGLE_DRIVE_CLIENT_ID');
        $clientSecret = env('GOOGLE_DRIVE_CLIENT_SECRET');
        $refreshToken = env('GOOGLE_DRIVE_REFRESH_TOKEN');

        if (!$clientId || !$clientSecret || !$refreshToken) {
            return null;
        }

        $res = Http::asForm()->post('https://oauth2.googleapis.com/token', [
            'client_id' => $clientId,
            'client_secret' => $clientSecret,
            'refresh_token' => $refreshToken,
            'grant_type' => 'refresh_token',
        ]);

        if ($res->successful()) {
            return $res->json('access_token');
        }

        return null;
    }

    /**
     * Create resumable Google Drive upload session
     */
    public function createUploadSession(Request $request)
    {
        $request->validate([
            'fileName' => 'required|string',
            'mimeType' => 'required|string',
            'fileSize' => 'required|numeric',
        ]);

        try {
            $token = $this->getGoogleAccessToken();
            if (!$token) {
                return response()->json([
                    'success' => false,
                    'error' => 'Gagal mendapatkan akses token Google Drive',
                ], 500);
            }

            $folderId = env('GOOGLE_DRIVE_FOLDER_ID');
            $metadata = [
                'name' => $request->fileName,
                'parents' => $folderId ? [$folderId] : [],
            ];

            $origin = $request->header('Origin') ?: 'http://localhost:3000';

            $res = Http::withHeaders([
                'Authorization' => "Bearer {$token}",
                'Content-Type' => 'application/json',
                'X-Upload-Content-Type' => $request->mimeType,
                'X-Upload-Content-Length' => (string) $request->fileSize,
                'Origin' => $origin,
            ])->post('https://www.googleapis.com/upload/drive/v3/files?uploadType=resumable', $metadata);

            $uploadUrl = $res->header('Location');
            if (!$uploadUrl) {
                return response()->json([
                    'success' => false,
                    'error' => 'Tidak menerima URL upload dari Google Drive: ' . $res->body(),
                ], 500);
            }

            return response()->json([
                'success' => true,
                'uploadUrl' => $uploadUrl,
            ]);
        } catch (\Throwable $e) {
            return response()->json(['success' => false, 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Finalize uploaded Google Drive file
     */
    public function finalizeUpload(Request $request)
    {
        $request->validate(['fileId' => 'required|string']);
        $fileId = $request->fileId;

        try {
            $token = $this->getGoogleAccessToken();
            if (!$token) {
                return response()->json(['success' => false, 'error' => 'Google Drive access token unavailable'], 500);
            }

            // Rename file to its own ID
            Http::withToken($token)->patch("https://www.googleapis.com/drive/v3/files/{$fileId}?supportsAllDrives=true", [
                'name' => $fileId,
            ]);

            // Set permission to anyone with link (reader)
            Http::withToken($token)->post("https://www.googleapis.com/drive/v3/files/{$fileId}/permissions?supportsAllDrives=true", [
                'role' => 'reader',
                'type' => 'anyone',
            ]);

            // Get file links
            $fileRes = Http::withToken($token)->get("https://www.googleapis.com/drive/v3/files/{$fileId}?fields=id,webViewLink,webContentLink&supportsAllDrives=true");
            $fileData = $fileRes->json();

            $url = $fileData['webContentLink'] ?? $fileData['webViewLink'] ?? "https://drive.google.com/uc?export=view&id={$fileId}";

            return response()->json([
                'success' => true,
                'url' => $url,
            ]);
        } catch (\Throwable $e) {
            return response()->json(['success' => false, 'error' => $e->getMessage()], 500);
        }
    }
}
