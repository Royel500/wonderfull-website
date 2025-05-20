import React from 'react';

const Navbar = () => {
  return (
    <div>
      hi
    </div>
  );
};

export default Navbar;



// import React, { useContext, useEffect, useState } from 'react';
// import { NavLink } from 'react-router'; // Correct import
// // import './NavCss.css';
// import { AuthContext } from '../../Context/AuthProvider';
// import { ImPower } from "react-icons/im";

// const Navbar = () => {
//   const { user, logOut} = useContext(AuthContext);
 
//   const [dropdownOpen, setDropdownOpen] = useState(false);

//   const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
//   const closeDropdown = () => setDropdownOpen(false);

//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (!e.target.closest('.user-dropdown')) {
//         setDropdownOpen(false);
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   const handleLogout = () => {

//     logOut()
//       .then(() => {
//         alert('You are logged out');
//       })
//       .catch((error) => {
//         const errorMessage = error.message;
//         alert(`Error: ${errorMessage}`);
//       });
//   };

//   return (
//     <div className="navbar bg-base-200 shadow-sm">
//       <div className="navbar-start">
//         <div className="dropdown">
//           <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
//               viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
//                 d="M4 6h16M4 12h8m-8 6h16" />
//             </svg>
//           </div>
//           <ul
//             tabIndex={0}
//             className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
//           >
//             <li><NavLink to='/'>Home</NavLink></li>
//             <li><NavLink to='/bills'>Bills Page</NavLink></li>
//             <li><NavLink to='/profile'>My Profile</NavLink></li>
//           </ul>
//         </div>
//         <p className='font-bold flex'>
//           <span className='mt-2 p-1 text-green-500 bg-amber-400 rounded-full'>
//             <ImPower size={25} />
//           </span>
//           <a className="btn btn-ghost text-2xl">Energy</a>
//         </p>
//       </div>

//       <div className="navbar-center hidden lg:flex">
//         <ul className="menu space-x-5 font-bold menu-horizontal px-1 text-lg">
//           <li><NavLink to='/'>Home</NavLink></li>
//           <li><NavLink to='/bills'>Bills Page</NavLink></li>
//           <li><NavLink to='/profile'>My Profile</NavLink></li>
//         </ul>
//       </div>

//       <div className="navbar-end gap-2 mx-1 relative">
//         {user ? (
//           <div className="relative user-dropdown">
//             <button
//               onClick={toggleDropdown}
//               className="btn btn-ghost btn-circle avatar"
//             >
//               <div className="w-10 rounded-full">
//               <img
//   src={
//     user.photoURL && user.photoURL !== '' && user.photoURL.startsWith('http')
//       ? user.photoURL
//       : "https://i.ibb.co/2kR84xh/default-user.png"
//   }
//   alt="user"
//   className="object-cover w-full h-full"
// />

//               </div>
//             </button>

//             {dropdownOpen && (
//               <ul className="absolute right-0 my-5 w-48 p-2 shadow bg-base-200 font-bold rounded-box z-50">
//                 <li className="py-2 px-4 hover:bg-gray-100">
//                   <span className="font-semibold  sm:inline">{user.displayName || "User"}</span>
//                 </li>
//                 <li className="py-2 px-4 hover:bg-gray-100">
//                   Balance: {balance} TK
//                 </li>
//                 <li
//                   className="py-2 px-4 hover:bg-green-100 cursor-pointer btn"
//                   onClick={() => {
//                     handleLogout();
//                     closeDropdown();
//                   }}
//                 >
//                   Logout
//                 </li>
//               </ul>
//             )}
//           </div>
//         ) : (
//           <>
//             <button><NavLink to='/register' className="btn">Register</NavLink></button>
//             <button><NavLink to='/login' className="btn">LogIn</NavLink></button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Navbar;

// // import React, { useState } from 'react';
// // import { Link } from 'react-router';


// // const Navbar = ({ isLoggedIn, userData, onLogout }) => {
// //   const [showDropdown, setShowDropdown] = useState(false);
// //   const [showTooltip, setShowTooltip] = useState(false);

// //   const handleProfileClick = () => {
// //     setShowDropdown(!showDropdown);
// //     setShowTooltip(false); // Hide tooltip when dropdown is shown
// //   };

// //   const handleMouseEnter = () => {
// //     if (!showDropdown) {
// //       setShowTooltip(true);
// //     }
// //   };

// //   const handleMouseLeave = () => {
// //     setShowTooltip(false);
// //   };

// //   return (
// //     <nav className="navbar bg-emerald-300 min-w-screen">
// //       <div className="navbar-container flex gap-5">
// //         <div className="navbar-logo">
// //           <Link to="/">GardenTips</Link>
// //         </div>
        
// //         <div className="navbar-links">
// //           <Link to="/">Home</Link>
          
// //           {isLoggedIn && (
// //             <>
// //               <Link to="/share-tip">Share a Garden Tip</Link>
// //               <Link to="/explore">Explore Gardeners</Link>
// //               <Link to="/my-tips">My Tips</Link>
// //             </>
// //           )}
// //         </div>

// //         <div className="navbar-auth">
// //           {isLoggedIn ? (
// //             <div className="profile-container">
// //               <div 
// //                 className="profile-photo"
// //                 onClick={handleProfileClick}
// //                 onMouseEnter={handleMouseEnter}
// //                 onMouseLeave={handleMouseLeave}
// //               >
// //                 <img 
// //                   src={userData.photo || '/default-profile.png'} 
// //                   alt="Profile" 
// //                 />
// //                 {showTooltip && (
// //                   <span className="profile-tooltip">{userData.name}</span>
// //                 )}
// //               </div>
              
// //               {showDropdown && (
// //                 <div className="profile-dropdown">
// //                   <button onClick={onLogout}>Logout</button>
// //                 </div>
// //               )}
// //             </div>
// //           ) : (
// //             <Link to="/login" className="login-button">
// //               Login/Signup
// //             </Link>
// //           )}
// //         </div>
// //       </div>
// //     </nav>
// //   );
// // };

// // export default Navbar;