import React from 'react';
import { useLoaderData } from 'react-router';
import PlantCard from './PlantCard';

const Home = () => {
    const plantdata = useLoaderData();

    return (
        <div>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 mx-5'>
            {
                plantdata.map(card => <PlantCard key={card._id} card={card}></PlantCard>)
            }
          </div>
        </div>
    );
};

export default Home;