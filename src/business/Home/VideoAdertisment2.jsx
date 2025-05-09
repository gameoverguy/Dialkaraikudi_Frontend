import React from 'react'

function VideoAdertisment2() {
  return (
    <div className="w-full md:w-11/12 mx-auto md:h-[50vh] relative overflow-hidden shadow-xl group">
        {/* Video Background */}
        <video
          className="w-full md:h-full object-cover"
          src="https://res.cloudinary.com/dstm2ouer/video/upload/v1746611943/banner2_mfjknu.mov" // Replace with your actual video path
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 bg-black/20"></div>
        {/* Overlay */}

        {/* Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-6 z-10">
          <h1 className="text-3xl md:text-5xl font-extrabold drop-shadow-lg animate-fade-up">
            Welcome to Shree Jewellery
          </h1>
          <p className="md:mt-4 text-sm md:text-lg text-gray-100 max-w-xl animate-fade-up delay-300">
            Your one-stop hub for services, shopping, and entertainment in
            Karaikudi.
          </p>
          <a
            href="#services"
            className="mt-6 px-6 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold backdrop-blur-md transition duration-300 border border-white/30"
          >
            Explore Now
          </a>
        </div>

        {/* Glow Border (optional animation) */}
      </div>
  )
}

export default VideoAdertisment2