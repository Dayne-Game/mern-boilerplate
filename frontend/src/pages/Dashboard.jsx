import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Dashboard() {
    const navigate = useNavigate()
  
    const { user } = useSelector((state) => state.user)

  
    useEffect(() => {
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