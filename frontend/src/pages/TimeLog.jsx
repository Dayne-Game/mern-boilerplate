import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function TimeLog() {
    const navigate = useNavigate()
  
    const { user } = useSelector((state) => state.user)

  
    useEffect(() => {
      document.title = "MGMT | Time Logs";
      if (!user) {
        navigate('/login')
      }

    }, [user, navigate ])

    return (
        <>
          <h1>{user && user.name}, your Time Logs</h1>
        </>
    )
}

export default TimeLog;