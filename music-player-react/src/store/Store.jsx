// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import MusicPlayerReducer from './MusicPlayerSlice';
import AuthSlice from "./AuthSlice";

export const Store = configureStore({
    reducer: {
        musicPlayer: MusicPlayerReducer,
        auth: AuthSlice
    },
});
