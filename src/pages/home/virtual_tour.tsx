import React from 'react';
import { FaVrCardboard } from 'react-icons/fa';
const VirtualTourLanding: React.FC = () => {
  const goToTour = (url: string) => {
    window.open(url, '_blank');
  };
  

  return (
    <div className="w-full h-full mt-20 pt-20 pb-20 bg-[#202335] flex flex-col items-center justify-center gap-6">

<div className="text-white xs:text-xl md:text-2xl font-bold tracking-wide flex items-center gap-2">
  <FaVrCardboard className="text-white" />
  YES TECH VIRTUAL TOUR
</div>

      <div className="flex gap-10 justify-center items-center">
        <button
          className="bg-white text-black font-bold px-6 py-3 rounded-full text-xl tracking-wide hover:bg-black hover:text-white transition duration-300 ease-in-out"
          onClick={() => goToTour('http://www.720yun.com/vr/ba6jz0wvrn0')}
        >
          SHENZHEN
        </button>
        <button
          className="bg-white text-black font-bold px-6 py-3 rounded-full text-xl tracking-wide hover:bg-black hover:text-white transition duration-300 ease-in-out"
          onClick={() => goToTour('http://www.720yun.com/vr/785jOOtysv9')}
        >
          CHANGSHA
        </button>
      </div>
    </div>
  );
};

export default VirtualTourLanding;
