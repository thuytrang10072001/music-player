<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SongHistory extends Model
{
    protected $table = 'song_history';
    protected $primaryKey = 'history_id';
    public $timestamps = false;

    protected $fillable = ['user_id', 'song_id', 'played_at'];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function song()
    {
        return $this->belongsTo(Song::class, 'song_id');
    }
}

