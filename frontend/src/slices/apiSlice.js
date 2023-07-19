import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({ baseUrl: '' })

export const apiSlice = createApi({
  baseQuery,
  endpoints: builder => ({
    hostRoom: builder.mutation({
      query: data => ({
        url: '/api/host',
        method: 'POST',
        body: data,
      }),
    }),
    joinRoom: builder.mutation({
      query: data => ({
        url: '/api/join',
        method: 'POST',
        body: data,
      }),
    }),
    leaveRoom: builder.mutation({
      query: data => ({
        url: '/api/leave',
        method: 'POST',
        body: data,
      }),
    }),
    getData: builder.mutation({
      query: data => ({
        url: '/api/getdata',
        method: 'POST',
        body: data,
      }),
    }),
    genRoom: builder.mutation({
      query: () => ({
        url: '/api/roomname',
        method: 'GET',
      })
    })
  }),
})

export const {
  useHostRoomMutation,
  useJoinRoomMutation,
  useLeaveRoomMutation,
  useGetDataMutation,
  useGenRoomMutation,
} = apiSlice
