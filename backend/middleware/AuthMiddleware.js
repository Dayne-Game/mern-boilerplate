import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/UserModel.js";

const protect = asyncHandler(async (req, res, next) => {
    let token;
    
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
          // Grab token from auth header
          token = req.headers.authorization.split(" ")[1];

          // Verify the decrypted token
          jwt.verify(token, process.env.ACCESS_TOKEN_KEY, async (err, decoded) => {
			
			if(err || !decoded) {
              return res.status(403).json({ message: 'FORBIDDEN' });
            } 

			jwt.verify(req.cookies.jwt, process.env.REFRESH_TOKEN_KEY, asyncHandler(async (err) => {
				// Requires another login
				if(err) {
					return res.status(401).clearCookie('jwt');
				}
			}))

			req.user = await User.findOne({ email: decoded.email }).select("-password");
			next();
          });
        } catch (error) {
          console.error(error);
          res.status(401);
          throw new Error("Unauthorized");
        }
    }
})

const jwtCookieeRequired = (req, res, next) => {
  const cookies = req.cookies

  if(!cookies?.jwt) {
    res.status(401); 
    throw new Error('Unauthorized');
  }

  next();
}

export { protect, jwtCookieeRequired };