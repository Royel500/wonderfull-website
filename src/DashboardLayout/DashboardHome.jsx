import {  useEffect, useState } from "react";
import useAuth from "../Components/hook/useAuth";
// import AuthProvider, { AuthContext } from "../Components/Context/AuthProvider";


const DashboardHome = () => {
  const { user } = useAuth();
  const [totalItems, setTotalItems] = useState(0);
  const [myItems, setMyItems] = useState(0);

  useEffect(() => {
    // Example: fetch data from API
    fetch("https://a10server.vercel.app/plants")
      .then(res => res.json())
      .then(data => {
        setTotalItems(data.length);
        setMyItems(data.filter(item => item.userEmail === user.email).length);
      });
  }, [user]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Welcome, <span className="text-pink-600">  {user.displayName} </span>  </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4">
        <div className="card bg-blue-100 text-black p-4 shadow">
          <h3 className="text-lg font-bold">Total Items</h3>
          <p>{totalItems}</p>
        </div>
        <div className="card bg-green-100 text-black p-4 shadow">
          <h3 className="text-lg font-bold">My Items</h3>
          <p>{myItems}</p>
        </div>
        <div className="card bg-yellow-100 text-black p-4 shadow">
          <h3 className="text-lg font-bold">Your Email</h3>
          <p>{user.email}</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
