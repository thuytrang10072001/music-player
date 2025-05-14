import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const ArtistApi = createApi({
    reducerPath: 'artistApi',
    tagTypes: ['Artist'],
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.REACT_APP_LOCAL_HOST_API}/api/artist`,
    }),
    endpoints: (builder) => ({
        getListArtist: builder.query({
            query: ({page = 1, limit = 50}) => `?page=${page}&limit=${limit}`,
        })
    }),
})

export const  { useGetListArtistQuery } = ArtistApi
