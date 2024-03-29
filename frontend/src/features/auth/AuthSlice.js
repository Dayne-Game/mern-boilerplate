import { createSlice } from "@reduxjs/toolkit";

const AuthSlice = createSlice({
    name: 'auth',
    initialState: { user: null, token: null },
    reducers: {
        setCredentials: (state, action) => {
            const { accessToken, user} = action.payload

            state.user = user
            state.token = accessToken
			state.isLoggingOut = false
        },
        logout: (state, action) => {
            state.user = null
            state.token = null
			state.isLoggingOut = true
        }
    }
})

export const { setCredentials, logout } = AuthSlice.actions

export default AuthSlice.reducer

export const selectCurrentUser = (state) => state.auth.user
export const selectCurrentToken = (state) => state.auth.token