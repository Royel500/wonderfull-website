import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { signInWithEmailAndPassword, sendPasswordResetEmail,
     signInWithPopup, GoogleAuthProvider } from 'firebase/auth';


import { useLocation } from 'react-router';

import { auth } from '../FairBase/FairBase';
import { toast } from 'react-toastify';

const SignIn = () => {
      const navigate = useNavigate();
  const location = useLocation();
   const provider = new GoogleAuthProvider
  const emailfef = useRef();
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');

  const handleSignIn = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    setError('');

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        toast.success('LogIn Successfully!');
      // alert('LogIn successfully');
        navigate(`${location.state ? location.state : '/'}`);
      })
      .catch((error) => {
        const errorMessage = error.message;
        const errorCode = error.code;
        setError(`${errorMessage} (${errorCode})`);
      });
  };

  const handleForget = () => {
    const email = emailfef.current?.value;
    if (!email) {
      setError('Please enter your email first.');
      return;
    }

    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.success('Password reset email sent!');
        // alert('Password reset email sent!');
      })
      .catch((error) => {
        setError(`Error: ${error.message}`);
      });
  };

    const handleSignInGoogle = () =>{
      signInWithPopup(auth,provider)
      .then((userCredential) => {
        const user = userCredential.user;
        toast.success('LogIn Successfully!');
        // console.log('Signed in user:', user);
        navigate(`${location.state ? location.state : '/'}`);
      })
      .catch((error) => {
        const errorMessage = error.message;
        const errorCode = error.code;
        setError(`${errorMessage} (${errorCode})`);
      });
    };
    return (
  <>   

    <div className="hero px-10 my-10 bg-base-200 ">
      <div className="card bg-base-100 w-full max-w-sm shadow-2xl">
        <div className="card-body">
          <form onSubmit={handleSignIn} className="form">
            <h1 className="text-2xl text-center font-bold mb-4">LogIn Now</h1>

            <label className="label">Email</label>
            <input
          
              type="email"
              name="email"
              ref={emailfef}
              className="input input-bordered w-full  bg-blue-200"
              placeholder="Email"
              required
            />

            <label className="label mt-8 ">Password</label>
            <div className="relative">



  <input
     className='w-full py-3 px-2 rounded bg-blue-200 border'
   type={show ? 'text' : 'password'}
    required
    placeholder="Password"
    name='password'
    minlength="6"
    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
    title="Must be more than 6 characters, including number, lowercase letter, uppercase letter"
  />
<p className="validator-hint text-sm hidden text-gray-500">
<span>Must be more than 6 characters</span><br />
  <span>At least one number and one lowercase letter</span><br />
  <span>At least one uppercase letter</span>
</p>


              <button
                type="button"
                onClick={() => setShow(!show)}
                className="absolute top-3 right-3"
              >
                {show ? <FaEye />: <FaEyeSlash /> }
              </button>
            </div>

            {error && (
              <p className="text-red-500 text-sm mt-2">
                {error}
              </p>
            )}

            <div onClick={handleForget} className="mt-2">
              <a href="#" className="link link-hover">
                Forgot password?
              </a>
            </div>

            <button type="submit" className="btn bg-blue-500 mt-4 w-full">
              Login
            </button>
            <button onClick={handleSignInGoogle} className="btn w-full  bg-amber-100 mt-3 text-black border-[#e5e5e5]">
  <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
  Login with Google
</button>
          </form>

          <p className="text-center font-bold mt-4">
            Don’t Have An Account ?{' '}
            <Link to="/register" className="text-red-500">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>  </>
    );
};

export default SignIn;