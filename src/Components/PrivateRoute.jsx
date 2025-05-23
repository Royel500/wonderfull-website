import React, { useContext } from 'react';
import { AuthContext } from './Context/AuthProvider';
import { Navigate, useLocation } from 'react-router';
import Swal from 'sweetalert2';
import Loading from './Loading';

const PrivateRoute = ({ children }) => {
  const { user ,loading } = useContext(AuthContext);
  const location = useLocation();


if(loading){
    return <Loading></Loading>
}
  if (user?.email) {
    return children;
  }

  Swal.fire({
    icon: "error",
    title: "Access Denied",
    text: "You must log in to view this page!",
    confirmButtonText: "Go to Login",
    showCancelButton: true,
    cancelButtonText: "Cancel",
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.href = "/signIn"; // Force navigation
    }
  });

  return <Navigate state={location.pathname} to="/signIn" replace />;
};

export default PrivateRoute;