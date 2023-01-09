import jwt_decode from "jwt_decode";

export const TokenExpiryCheck = () => {
    let token = localStorage.getItem('token');

    let expiry = jwt_decode(token).exp - 120; // Minus 2 minutes off actual expiry

    if(Date.now() >= expiry * 1000) {
        localStorage.clear();
        document.location.href = "/login";
        return true;
    }
}