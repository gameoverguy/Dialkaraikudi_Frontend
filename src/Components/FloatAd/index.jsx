import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import bulbImage from '../../assets/bulb.png'; // Make sure the path is correct
import balloon from "../../assets/balloon.png"; // Make sure the path is correct

const getRandomLeft = () => {
  const vw = window.innerWidth;
  const padding = 50; // keep within screen
  return Math.floor(Math.random() * (vw - padding * 2)) + padding;
};

const FloatingAdBalloon = () => {
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window === 'undefined') return true; // SSR safety
    const stored = localStorage.getItem('balloonVisible');
    return stored === null ? true : JSON.parse(stored);
  });

  const [isBursting, setIsBursting] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [leftPosition, setLeftPosition] = useState(getRandomLeft());
  const [uniqueKey, setUniqueKey] = useState(Date.now());

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  useEffect(() => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('balloonVisible', JSON.stringify(isVisible));
  }, [isVisible]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const timer = setTimeout(() => {
      setIsVisible(true);
      localStorage.setItem('balloonVisible', 'true');
      setLeftPosition(getRandomLeft());
      setUniqueKey(Date.now()); // force remount for AnimatePresence
    }, 10000); // show again after 10s

    return () => clearTimeout(timer);
  }, [!isVisible]);

  const fireConfetti = () => {
    const colors = ['#f7d794', '#f5cd79', '#e1b12c'];
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors,
      gravity: 0.5,
      scalar: 1.4,
      ticks: 90
    });
  };

  const handleClick = () => {
    setIsBursting(true);
    fireConfetti();
    if (typeof window !== 'undefined' && navigator.vibrate) navigator.vibrate(150);

    setTimeout(() => {
      setIsVisible(false);
      if (typeof window !== 'undefined') {
        localStorage.setItem('balloonVisible', 'false');
      }
    }, 500);
  };

  return (
    <>
      {typeof window !== 'undefined' && (
        <AnimatePresence mode="wait">
          {isVisible && (
            <motion.div
              key={uniqueKey}
              className="fixed z-50 pointer-events-none top-0 left-0 w-full h-full" // Make it full screen
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                pointerEvents: 'none', // Important: Ensures clicks go through the transparent area
              }}
            >
              <motion.div
                className="absolute pointer-events-auto"
                onClick={handleClick}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onTouchStart={() => setIsHovered(true)}
                onTouchEnd={() => setIsHovered(false)}
                style={{
                  top: '0',
                  left: `${leftPosition}px`,
                  transform: 'translateY(0vh)',
                }}
                initial={{ top: '100vh', left: leftPosition }}
                animate={{
                  top: ['100vh', '0vh'],
                  rotate: [-5, 5, -5],
                }}
                exit={{ opacity: 0 }}
                transition={{
                  top: {
                    duration: isMobile ? 14 : 20,
                    ease: 'linear',
                    repeat: 0
                  },
                  rotate: {
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }
                }}
              >
                <motion.div
                  animate={{
                    scale: isBursting ? 1.4 : isHovered ? 1.15 : 1,
                    opacity: isBursting ? 0 : 1,
                    rotateZ: isHovered ? [0, -5, 5, -5, 0] : 0,
                  }}
                  transition={{
                    scale: { duration: 0.3 },
                    rotateZ: { duration: 0.5 },
                    opacity: { duration: 0.4 },
                  }}
                  style={{ perspective: '1000px' }}
                  role="button"
                  aria-label="Special Offer Balloon"
                >
                  <img
                    src={balloon}
                    alt="Special Offer"
                    className="w-12 sm:w-14 md:w-16 lg:w-18 h-auto select-none"
                    style={{
                      filter: `drop-shadow(0 0 ${
                        isHovered ? '25px' : '12px'
                      } rgba(255, 255, 0, ${isHovered ? '0.6' : '0.35'}))`,
                      transition: 'filter 0.3s',
                    }}
                  />
                  <motion.div
                    className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-yellow-300 px-3 py-1 rounded-full text-xs md:text-sm font-semibold text-black whitespace-nowrap shadow-lg border border-yellow-500"
                    animate={{
                      y: isHovered ? -6 : 0,
                      scale: isHovered ? 1.1 : 1
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    {isHovered ? 'Special Offer!' : 'Tap Me'}
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </>
  );
};

export default FloatingAdBalloon;
