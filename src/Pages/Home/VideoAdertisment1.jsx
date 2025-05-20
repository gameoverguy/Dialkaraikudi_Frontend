import React, { useState, useEffect } from 'react';

function VideoAdertisment1({ videos }) {

  console.log(videos, "qwrwtt");
  
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  useEffect(() => {
    if (!videos || videos.length === 0) return;

    const videoElement = document.getElementById('video1');
    
    const handleVideoEnd = () => {
      setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
    };

    if (videoElement) {
      videoElement.addEventListener('ended', handleVideoEnd);
    }

    return () => {
      if (videoElement) {
        videoElement.removeEventListener('ended', handleVideoEnd);
      }
    };
  }, [videos, currentVideoIndex]);

  if (!videos || videos.length === 0) {
    return null;
  }

  return (
    <div className="w-full lg:w-11/12 mx-auto lg:h-[60vh] relative overflow-hidden group">
      {/* Video Background */}
      <video
        id="video1"
        className="w-full h-full object-cover"
        src={videos[currentVideoIndex]?.contentUrl}
        autoPlay
        muted
        loop={videos.length === 1} // Only loop if there's a single video
        playsInline
      />
      <div className="absolute inset-0 bg-black/20"></div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-6 z-10">
        <h1 className="text-3xl md:text-5xl font-extrabold drop-shadow-lg animate-fade-up">
          {videos[currentVideoIndex]?.description || 'Welcome to Dial Karaikudi'}
        </h1>
      </div>
    </div>
  );
}

export default VideoAdertisment1;