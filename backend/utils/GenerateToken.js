import jwt from "jsonwebtoken";

const GenerateToken = (user_data) => {
    return jwt.sign(user_data, process.env.JWT_SECRET, {expiresIn: "1d"});
}

export default GenerateToken;