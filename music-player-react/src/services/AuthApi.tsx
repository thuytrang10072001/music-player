import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getItem } from "../utils/helper";

export const AuthApi = createApi({
    reducerPath: 'authApi',
    tagTypes: ['User'],
    baseQuery: fetchBaseQuery({
        baseUrl: '/api/auth/', // <-- gọi qua Nginx route
        // prepareHeaders: (headers) => {
        //     const token = localStorage.getItem('token')
        //     if (token) {
        //         headers.set('Authorization', `Bearer ${token}`)
        //     }
        //     return headers
        // },
    }),
    endpoints: (builder) => ({
        googleLogin: builder.mutation({
            query: (user) => ({
                url: 'social-login',
                method: 'POST',
                body: user,
            }),
        }),
        login: builder.mutation({
            query: (user) => ({
                url: 'login',
                method: 'POST',
                body: user,
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: 'logout',
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${getItem('token')}`
                },
            }),
        }),
        register: builder.mutation({
            query: (user) => ({
                url: 'register',
                method: 'POST',
                body: user
            }),
        })
    }),
})

export const  { useGoogleLoginMutation, useLoginMutation ,
    useLogoutMutation, useRegisterMutation } = AuthApi
