import jwt_decode from "jwt-decode";

export const DecodeToken = (token) => {
    return jwt_decode(token);
}