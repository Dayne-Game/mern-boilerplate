import { apiSlice } from '../../app/api/ApiSlice';

export const ResetPasswordService = apiSlice.injectEndpoints({
	endpoints: builder => ({
		resetPasswordRequest: builder.mutation({
			query: data => ({
				url: '/api/reset-password',
				method: 'POST',
				body: { data }
			})
		}),
		resetPassword: builder.mutation({
			query: data => ({
				url: `/api/reset-password/${data.id}/${data.resetToken}`,
				method: 'POST',
				body: { data }
			})
		})
	})
})

export const { useResetPasswordRequestMutation, useResetPasswordMutation } = ResetPasswordService