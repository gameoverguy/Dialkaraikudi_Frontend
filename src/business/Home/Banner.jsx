import React from 'react';
import homebanner from "../../assets/home-banner.webp";

function Banner() {
  return (
    <div className="w-full px-4 py-4 lg:px-40 lg:py-5">
      <img
        src={homebanner}
        alt="Home Banner"
        className="w-full h-[30vh] sm:h-[35vh] md:h-[40vh] lg:h-[25vh] object-fit-cover rounded-md"
      />
    </div>
  );
}

export default Banner;