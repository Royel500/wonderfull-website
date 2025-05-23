import { useLoaderData } from 'react-router';
import BannerSlider from './BannerSlider';
// import { TipsProvider } from './Context/TipsContext';
import User from './User';

import { useEffect, useState } from 'react';

import TipsCard from './TipsCard';
import ExtraSection from './ExtraSection';
import { Typewriter } from 'react-simple-typewriter';
import ExtraSection2 from './ExtraSection2';
import Example from './ExtraSection2';



const Home = () => {
  const data = useLoaderData(); // This is used for featured gardeners
  const [tips, setTips] = useState([]); // State for tips
 const [plant , setPlant]=useState();
  useEffect(() => {
    fetch('http://localhost:4000/plants')
      .then(res => res.json())
      .then(data => {
        setTips(data);
      });
  }, []);

  return (
 <>
      {/* Banner section */}
      <BannerSlider />
         

      {/* ---- Featured Gardeners ----- */}
      <section>




       
        <h3   className='text-center text-blue-700 font-bold text-3xl italic mt-20'>
  <Typewriter

    cursor
    cursorBlinking
    delaySpeed={1000}
    deleteSpeed={2}
    loop={0}
    typeSpeed={200}
    words={[
      
      'Featured Gardeners :'
     
    ]}
  />
</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-15 mx-5">
          {data.map(userr => (
            <User key={userr._id} userr={userr} />
          ))}
        </div>
      </section>

      {/* ----- Latest Plant Tips ----- */}
      <section>


        <h1 className='text-center text-fuchsia-700 font-bold text-3xl italic mt-20'>Latest Plant Tips:</h1>
        <div className=" grid grid-cols-1 gap-5 my-15 mx-5">
          {tips.map(tip => (
            <TipsCard key={tip._id}
            plant={plant}
            setPlant={setPlant}
            tip={tip} />
          ))}
        </div>
      </section>
        <Example></Example>
      <section>

        <ExtraSection></ExtraSection>

      </section>

   </>
  );
};

export default Home;
