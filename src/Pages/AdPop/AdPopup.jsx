import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import popup from "../../assets/popup.jpg";

const AdPopup = () => {
  const [showAd, setShowAd] = useState(false);
  const [showCloseIcon, setShowCloseIcon] = useState(false);

  useEffect(() => {
    const adTimer = setTimeout(() => {
      setShowAd(true);

      // Show close icon 5 seconds after popup shows
      const closeIconTimer = setTimeout(() => {
        setShowCloseIcon(true);
      }, 5000);

      // Auto-close popup after 10 seconds
      // const autoCloseTimer = setTimeout(() => {
      //   setShowAd(false);
      // }, 10000);

      return () => {
        clearTimeout(closeIconTimer);
        // clearTimeout(autoCloseTimer);
      };
    }, 2000); // Show popup after 6 seconds

    return () => clearTimeout(adTimer);
  }, []);

  return (
    <>
      {showAd && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/60">
          <div className="relative h-[30vh] w-10/12 md:w-9/12 md:h-[40vh] lg:w-5/12 lg:h-[50vh] overflow-hidden shadow-lg">
            {/* Background Image */}
            <img
              src={popup}
              alt="Ad"
              className="absolute inset-0 w-full h-full z-0"
            />

            {/* Close Icon */}
            {showCloseIcon && (
              <button
                className="absolute top-0 right-0 bg-black p-2 text-white hover:text-gray-300 z-20 cursor-pointer"
                onClick={() => setShowAd(false)}
              >
                <IoMdClose size={24} />
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default AdPopup;
