<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PlaylistController;
use App\Http\Controllers\AlbumController;
use App\Http\Controllers\ArtistController;
use App\Http\Controllers\SongController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\SpotifyController;
use App\Http\Controllers\ImportTrackController;

Route::get('/import-track', [ImportTrackController::class, 'importTrack']);
Route::get('/import-album', [ImportTrackController::class, 'importAlbum']);

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::prefix('auth')->group(function () {
    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login']);
    Route::post('social-login', [AuthController::class, 'socialLogin']);
    Route::middleware('auth:sanctum')->post('logout', [AuthController::class, 'logout']);
});

Route::prefix('album')->controller(AlbumController::class)->group(function () {
    Route::get('/', 'index');
    Route::get('/{id}', 'show');
    Route::get('/{id}/related', 'relatedAlbums');

});

Route::prefix('artist')->controller(ArtistController::class)->group(function () {
    Route::get('/', 'index');
    Route::get('/{id}', 'show');
    Route::get('/{id}/related', 'getAlbumsByArtistId');
});

Route::prefix('song')->controller(SongController::class)->group(function () {
    Route::get('/',  'index');
});

Route::prefix('playlist')->middleware('auth:sanctum')->controller(PlaylistController::class)->group(function () {
   Route::get('/', 'index');
   Route::post('/create', 'create');
   Route::post('/add-song', 'addOneSongToPlaylists');
   Route::post('/add-songs', 'addSongsToPlaylists');
});

Route::prefix('spotify')->group(function () {
    Route::get('/token', [SpotifyController::class, 'getSpotifyToken']);
});
