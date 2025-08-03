<?php

namespace App\Http\Controllers;

use App\Http\Requests\Playlist\AddOneSongRequest;
use App\Http\Requests\Playlist\AddSongsRequest;
use App\Http\Requests\Playlist\CreatePlaylistRequest;
use App\Models\Playlist;
use App\Models\Song;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class PlaylistController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        return $this->executeInTransaction(function () use ($request) {
            $limit = $request->query('limit', 50);
            $user = $request->user();

            $playlists = Playlist::with('songs', 'songs.artists')->where('user_id', $user->id)->paginate($limit);

            return response()->json([
                'message' => 'Success',
                'data' => [
                    'list' => $playlists,
                ]
            ]);
        });
    }

    public function create(CreatePlaylistRequest $request): JsonResponse
    {
        return $this->executeInTransaction(function () use ($request) {
            $user = $request->user();

            $playlist = Playlist::create([
                'playlist_name' => $request['name'],
                'user_id' => $user->id,
                'created_at' => now(),
            ]);

            return response()->json([
                'message' => 'Playlist created successfully',
                'data' => $playlist
            ], 201);
        });
    }

    public function addOneSongToPlaylists(AddOneSongRequest $request): JsonResponse
    {
        return $this->executeInTransaction(function () use ($request) {
            $song = Song::where('spotify_id', $request->input('spotify_id'))->first();
            $song->playlists()->sync($request->input('ids'));

            return response()->json([
                'message' => 'Song added into playlists successfully',
                'data' => $song
            ], 201);
        });
    }

    public function addSongsToPlaylists(AddSongsRequest $request): JsonResponse
    {
        return $this->executeInTransaction(function () use ($request) {
            $spotifyIds = $request->input('spotify_ids');
            $playlistIds = $request->input('id_playlists');

            $songIds = Song::whereIn('spotify_id', $spotifyIds)->pluck('song_id');

            foreach ($playlistIds as $playlistId) {
                $playlist = Playlist::find($playlistId);

                if ($playlist) {
                    $playlist->songs()->syncWithoutDetaching($songIds);
                }
            }

            return response()->json([
                'message' => 'Songs added to playlists successfully',
            ], 200);
        });
    }
}
