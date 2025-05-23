import React from 'react';
import { useLoaderData } from 'react-router';

const Gardeners = () => {
  const gardeners = useLoaderData();
  console.log(gardeners);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8">
      {gardeners.map((gardener) => (
        <div key={gardener._id || gardener.id} className="card bg-base-100  shadow-sm">
          <figure>
            <img
              src={gardener.image || "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"}
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
  );
};

export default Gardeners;