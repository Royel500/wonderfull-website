import { useLoaderData } from 'react-router';
import BannerSlider from './BannerSlider';

import { TipsProvider } from './Context/TipsContext';
import User from './User';

const Home = () => {
  const data = useLoaderData();


  return (
    <TipsProvider>
      {/* Banner section */}
      <BannerSlider />
      {/* ----Gardeners----- */}
       <section>
            <h1 className='text-center font-bold text-3xl italic mt-20'>Featured Gardeners:</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-15 mx-5">
    {
      data.map(userr=>(
        <User key={userr._id} 
        userr={userr}
        ></User>
      ))
    }
    </div>
    </section>
    {/* ----- Tips shears----- */}
    <section>

    </section>
    </TipsProvider>
  );
};

export default Home;
