import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const AlbumApi = createApi({
    reducerPath: 'albumApi',
    tagTypes: ['Album'],
    baseQuery: fetchBaseQuery({
        baseUrl: '/api/album',
    }),
    endpoints: (builder) => ({
        getList: builder.query({
            query: () => "/",
        }),
        show: builder.mutation({
            query: (albumId) => ({
                url: `/${albumId}`,
                method: 'GET',
            }),
        }),
    }),
})

export const  { useGetListQuery } = AlbumApi
