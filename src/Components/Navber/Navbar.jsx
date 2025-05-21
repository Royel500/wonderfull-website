import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router';
import { AuthContext } from '../Context/AuthProvider';
import './Navber.css';

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [theme, setTheme] = useState('light');

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const closeDropdown = () => setDropdownOpen(false);

  // Theme toggle logic
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') || 'light';
    setTheme(storedTheme);
    document.documentElement.classList.toggle('dark', storedTheme == 'dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  // Dropdown close on outside click
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
    <nav className="bg-green-100 dark:bg-gray-900 max-w-screen px-4 mx-auto py-3 shadow flex justify-between items-center text-gray-800 dark:text-white">
      {/* Site Logo */}
      <div className="font-bold text-xl">
        <NavLink to="/">🌱 GardenTips</NavLink>
      </div>

      {/* Navigation Links */}
      <div className="space-x-4 font-semibold hidden md:flex">
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

      {/* Right Section (Theme + User) */}
      <div className="flex items-center gap-3 user-dropdown">
        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="px-3 py-1 rounded bg-gray-300 dark:bg-gray-700"
        >
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>

        {/* Auth Section */}
        {!user ? (
          <>
            <NavLink to="/signIn" className="btn bg-green-500 text-white px-3 py-1 rounded">Login</NavLink>
            <NavLink to="/signUp" className="btn bg-green-500 text-white px-3 py-1 rounded">Signup</NavLink>
          </>
        ) : (
          <div className="relative flex items-center">
            {/* User Photo */}
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

            {/* Dropdown */}
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
      </div>
    </nav>
  );
};

export default Navbar;
