// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import MusicPlayerReducer from './MusicPlayerSlice';
import AuthSlice from "./AuthSlice";
import LoadingSlice from "./LoadingSlice";
import { AuthApi } from "../services/AuthApi";
import { AlbumApi } from "../services/AlbumApi";
import { SongApi } from "../services/SongApi";
import { ArtistApi } from "../services/ArtistApi";

export const Store = configureStore({
    reducer: {
        musicPlayer: MusicPlayerReducer,
        loading: LoadingSlice,
        [AuthApi.reducerPath]: AuthApi.reducer,
        auth: AuthSlice,
        [AlbumApi.reducerPath]: AlbumApi.reducer,
        [SongApi.reducerPath]: SongApi.reducer,
        [ArtistApi.reducerPath]: ArtistApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(AuthApi.middleware)
            .concat(AlbumApi.middleware)
            .concat(SongApi.middleware)
            .concat(ArtistApi.middleware),
});
