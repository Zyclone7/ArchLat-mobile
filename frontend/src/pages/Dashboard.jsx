import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'
import Book from '../components/Book'

function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
   

    return () => {
      dispatch(reset())
    }
  }, [user, navigate, dispatch])

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/login')
  }

  return (
    <>
      <section className='heading'>
        <h1>Welcome {user && user.name}</h1>
        <p>Book</p>
      </section>
      <section className='content'>
        <button 
          onClick={onLogout} 
          className='mt-4 py-2 px-4 bg-red-600 text-white rounded-md'>
          Logout
        </button>
      </section>
      <Book/>
    </>
  )
}

export default Dashboard
