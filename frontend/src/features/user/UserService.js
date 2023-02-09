import { apiSlice } from "../../app/api/ApiSlice";

export const UserService = apiSlice.injectEndpoints({
	endpoints: builder => ({
		updateUser: builder.mutation({
			query: credentials => ({
				url: '/api/users/update',
				method: 'PUT',
				body: { ...credentials }
			})
		})
	})
})

export const { useUpdateUserMutation } = UserService