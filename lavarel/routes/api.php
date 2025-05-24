<?php

use App\Http\Controllers\AlbumController;
use App\Http\Controllers\ArtistController;
use App\Http\Controllers\SongController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
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

Route::prefix('album')->group(function () {
    Route::get('/', [AlbumController::class, 'index']);
    Route::get('/{id}', [AlbumController::class, 'show']);
    Route::get('/{id}/related', [AlbumController::class, 'relatedAlbums']);

});

Route::prefix('artist')->group(function () {
    Route::get('/', [ArtistController::class, 'index']);
});

Route::prefix('song')->group(function () {
    Route::get('/', [SongController::class, 'index']);
});

Route::prefix('spotify')->group(function () {
    Route::get('/token', [SpotifyController::class, 'getSpotifyToken']);
});
