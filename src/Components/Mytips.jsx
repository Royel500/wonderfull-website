import React, { useState, useEffect } from 'react';
import { useLoaderData } from 'react-router-dom'; // ✅ fixed import path
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom'; // ✅ fixed import path
import useAuth from './hook/useAuth';

const MyTips = () => {
  const { user } = useAuth();
  const allTips = useLoaderData(); // All tips from server
  const [tips, setTips] = useState([]);



  // ✅ Filter tips for logged-in user
  useEffect(() => {
    if (user?.email) {
      const userTips = allTips.filter(tip => tip.userEmail === user.email);
      setTips(userTips);
    }
  }, [allTips, user]);

  // ✅ Handle delete
  const handleDelete = (_id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://a10server.vercel.app/plants/${_id}`, {
          method: 'DELETE'
        })
          .then(res => res.json())
          .then(data => {            
            if (data.deletedCount > 0) {
              Swal.fire('Deleted!', 'The tip has been deleted.', 'success');
              const remaining = tips.filter(tip => tip._id !== _id);
              setTips(remaining);
            }
          });
      }
    });
  };


  return (
    
    <div className="p-6">
      <h2 className="text-3xl font-bold italic text-blue-800 text-center mb-4">
        My All Garden Tips
      </h2>

      <div className="overflow-x-auto">
        <table className="table-auto w-full border">
          <thead className="bg-green-100 text-left">
            <tr>
              <th className="p-2">Photo</th>
              <th className="p-2">Title</th>
              <th className="p-2">Status</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tips.map(tip => (
              <tr key={tip._id} className="border-t">
                <td className="p-2">
                  <img
                    src={tip.image}
                    alt="Tip"
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="p-2">{tip.name}</td>
                <td className="p-2">{tip.availability || 'N/A'}</td>
                <td className="p-2 flex gap-3">
                  <Link to={`/update/${tip._id}`}>
                    <button className="bg-yellow-500 text-white px-3 py-1 rounded">
                      Update
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(tip._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {tips.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center p-4 text-gray-500">
                  No tips found.Please give some tips to show data.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyTips;
