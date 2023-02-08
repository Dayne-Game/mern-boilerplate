import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useRefreshTokenMutation } from '../features/auth/AuthService'
import { setCredentials, logout } from '../features/auth/AuthSlice'

const PersistentLogin = () => {
    const dispatch = useDispatch();
    const { token, isLoggingOut } = useSelector((state) => state.auth);
	const [getRefreshToken] = useRefreshTokenMutation();
    const [haltOutlet, setHaltOutlet] = useState(true);

    useEffect(() => {
        if(!token && !isLoggingOut) {
            getRefreshToken().then(res => {
				if(res?.data) {
					const { user, accessToken } = res.data
					if(accessToken) {
						dispatch(setCredentials({ user, accessToken }))
					}
				} else {
					dispatch(logout())
				}
			}).then(() => setHaltOutlet(false))
        } else {
            setHaltOutlet(false)
        }
    }, [token, isLoggingOut, getRefreshToken, dispatch, setHaltOutlet])

    return haltOutlet ? <p>Loading...</p> : <Outlet />
}

export default PersistentLogin;