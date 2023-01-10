import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { register, reset } from '../features/user/UserSlice'
import { toast } from 'react-toastify'

function Register() {

    const [formData, setFormData] = useState({ name: '', email: '', password: '', password2: '' });

    const { name, email, password, password2 } = formData;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.user);

    useEffect(() => {

        if(isError) {
            toast.error(message);
        }

        if (isSuccess || user) {
            navigate('/dashboard')
        }

        dispatch(reset());
    }, [user, isError, isSuccess, message, navigate, dispatch])

    const onChange = (e) => {
        setFormData((prevState) => ({ ...prevState, [e.target.name]: e.target.value, }))
    }

    const onSubmit = (event) => {
        event.preventDefault();

        if(password !== password2) {
            toast.error("Passwords Do not match");
        } else {
            const userData = { name, email, password }
            dispatch(register(userData));
        }
    }

    return (
        <div className='form-container text-center'>
            <h3 className='mb-3'>Sign up</h3>
            <form onSubmit={onSubmit}>
                <div className='form-group mb-3'>
                    <input type="text" className="form-control form-input shadow-none" id="name" name="name" value={name} placeholder='Name' onChange={onChange}></input>
                </div>
                <div className='form-group mb-3'>
                    <input type="email" className="form-control form-input shadow-none" id="email" name="email" value={email} placeholder='Email address' onChange={onChange}></input>
                </div>
                <div className='form-group mb-3'>
                    <div className='input-group'>
                        <input type="password" className="form-control form-input shadow-none" id="password" name="password" value={password} placeholder='Password' onChange={onChange}></input>
                    </div>
                </div>
                <div className='form-group mb-3'>
                    <div className='input-group'>
                        <input type="password" className="form-control form-input shadow-none" id="password2" name="password2" value={password2} placeholder='Confirm Password' onChange={onChange}></input>
                    </div>
                </div>
                <div className='d-grid mb-3'>
                    <button type="submit" className="btn btn-primary btn-block p-10">{ isLoading ? <i className="fa-solid fa-circle-notch fa-spin loading-btn-size"></i> : "Sign Up" }</button>
                </div>
            </form>
            <a href="#" className='login-forgot-pw-link'>Forgot your password?</a>
        </div>
    )
}

export default Register