// src/store/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    token: null,
    isAuthenticated: false,
    loading: false,
    error: null,
};

const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginStart(state) {
            state.loading = true;
            state.error = null;
        },
        loginSuccess(state, action) {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = true;
            state.loading = false;
        },
        loginFailure(state, action) {
            state.error = action.payload;
            state.loading = false;
        },
        logout(state) {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
        },
    },
});

export const {
    loginStart,
    loginSuccess,
    loginFailure,
    logout,
} = AuthSlice.actions;

export default AuthSlice.reducer;
