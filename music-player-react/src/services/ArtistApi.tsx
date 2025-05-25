import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const ArtistApi = createApi({
    reducerPath: 'artistApi',
    tagTypes: ['Artist'],
    baseQuery: fetchBaseQuery({
        baseUrl: `/api/artist`,
    }),
    endpoints: (builder) => ({
        getListArtist: builder.query({
            query: ({page = 1, limit = 50}) => `?page=${page}&limit=${limit}`,
        }),
        getArtistById: builder.query({
            query: ({id, page = 1, limit = 50}) => ({
                url: `/${id}/related?page=${page}&limit=${limit}`,
                method: 'GET'
            })
        })
    }),
})

export const  { useGetListArtistQuery, useGetArtistByIdQuery } = ArtistApi
