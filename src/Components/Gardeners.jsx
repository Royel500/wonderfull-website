import React from 'react';
import { useLoaderData } from 'react-router';

const Gardeners = () => {
  const gardeners = useLoaderData();


  return (
    <>
      <h1 className='text-4xl italic text-center my-10 text-blue-700 font-bold'> All Gardeners here </h1>
 
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8">
    
      {gardeners.map((gardener) => (
        <div key={gardener._id || gardener.id} className="card bg-base-100  shadow-sm">
          <figure>
            <img
              src={gardener.image || "https://i.ibb.co.com/0Rngnj4b/Shaif-01.jpg"}
              alt={gardener.name}
              className="w-full h-48 object-cover rounded"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">
              {gardener.name}
              <div className="badge badge-secondary">{gardener.status}</div>
            </h2>
            <p>Experience: {gardener.experiences}</p>
            <div className="card-actions justify-end">
              <div className="badge badge-outline">Age: {gardener.age}</div>
              <div className="badge badge-outline">{gardener.gender}</div>
              <div className="badge badge-outline">Tips: {gardener.totalTips}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
       </>
  );
};

export default Gardeners;