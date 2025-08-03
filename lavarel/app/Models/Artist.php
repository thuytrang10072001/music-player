<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Artist extends Model
{
    use HasFactory;

    protected $table = 'artists';
    protected $primaryKey = 'artist_id';
    public $timestamps = false;

    protected $fillable = ['name', 'genre', 'spotify_id', 'picture'];

//    public function albums()
//    {
//        return $this->hasMany(Album::class, 'artist_id');
//    }

    public function albums()
    {
        return $this->belongsToMany(Album::class, 'album_artist', 'artist_id', 'album_id');
    }

    public function songs()
    {
        return $this->belongsToMany(Song::class, 'song_artist', 'artist_id', 'song_id');
    }
}

