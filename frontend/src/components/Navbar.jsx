import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Search, User, LogOut } from 'lucide-react';
import Logo from '../assets/Logo.png'

function Navbar({ handleSearch }) {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  // Ensure user is logged in, otherwise redirect to login
  if (!user) {
    navigate('/login');
  }

  const handleLogout = () => {
    // Implement logout logic
    navigate('/login');
  };

  return (
    <div className="bg-white shadow-md">
      {/* Top Navigation */}
      <div className="max-w-screen-xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <img 
              src={Logo} 
              className="h-10 w-10 rounded-full shadow-sm hover:shadow-md transition-shadow duration-300" 
              alt="Logo" 
            />
            <div>
              <h1 className="text-xl font-bold text-gray-800">Book Library</h1>
            </div>
          </div>

          {/* User Section */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <User className="w-5 h-5 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">
                {user ? `${user.firstName}` : 'Guest'}
              </span>
            </div>
       
          </div>
        </div>
      </div>

      {/* Search Navigation */}
      <div className="bg-gray-50 border-t border-gray-100 py-4">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="flex justify-center">
            <div className="relative w-full max-w-md">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <Search className="w-5 h-5 text-gray-500" />
              </div>
              <input
                type="text"
                onChange={handleSearch}
                placeholder="Search books by title..."
                className="
                  w-full 
                  pl-10 
                  pr-4 
                  py-2.5 
                  text-sm 
                  text-gray-900 
                  bg-white 
                  border 
                  border-gray-300 
                  rounded-full 
                  focus:ring-2 
                  focus:ring-blue-500 
                  focus:border-blue-500 
                  transition-all 
                  duration-300 
                  shadow-sm 
                  hover:shadow-md
                "
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;