import asyncHandler from "express-async-handler";
import GenerateToken from "../utils/GenerateToken.js";
import User from "../models/UserModel.js";

// @DESC    Login User
// @ROUTE   /api/users/login
// @ACCESS  PUBLIC
const Login = asyncHandler(async (req, res) => {
    const {email, password} = req.body;

    // Get User from Database
    const user = await User.findOne({ email });

    if(user && await user.matchPassword(password)) {
        res.json(GenerateToken({ id: user._id, name: user.name, email: user.email }))
    } else {
        res.status(400); throw new Error("Email or Password is Invalid");
    }
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

	const user = await User.create({
		name,
		email,
		password
	})

	res.json(await user.save());
});

// @DESC	Get Logged in User Details
// @ROUTE	/api/users/details
// @ACCESS	PRIVATE
const Current = asyncHandler(async(req, res) => {
	const user = await User.findById(req.user._id);

	if(user) {
		res.json({ id: user._id, name: user.name, email: user.email })
	} else {
		res.status(404); throw new Error('User not Found');
	}
})

// @DESC    Update User
// @ROUTE   /api/users/update/:id
// @ACCESS  PRIVATE
const Update = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id)

	if (user) {
		user.name = req.body.name || user.name
		user.email = req.body.email || user.email
		if (req.body.password) {
			user.password = req.body.password
		}

		const updatedUser = await user.save()

		res.json({
			_id: updatedUser._id,
			name: updatedUser.name,
			email: updatedUser.email,
			token: GenerateToken({ id: updatedUser._id, name: updatedUser.name, email: updatedUser.email }),
		})
	} else {
		res.status(404)
		throw new Error('User not found')
	}
});

// @DESC    Delete User
// @ROUTE   /api/users/delete/:id
// @ACCESS  PRIVATE
const Delete = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);

	if (user) {
		await user.remove()
		res.json({ message: 'User removed' })
	} else {
		res.status(404)
		throw new Error('User not found')
	}
});

export { Login, Register, Current, Update, Delete };