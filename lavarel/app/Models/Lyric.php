<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Lyric extends Model
{
    protected $table = 'lyrics';
    protected $primaryKey = 'lyrics_id';
    public $timestamps = false;

    protected $fillable = ['song_id', 'lyrics_content', 'timestamp'];

    public function song()
    {
        return $this->belongsTo(Song::class, 'song_id');
    }
}

