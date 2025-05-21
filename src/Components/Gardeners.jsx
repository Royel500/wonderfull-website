// Components/Gardeners.jsx
import React from 'react';
import gardeners from './Gardeners';

const Gardeners = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {gardeners.map(gardener => (
        <div key={gardener.id} className="bg-white rounded-lg shadow p-4">
          <img src={gardener.image} alt={gardener.name} className="w-full h-48 object-cover rounded mb-4" />
          <h2 className="text-xl font-bold">{gardener.name}</h2>
          <p><strong>Age:</strong> {gardener.age}</p>
          <p><strong>Gender:</strong> {gardener.gender}</p>
          <p><strong>Status:</strong> {gardener.status}</p>
          <p><strong>Experience:</strong> {gardener.experiences}</p>
          <p><strong>Total Shared Tips:</strong> {gardener.totalTips}</p>
        </div>
      ))}
    </div>
  );
};

export default Gardeners;
