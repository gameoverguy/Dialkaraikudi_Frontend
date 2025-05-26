// import React from 'react';
// import logo from '../assets/loder.gif';

// const LottieLoader = () => {
//   return (
//     <div className='h-screen w-full'>
//       <div className="flex items-center justify-center h-full">
//         <img
//           src={logo}
//           alt="Logo"
//           className="w-[25%]"
//         />
//       </div>
//     </div>

//   );
// };

// export default LottieLoader;

import Lottie from "lottie-react";
import animationData from "../assets/animations/loader.json";

export default function LottieLoader() {
  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="w-20 h-20">
        <Lottie animationData={animationData} loop={true} />
      </div>
    </div>
  );
}