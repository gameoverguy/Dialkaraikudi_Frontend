import React from "react";

const LimitedOffer = () => {
  return (
    <>
    <div className="w-11/12 mx-auto flex justify-center items-center text-2xl lg:text-4xl font-bold">
      Limited Offers
    </div>
      <div className="w-11/12 mx-auto flex flex-col md:flex-row justify-center items-center gap-3 lg:gap-5 lg:mb-6">

        <div className="w-full lg:w-6/12  h-[20vh] lg:h-[36vh] flex justify-center items-center rounded-lg overflow-hidden">
          <img src="./limited.png" alt="" className="object-fit-cover w-full h-full" />
        </div>

        <div className="w-full lg:w-6/12 h-[20vh] lg:h-[36vh] flex justify-center items-center rounded-lg overflow-hidden">
          <img
            src="./limited3.jpeg"
            alt=""
            className="object-cover h-full w-full"
          />
        </div>
        
      </div>
    </>
  );
};

export default LimitedOffer;
