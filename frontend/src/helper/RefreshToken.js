import axios from "axios"

export const GetRefreshToken = () => {

    const token = getState().user.token

    const config = {
        Authorization: `Bearer ${token}`,
    }

    axios.get('api/auth/refresh', config).then((response) => {
        
    })
}