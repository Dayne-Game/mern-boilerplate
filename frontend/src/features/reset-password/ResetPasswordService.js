import axios from 'axios';

const API_URL = '/api/reset-password/';

const resetPasswordRequest = async (email) => {
	const config = {
		headers: {
			"Content-Type": "application/json",
		},
	};

	const response = await axios.post(API_URL, { email }, config);

	return response.data;
}

const resetPassword = async (reset_data) => {
	const config = {
		headers: {
			"Content-Type": "application/json",
			'Accept': 'application/json'
		},
	};

	const password = reset_data.password;

	const response = await axios.post(`/api/reset-password/${reset_data.id}/${reset_data.resetToken}`, { password }, config);

	return response.data;
}

const ResetPasswordService = { resetPassword, resetPasswordRequest };

export default ResetPasswordService;