import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { reset } from '../features/auth/authSlice'
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

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div className='flex flex-col min-h-screen'>
      <section className='flex-1 p-4 bg-white'>
        <div className='mt-4'>
          <Book />
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default Dashboard
