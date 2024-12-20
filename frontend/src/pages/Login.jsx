import { useState, useEffect } from 'react'
import { FaSignInAlt, FaLock, FaUser } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login, reset } from '../features/auth/authSlice'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'
import Logo from '../assets/Logo.png'

function Login() {
  const [formData, setFormData] = useState({
    identifier: '',
    password: '',
  })

  const [identifierError, setIdentifierError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const { identifier, password } = formData

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

  const validateInput = (input) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const idRegex = /^[0-9]{4}-[A-Za-z]{3}-[0-9]{4}$/;
    return emailRegex.test(input) || idRegex.test(input);
  }

  const validatePassword = (password) => {
    return password.length >= 6
  }

  const onSubmit = (e) => {
    e.preventDefault()

    setIdentifierError('')
    setPasswordError('')

    let isValid = true

    if (!validateInput(identifier)) {
      setIdentifierError('Please enter a valid identifier (email or ID number)')
      isValid = false
    }

    if (!validatePassword(password)) {
      setPasswordError('Password should be at least 6 characters')
      isValid = false
    }

    if (!isValid) {
      return
    }

    const userData = { identifier, password }
    dispatch(login(userData))
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-2xl rounded-2xl overflow-hidden">
        <div className="p-8">
          <div className="flex justify-center mb-6">
            <img 
              src={Logo} 
              alt="Logo" 
              className="w-32 h-auto transform transition-transform hover:scale-105" 
            />
          </div>
          
          <form onSubmit={onSubmit} className="space-y-6">
            <h2 className="text-center text-2xl font-bold text-gray-800 dark:text-white">
              Welcome Back
            </h2>
            
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaUser className="text-gray-400 dark:text-gray-500" />
              </div>
              <input
                type="text"
                name="identifier"
                id="identifier"
                value={identifier}
                onChange={onChange}
                placeholder="ID or Email"
                className="pl-10 w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-all duration-300"
              />
              {identifierError && (
                <p className="text-red-500 text-sm mt-1 pl-2">{identifierError}</p>
              )}
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="text-gray-400 dark:text-gray-500" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                value={password}
                onChange={onChange}
                placeholder="Password"
                className="pl-10 w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-all duration-300"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-blue-500 focus:outline-none"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
              {passwordError && (
                <p className="text-red-500 text-sm mt-1 pl-2">{passwordError}</p>
              )}
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <input
                  id="remember"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label 
                  htmlFor="remember" 
                  className="ml-2 block text-sm text-gray-900 dark:text-gray-300"
                >
                  Remember me
                </label>
              </div>
              <a 
                href="#" 
                className="text-sm text-blue-600 hover:underline dark:text-blue-400"
              >
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-300 flex items-center justify-center"
            >
              <FaSignInAlt className="mr-2" /> Sign In
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Can't login? 
              <a 
                href="#" 
                className="ml-1 text-blue-600 hover:underline dark:text-blue-400"
              >
                Go to library
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login