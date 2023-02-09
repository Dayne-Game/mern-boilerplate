import { apiSlice } from "../../app/api/ApiSlice"

export const AuthService = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
                url: '/api/users/login',
                method: 'POST',
                body: { ...credentials }
            })
        }),
        register: builder.mutation({
            query: credentials => ({
                url: '/api/users/register',
                method: 'POST',
                body: { ...credentials }
            })
        }),
        refreshToken: builder.mutation({
            query: () => ({
                url: '/api/auth/refresh',
                method: 'GET'
            })
        }),
        logout: builder.mutation({
            query: () => ({
                url: '/api/auth/logout',
                method: 'GET'
            })
        })
    })
})

export const { useLoginMutation, useRegisterMutation, useRefreshTokenMutation, useLogoutMutation } = AuthService