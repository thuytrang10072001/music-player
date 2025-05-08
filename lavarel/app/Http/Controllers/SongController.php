<?php

namespace App\Http\Controllers;

use App\Models\Song;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SongController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $limit = $request->query('limit', 50);

        try {
            $songs = Song::with('artist')->paginate($limit);
            return response()->json([
                'status' => 'success',
                'message' => 'Albums fetched successfully',
                'list' => $songs
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error fetching albums',
                'error' => $e->getMessage()
            ], 500);
        }

    }
}
