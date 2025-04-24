<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Song extends Model
{
    protected $table = 'songs';
    protected $primaryKey = 'song_id';
    public $timestamps = false;

    protected $fillable = ['title', 'duration', 'album_id', 'artist_id', 'file_path'];

    public function album()
    {
        return $this->belongsTo(Album::class, 'album_id');
    }

    public function artist()
    {
        return $this->belongsTo(Artist::class, 'artist_id');
    }

    public function lyrics()
    {
        return $this->hasMany(Lyric::class, 'song_id');
    }

    public function playlists()
    {
        return $this->belongsToMany(Playlist::class, 'playlist_songs', 'song_id', 'playlist_id');
    }
}
