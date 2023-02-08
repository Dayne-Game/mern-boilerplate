import { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { refreshToken, logout, reset } from '../features/user/UserSlice'

const PersistentLogin = () => {
    const dispatch = useDispatch();
    const { token, isLoggingOut } = useSelector((state) => state.user);
    const [haltOutlet, setHaltOutlet] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        if(!token && !isLoggingOut) {
            dispatch(refreshToken());
        } else {
            setHaltOutlet(false)
        }
    }, [token, refreshToken, dispatch, setHaltOutlet])

    return haltOutlet ? <p>Loading...</p> : <Outlet />
}

export default PersistentLogin;