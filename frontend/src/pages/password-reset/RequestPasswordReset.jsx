import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { reset, resetPasswordRequest } from "../../features/reset-password/ResetPasswordSlice";

function RequestPasswordReset() {
	const [email, setEmail] = useState("");
	const [successMessage, setSuccessMessage] = useState("");

	const dispatch = useDispatch();

	const { isLoading, isError, isSuccess, message } = useSelector((state) => state.resetPassword);

	useEffect(() => {

		if(isError) {
			toast.error(message);
			dispatch(reset())
		}

		if(isSuccess) {
			setSuccessMessage("Password reset link sent to your email account");
			dispatch(reset());
		}
	}, [ isSuccess, isError, message, dispatch ])

	const onSubmit = (e) => {
		e.preventDefault();
		dispatch(resetPasswordRequest(email));
	}

	return (
		<div className="form-container text-center">
			<h3 className='mb-3'>Forgotten Password?</h3>
			{successMessage &&  <div className='alert alert-success' role="alert">{successMessage}</div>}
			<form onSubmit={onSubmit}>
				<div className='form-group mb-3'>
					<input type="email" className="form-control form-input shadow-none" id="email" name="email" value={email} placeholder='Email address' onChange={(e) => setEmail(e.target.value)}></input>
				</div>
				<div className='d-grid mb-3'>
                    <button type="submit" className="btn btn-primary btn-block p-10">{ isLoading ? <i className="fa-solid fa-circle-notch fa-spin loading-btn-size"></i> : "Reset Password" }</button>
                </div>
			</form>
		</div>
	)
}

export default RequestPasswordReset