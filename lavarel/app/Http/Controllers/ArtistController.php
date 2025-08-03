<?php

namespace App\Http\Controllers;

use App\Models\Artist;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ArtistController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        return $this->executeInTransaction(function () use ($request) {
            $limit = (int) $request->query('limit', 50);
            $limit = max(1, min($limit, 100));

            $artists = Artist::paginate($limit);

            return response()->json([
                'status' => 'success',
                'message' => 'Arists fetched successfully',
                'list' => $artists
            ]);
        });
    }

    public function getAlbumsByArtistId(Request $request, int $id): JsonResponse
    {
        return $this->executeInTransaction(function () use ($request, $id) {
            $limit = (int) $request->query('limit', 50);

            $artist = Artist::findOrFail($id);
            $albums = $artist->albums()->with('artists')->paginate($limit);
            $songs = $artist->songs()->paginate(10);

            return response()->json([
                'status' => 'success',
                'message' => 'Artist fetched successfully',
                'albums' => $albums,
                'artist' => $artist,
                'songs' => $songs
            ]);
        });
    }
}
