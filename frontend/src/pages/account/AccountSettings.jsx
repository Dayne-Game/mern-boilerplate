import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function AccountSettings() {
    const navigate = useNavigate()
  
    const { user } = useSelector((state) => state.user)

  
    useEffect(() => {
      if (!user) {
        navigate('/login')
      }

    }, [user, navigate ])

    return (
        <>
          <div className='row'>
            <div className="col-sm-12"> 
                <h4 className='mt-4'>Account Information</h4>S
            </div>
          </div>
        </>
    )
}

export default AccountSettings;