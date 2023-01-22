import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { reset, resetPassword } from "../../features/reset-password/ResetPasswordSlice";

function PasswordReset() {
	const [password, setPassword] = useState("");

	var { id, resetToken } = useParams();


	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { isLoading, isError, isSuccess, message } = useSelector((state) => state.resetPassword);

	useEffect(() => {

		if(isError) {
			toast.error(message);
			dispatch(reset())
		}

		if(isSuccess) {
			toast.success("Password has been Reset");
			navigate('/login');
			dispatch(reset());
		}
	}, [ isSuccess, isError, message, dispatch, navigate ])

	const onSubmit = (e) => {
		e.preventDefault();
		dispatch(resetPassword({id, resetToken, password}));
	}

	return (
		<div className="form-container text-center">
			<h3 className='mb-3'>Forgotten Password?</h3>
			<form onSubmit={onSubmit}>
				<div className='form-group mb-3'>
					<input type="password" className="form-control form-input shadow-none" id="password" name="password" value={password} placeholder='Password' onChange={(e) => setPassword(e.target.value)}></input>
				</div>
				<div className='d-grid mb-3'>
                    <button type="submit" className="btn btn-primary btn-block p-10">{ isLoading ? <i className="fa-solid fa-circle-notch fa-spin loading-btn-size"></i> : "Reset Password" }</button>
                </div>
			</form>
		</div>
	)
}

export default PasswordReset