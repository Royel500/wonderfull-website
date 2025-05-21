import React, { useState } from 'react';
import PlantCard from './PlantCard';
import { useLoaderData } from 'react-router';

const BrowserTips = () => {

    const [plant , setPlant]=useState()
    const data = useLoaderData();
  
    return (
        <div>
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