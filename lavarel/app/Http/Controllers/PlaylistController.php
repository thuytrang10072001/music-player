<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreatePlaylistRequest;
use App\Models\Playlist;
use App\Models\Song;
use Illuminate\Http\Client\Request;
use Illuminate\Http\JsonResponse;
use SebastianBergmann\CodeUnit\Exception;

class PlaylistController extends Controller
{
    public function index(Request $request): JsonResponse{

        $limit = $request->query('limit', 50);
        $user = $request->user();

        try{

            $playlists = Playlist::with('songs')->where('user_id', $user->id)->paginate($limit);

            return response()->json([
                'message' => 'Success',
                'data' => [
                    'list' => $playlists,
                ]
            ]);

        }catch (\Exception $e){

            return response()->json([
                'message' => 'Error fetching playlists',
                'error' => $e->getMessage()
            ], 500);

        }
    }

    public function create(CreatePlaylistRequest $request): JsonResponse
    {
        $user = $request->user();

        try {

            $playlist = Playlist::create([
                'name' => $request['name'],
                'user_id' => $user->id
            ]);

            $spotifyIds = $request->input('songs', []);
            $songIds = [];

            foreach ($spotifyIds as $spotifyId) {
                $song = Song::firstOrCreate(['spotify_id' => $spotifyId]);
                $songIds[] = $song->id;
            }

            // Gán các bài hát vào playlist mới
            $playlist->songs()->sync($songIds);

            return response()->json([
                'message' => 'Playlist created successfully',
                'data' => $playlist->load('songs')
            ], 201);

        }catch (\Exception $e){

            return response()->json([
                'message' => 'Error fetching playlists',
                'error' => $e->getMessage()
            ], 500);

        }
    }
}
