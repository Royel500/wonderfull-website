import React from 'react';
import { useLoaderData } from 'react-router';

const Details = () => {
    const data = useLoaderData();
    console.log(data);

    return (
        <div className=" lg:w-3xl mx-auto mt-10 p-5 space-y-5 bg-green-200 rounded shadow">
            <img src={data.image
} alt={data.title} className="w-full h-64 object-cover rounded mb-4" />
   <h2 className="text-2xl text-center font-bold mb-2">{data.category}</h2>
 <div className='flex gap-5'>


 <div>
          
             <p className="mb-2"><strong>Plant Type:</strong> {data.plantType}</p>
            <p className="mb-2"><strong>Difficulty:</strong> {data.difficulty}</p>
 </div>
           <div>
          <p className="mb-2"><strong>Category:</strong> {data.category}</p>
            <p className="mb-2"><strong>Visibility:</strong> {data.availability}</p>
            <p className="mb-2"><strong>By:</strong> {data.userName}    ({data.userEmail})</p>
           </div>
        </div>
         <p className="mt-4">{data.description}</p>
         </div>
    );
};

export default Details;