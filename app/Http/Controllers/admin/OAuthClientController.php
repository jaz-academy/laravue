<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Laravel\Passport\ClientRepository;
use Laravel\Passport\Passport;

class OAuthClientController extends Controller
{
    protected $clients;

    public function __construct(ClientRepository $clients)
    {
        $this->clients = $clients;
    }

    /**
     * List all OAuth clients.
     */
    public function index(Request $request)
    {
        $clients = Passport::client()
            ->where('personal_access_client', false)
            ->where('password_client', false)
            ->where('revoked', false)
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($clients);
    }

    /**
     * Create a new OAuth client.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'redirect' => 'required|string|max:2048',
            'confidential' => 'boolean',
        ]);

        $confidential = $request->boolean('confidential', true);

        $client = $this->clients->create(
            $request->user()?->id ?? null,
            $request->name,
            $request->redirect,
            null,
            false,
            false,
            $confidential
        );

        return response()->json([
            'message' => 'OAuth Client created successfully.',
            'client' => $client,
            // Plain text secret for the user to copy immediately
            'plainSecret' => $client->plainSecret ?? $client->secret,
        ], 201);
    }

    /**
     * Update an OAuth client.
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'redirect' => 'required|string|max:2048',
        ]);

        $client = $this->clients->find($id);

        if (!$client || $client->revoked) {
            return response()->json(['message' => 'Client not found.'], 404);
        }

        $client = $this->clients->update($client, $request->name, $request->redirect);

        return response()->json([
            'message' => 'Client updated successfully.',
            'client' => $client,
        ]);
    }

    /**
     * Regenerate secret for an OAuth client.
     */
    public function regenerateSecret($id)
    {
        $client = $this->clients->find($id);

        if (!$client || $client->revoked) {
            return response()->json(['message' => 'Client not found.'], 404);
        }

        $client = $this->clients->regenerateSecret($client);

        return response()->json([
            'message' => 'Secret regenerated successfully.',
            'client' => $client,
            'plainSecret' => $client->plainSecret ?? $client->secret,
        ]);
    }

    /**
     * Revoke / delete an OAuth client.
     */
    public function destroy($id)
    {
        $client = $this->clients->find($id);

        if (!$client) {
            return response()->json(['message' => 'Client not found.'], 404);
        }

        $this->clients->delete($client);

        return response()->json(['message' => 'Client revoked successfully.']);
    }
}
