import React, { useState, useEffect } from 'react';
import { IoMdVolumeHigh, IoMdVolumeOff } from 'react-icons/io';
import { MdSkipNext } from 'react-icons/md';

function VideoAdertisment1({ videos }) {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

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

  const handlePlayPause = () => {
    const video = document.getElementById('video1');
    if (video) {
      if (isPlaying) {
        video.pause();
      } else {
        video.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleMuteToggle = () => {
    const video = document.getElementById('video1');
    if (video) {
      video.muted = !video.muted;
      setIsMuted(!isMuted);
    }
  };

  const handleNextVideo = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
  };

  if (!videos || videos.length === 0) {
    return null;
  }

  return (
    <div 
      className="w-full lg:w-11/12 mx-auto h-full md:[50vh] lg:h-[80vh] relative overflow-hidden group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Video Background */}
      <video
        id="video1"
        className="w-full h-full object-cover"
        src={videos[currentVideoIndex]?.contentUrl}
        autoPlay
        playsInline
        loop={videos.length === 1}
        muted={isMuted}
      />
      <div className="absolute inset-0 bg-black/20"></div>

      {/* Custom Controls */}
      <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4 transition-all duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
        <div className="flex items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <button
              onClick={handlePlayPause}
              className="text-white hover:text-gray-300 transition-colors"
            >
              {isPlaying ? (
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                </svg>
              ) : (
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              )}
            </button>
            <button
              onClick={handleMuteToggle}
              className="text-white hover:text-gray-300 transition-colors"
            >
              {isMuted ? (
                <IoMdVolumeOff className="w-6 h-6" />
              ) : (
                <IoMdVolumeHigh className="w-6 h-6" />
              )}
            </button>
            {videos.length > 1 && (
              <button
                onClick={handleNextVideo}
                className="text-white hover:text-gray-300 transition-colors"
                title="Next video"
              >
                <MdSkipNext className="w-6 h-6" />
              </button>
            )}
          </div>
          <span className="text-white text-sm">
            Video {currentVideoIndex + 1} of {videos.length}
          </span>
        </div>
      </div>
    </div>
  );
}

export default VideoAdertisment1;