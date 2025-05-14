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

    public function albums()
    {
        return $this->hasMany(Album::class, 'artist_id');
    }

    public function songs()
    {
        return $this->hasMany(Song::class, 'artist_id');
    }
}

