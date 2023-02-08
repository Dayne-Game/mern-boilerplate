import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import UserService from './UserService'

const initialState = {
    user: null,
    token: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    isLoggingOut: false,
    message: '',
}

// Login user
export const login = createAsyncThunk('user/login', async (user, thunkAPI) => {
    try {
      return await UserService.login(user)
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
    }
})

export const register = createAsyncThunk('user/register', async (user, thunkAPI) => {
	try {
		return await UserService.register(user);
	} catch (error) {
		const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
	}
})

export const update = createAsyncThunk('user/update', async (user, thunkAPI) => {
	try {
		const token = JSON.parse(localStorage.getItem('token'));
		return await UserService.update(user, token);
	} catch (error) {
		const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
      	return thunkAPI.rejectWithValue(message)
	}
})

export const delete_user = createAsyncThunk('user/delete', async (_, thunkAPI) => {
	try {
		const token = thunkAPI.getState().user.token
		return await UserService.delete_user(token)
	} catch (error) {
		const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
		return thunkAPI.rejectWithValue(message)
	}
})

export const refreshToken = createAsyncThunk('user/refreshToken', async (_, thunkAPI) => {
	try {
		const token = thunkAPI.getState().user.token;
		return await UserService.refreshToken(token);
	} catch (error) {
		const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
      	return thunkAPI.rejectWithValue(message)
	}
})

// Logout  
export const logout = createAsyncThunk('user/logout', async (_, thunkAPI) => {
    const token = thunkAPI.getState().user.token;
    await UserService.logout(token)
})

export const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message = ''
            state.isLoggingOut = false
        },
    },
    extraReducers: (builder) => {
    builder
        .addCase(logout.fulfilled, (state) => {
            state.user = null
            state.token = null
            state.isLoggingOut = true
        })
        .addCase(register.pending, (state) => {
            state.isLoading = true
        })
        .addCase(register.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
            state.isLoggingOut = false
        })
        .addCase(register.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.user = null
        })
        .addCase(update.pending, (state) => {
            state.isLoading = true
        })
        .addCase(update.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
        })
        .addCase(update.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(delete_user.pending, (state) => {
            state.isLoading = true
        })	
        .addCase(delete_user.fulfilled, (state) => {
            state.isLoading = false
            state.isSuccess = true
        })
        .addCase(delete_user.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(login.pending, (state) => {
            state.isLoading = true
        })
        .addCase(login.fulfilled, (state, action) => {

            const { user, accessToken } = action.payload;

            state.user = user
            state.token = accessToken
            state.isLoading = false
            state.isSuccess = true
            state.isLoggingOut = false
        })
        .addCase(login.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.user = null
            state.token = null
        })
        .addCase(refreshToken.pending, (state) => {
            state.isLoading = true
        })
        .addCase(refreshToken.fulfilled, (state, action) => {

            const { user, accessToken } = action.payload;

            state.user = user
            state.token = accessToken
            state.isLoading = false
            state.isSuccess = true
        })
        .addCase(refreshToken.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.user = null
            state.token = null
        })
    },
})

export const { reset } = UserSlice.actions
export default UserSlice.reducer;