import Lottie from "lottie-react";
import groovyWalkAnimation from "./Animation.json";
import { Typewriter } from 'react-simple-typewriter';
const Example = () => {
  return (
    <>

    <h1 className="text-3xl font-bold italic text-green-800 text-center">

              <Typewriter
    
        cursor
        cursorBlinking
        delaySpeed={1000}
        deleteSpeed={2}
        loop={0}
        typeSpeed={200}
        words={[
          
          ' Plant Trees,Save the World'
         
        ]}
      />
        </h1>
    <div className="flex justify-center items-center min-h-screen">
      <Lottie
        animationData={groovyWalkAnimation}
        style={{ width: 300, height: 200 }}
      />

    </div>

      <section className=" mx-auto p-6 bg-green-50 rounded-lg shadow-md my-10">
      <h2 className="text-4xl font-bold text-green-800 mb-4 text-center">
        Public Awareness about Tree Plantation
      </h2>
      <p className="text-lg text-red-500 mb-6  font-bold  text-center">
        Trees are essential for our environment, health, and future generations. <br />
         Planting trees helps combat climate change, purify the air, and provide habitat for wildlife.
      </p>
      <ul className="list-disc px-10 list-inside text-green-900 space-y-3">
        <li>Trees absorb carbon dioxide and release oxygen, improving air quality.</li>
        <li>They reduce soil erosion and help conserve water.</li>
        <li>Tree shade cools urban areas and reduces energy consumption.</li>
        <li>Planting trees supports biodiversity by providing homes for many species.</li>
        <li>Engaging communities in tree plantation fosters environmental responsibility.</li>
      </ul>
    </section>



    </>
  );
};

export default Example;