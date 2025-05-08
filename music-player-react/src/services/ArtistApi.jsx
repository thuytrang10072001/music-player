import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const ArtistApi = createApi({
    reducerPath: 'artistApi',
    tagTypes: ['Artist'],
    baseQuery: fetchBaseQuery({
        baseUrl: '/api/artist',
    }),
    endpoints: (builder) => ({
        getListArtist: builder.query({
            query: () => "/",
        })
    }),
})

export const  { useGetListArtistQuery } = ArtistApi
