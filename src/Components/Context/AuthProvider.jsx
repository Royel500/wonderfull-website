import React, { createContext, useEffect, useState } from 'react';

import { auth } from './../../FairBase/FairBase';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';



 export const AuthContext = createContext(null);


const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true); 
  const [user, setUser] = useState(null);

const createUser = ( email,password) =>{
    return createUserWithEmailAndPassword(auth,email,password)
}


  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password)
      .finally(() => setLoading(false)); 
  };


    const userInfo = {
   createUser,
   signIn,
   loading,
   user,
    }


    
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


    return (
       <AuthContext value={userInfo}>
        {children}
       </AuthContext>
    );
};

export default AuthProvider;