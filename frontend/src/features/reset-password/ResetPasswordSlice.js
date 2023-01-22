import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import ResetPasswordService from "./ResetPasswordService";

const initialState = {
	pwreset: null,
	isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

export const resetPasswordRequest = createAsyncThunk('passwordreset/request', async (email, thunkAPI) => {
	try {
		return await ResetPasswordService.resetPasswordRequest(email);
	} catch (error) {
		const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
		return thunkAPI.rejectWithValue(message)
	}
})

export const resetPassword = createAsyncThunk('passwordreset/reset', async (reset_data, thunkAPI) => {
	try {
		return await ResetPasswordService.resetPassword(reset_data);
	} catch (error) {
		const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
		return thunkAPI.rejectWithValue(message)
	}
});

export const ResetPasswordSlice = createSlice({
	name: 'passwordreset',
	initialState,
	reducers: {
		reset: (state) => {
			state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message = ''
			state.pwreset = null
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(resetPasswordRequest.pending, (state) => {
				state.isLoading = true
			})
			.addCase(resetPasswordRequest.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.pwreset = action.payload
			})
			.addCase(resetPasswordRequest.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload
			})
			.addCase(resetPassword.pending, (state) => {
				state.isLoading = true
			})
			.addCase(resetPassword.fulfilled, (state, action) => {
				state.isLoading = false
				state.isSuccess = true
				state.pwreset = action.payload
			})
			.addCase(resetPassword.rejected, (state, action) => {
				state.isLoading = false
				state.isError = true
				state.message = action.payload
			})
	}
})

export const { reset } = ResetPasswordSlice.actions
export default ResetPasswordSlice.reducer