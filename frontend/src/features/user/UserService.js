import axios from 'axios';
import { CheckQueryStatus } from "../../helper/QueryChecker.js";
import { DecodeToken } from '../../helper/DecodeToken';

const API_URL = '/api/users/';

// Login User
const login = async (user_data) => {

    const response = await axios.post(API_URL + 'login', user_data)

	const token = JSON.stringify(response.data.accessToken);

	console.log(response);  
    
    return response.data;
};

const register = async (user_data) => {
	const response = await axios.post(API_URL + 'register', user_data);

	if(response.data) {
		localStorage.setItem('token', JSON.stringify(response.data));
	}

	return DecodeToken(response.data);
};

const refreshToken = async (token) => {

	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	}

	const response = await axios.get('/api/auth/refresh', config);

	return response.data;
}

const update = async (user_data, token) => {

	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	}

	const response = await axios.put(API_URL + 'update', user_data, config);

	if(response.data) {
		localStorage.setItem('token', JSON.stringify(response.data));
	}

	return DecodeToken(response.data);
};

const delete_user = async (token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	}

	const response = await axios.delete(API_URL + 'delete', config)

	return response.data
};

// Logout User
const logout = async (token) => {
    const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	}

	const response = await axios.get('/api/auth/logout', config);

	return response.data;
};

const UserService = {
    login, register, refreshToken, update, delete_user, logout,
}       

export default UserService;