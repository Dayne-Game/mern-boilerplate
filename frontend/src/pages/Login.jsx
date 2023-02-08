import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { login, reset } from '../features/user/UserSlice'
import { toast } from 'react-toastify'

import { setCredentials } from '../features/auth/AuthSlice'
import { useLoginMutation } from '../features/auth/AuthService'
import { setUseProxies } from 'immer'

function Login() {

    const [formData, setFormData] = useState({ email: '', password: '' });

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errMsg, setErrMsg] = useState('')

    const [login, { isLoading }] = useLoginMutation()

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        setErrMsg('')
    }, [email, password])

    const onChange = (e) => {
        setFormData((prevState) => ({ ...prevState, [e.target.name]: e.target.value, }))
    }

    const onSubmit = (event) => {
        event.preventDefault();
        const userData = { email, password }

        dispatch(login(userData));
    }

    const handleSubmit = async e => {
        e.preventDefault();

        try {
            const userData = await login({ email, password }).unwrap()

            dispatch(setCredentials({ ...userData, email }))
            setEmail('')
            setPassword('')

            navigate('/dashboard')
        } catch (error) {
            switch(error?.status) {
                case 400:
                case 401:
                    setErrMsg('Invalid email or password')
                    break;
                default:
                    setErrMsg('No Server Response')
            }
        }
    }

    const handleUserInput = e => setEmail(e.target.value)
    const handlePasswordInput = e => setPassword(e.target.value)

    return (
        <div className='form-container text-center'>
            <h3 className='mb-3'>Sign in</h3>
            <form onSubmit={onSubmit}>
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
            <Link to="/request-password-reset" className='login-forgot-pw-link'>Forgot Password?</Link>
        </div>
    )
}

export default Login