import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Navbar({ handleSearch }) {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  // Ensure user is logged in, otherwise redirect to login
  if (!user) {
    navigate('/login');
  }

  return (
    <>
      <nav className="bg-white border-gray-200">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
          <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
          <span className="text-gray-700 text-sm font-medium">
            {user ? `Welcome, ${user.name}` : 'Welcome'}
          </span>
          <div className="flex items-center space-x-6 rtl:space-x-reverse">
            <a href="tel:5541251234" className="text-sm text-gray-500 dark:text-white hover:underline"></a>
          </div>
        </div>
      </nav>
      <nav className="bg-white border-gray-200">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
          <div className="flex flex-grow justify-center">
            <form className="flex items-center max-w-sm w-full">
              <label htmlFor="simple-search" className="sr-only">Search</label>
              <div className="relative w-full">
                <input
                  type="text"
                  onChange={handleSearch}
                  placeholder="Search by title..."
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full ps-10 p-2.5"
                />
              </div>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
