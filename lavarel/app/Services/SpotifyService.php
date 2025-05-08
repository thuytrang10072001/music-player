<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class SpotifyService
{
    public function getAccessToken()
    {
        $response = Http::asForm()->post('https://accounts.spotify.com/api/token', [
            'grant_type' => 'client_credentials',
            'client_id' => config('spotify.client_id'),
            'client_secret' => config('spotify.client_secret'),
        ]);

        if ($response->successful()) {
            return $response->json()['access_token'];
        }

        throw new \Exception('Unable to fetch Spotify access token');
    }

    public function searchTracks($query, $type = 'track', $limit = 50, $offset = 0)
    {
        // Lấy access token
        $token = $this->getAccessToken();

        // Gửi request đến Spotify API để tìm kiếm track, album, artist
        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . $token
        ])->get("https://api.spotify.com/v1/search", [
            'q' => $query,
            'type' => $type,
            'limit' => $limit,
            'offset' => $offset
        ]);

        return $response->json();
    }

    public function getTrackById($trackId)
    {
        // Lấy access token
        $token = $this->getAccessToken();

        // Gửi request đến Spotify API để lấy thông tin track
        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . $token
        ])->get("https://api.spotify.com/v1/tracks/{$trackId}");

        return $response->json();
    }

    public function getAlbumById($albumId)
    {
        // Lấy access token
        $token = $this->getAccessToken();

        // Gửi request đến Spotify API để lấy thông tin album
        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . $token
        ])->get("https://api.spotify.com/v1/albums/{$albumId}");

        return $response->json();
    }

    public function getArtistById($artistId)
    {
        // Lấy access token
        $token = $this->getAccessToken();

        // Gửi request đến Spotify API để lấy thông tin artist
        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . $token
        ])->get("https://api.spotify.com/v1/artists/{$artistId}");

        return $response->json();
    }
}
