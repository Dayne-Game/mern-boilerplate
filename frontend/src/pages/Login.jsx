import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { login, reset } from '../features/user/UserSlice'
import Message from '../components/Message'

function Login() {

    const [formData, setFormData] = useState({ email: '', password: '' });

    const { email, password } = formData;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.user);

    useEffect(() => {
        if (isSuccess || user) {
            navigate('/dashboard')
        }

        dispatch(reset);
    }, [user, isError, isSuccess, message, navigate, dispatch])

    const onChange = (e) => {
        setFormData((prevState) => ({ ...prevState, [e.target.name]: e.target.value, }))
    }

    const onSubmit = (event) => {
        event.preventDefault();

        const userData = { email, password }

        dispatch(login(userData));

    }

    return (
        <div className='form-container text-center'>
            <h3 className='mb-3'>Sign in</h3>
            <form onSubmit={onSubmit}>
                { isError && <Message variant="danger">{message}</Message> }
                <div className='form-group mb-3'>
                    <input type="email" className="form-control form-input shadow-none" id="email" name="email" value={email} placeholder='Email address' onChange={onChange}></input>
                </div>
                <div className='form-group mb-3'>
                    <div className='input-group'>
                        <input type="password" className="form-control form-input shadow-none" id="password" name="password" value={password} placeholder='Password' onChange={onChange}></input>
                    </div>
                </div>
                <div className='d-grid mb-3'>
                    <button type="submit" className="btn btn-primary btn-block p-10">{ isLoading ? <i className="fa-solid fa-circle-notch fa-spin loading-btn-size"></i> : "Sign In" }</button>
                </div>
            </form>
            <Link to="/register" className='login-forgot-pw-link'>Sign Up?</Link>
        </div>
    )
}

export default Login