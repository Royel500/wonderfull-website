import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { AuthContext } from './Context/AuthProvider';
import { GoogleAuthProvider, signInWithPopup ,updateProfile } from 'firebase/auth';
import { auth } from '../FairBase/FairBase';
import Swal from 'sweetalert2';

const SignUp = () => {
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();
  const { createUser,user } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const showSuccessAlert = (email) => {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Registration Successful!',
      html: `Welcome <b>${email}</b>!<br>Your account has been created.`,
      showConfirmButton: false,
      timer: 2500,
      willClose: () => {
        navigate('/');
      }
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const photo = form.photo.value;

    setError('');

    // Password validation
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      Swal.fire({
        icon: 'error',
        title: 'Weak Password',
        text: 'Password must be at least 6 characters',
      });
      return;
    }

try {
  const userCredential = await createUser(email, password);
  await updateProfile(auth.currentUser, {
    displayName: name,
    photoURL: photo || null
  });

  showSuccessAlert(email);
} catch (error) {
  setError(error.message);
  Swal.fire({
    icon: 'error',
    title: 'Registration Failed',
    text: error.message,
  });
}
  };

  const handleGoogleSignUp = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Google Registration Successful!',
        html: `Welcome <b>${user.displayName || user.email}</b>!`,
        showConfirmButton: false,
        timer: 2500,
        willClose: () => {
          navigate('/');
        }
      });
    } catch (error) {
      setError(error.message);
      Swal.fire({
        icon: 'error',
        title: 'Google Sign Up Failed',
        text: error.message,
      });
    }
  };

  return (
    <div className="flex my-10 items-center justify-center min-h-screen bg-base-200 px-4">
      <div className="card py-5 bg-base-100 w-full max-w-md shadow-2xl">
        <h1 className="text-2xl font-bold text-center mb-4">Register Your Account</h1>
        
        <form onSubmit={handleRegister} className="card-body space-y-4">
          <div>
            <label className="label">Name</label>
            <input 
              type="text" 
              name="name" 
              className="input input-bordered w-full bg-fuchsia-50" 
              placeholder="Enter Your Name" 
              required 
            />
          </div>

          <div>
            <label className="label">Email</label>
            <input 
              type="email" 
              name="email" 
              className="input input-bordered w-full bg-fuchsia-50" 
              placeholder="Email" 
              required 
            />
          </div>

          <div>
            <label className="label">Password</label>
            <div className="relative">
              <input
                className='input input-bordered w-full bg-fuchsia-50'
                name='password'
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="Password"
                minLength="6"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-3 right-3"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Must be at least 6 characters
            </p>
          </div>

          {error && (
            <div className="alert alert-error shadow-lg">
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{error}</span>
              </div>
            </div>
          )}

          <div>
            <label className="label">Photo URL (optional)</label>
            <input 
              type="text" 
              name="photo" 
              className="input input-bordered w-full bg-fuchsia-50" 
              placeholder="Photo URL" 
            />
          </div>

          <button type="submit" className="btn btn-primary mt-4">
            Register Now
          </button>

          <div className="divider">OR</div>

          <button 
            onClick={handleGoogleSignUp}
            className="btn btn-outline w-full"
            type="button"
          >
            <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
              <path fill="#EA4335" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"/>
            </svg>
            Register with Google
          </button>
        </form>

        <p className="text-center font-medium mt-4">
          Already have an account?{' '}
          <Link to="/signIn" className="text-blue-600 hover:text-blue-800">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;