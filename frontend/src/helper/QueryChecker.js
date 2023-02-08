import { useDispatch } from 'react-redux'
import { logout, refreshToken } from "../features/user/UserSlice";

export const CheckQueryStatus = (status) => {

    const dispatch = useDispatch();

    switch(status) {
        case 401:
           dispatch(logout())
           break
        case 429:
            break
        case 403:  
            dispatch(refreshToken());
    }

    return true;
}