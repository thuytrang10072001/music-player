<?php

namespace App\Http\Controllers;

use App\Models\Album;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class AlbumController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        return $this->executeInTransaction(function () use ($request) {
            $limit = $request->query('limit', 50);

            $albums = Album::with('artists', 'songs.artists')->paginate($limit);

            return response()->json([
                'status' => 'success',
                'message' => 'Albums fetched successfully',
                'list' => $albums
            ]);
        });
    }

    public function show(int $id): JsonResponse
    {
        return $this->executeInTransaction(function () use ($id) {
            $limit = 20;

            $album = Album::with(['artists', 'songs.artists'])->findOrFail($id);

            // Lấy tất cả artist_ids của album đó
            $artistIds = $album->artists->pluck('artist_id')->toArray();

            // Tìm related albums có ít nhất 1 artist chung
            $relatedAlbums = Album::whereHas('artists', function ($query) use ($artistIds) {
                $query->whereIn('artists.artist_id', $artistIds);
            })
                ->where('album_id', '!=', $album->album_id)
                ->with('artists')
                ->paginate($limit);

            return response()->json([
                'message' => 'Success',
                'data' => [
                    'list' => $relatedAlbums,
                    'album' => $album
                ]
            ]);
        });
    }

    public function relatedAlbums(Request $request, int $id): JsonResponse
    {
        return $this->executeInTransaction(function () use ($request, $id) {
            $limit = $request->query('limit', 50);

            $album = Album::findOrFail($id);

            $artistIds = $album->artists->pluck('artist_id')->toArray();

            $relatedAlbums = Album::whereHas('artists', function ($query) use ($artistIds) {
                $query->whereIn('artists.artist_id', $artistIds);
            })
                ->where('album_id', '!=', $album->album_id)
                ->with('artists')
                ->paginate($limit);

            return response()->json([
                'message' => 'Success',
                'list' => $relatedAlbums
            ]);
        });
    }
}
