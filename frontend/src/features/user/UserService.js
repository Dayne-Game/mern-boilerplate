import axios from 'axios';
import { DecodeToken } from '../../helper/DecodeToken';

const API_URL = '/api/users/';

const login = async (user_data) => {
	const response = await axios.post(API_URL + 'login', user_data);

	if(response.data) {
		localStorage.setItem('token', JSON.stringify(response.data));
	}

	return DecodeToken(response.data);
};

const register = async (user_data) => {
	const response = await axios.post(API_URL + 'register', user_data);

	if(response.data) {
		localStorage.setItem('token', JSON.stringify(response.data));
	}

	return DecodeToken(response.data);
};

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

const details = async (token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	}

	const response = await axios.get(API_URL + 'details', config)

	return response.data
};

const logout = async () => {
	localStorage.clear();
};

const userService = { login, register, update, delete_user, details, logout };

export default userService;