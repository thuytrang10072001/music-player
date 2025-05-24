export interface Artist {
    spotify_id: string,
    name: string,
    picture: string,
    artist: {
        name: string
    }
}

export interface PropsArtist {
    data: {
        picture: string,
        name: string,
    }
}

export interface Song {
    spotify_id: string,
    title: string,
    picture: string,
    duration: string,
    artist: {
        name: string
    }
}

export interface PropsSong {
    data: {
        picture: string,
        title: string,
        artist: {
            name: string
        }
    }
}

export interface Album {
    spotify_id: string,
    title: string,
    picture: string,
    album_id: string,
    artist: {
        name: string
    }
}

export interface PropsAlbum {
    data: {
        picture: string,
        title: string,
        album_id: string,
        artist: {
            name: string
        }
    }
}