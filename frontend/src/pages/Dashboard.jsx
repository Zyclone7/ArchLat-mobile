import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'
import Book from '../components/Book'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading } = useSelector((state) => state.auth)

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
    
    // Cleanup on component unmount
    return () => {
      dispatch(reset())
    }
  }, [user, navigate, dispatch])

  // Show spinner while loading
  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className='heading'>
      </section>
      <section className='content'>
        <Navbar />
        <p>Book</p>
        <Book />
      </section>
      <Footer />
    </>
  )
}

export default Dashboard
