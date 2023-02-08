import asyncHandler from "express-async-handler";
import GenerateToken from "../utils/GenerateToken.js";
import User from "../models/UserModel.js";
import { v4 as uuid } from "uuid"
import jwt from "jsonwebtoken";

const accessTokenExpiry = 1 // minutes
const refreshTokenExpiry = 12 // hours

const refreshTokenOptions = {
    httpOnly: true,
	path: '/',
    secure: process.env.NODE_ENV != 'development',
    sameSite: 'Lax',
    maxAge: refreshTokenExpiry * 60 * 60 * 1000
}

// @DESC    Login User
// @ROUTE   /api/users/login
// @ACCESS  PUBLIC
const Login = asyncHandler(async (req, res) => {
    const {email, password} = req.body;

    // Get User from Database
    const user = await User.findOne({ email });

	if(!user || !await user.matchPassword(password)) {
		res.status(400); throw new Error("Invalid Login Attempt");
	}

	user.tokenId = uuid();

	await user.save();

	const accessToken = jwt.sign({ email: user.email }, process.env.ACCESS_TOKEN_KEY, { expiresIn: `${accessTokenExpiry}m` })
	const refreshToken = jwt.sign({ email: user.email, tokenId: user.tokenId }, process.env.REFRESH_TOKEN_KEY, { expiresIn: `${refreshTokenExpiry}h` })

	res.cookie('jwt', refreshToken, refreshTokenOptions);

	res.json({ accessToken, user: { email: user.email, name: user.name, image: user.image } })
});

// @DESC    Register User
// @ROUTE   /api/users/register
// @ACCESS  PUBLIC
const Register = asyncHandler(async(req, res) => {
    const { name, email, password } = req.body;

    if(!name, !email, !password) {
        res.status(400); throw new Error("Invalid Data - Check Fields");
    }

    // Check if user exists
    const checkUser = await User.findOne({ email });

    if(checkUser) {
        res.status(400); throw new Error("This user already exists");
    }

	const new_user = await User.create({
		name,
		email,
		password
	})

	const user = await new_user.save();

	res.json(GenerateToken({ name: user.name, email: user.email, image: user.image }));
});

// @DESC	Get Logged in User Details
// @ROUTE	/api/users/details
// @ACCESS	PRIVATE
const Current = asyncHandler(async(req, res) => {
	const user = await User.findById(req.user._id);

	if(user) {
		res.json({ id: user._id, name: user.name, email: user.email, image: user.image })
	} else {
		res.status(404); throw new Error('User not Found');
	}
})

// @DESC    Update User
// @ROUTE   /api/users/update/
// @ACCESS  PRIVATE
const Update = asyncHandler(async (req, res) => {
	const user = await User.findOne({ email: req.user.email });

	if (user) {

		if(user.email !== req.body.email) {
			let email = req.body.email;

			const checkUser = await User.findOne({ email });

			if (checkUser) {
				res.status(400); throw new Error("This email is already in use");
			}
		}

		user.name = req.body.name || user.name
		user.email = req.body.email || user.email
		user.image = req.body.image || user.image
		if (req.body.password) {
			user.password = req.body.password
		}

		const updatedUser = await user.save()

		res.json(GenerateToken({ name: updatedUser.name, image: updatedUser.image, email: updatedUser.email }));
	} else {
		res.status(404)
		throw new Error('User not found')
	}
});

// @DESC    Delete User
// @ROUTE   /api/users/delete/:id
// @ACCESS  PRIVATE
const Delete = asyncHandler(async (req, res) => {
	const user = await User.findOne({ email: req.user.email });

	if (user) {
		await user.remove()
		res.json({ message: 'User removed' })
	} else {
		res.status(404)
		throw new Error('User not found')
	}
});

export { Login, Register, Current, Update, Delete };