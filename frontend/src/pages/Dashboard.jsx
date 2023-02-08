import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '../features/auth/AuthSlice'

function Dashboard() {
    const navigate = useNavigate()
  
    const user = useSelector(selectCurrentUser);

  
    useEffect(() => {
      document.title = "MGMT | Dashboard";
      if (!user) {
        navigate('/login')
      }

    }, [user, navigate ])

    return (
        <>
          <h1>Welcome, {user && user.name}</h1>
        </>
    )
}

export default Dashboard;