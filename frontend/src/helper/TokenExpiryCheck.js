import jwt_decode from "jwt-decode"

export const TokenExpiryCheck = () => {

    var token = localStorage.getItem('token');

    var exp = jwt_decode(token).exp;

    let expiry = exp - 120; // Minus 2 minutes off actual expiry

    if(Date.now() >= expiry * 1000) {
        localStorage.clear();
        document.location.href = "/login"
        return true
    }

    console.log('checked...');
}