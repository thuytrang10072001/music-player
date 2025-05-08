<?php

namespace App\Http\Controllers;

use App\Models\Artist;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ArtistController extends Controller
{
    public function index(): JsonResponse{
        try{
            $artists = Artist::all();
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
}
