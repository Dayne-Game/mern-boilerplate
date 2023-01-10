import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import UserService from './UserService'
import jwt_decode from "jwt-decode";

let token = localStorage.getItem('token');

const initialState = {
    user: token ? jwt_decode(token) : null,
    token: JSON.parse(token),
    userInfo: '',
    isError: false,
    isSuccess: false,
    isLoading: false,
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

export const details = createAsyncThunk('user/details', async (_, thunkAPI) => {
	try {
		const token = localStorage.getItem('token');
		return await UserService.details(token)
	} catch (error) {
		const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
		return thunkAPI.rejectWithValue(message)
	}
})

export const update = createAsyncThunk('user/update', async (user, thunkAPI) => {
	try {
		const token = thunkAPI.getState().user.token
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

// Logout  
export const logout = createAsyncThunk('user/logout', async () => {
    await UserService.logout()
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
        },
    },
    extraReducers: (builder) => {
    builder
        .addCase(logout.fulfilled, (state) => {
        state.user = null
        })
        .addCase(register.pending, (state) => {
            state.isLoading = true
        })
        .addCase(register.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
        })
        .addCase(register.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.user = null
        })
        .addCase(details.pending, (state) => {
            state.isLoading = true
        })
        .addCase(details.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.userInfo = action.payload
        })
        .addCase(details.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
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
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
        })
        .addCase(login.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.user = null
        })
    },
})

export const { reset } = UserSlice.actions
export default UserSlice.reducer;