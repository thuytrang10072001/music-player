import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const AlbumApi = createApi({
    reducerPath: 'albumApi',
    tagTypes: ['Album'],
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.REACT_APP_LOCAL_HOST_API}/api/album`,
    }),
    endpoints: (builder) => ({
        getList: builder.query({
            query: ({page = 1, limit = 50}) => `?page=${page}&limit=${limit}`,
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
