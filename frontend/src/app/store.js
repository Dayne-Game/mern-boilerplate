import { configureStore } from '@reduxjs/toolkit'
import UserReducer from "../features/user/UserSlice";
import PasswordResetReducer from "../features/reset-password/ResetPasswordSlice";

export const store = configureStore({
    reducer: {
        user: UserReducer,
		resetPassword: PasswordResetReducer
    }
})