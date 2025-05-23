import React from 'react';

const ExtraSection = () => {
  return (
    <div>

        <div className='font-bold text-3xl italic text-fuchsia-700 text-center'>
          Some Rules we must follow for Gardening
        </div>
   
      <div className="flex rounded-2xl shadow-md flex-col lg:flex-row justify-center items-stretch gap-6 my-6">
     
          <div className="p-6 my-6">
            <h2 className="text-2xl italic font-bold mb-4 text-green-800">Gardener Rules</h2>
            <ul className="list-disc pl-6 text-green-900 space-y-2">
              <li>Respect other gardeners and their time.</li>
              <li>Provide honest availability and skills in your profile.</li>
              <li>Respond to booking requests within 24 hours.</li>
              <li>Clean up the workspace after completing the job.</li>
              <li>Report any issues to platform support immediately.</li>
            </ul>
          </div>
        
  
          <div className="p-6 my-6">
            <h2 className="text-2xl italic font-bold mb-4 text-lime-800">Plant Care Rules</h2>
            <ul className="list-disc pl-6 text-lime-900 space-y-2">
              <li>Always use clean tools to avoid spreading disease.</li>
              <li>Water plants based on their specific needs — not all plants need daily watering.</li>
              <li>Use organic compost and eco-friendly fertilizers where possible.</li>
              <li>Prune plants during their recommended seasons only.</li>
              <li>Keep indoor and outdoor plants free from pests using non-toxic solutions.</li>
            </ul>
          </div>
       
      </div>
    </div>
  );
};

export default ExtraSection;
