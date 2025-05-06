import React from 'react'
import topser1 from "../../assets/topser1.avif";
import topser2 from "../../assets/topser2.jpg";


function TopServices() {
  return (
    <>
          <div className="w-full md:w-10/12 flex flex-col md:flex-row justify-center items-center mx-auto cursor-pointer py-5">
            <div className="w-full md:w-6/12 relative group overflow-hidden">
            <img src={topser1} alt='' className='w-full md:h-[340px]' />
            
              {/* Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
              {/* Centered Text */}
              <div className="absolute inset-0 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white text-3xl font-semibold">Top Services</p>
              </div>
            </div>
            <div className="w-full md:w-6/12">
            <img src={topser2} alt='' className='md:h-[340px]' />
              
            </div>
          </div>
        </>
  )
}

export default TopServices