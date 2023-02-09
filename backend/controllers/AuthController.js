import jwt from "jsonwebtoken";
import User from '../models/UserModel.js';
import asyncHandler from "express-async-handler";

const accessTokenExpiry = 1 // minutes
const refreshTokenExpiry = 12 // hours

const refresh = (req, res) => {

    const refreshToken = req.cookies.jwt
    
    jwt.verify(
        refreshToken, 
        process.env.REFRESH_TOKEN_KEY,
        asyncHandler(async (err, decoded) => {

            // Requires another login
            if(err && decoded) return res.status(401).json({ message: 'Invalid Credentials' })

            // Invalid token
            if(err && !decoded) return res.status(403).clearCookie('jwt').json({ message: 'Forbidden' });

            // Check user and tokenID is still active
            const user = await User.findOne({ email: decoded.email }).exec()
            if (!user || decoded.tokenId != user.tokenId)
                return res.status(403).clearCookie('jwt').message('Forbidden')

            // Success
            const accessToken = jwt.sign( { email: user.email }, process.env.ACCESS_TOKEN_KEY, { expiresIn: `${accessTokenExpiry}m` })
            res.json({ accessToken, user: { name: user.name, email: user.email, image: user.image }})
        })
    )
}

const logout = (req, res) => {
    res.clearCookie('jwt').json({ message: 'Cookie Cleared' });
}

export { refresh, logout };