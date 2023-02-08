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
          const { email } = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
            if(err || !decoded.email) {
              res.status(403); 
              throw new Error('Forbidden');
            } 

            req.user = await User.findOne({ email }).select("-password");

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