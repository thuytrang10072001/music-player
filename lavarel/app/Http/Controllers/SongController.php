<?php

namespace App\Http\Controllers;

use App\Models\Song;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SongController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        return $this->executeInTransaction(function () use ($request) {
            $limit = $request->query('limit', 50);

            $songs = Song::with('artists')->paginate($limit);
            return response()->json([
                'status' => 'success',
                'message' => 'Albums fetched successfully',
                'list' => $songs
            ]);
        });
    }
}
