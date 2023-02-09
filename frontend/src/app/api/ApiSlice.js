import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setCredentials, logout } from '../../features/auth/AuthSlice';

const baseQuery = fetchBaseQuery({
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {

        const token = getState().auth.token
        if(token) headers.set('authorization', `Bearer: ${token}`);

        return headers
    }
})

const baseQueryWrapper = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)

    switch(result?.error?.status) {
        // Forbidden
        case 401:
            api.dispatch(logout())
            break

        // Too many requests
        case 429:
            
            break

        // Unauthorized
        case 403:
            const refreshResult = await baseQuery('api/auth/refresh', api, extraOptions)
            if (refreshResult?.data) {
                api.dispatch(setCredentials(refreshResult?.data))
                result = await baseQuery(args, api, extraOptions)
            }
            break
        default:
            break
    }

    return result
}

export const apiSlice = createApi({
    baseQuery: baseQueryWrapper,
    endpoints: builder => ({})
})