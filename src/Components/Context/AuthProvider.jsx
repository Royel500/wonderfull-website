import React, { createContext, useEffect, useState } from 'react';

import { auth } from './../../FairBase/FairBase';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';



 export const AuthContext = createContext(null);


const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true); 
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState('light');

    useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };


  
const createUser = ( email,password) =>{
  setLoading(true);
    return createUserWithEmailAndPassword(auth,email,password)
}


  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password)
      .finally(() => setLoading(false)); 
  };


  // ----LogOut---------
  const logOut = () => {
    setLoading(true);
    return signOut(auth)
      .finally(() => setLoading(false)); 
  };



      
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
      setLoading(false); 
    });

    return () => unsubscribe();
  }, []);



    const userInfo = {
   createUser,
   signIn,
   logOut,
   theme,
   loading,
   toggleTheme,
   setLoading,
   user,
    }




    return (
       <AuthContext value={userInfo}>
        {children}
       </AuthContext>
    );
};

export default AuthProvider;