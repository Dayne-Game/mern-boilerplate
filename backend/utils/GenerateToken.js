import jwt from "jsonwebtoken";
import User from '../models/UserModel.js';
import asyncHandler from "express-async-handler";

const CheckRefreshToken = (refreshToken) => {
	jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY, asyncHandler(async (err, decoded) => {
		// Requires another login
		if(err) {
			clearCookie('jwt').send();
			return false;
		}

		return true
	}))
}

export default CheckRefreshToken;