// src/store/musicPlayerSlice.js
import { createSlice } from '@reduxjs/toolkit';
import partySNSD from "../assets/images/snsd/party.jpg";

interface Song {
    id: number;
    name: string;
    artist: string;
    img: any;
    audio: string;
    file_src: string;
}

interface MusicPlayerState {
    playlist: Song[];
    currentSong: Song |  {
        id: "12345",
        name: "Into the new word",
        artist: "SNSD",
        img: typeof  partySNSD,
        audio: `/storage/songs/Girls' Generation 소녀시대 'Lion Heart' MV.mp3`,
        file_src: "https://open.spotify.com/embed/track/1RTW9UthqmZwr8Od6CH4i8?utm_source=generator"
    };
    isShuffle: boolean,
    isPlaying: boolean,
    currentTime: number,
    volume: number,
    repeatMode: string
}

const initialState: MusicPlayerState = {
    currentSong:  {
        id: "12345",
        name: "Into the new word",
        artist: "SNSD",
        img: partySNSD,
        audio: `/storage/songs/Girls' Generation 소녀시대 'Lion Heart' MV.mp3`,
        file_src: "https://open.spotify.com/embed/track/1RTW9UthqmZwr8Od6CH4i8?utm_source=generator"
    },
    playlist: [],
    isPlaying: false,
    currentTime: 0,
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
        },
        setPlaylist(state, action) {
            state.playlist = action.payload;
        },
        togglePlay(state) {
            state.isPlaying = !state.isPlaying;
        },
        pause(state) {
            state.isPlaying = false;
        },
        play(state) {
            state.isPlaying = true;
        },
        setCurrentTime(state, action) {
            state.currentTime = action.payload;
        },
        setVolume(state, action) {
            state.volume = action.payload;
        },
        toggleShuffle(state) {
            state.isShuffle = !state.isShuffle;
        },
        setRepeatMode(state, action) {
            state.repeatMode = action.payload; // 'off', 'one', 'all'
        },
        playNext(state) {
            const currentIndex = state.playlist.findIndex(song => song.id === state.currentSong?.id);
            let nextIndex = currentIndex + 1;

            if (state.isShuffle) {
                nextIndex = Math.floor(Math.random() * state.playlist.length);
            }

            if (nextIndex >= state.playlist.length) {
                if (state.repeatMode === 'all') nextIndex = 0;
                else {
                    state.isPlaying = false;
                    return;
                }
            }

            state.currentSong = state.playlist[nextIndex];
            state.currentTime = 0;
        },
        playPrevious(state) {
            const currentIndex = state.playlist.findIndex(song => song.id === state.currentSong?.id);
            let prevIndex = currentIndex - 1;

            if (prevIndex < 0) {
                if (state.repeatMode === 'all') prevIndex = state.playlist.length - 1;
                else return;
            }

            state.currentSong = state.playlist[prevIndex];
            state.currentTime = 0;
        },
    }
});

export const {
    setCurrentSong,
    setPlaylist,
    togglePlay,
    play,
    pause,
    setCurrentTime,
    setVolume,
    toggleShuffle,
    setRepeatMode,
    playNext,
    playPrevious
} = MusicPlayerSlice.actions;

export default MusicPlayerSlice.reducer;
