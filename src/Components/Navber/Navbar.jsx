import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router';
import { AuthContext } from '../Context/AuthProvider';
import './Navber.css';
import { GiFruitTree } from "react-icons/gi";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState('light');

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const closeDropdown = () => setDropdownOpen(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') || 'light';
    setTheme(storedTheme);
    document.documentElement.classList.toggle('dark', storedTheme === 'dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.user-dropdown')) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logOut()
      .then(() => alert('You are logged out'))
      .catch((error) => alert(`Error: ${error.message}`));
  };

  return (
    <nav className="relative bg-gradient-to-r from-blue-400 via-green-500 to-red-300 dark:bg-gray-900 px-4 py-3 shadow text-gray-800 dark:text-white">
      <div className="flex justify-between items-center max-w-screen mx-auto">
        {/* Logo */}
           <button className="md:hidden ml-2" onClick={toggleMobileMenu}>
            {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>

        <div className="flex items-center gap-2 text-xl font-bold">
          <h1 className="text-green-500 bg-white rounded-full p-1">
            <GiFruitTree size={30} />
          </h1>
          <span>GardenTips</span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-4 font-semibold">
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

        {/* Right Actions */}
        <div className="flex items-center gap-3 user-dropdown">
          <button
            onClick={toggleTheme}
            className="px-3 py-1 rounded bg-gray-300 dark:bg-gray-700"
          >
            {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
          </button>

          {!user ? (
            <div className="hidden md:flex gap-2">
              <NavLink to="/signIn" className="bg-green-500 text-white px-3 py-1 rounded">Login</NavLink>
              <NavLink to="/signUp" className="bg-green-500 text-white px-3 py-1 rounded">Signup</NavLink>
            </div>
          ) : (
            <div className="relative">
              <img
                src={
                  user.photoURL?.startsWith('http')
                    ? user.photoURL
                    : 'https://i.ibb.co/2kR84xh/default-user.png'
                }
                alt="user"
                className="w-10 h-10 rounded-full cursor-pointer border-2 border-green-500"
                onClick={toggleDropdown}
                title={user.displayName || "User"}
              />
              {dropdownOpen && (
                <div className="absolute right-0 mt-10 w-40 bg-white dark:bg-gray-800 border rounded shadow-lg z-50">
                  <div className="px-4 py-2 text-sm font-medium text-gray-800 dark:text-gray-200">
                    {user.displayName || "User"}
                  </div>
                  <button
                    onClick={() => {
                      handleLogout();
                      closeDropdown();
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-green-100 dark:hover:bg-gray-700 text-red-500"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Mobile Menu Toggle Button */}
       
        </div>
      </div>

      {/* Mobile Nav - Left Side Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-64 bg-white dark:bg-gray-900 shadow-lg p-4 flex flex-col space-y-3 font-semibold z-50">
          <NavLink to="/" onClick={toggleMobileMenu}>Home</NavLink>
          <NavLink to="/explore" onClick={toggleMobileMenu}>Explore Gardeners</NavLink>
          <NavLink to="/tips" onClick={toggleMobileMenu}>Browse Tips</NavLink>
          {user && (
            <>
              <NavLink to="/plants" onClick={toggleMobileMenu}>Share a Garden Tip</NavLink>
              <NavLink to="/my-tips" onClick={toggleMobileMenu}>My Tips</NavLink>
            </>
          )}
          {!user ? (
            <>
              <NavLink to="/signIn" onClick={toggleMobileMenu} className="bg-green-500 text-white px-3 py-1 rounded">Login</NavLink>
              <NavLink to="/signUp" onClick={toggleMobileMenu} className="bg-green-500 text-white px-3 py-1 rounded">Signup</NavLink>
            </>
          ) : (
            <button onClick={handleLogout} className="text-red-600 text-left">Logout</button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
