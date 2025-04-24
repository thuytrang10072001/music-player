<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Album extends Model
{
    protected $table = 'albums';
    protected $primaryKey = 'album_id';
    public $timestamps = false;

    protected $fillable = ['title', 'release_date', 'artist_id'];

    public function artist()
    {
        return $this->belongsTo(Artist::class, 'artist_id');
    }

    public function songs()
    {
        return $this->hasMany(Song::class, 'album_id');
    }
}

