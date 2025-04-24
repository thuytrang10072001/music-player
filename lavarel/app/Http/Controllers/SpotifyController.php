<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;


class SpotifyController extends Controller
{
    public function getSpotifyToken()
    {
        $clientId = config('services.spotify.client_id');
        $clientSecret = config('services.spotify.client_secret');

        $response = Http::asForm()->withBasicAuth($clientId, $clientSecret)
            ->post('https://accounts.spotify.com/api/token', [
                'grant_type' => 'client_credentials',
            ]);

        return $response->json()['access_token'] ?? null;
    }
}
