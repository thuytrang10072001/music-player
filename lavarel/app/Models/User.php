<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, HasApiTokens;

    protected $table = 'users';

    protected $primaryKey = 'id';

    public $timestamps = false;

    protected $fillable = ['name', 'email', 'password', 'created_at', 'provider', 'picture'];

    protected $hidden = ['password'];

    public function playlists()
    {
        return $this->hasMany(Playlist::class, 'id');
    }

    public function songHistories()
    {
        return $this->hasMany(SongHistory::class, 'id');
    }
//    /**
//     * The attributes that are mass assignable.
//     *
//     * @var list<string>
//     */
//    protected $fillable = [
//        'name',
//        'email',
//        'password',
//    ];
//
//    /**
//     * The attributes that should be hidden for serialization.
//     *
//     * @var list<string>
//     */
//    protected $hidden = [
//        'password',
//        'remember_token',
//    ];
//
//    /**
//     * Get the attributes that should be cast.
//     *
//     * @return array<string, string>
//     */
//    protected function casts(): array
//    {
//        return [
//            'email_verified_at' => 'datetime',
//            'password' => 'hashed',
//        ];
//    }
}
