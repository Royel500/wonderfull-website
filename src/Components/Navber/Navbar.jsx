import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router';
import { AuthContext } from '../Context/AuthProvider';
import { GiFruitTree } from "react-icons/gi";
import { IoMdMoon } from "react-icons/io";
import { MdOutlineWbSunny } from "react-icons/md";
import { FiMenu, FiX } from "react-icons/fi";
import Swal from 'sweetalert2';

const Navbar = () => {
  const { user, logOut, theme, toggleTheme } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    Swal.fire({
      title: 'Logout Confirmation',
      text: 'Are you sure you want to logout?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, logout'
    }).then((result) => {
      if (result.isConfirmed) {
        logOut()
          .then(() => {
            Swal.fire('Logged Out!', '', 'success');
          })
          .catch(error => {
            Swal.fire('Error', error.message, 'error');
          });
      }
    });
  };

  return (
    <nav className={`relative px-4 py-3 shadow-lg ${
      theme === 'dark' 
        ? 'bg-gray-900 text-white' 
        : 'bg-gradient-to-r from-blue-400 via-green-500 to-red-300 text-gray-800'
    }`}>
      <div className="flex justify-between items-center max-w-screen-xl mx-auto">
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden mr-4"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>

        {/* Logo */}
        <div className="flex items-center gap-2 text-xl font-bold">
          <GiFruitTree size={30} className="text-green-500 bg-white rounded-full p-1" />
          <span>GardenTips</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6 font-medium">
          <NavLink 
            to="/" 
         
          >
            Home
          </NavLink>
          <NavLink 
            to="/explore" 
        
          >
            Explore Gardeners
          </NavLink>
          <NavLink 
            to="/tips" 
       
          >
            Browse Tips
          </NavLink>
          {user && (
            <>
              <NavLink 
                to="/plants" 
                className={({ isActive }) => 
                  isActive ? 'text-white font-bold' : 'hover:text-white'
                }
              >
                Share Tip
              </NavLink>
              <NavLink 
                to="/my-tips" 
                className={({ isActive }) => 
                  isActive ? 'text-white font-bold' : 'hover:text-white'
                }
              >
                My Tips
              </NavLink>
            </>
          )}
        </div>

        {/* Right Side Controls */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`px-3 py-1 rounded-full ${
              theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
            }`}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? <IoMdMoon /> :<MdOutlineWbSunny />}
          </button>

          {/* User Controls */}
          {user ? (
            <div className="relative">
              <img
                src={user.photoURL || 'https://i.ibb.co/2kR84xh/default-user.png'}
                alt="User profile"
                className="w-10 h-10 rounded-full cursor-pointer border-2 border-green-500"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              />
              {dropdownOpen && (
                <div className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 z-50 ${
                  theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                }`}>
                  <div className="px-4 py-2 text-sm border-b">
                    <p className="font-medium">{user.displayName || 'User'}</p>
                    <p className="text-gray-500 truncate">{user.email}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left font-bold px-4 py-2 text-sm hover:bg-red-100 text-red-600"
                  >
                    Logout?
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden md:flex gap-2">
              <NavLink 
                to="/signIn" 
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition"
              >
                Login
              </NavLink>
              <NavLink 
                to="/signUp" 
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
              >
                Sign Up
              </NavLink>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className={`md:hidden absolute top-full left-0 right-0 ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        } shadow-lg py-2 z-40`}>
          <NavLink 
            to="/" 
            className="block px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </NavLink>
          <NavLink 
            to="/explore" 
            className="block px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={() => setMobileMenuOpen(false)}
          >
            Explore Gardeners
          </NavLink>
          <NavLink 
            to="/tips" 
            className="block px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={() => setMobileMenuOpen(false)}
          >
            Browse Tips
          </NavLink>
          {user && (
            <>
              <NavLink 
                to="/plants" 
                className="block px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                Share Tip
              </NavLink>
              <NavLink 
                to="/my-tips" 
                className="block px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                My Tips
              </NavLink>
            </>
          )}
          {!user ? (
            <div className="px-4 py-3 space-y-2">
              <NavLink 
                to="/signIn" 
                className="block w-full bg-green-500 text-white text-center py-2 rounded-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </NavLink>
              <NavLink 
                to="/signUp" 
                className="block w-full bg-blue-500 text-white text-center py-2 rounded-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign Up
              </NavLink>
            </div>
          ) : (
            <button
              onClick={() => {
                handleLogout();
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 dark:hover:bg-gray-700"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;