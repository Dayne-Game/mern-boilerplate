import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { useResetPasswordMutation } from '../../features/reset-password/ResetPasswordService';

function PasswordReset() {
	const [password, setPassword] = useState("");
	const [successMessage, setSuccessMessage] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [resetPassword, { isLoading, isSuccess }] = useResetPasswordMutation();

	var { id, resetToken } = useParams();

	const navigate = useNavigate();

	useEffect(() => {
		if(isSuccess) {
			setSuccessMessage('Password has been reset')
			navigate('/login');
		}
	}, [isSuccess])

	useEffect(() => {
		setErrorMessage('')
	}, [ password ])

	const onSubmit = async (e) => {
		e.preventDefault();

		try {
			await resetPassword({ id, resetToken, password }).unwrap()
		} catch (error) {
			switch(error?.status) {
				case 400:
				case 401:
					setErrorMessage("Problem with Reseting Password")
					break;
				default:
					setErrorMessage('No Server Response')
					break;
			}
		}
	}

	const handlePasswordInput = e => setPassword(e.target.value)

	return (
		<div className="form-container text-center">
			<h3 className='mb-3'>Forgotten Password?</h3>
			{successMessage &&  <div className='alert alert-success' role="alert">{successMessage}</div>}
			{errorMessage &&  <div className='alert alert-danger' role="alert">{errorMessage}</div>}
			<form onSubmit={onSubmit}>
				<div className='form-group mb-3'>
					<input type="password" className="form-control form-input shadow-none" id="password" name="password" value={password} placeholder='Password' onChange={handlePasswordInput}></input>
				</div>
				<div className='d-grid mb-3'>
                    <button type="submit" className="btn btn-primary btn-block p-10">{ isLoading ? <i className="fa-solid fa-circle-notch fa-spin loading-btn-size"></i> : "Reset Password" }</button>
                </div>
			</form>
		</div>
	)
}

export default PasswordReset