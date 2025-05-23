import React, { useState } from 'react';
import PlantCard from './PlantCard';
import { useLoaderData } from 'react-router';

const BrowserTips = () => {
  const allTips = useLoaderData(); // all plant tips
  const [plant, setPlant] = useState(allTips); // for deletion handling
  const [difficulty, setDifficulty] = useState('All'); // filter state

  // Filtering logic
  const filteredTips = difficulty === 'All'
    ? plant
    : plant.filter((tip) => tip.difficulty === difficulty);

  return (
    <div className='mx-5 lg:mx-10 my-10 space-y-5'>
      
      {/* Filter Dropdown */}
      <div className="flex justify-end mb-4">
        <select
          onChange={(e) => setDifficulty(e.target.value)}
          className="select select-bordered max-w-xs"
        >
          <option value="All">All Difficulties</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </div>

      {/* Tip Cards */}
      {filteredTips.length ? (
        filteredTips.map((card) => (
          <PlantCard
            key={card._id || card.id}
            card={card}
            plant={plant}
            setPlant={setPlant}
          />
        ))
      ) : (
        <p className="text-center text-gray-500">No tips found for selected difficulty.</p>
      )}
    </div>
  );
};

export default BrowserTips;
