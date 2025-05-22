import React from 'react';

const User = ({ userr }) => {
  const { name, age, image, gender, status, experiences, totalTips } = userr;
  // Only render the card if status is "Active"
  if (status !== "Active") return null;

  return (
    <div className="bg-fuchsia-100 p-3 rounded-2xl shadow-sm">
      <figure>
        <img 
        className='w-full h-50 rounded-xl'
        src={image} alt={name} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
         <span className='italic font-bold'>{name}</span> 
          <div className="badge "> <span className='text-green-800 font-bold italic'> {status} </span> </div>
        </h2>
        <div>
          <div className="badge mr-1">Age: {age}</div>
          <div className="badge">Gender: {gender}</div>
        </div>
        <p><strong> Experiences: </strong>{experiences}</p>
        <h1> <strong>TotalTips : </strong>{totalTips}</h1>
      </div>
    </div>
  );
};

export default User;