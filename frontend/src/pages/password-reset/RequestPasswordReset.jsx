import { useEffect, useState } from 'react'
import { useResetPasswordRequestMutation } from '../../features/reset-password/ResetPasswordService';

function RequestPasswordReset() {
	const [email, setEmail] = useState("");
	const [successMessage, setSuccessMessage] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [resetPasswordRequest, { isLoading, isSuccess }] = useResetPasswordRequestMutation();

	useEffect(() => {
		if(isSuccess) {
			setSuccessMessage("Password reset link sent to your email account");
		}
	}, [isSuccess])

	useEffect(() => {
		setErrorMessage('')
	}, [ email ])

	const onSubmit = async (e) => {
		e.preventDefault();
		
		try {
			await resetPasswordRequest({ email }).unwrap()
		} catch (error) {
			switch(error?.status) {
				case 400:
				case 401:
					setErrorMessage("User with given email doesn't exist")
					break;
				default:
					setErrorMessage('No Server Response')
					break;
			}
		}
	}

	const handleEmailInput = e => setEmail(e.target.value)

	return (
		<div className="form-container text-center">
			<h3 className='mb-3'>Forgotten Password?</h3>
			{successMessage &&  <div className='alert alert-success' role="alert">{successMessage}</div>}
			{errorMessage &&  <div className='alert alert-danger' role="alert">{errorMessage}</div>}
			<form onSubmit={onSubmit}>
				<div className='form-group mb-3'>
					<input type="email" className="form-control form-input shadow-none" id="email" name="email" value={email} placeholder='Email address' onChange={handleEmailInput}></input>
				</div>
				<div className='d-grid mb-3'>
                    <button type="submit" className="btn btn-primary btn-block p-10">{ isLoading ? <i className="fa-solid fa-circle-notch fa-spin loading-btn-size"></i> : "Reset Password" }</button>
                </div>
			</form>
		</div>
	)
}

export default RequestPasswordReset