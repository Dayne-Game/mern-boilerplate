import { useSelector } from 'react-redux'
import { selectCurrentUser } from '../features/auth/AuthSlice'

function Dashboard() {
    const user = useSelector(selectCurrentUser);

    return (
        <>
          <h1>Welcome, {user && user.name}</h1>
        </>
    )
}

export default Dashboard;