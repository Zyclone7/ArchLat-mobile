import { useState, useEffect } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login, reset } from '../features/auth/authSlice'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'
import Logo from '../assets/Logo.png' // Ensure this path is correct

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')

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
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(String(email).toLowerCase())
  }

  const validatePassword = (password) => {
    return password.length >= 6
  }

  const onSubmit = (e) => {
    e.preventDefault()

    // Clear previous errors
    setEmailError('')
    setPasswordError('')

    let isValid = true

    // Validate email
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address')
      isValid = false
    }

    // Validate password
    if (!validatePassword(password)) {
      setPasswordError('Password should be at least 6 characters')
      isValid = false
    }

    if (!isValid) {
      return
    }

    const userData = { email, password }
    dispatch(login(userData))
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4 md:px-8">
      <div className="w-full max-w-sm p-4 bg-white dark-mode border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700" style={{ backgroundColor: '#0C5673' }}>
        <div className="flex justify-center mb-6">
          <img src={Logo} alt="Logo" className="w-24 h-auto md:w-28" />
        </div>
        <form className="space-y-6" onSubmit={onSubmit}>
          <h5 className="text-lg sm:text-xl font-medium text-gray-900 dark:text-white">Sign in to our platform</h5>
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ID NO.</label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={onChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              placeholder="name@company.com"
              aria-label="Email"
            />
            {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
          </div>
          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={onChange}
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              aria-label="Password"
            />
            {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between">
            <div className="flex items-center">
              <input
                id="remember"
                type="checkbox"
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                aria-label="Remember me"
              />
              <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
            </div>
            <a href="#" className="mt-2 sm:mt-0 text-sm text-blue-700 hover:underline dark:text-white">Lost Password?</a>
          </div>
          <button
            type="submit"
            className="w-full text-white hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            style={{ backgroundColor: '#ad8440' }}
          >
            Login
          </button>
          <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
            Can't Login? <a href="#" className="text-blue-700 hover:underline dark:text-yellow" style={{ color: '#ad8440' }}> Go to library </a>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
