import { apiSlice } from '../../app/api/ApiSlice';

export const ResetPasswordService = apiSlice.injectEndpoints({
	endpoints: builder => ({
		resetPasswordRequest: builder.mutation({
			query: email => ({
				url: '/api/reset-password',
				method: 'POST',
				body: { email }
			})
		}),
		resetPassword: builder.mutation({
			query: reset_data => ({
				url: `/api/reset-password/${reset_data.id}/${reset_data.resetToken}`,
				method: 'POST',
				body: { reset_data }
			})
		})
	})
})

export const { useResetPasswordRequestMutation, useResetPasswordMutation } = ResetPasswordService