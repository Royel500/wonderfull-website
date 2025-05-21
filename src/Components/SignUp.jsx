import React, { use, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { AuthContext } from './Context/AuthProvider';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../FairBase/FairBase';
import swal from 'sweetalert2'; // <-- fix import

const SignUp = () => {
      const provider = new GoogleAuthProvider
        const navigate = useNavigate();
    const {createUser} = use(AuthContext)
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');
    const photo = formData.get('photo');

    console.log({ name, email, password, photo });
    
    // Add your registration logic here

    createUser(email,password)
    .then(res =>{
        console.log(res.user)
    })
     .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorCode,errorMessage)
    // ..
  });

    // Example validation:
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    // Clear error if validation passes
    setError('');
    
    // Proceed with registration...
  };

  const handleSignInGoogle = () => {
    // Add your Google sign-in logic here
  signInWithPopup(auth,provider)
    .then((userCredential) => {
      const user = userCredential.user;

      alert('You create account successfully')
      swal("Wow!", "Congratulations! You got a registration bonus.", "success");
      // console.log('Signed in user:', user);
      navigate('/');
    })
    .catch((error) => {
      const errorMessage = error.message;
      const errorCode = error.code;
      setError(`${errorMessage} (${errorCode})`);
    });
    setError('Google sign-in not implemented yet');
  };



  return (
 <div className="flex  items-center justify-center min-h-screen bg-base-200 px-10">
    <div className="card py-5 bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <h1 className=" ">Register Your Account</h1>
        <form onSubmit={handleRegister} className="card-body">
          <label className="label">Name</label>
          <input 
            type="text" 
            name="name" 
            className="input bg-fuchsia-100" 
            placeholder="Enter Your Name" 
            required 
          />

          <label className="label">Email</label>
          <input 
            type="email" 
            name="email" 
            className="input bg-fuchsia-100" 
            placeholder="Email" 
            required 
          />

          <label className="label mt-1">Password</label>
          <div className="relative w-full">
            <div>
              <input
                className='w-full py-2 px-2 rounded bg-fuchsia-100 border'
                name='password'
                type={show ? 'text' : 'password'}
                required
                placeholder="Password"
                minLength="6"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Must be more than 6 characters, including number, lowercase letter, uppercase letter"
              />
              <p className="validator-hint hidden">
                Must be more than 8 characters, including
                <br />At least one number <br />At least one lowercase letter <br />At least one uppercase letter
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShow(!show)}
              className="absolute top-3 right-3"
            >
              {show ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>

          {error && (
            <p className="text-red-500 text-sm mt-2">
              {error}
            </p>
          )}

          <label className="label">Photo URL (optional)</label>
          <input 
            type="text" 
            name="photo" 
            className="input bg-fuchsia-100" 
            placeholder="Set Photo" 
          />

          <button type="submit" className="btn  mt-4">
            Register Now
          </button>

          <button 
            onClick={handleSignInGoogle} 
            className="btn bg-cyan-100 text-black border-[#e5e5e5]"
            type="button"
          >
            <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <g>
                <path d="m0 0H512V512H0" fill="#fff"></path>
                <path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path>
                <path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path>
                <path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path>
                <path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path>
              </g>
            </svg>
            Register with Google
          </button>
        </form>

        <p className="text-center font-bold">
          Already Have An Account?{' '}
          <Link to="/signIn" className="text-red-500">LogIn</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;