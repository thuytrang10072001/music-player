<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Album extends Model
{
    protected $table = 'albums';
    protected $primaryKey = 'album_id';
    public $timestamps = false;

    protected $fillable = ['title', 'release_date', 'spotify_id', 'picture'];

//    public function artist()
//    {
//        return $this->belongsTo(Artist::class, 'artist_id');
//    }

    public function artists()
    {
        return $this->belongsToMany(Artist::class, 'album_artist', 'album_id', 'artist_id');
    }
    public function songs()
    {
        return $this->hasMany(Song::class, 'album_id');
    }
}

