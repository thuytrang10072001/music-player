import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const SongApi = createApi({
    reducerPath: 'songApi',
    tagTypes: ['Song'],
    baseQuery: fetchBaseQuery({
        baseUrl: `/api/song`,
    }),
    endpoints: (builder) => ({
        getListSong: builder.query({
            query: ({page = 1, limit = 50}) =>`?page=${page}&limit=${limit}`,
        })
    }),
})

export const  { useGetListSongQuery } = SongApi
