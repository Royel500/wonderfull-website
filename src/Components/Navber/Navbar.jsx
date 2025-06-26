import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router';
import { AuthContext } from '../Context/AuthProvider';
import { GiFruitTree } from "react-icons/gi";
import { FiMenu, FiX } from "react-icons/fi";
import Swal from 'sweetalert2';
import './Navber.css';
import ThemeToggle from '../ThemeToggle';
import Gardeners from './../Gardeners';

const Navbar = () => {
  const { user, logOut, theme } = useContext(AuthContext);
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
    <nav className={`relative px-2 mx-2 py-3 shadow-lg ${
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
            className={({ isActive }) =>
              isActive ? 'text-white font-bold' : 'hover:text-white'
            }
          >
            Home
          </NavLink>
          <NavLink 
            to="/tips" 
            className={({ isActive }) =>
              isActive ? 'text-white font-bold' : 'hover:text-white'
            }
          >
            All Gardeners
          </NavLink>
          {/* {user && ( */}
            <NavLink 
              to="/dashboard"
              className={({ isActive }) =>
                isActive ? 'text-white font-bold' : 'hover:text-white'
              }
            >
              Dashboard
            </NavLink>
          {/* )} */}
        </div>

        {/* Right Side Controls */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <ThemeToggle />

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
          theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
        } shadow-lg py-3 z-40`}>
          <div className="flex flex-col space-y-2 px-4">
            <NavLink 
              to="/" 
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) => isActive ? 'font-bold text-green-500' : ''}
            >
              Home
            </NavLink>
            <NavLink 
              to="/tips" 
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) => isActive ? 'font-bold text-green-500' : ''}
            >
              All Gardeners
            </NavLink>
            {/* {user && ( */}
              <NavLink 
                to="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) => isActive ? 'font-bold text-green-500' : ''}
              >
                Dashboard
              </NavLink>
            {/* )} */}
          </div>

          {/* Mobile Auth Buttons */}
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
