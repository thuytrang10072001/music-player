<?php

namespace App\Http\Controllers;

use App\Models\Album;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class AlbumController extends Controller
{
    public function index(): JsonResponse
    {
        try{
            $albums =  Album::with('artist')->get();
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
        try {
            $album = Album::with(['artist', 'songs'])->findOrFail($id);

            return response()->json([
                'message' => 'Success',
                'data' => $album
            ]);
        }catch (\Exception $e){
            return response()->json([
                'message' => 'Error',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
