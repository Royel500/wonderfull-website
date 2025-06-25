import React, { useState, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { 
  signInWithEmailAndPassword, 
  sendPasswordResetEmail,
  signInWithPopup, 
  GoogleAuthProvider 
} from 'firebase/auth';
import Swal from 'sweetalert2';
import { auth } from '../FairBase/FairBase';

const SignIn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const provider = new GoogleAuthProvider();
  const emailRef = useRef();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const showSuccessAlert = (user) => {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: `Welcome, ${user.email || 'User'}!`,
      text: 'You have successfully logged in.',
      showConfirmButton: false,
      timer: 2000,
      willClose: () => {
        navigate(`${location.state ? location.state : '/'}`)
      }
    });
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    setError('');

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      showSuccessAlert(userCredential.user);
         navigate(`${location.state ? location.state : '/'}`)
    } catch (error) {
      setError(error.message);
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: error.message,
      });
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const userCredential = await signInWithPopup(auth, provider);
      showSuccessAlert(userCredential.user);
      navigate(`${location.state ? location.state : '/'}`)
    } catch (error) {
      setError(error.message);
      Swal.fire({
        icon: 'error',
        title: 'Google Login Failed',
        text: error.message,
      });
    }
  };

  const handlePasswordReset = async () => {
    const email = emailRef.current?.value;
    
    if (!email) {
      setError('Please enter your email first.');
      Swal.fire({
        icon: 'warning',
        title: 'Email Required',
        text: 'Please enter your email address to reset password.',
      });
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      Swal.fire({
        icon: 'success',
        title: 'Email Sent!',
        text: 'Password reset link has been sent to your email.',
      });
    } catch (error) {
      setError(error.message);
      Swal.fire({
        icon: 'error',
        title: 'Failed to Send',
        text: error.message,
      });
    }
  };

  return (
    <div className="min-h-screen px-5 flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">Sign In</h1>
        
        <form onSubmit={handleSignIn} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              ref={emailRef}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative mt-1">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                required
                minLength="6"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm">
              {error}
            </div>
          )}

          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={handlePasswordReset}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Sign In
          </button>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={handleGoogleSignIn}
              className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                <path fill="#EA4335" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"/>
              </svg>
              Sign in with Google
            </button>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/signUp" className="font-medium text-blue-600 hover:text-blue-500">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;