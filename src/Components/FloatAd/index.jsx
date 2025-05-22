import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import balloon1 from "../../assets/Baloon1.png";
import img from "../../assets/coursal2.jpg";
import { MdClose } from "react-icons/md";
import { API } from "../../../config/config";
import axios from "axios";

const getRandomLeft = () => {
  const vw = window.innerWidth;
  const padding = 50;
  return Math.floor(Math.random() * (vw - padding * 2)) + padding;
};

const FloatingAdBalloon = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [showCloseButton, setShowCloseButton] = useState(false);
  const [leftPosition, setLeftPosition] = useState(getRandomLeft());
  const [isHovered, setIsHovered] = useState(false);
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const [adData, setAdData] = useState(null);

  const fireConfetti = () => {
    const colors = [
      "#FF69B4", // Hot Pink
      "#00FFFF", // Cyan
      "#FFD700", // Gold
      "#FF4500", // Orange Red
      "#9400D3", // Dark Violet
      "#32CD32", // Lime Green
    ];
    confetti({
      particleCount: 200,
      spread: 100,
      origin: { y: 0.6 },
      colors,
      gravity: 0.5,
      scalar: 1.4,
      ticks: 90,
    });
  };

  const fetchAdData = async () => {
    try {
      const response = await axios.get(
        `${API}/adverts?slotId=682db445f258bf94f1df6e0a`
      );
      if (response.data && response.data.length > 0) {
        // Use the first ad from the response
        setAdData(response.data[0]);
        console.log(response.data[0]);
      }
    } catch (error) {
      console.error("Error fetching ad data:", error);
    }
  };
  useEffect(() => {
    fetchAdData();
  }, []);
  useEffect(() => {
    if (showPopup) {
      const buttonTimer = setTimeout(() => {
        setShowCloseButton(true);
      }, 3000);

      return () => clearTimeout(buttonTimer);
    }
  }, [showPopup]);

  const handleClick = () => {
    fireConfetti();
    if (navigator.vibrate) navigator.vibrate(150);
    setIsVisible(false);
    setShowPopup(true);
    setShowCloseButton(false);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setTimeout(() => {
      setIsVisible(true);
      setLeftPosition(getRandomLeft());
    }, 1000);
  };

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            key={leftPosition}
            className="fixed z-50 pointer-events-auto cursor-pointer"
            onClick={handleClick}
            style={{
              left: leftPosition,
            }}
            initial={{ top: "100vh" }}
            animate={{
              top: ["100vh", "0vh"],
              rotate: [-5, 5, -5],
            }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{
              top: {
                duration: isMobile ? 14 : 20,
                ease: "linear",
              },
              rotate: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              },
              exit: {
                duration: 0.3,
              },
            }}
          >
            <motion.div
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              animate={{
                scale: isHovered ? 1.15 : 1,
                rotateZ: isHovered ? [0, -5, 5, -5, 0] : 0,
              }}
              transition={{
                scale: { duration: 0.3 },
                rotateZ: { duration: 0.5 },
              }}
              style={{ perspective: "1000px" }}
              role="button"
              aria-label="Special Offer Balloon"
            >
              <img
                src={balloon1}
                alt="Special Offer"
                className="w-16 sm:w-20 md:w-24 lg:w-30 h-auto select-none"
                style={{
                  filter: `drop-shadow(0 0 ${
                    isHovered ? "25px" : "12px"
                  } rgba(255, 255, 0, ${isHovered ? "0.6" : "0.35"}))`,
                  transition: "filter 0.3s",
                }}
              />
              <motion.div
                className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-yellow-300 px-3 py-1 rounded-full text-xs md:text-sm font-semibold text-black whitespace-nowrap shadow-lg border border-yellow-500"
                animate={{
                  y: isHovered ? -6 : 0,
                  scale: isHovered ? 1.1 : 1,
                }}
                transition={{ duration: 0.2 }}
              >
                {isHovered ? "Special Offer!" : "Tap Me"}
              </motion.div>
            </motion.div>
          </motion.div>
        )}

        {showPopup && (
          <motion.div
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 1, scale: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 bg-opacity-50"
          >
            <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4">
              <AnimatePresence>
                {showCloseButton && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    onClick={handleClosePopup}
                    className="cursor-pointer absolute -top-3 -right-3 z-50 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-colors shadow-lg"
                  >
                    <MdClose className="text-xl" />
                  </motion.button>
                )}
              </AnimatePresence>
              {adData && (
                <img
                  src={adData.contentUrl}
                  alt={adData.description}
                  className="w-full h-auto rounded-sm"
                />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingAdBalloon;
