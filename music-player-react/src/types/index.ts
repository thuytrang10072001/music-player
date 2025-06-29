export interface Artist {
    name: string
}
export interface Artist {
    spotify_id: string,
    name: string,
    picture: string,
    artist_id: string,
}

export interface PropsArtist {
    data: Artist
}

export interface Song {
    spotify_id: string,
    title: string,
    picture: string,
    duration: string,
    artists: Artist[],
    file_path: string
}

export interface PlayList {
    song: Song;
    defaultPlaylist?: Song[];
}
export interface PropsSong {
    data: Song
}

export interface Album {
    spotify_id: string,
    title: string,
    picture: string,
    album_id: string,
    artists: Artist[],
    songs: Song[]
}

export interface PropsAlbum {
    data: Album
}