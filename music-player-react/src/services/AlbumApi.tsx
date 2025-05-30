import {BaseQueryArg, createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

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
        show: builder.query({
            query: (albumId) => ({
                url: `/${albumId}`,
                method: 'GET',
            }),
        }),
        related: builder.query({
            query: ({id, page = 1, limit = 50}) => ({
                url: `/${id}/related?page=${page}&limit=${limit}`,
                method: 'GET'
            })
        })
    }),
})

export const  { useGetListQuery, useShowQuery, useRelatedQuery } = AlbumApi
