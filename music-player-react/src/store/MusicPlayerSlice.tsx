import { createSlice } from '@reduxjs/toolkit';
import partySNSD from "../assets/images/snsd/party.jpg";
import { Song } from "@interfaces/index";

// interface Song {
//     id: number | string;
//     name: string;
//     artist: string;
//     img: any;
//     audio: string;
//     file_src: string;
// }

interface MusicPlayerState {
    playlist: Song[];
    currentSong: Song | null;
    isShuffle: boolean;
    isPlaying: boolean;
    currentTime: number;
    duration: number; // Added to store song duration
    volume: number;
    repeatMode: 'off' | 'one' | 'all';
}

const initialState: MusicPlayerState = {
    currentSong: null,
    playlist: [],
    isPlaying: false,
    currentTime: 0,
    duration: 0, // Initialize duration
    volume: 1,
    repeatMode: 'off',
    isShuffle: false
};

const MusicPlayerSlice = createSlice({
    name: 'musicPlayer',
    initialState,
    reducers: {
        setCurrentSong(state, action) {
            state.currentSong = action.payload;
            state.currentTime = 0;
            state.isPlaying = true;
            state.playlist = [];
            state.repeatMode = 'one'
        },
        setPlaylist(state, action) {
            state.playlist = action.payload;
        },
        playPlaylist(state, action) {
            state.playlist = action.payload.songs;
            state.currentSong = action.payload.songs[0] || state.currentSong;
            state.currentTime = 0;
            state.isPlaying = true;
            state.repeatMode = 'all';
        },
        togglePlay(state) {
            state.isPlaying = !state.isPlaying;
        },
        play(state) {
            state.isPlaying = true;
        },
        pause(state) {
            state.isPlaying = false;
        },
        setCurrentTime(state, action) {
            state.currentTime = action.payload;
        },
        setDuration(state, action) {
            state.duration = action.payload; // Store song duration
        },
        setVolume(state, action) {
            state.volume = action.payload;
        },
        toggleShuffle(state) {
            state.isShuffle = !state.isShuffle;
        },
        setRepeatMode(state, action) {
            state.repeatMode = action.payload;
        },
        playNext(state) {
            const currentIndex = state.playlist.findIndex(song => song.spotify_id === state.currentSong?.spotify_id);
            let nextIndex = currentIndex + 1;

            if (state.isShuffle) {
                nextIndex = Math.floor(Math.random() * state.playlist.length);
            }

            if (nextIndex >= state.playlist.length) {
                if (state.repeatMode === 'all') {
                    nextIndex = 0;
                } else {
                    state.isPlaying = false;
                    return;
                }
            }

            state.currentSong = state.playlist[nextIndex];
            state.currentTime = 0;
            state.isPlaying = true; // Auto-play next song
        },
        playPrevious(state) {
            const currentIndex = state.playlist.findIndex(song => song.spotify_id === state.currentSong?.spotify_id);
            let prevIndex = currentIndex - 1;

            if (prevIndex < 0) {
                if (state.repeatMode === 'all') {
                    prevIndex = state.playlist.length - 1;
                } else {
                    return;
                }
            }

            state.currentSong = state.playlist[prevIndex];
            state.currentTime = 0;
            state.isPlaying = true; // Auto-play previous song
        },
    }
});

export const {
    setCurrentSong,
    setPlaylist,
    playPlaylist,
    togglePlay,
    play,
    pause,
    setCurrentTime,
    setDuration,
    setVolume,
    toggleShuffle,
    setRepeatMode,
    playNext,
    playPrevious
} = MusicPlayerSlice.actions;

export default MusicPlayerSlice.reducer;