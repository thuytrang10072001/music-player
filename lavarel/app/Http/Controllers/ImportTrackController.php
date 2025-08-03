<?php

namespace App\Http\Controllers;

use App\Services\SpotifyService;
use App\Models\Song;
use App\Models\Artist;
use App\Models\Album;
use Illuminate\Http\Request;

class ImportTrackController extends Controller
{
    protected $spotify;

    public function __construct(SpotifyService $spotify)
    {
        $this->spotify = $spotify;
    }

    public function importTrack(Request $request)
    {
        $trackId = $request->input('track_id');

        if (!$trackId) {
            return response()->json(['error' => 'Track ID is required'], 400);
        }

        // Fetch track from Spotify
        $trackData = $this->spotify->getTrackById($trackId);

        if (!isset($trackData['id'])) {
            return response()->json(['error' => 'Track not found'], 404);
        }

        // Save to database
        $song = $this->saveTrackToDatabase($trackData);

        return response()->json([
            'message' => 'Track imported successfully',
            'song' => $song
        ]);
    }

    public function importAlbum(Request $request)
    {
        return $this->executeInTransaction(function () use ($request) {
            $albumId = $request->input('album_id');
            if (!$albumId) {
                return response()->json(['error' => 'Album ID is required'], 400);
            }

            $albumData = $this->spotify->getAlbumById($albumId);
            if (!isset($albumData['id'])) {
                return response()->json(['error' => 'Album not found'], 404);
            }

            if(Album::where('spotify_id', $albumData['id'])->first()){
                return response()->json(['error' => 'Album existed!'], 404);
            }

            $album = Album::create(
                [
                    'spotify_id' => $albumData['id'],
                    'title' => $albumData['name'],
                    'release_date' => $albumData['release_date'],
                    'picture' => $albumData['images'][0]['url']
                ]
            );

            $artistIds = [];

            foreach ($albumData['artists'] as $artistItem) {
                $img = $this->spotify->getArtistById($artistItem['id'])['images'][0]['url'] ?? null;

                $existingArtist = Artist::where('spotify_id', $artistItem['id'])->first();

                if (!$existingArtist) {
                    $artist = Artist::create([
                        'spotify_id' => $artistItem['id'],
                        'name' => $artistItem['name'],
                        'genre' => 'Unknown',
                        'picture' => $img
                    ]);
                } else {
                    $artist = $existingArtist;
                }

                $artistIds[] = $artist->artist_id;
            }

            // Gán nhiều artist cho album
            $album->artists()->sync($artistIds);

            // Lặp từng bài trong album và lưu vào database
            $importedTracks = [];

            foreach ($albumData['tracks']['items'] as $track) {
                $song = Song::create(
                    [
                        'spotify_id' => $track['id'],
                        'title' => $track['name'],
                        'duration' => gmdate("H:i:s", $track['duration_ms'] / 1000),
                        'album_id' => $album->album_id,
                        'file_path' => null,
                        'picture' => $albumData['images'][0]['url']
                    ]
                );

                $trackArtistIds = [];
                foreach ($track['artists'] as $trackArtist) {
                    $artist = Artist::where('spotify_id', $trackArtist['id'])->first();
                    $trackArtistIds[] = $artist->artist_id;
                }

                $song->artists()->sync($trackArtistIds);

                $importedTracks[] = $song;
            }

            return response()->json([
                'message' => 'Album imported successfully',
                'album' => $album,
                'tracks' => $importedTracks
            ]);
        });
    }

    private function saveTrackToDatabase($track)
    {
        // Get or create artist with spotify_id
        $artist = Artist::firstOrCreate(
            ['spotify_id' => $track['artists'][0]['id']],  // Sử dụng spotify_id làm điều kiện
            ['name' => $track['artists'][0]['name'], 'genre' => 'Unknown']
        );

        // Get or create album with spotify_id
        $album = Album::firstOrCreate(
            ['spotify_id' => $track['album']['id']],  // Sử dụng spotify_id làm điều kiện
            [
                'title' => $track['album']['name'],
                'release_date' => $track['album']['release_date'],
                'artist_id' => $artist->artist_id
            ]
        );

        // Create song (track) with spotify_id
        $song = Song::updateOrCreate(
            ['spotify_id' => $track['id']],  // Sử dụng spotify_id để tránh trùng
            [
                'title' => $track['name'],
                'duration' => gmdate("H:i:s", $track['duration_ms'] / 1000),
                'album_id' => $album->album_id,
                'artist_id' => $artist->artist_id,
                'file_path' => null
            ]
        );


        return $song;
    }
}
