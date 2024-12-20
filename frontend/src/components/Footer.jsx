import React, { useState, useEffect } from 'react';
import { logout, reset } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Home, MessageCircle, Settings, LogOut, X } from 'lucide-react';

function Footer() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, dispatch]);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/login');
  };

  return (
    <div>
      {/* Enhanced Footer */}
      <footer className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-20 w-64 bg-white/80 backdrop-blur-md border border-gray-200 shadow-2xl rounded-full py-3 px-4 transition-all duration-300 hover:scale-105 hover:shadow-xl">
        <ul className="flex items-center justify-between">
          <li key="home-icon" className="hover:text-blue-500 transition-colors">
            <button className="p-2 rounded-full hover:bg-blue-50 focus:outline-none">
              <Home className="w-6 h-6" />
            </button>
          </li>
          <li key="message-icon" className="hover:text-green-500 transition-colors">
            <button className="p-2 rounded-full hover:bg-green-50 focus:outline-none">
              <MessageCircle className="w-6 h-6" />
            </button>
          </li>
          <li key="drawer-icon" className="hover:text-purple-500 transition-colors">
            <button 
              onClick={toggleDrawer} 
              aria-label="Open Drawer" 
              className="p-2 rounded-full hover:bg-purple-50 focus:outline-none"
            >
              <Settings className="w-6 h-6" />
            </button>
          </li>
        </ul>
      </footer>

      {/* Enhanced Drawer */}
      <div 
        className={`
          fixed top-0 right-0 w-80 h-full 
          bg-gradient-to-br from-gray-800 to-gray-900 
          text-white p-6 z-30 
          transform transition-transform duration-500 ease-in-out 
          ${isDrawerOpen ? 'translate-x-0' : 'translate-x-full'}
          shadow-2xl
        `}
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-white">Settings</h2>
          <button 
            onClick={toggleDrawer} 
            className="text-white hover:rotate-90 transition-transform duration-300 focus:outline-none"
          >
            <X className="w-8 h-8" />
          </button>
        </div>

        <div className="flex items-center mb-8 space-x-4">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
            <span className="text-2xl font-bold">
              {user?.firstName?.[0] || 'G'}
            </span>
          </div>
          <div>
            <p className="text-xl font-semibold">
              {user?.firstName + ' ' + user?.secondName || 'Guest'}
            </p>
            <p className="text-sm text-gray-400">
              {user?.email || 'guest@example.com'}
            </p>
          </div>
        </div>

        <nav className="space-y-4">
          <div 
            className="
              flex items-center space-x-3 
              p-3 rounded-lg 
              hover:bg-white/10 
              cursor-pointer 
              transition-colors
            "
          >
            <Settings className="w-5 h-5" />
            <span>Account Settings</span>
          </div>
          <div 
            onClick={onLogout}
            className="
              flex items-center space-x-3 
              p-3 rounded-lg 
              hover:bg-red-500/20 
              cursor-pointer 
              transition-colors
              text-red-400
              hover:text-red-300
            "
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Footer;