import React from 'react';
import { useLoaderData } from 'react-router';
import PlantCard from './PlantCard';
import BannerSlider from './BannerSlider';

const Home = () => {
    const plantdata = useLoaderData();

    return (
        <div>
          <BannerSlider></BannerSlider>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 my-15 mx-5'>
            {
                plantdata.map(card => <PlantCard key={card._id} card={card}></PlantCard>)
            }
          </div>
        </div>
    );
};

export default Home;