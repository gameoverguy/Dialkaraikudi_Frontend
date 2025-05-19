import React from "react";
import limited from "../../assets/limited.png";
import limited3 from "../../assets/limited3.jpeg";



const LimitedOffer = () => {
  
  return (
    <>
    <div className="w-11/12 mx-auto flex justify-center items-center text-2xl lg:text-3xl font-bold text-green-800">
      Limited Offers
    </div>
      <div className="w-11/12 mx-auto flex flex-col md:flex-row justify-center items-center gap-3 lg:gap-5 lg:mb-6">

        <div className="w-full lg:w-6/12  h-[20vh] lg:h-[36vh] flex justify-center items-center rounded-lg overflow-hidden">
          <img src={limited} alt="" className="object-fit-cover w-full h-full" />
        </div>

        <div className="w-full lg:w-6/12 h-[20vh] lg:h-[36vh] flex justify-center items-center rounded-lg overflow-hidden">
          <img
            src={limited3}
            alt=""
            className="object-cover h-full w-full"
          />
        </div>
        
      </div>
    </>
  );
};

export default LimitedOffer;
