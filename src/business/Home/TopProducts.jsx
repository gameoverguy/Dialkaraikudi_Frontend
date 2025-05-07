import React from "react";
import toppro2 from "../../assets/toppro2.jpg";

function TopProducts() {
  return (
    <>
      <div className="w-full md:w-11/12 flex flex-col md:flex-row justify-center items-center mx-auto cursor-pointer py-5">
        <div className="w-full md:w-6/12 relative group overflow-hidden">
          <video
                    className="w-full h-[340px] object-cover"
                    src="https://res.cloudinary.com/dstm2ouer/video/upload/v1746612083/store_nh16ay.mp4" // Replace with your actual video path
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
          {/* Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
          {/* Centered Text */}
          <div className="absolute inset-0 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <p className="text-white text-3xl font-semibold">Top Products</p>
          </div>
        </div>
        <div className="w-full md:w-6/12">
          <img src={toppro2} alt="" />
        </div>
      </div>
    </>
  );
}

export default TopProducts;
