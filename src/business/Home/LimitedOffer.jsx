import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LimitedOffer = () => {
  // Set the countdown time (2 hours from now)
  const offerEndTime = new Date().getTime() + 4 * 60 * 60 * 1000;

  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const difference = offerEndTime - now;

    if (difference <= 0) return { hours: 0, minutes: 0, seconds: 0 };

    return {
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div
  className="relative flex justify-center items-center text-white w-full md:w-10/12 mt-3 mx-auto md:py-20 bg-cover bg-center h-fit md:min-h-[60vh] md:mb-5 rounded"
  style={{
    backgroundImage: "url('https://www.dialkaraikudi.com/assets/img2-CxJPdS18.jpg')",
  }}
>
   

  {/* Content */}
  <div className="text-center relative z-10">
    <h2 className="text-2xl md:text-4xl font-bold mb-4">Limited Time Offer!</h2>
    {/* <p className="md:text-2xl mb-6 font-bold">
      Get your scholarship up to <span className="text-danger md:text-5xl animate-pulse duration-300 ease-in-out font-bold pl-2.5 transition-all text-green-600">100%</span>. Hurry before the offer ends!
    </p> */}

    {/* Timer with Animation */}
    <div className="flex justify-center text-3xl font-bold space-x-4">
      {["Hours", "Minutes", "Seconds"].map((label, index) => {
        const value =
          index === 0 ? timeLeft.hours : index === 1 ? timeLeft.minutes : timeLeft.seconds;
        return (
          <div key={label} className="bg-gray-800 rounded text-center px-4 py-2">
            <AnimatePresence mode="wait">
              <motion.span
                key={`${label}-${value}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3 }}
                className="block"
              >
                {String(value).padStart(2, "0")}
              </motion.span>
            </AnimatePresence>
            <p className="text-sm">{label}</p>
          </div>
        );
      })}
    </div>
  </div>
</div>
  );
};

export default LimitedOffer;
