import React from 'react';
import { useLoaderData } from 'react-router';
import { useTips } from './Context/TipsContext';

const Details = () => {
  const data = useLoaderData();
  const { likeTip } = useTips();

  return (
    <>
      <div className="lg:w-3xl mx-auto mt-10 p-5 space-y-5 bg-pink-50 rounded shadow">
        <img
          src={data.image}
          alt={data.title}
          className="w-full h-64 object-cover rounded mb-4"
        />
        <h2 className="text-2xl text-center italic font-bold mb-2">{data.category}</h2>
        <div className="flex gap-5">
          <div>
            <p className="mb-2">
              <strong>Plant Type:</strong> {data.plantType}
            </p>
            <p className="mb-2">
              <strong>Difficulty:</strong> {data.difficulty}
            </p>
          </div>
          <div>
            <p className="mb-2">
              <strong>Category:</strong> {data.category}
            </p>
            <p className="mb-2">
              <strong>Visibility:</strong> {data.availability}
            </p>
            <p className="mb-2">
              <strong>By:</strong> {data.userName} ({data.userEmail})
            </p>
          </div>
        </div>
        <p className="mt-4">
          <strong>Description</strong> {data.description}
        </p>

        {/* Like Button */}
        <button
          onClick={() => likeTip(data._id)}
          className="mt-4 btn bg-gradient-to-r from-blue-500 to-green-500 text-white"
        >
          👍 Like
        </button>
      </div>
    </>
  );
};

export default Details;
