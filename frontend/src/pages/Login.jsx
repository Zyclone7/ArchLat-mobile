import { useState, useEffect } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login, reset } from '../features/auth/authSlice'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const [error, setError] = useState(null)
  const [validationError, setValidationError] = useState('')

  const { email, password } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    if (isError) {
      toast.error(message)
  
    }

    if (isSuccess || user) {
      navigate('/')
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const validateEmail = (email) => {
    // Simple email regex for basic validation
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(String(email).toLowerCase())
  }

  const validatePassword = (password) => {
    // Password should be at least 6 characters
    return password.length >= 6
  }

  const onSubmit = (e) => {
    e.preventDefault()

    // Clear previous validation errors
    setValidationError('')

    if (!validateEmail(email)) {
      setValidationError('Please enter a valid email')
      return
    }

    if (!validatePassword(password)) {
      setValidationError('Password should be at least 6 characters')
      return
    }

    const userData = {
      email,
      password,
    }

    dispatch(login(userData))
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className='text-center my-6'>
        <h1 className='text-3xl font-bold'>
          <FaSignInAlt className='inline-block mr-2' /> Login
        </h1>
        <p className='text-lg'>ArchLat</p>
      </section>
      <section className='flex justify-center'>
        <form onSubmit={onSubmit} className='w-full max-w-md'>
          <div className='mb-4'>
            <input
              type='email'
              className={`w-full px-3 py-2 border rounded-md ${validationError && !validateEmail(email) ? 'border-red-500' : ''}`}
              id='email'
              name='email'
              value={email}
              placeholder='Enter your email'
              onChange={onChange}
            />
            {validationError && !validateEmail(email) && (
              <p className='text-red-600 text-sm'>Please enter a valid email</p>
            )}
          </div>
          <div className='mb-4'>
            <input
              type='password'
              className={`w-full px-3 py-2 border rounded-md ${validationError && !validatePassword(password) ? 'border-red-500' : ''}`}
              id='password'
              name='password'
              value={password}
              placeholder='Enter password'
              onChange={onChange}
            />
            {validationError && !validatePassword(password) && (
              <p className='text-red-600 text-sm'>Password should be at least 6 characters</p>
            )}
          </div>

          <div>
            <button type='submit' className='w-full py-2 bg-blue-600 text-white rounded-md'>
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Login
