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
        res.json(GenerateToken({ id: user.id, name: user.name, email: user.email }))
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
});

// @DESC    Update User
// @ROUTE   /api/users/update/:id
// @ACCESS  PRIVATE
const Update = asyncHandler(async (req, res) => {});

// @DESC    Delete User
// @ROUTE   /api/users/delete/:id
// @ACCESS  PRIVATE
const Delete = asyncHandler(async (req, res) => {});

export { Login, Register, Update, Delete };