import React, { use, useEffect, useState } from 'react';
import { NavLink } from 'react-router';
import { AuthContext } from './Context/AuthProvider';


const Navbar = () => {
  const { user, logOut } = use(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const closeDropdown = () => setDropdownOpen(false);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.user-dropdown')) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout =  () => {

    logOut()
      .then(() => {
        alert('You are logged out');
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(`Error: ${errorMessage}`);
      });
  };

  return (
    <nav className="bg-green-100 px-4 py-3 shadow flex justify-between items-center">
      {/* Site Logo */}
      <div className="font-bold text-xl">
        <NavLink to="/">🌱 GardenTips</NavLink>
      </div>

      {/* Navigation Links */}
      <div className="space-x-4 font-semibold text-gray-700 hidden md:flex">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/explore">Explore Gardeners</NavLink>
        <NavLink to="/tips">Browse Tips</NavLink>

        {user && (
          <>
            <NavLink to="/plants">Share a Garden Tip</NavLink>
            <NavLink to="/my-tips">My Tips</NavLink>
          </>
        )}
      </div>

      {/* User/Login Section */}
      <div className="relative user-dropdown">
        {!user ? (<>
          <NavLink to="/signIn" className="btn bg-green-500 text-white">Login</NavLink>
          <NavLink to="/signUp" className="btn bg-green-500 text-white">Signup</NavLink> </>
        ) : (
          <div className="relative flex items-center">
            {/* User Photo */}
            <img
              src={
                user.photoURL && user.photoURL.startsWith('http')
                  ? user.photoURL
                  : 'https://i.ibb.co/2kR84xh/default-user.png'
              }
              alt="user"
              className="w-10 h-10 rounded-full cursor-pointer border-2 border-green-500"
              onClick={toggleDropdown}
              title={user.displayName || "User"}
            />

            {/* Dropdown */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-10 w-40 bg-white border rounded shadow-lg z-50">
                <div className="px-4 py-2 text-sm font-medium text-gray-800">
                  {user.displayName || "User"}
                </div>
                <button
                  onClick={() => {
                    handleLogout();
                    closeDropdown();
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-green-100 text-red-500"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
