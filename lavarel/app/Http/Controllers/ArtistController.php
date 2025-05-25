<?php

namespace App\Http\Controllers;

use App\Models\Artist;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ArtistController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $limit = (int) $request->query('limit', 50);
        $limit = max(1, min($limit, 100));

        try{
            $artists = Artist::paginate($limit);

            return response()->json([
                'status' => 'success',
                'message' => 'Arists fetched successfully',
                'list' => $artists
            ]);
        }catch (\Exception $e){
            return response()->json([
                'message' => 'Error fetching artists',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function getAlbumsByArtistId(Request $request, int $id): JsonResponse
    {
        $limit = (int) $request->query('limit', 50);

        try{
            $artist = Artist::findOrFail($id);
            $albums = $artist->albums()->paginate($limit);
            $songs = $artist->songs()->paginate(10);

            return response()->json([
                'status' => 'success',
                'message' => 'Artist fetched successfully',
                'albums' => $albums,
                'artist' => $artist,
                'songs' => $songs
            ]);
        }catch (\Exception $e){
            return response()->json([
                'message' => 'Error fetching artists',
                'error' => $e->getMessage()
            ], 500);        }
    }
}
