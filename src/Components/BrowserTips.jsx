import React from 'react';
import PlantCard from './PlantCard';
import { useLoaderData } from 'react-router';

const BrowserTips = () => {
    const data = useLoaderData();
    
    console.log(data)
    return (
        <div>
            {
                data.map(card=>(
                    <PlantCard key={card._id} 
                    
                    ></PlantCard>
                ) )
            }
          
        </div>
    );
};

export default BrowserTips;