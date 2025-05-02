import React from 'react'
import homebanner from "../../assets/home-banner.jpg";

function Banner() {
  return (
    
      <div
        className="flex bg-cover justify-center w-full items-center md:bg-auto md:bg-center md:w-full opacity-90 lg:py-5">
            <img src={homebanner} alt='' className='w-full h-[30vh] lg:h-[50vh] object-fit-cover' />
      </div>
    
  )
}

export default Banner