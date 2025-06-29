<?php

namespace App\Http\Controllers;

use App\Models\Album;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class AlbumController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $limit = $request->query('limit', 50);

        try{
            $albums = Album::with('artists', 'songs.artists')->paginate($limit);

            return response()->json([
                'status' => 'success',
                'message' => 'Albums fetched successfully',
                'list' => $albums
            ]);
        }catch (\Exception $e){
            return response()->json([
                'message' => 'Error fetching albums',
                'error' => $e->getMessage()
            ], 500);
        }

    }

    public function show(int $id): JsonResponse
    {
        $limit = 20;

        try {
//            $album = Album::with(['artist', 'songs'])->findOrFail($id);
//
//            $relatedAlbums = Album::where('artist_id', $album->artist_id)
//                ->where('album_id', '!=', $album->id)
//                ->with('artist')
//                ->paginate($limit);

            $album = Album::with(['artists', 'songs'])->findOrFail($id);

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
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function relatedAlbums(Request $request, int $id): JsonResponse
    {
        $limit = $request->query('limit', 50);

        try {
            $album = Album::findOrFail($id);

//            $relatedAlbums = Album::where('artist_id', $album->artist_id)
//                ->where('album_id', '!=', $album->album_id)
//                ->with('artist')
//                ->paginate($limit);

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
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error',
                'error' => $e->getMessage()
            ], 500);
        }
    }

}
