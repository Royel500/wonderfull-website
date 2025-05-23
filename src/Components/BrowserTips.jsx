import React, { useState } from 'react';
import PlantCard from './PlantCard';
import { useLoaderData } from 'react-router';

const BrowserTips = () => {

    const [plant , setPlant]=useState()
    const data = useLoaderData();
  
    return (
        <div className='space-y-3 mx-5 lg:mx-10 my-10'>
            {data.map(card => (
                <PlantCard key={card._id || 
                    card.id} card={card}
                    plant={plant}
                    setPlant={setPlant}
                    />
            ))}
        </div>
    );
};

export default BrowserTips;