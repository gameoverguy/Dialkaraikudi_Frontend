import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import popup from "../../assets/popup.jpg";
import axios from "axios";
import { API } from "../../../config/config";
import { useNavigate } from "react-router-dom";

const AdPopup = () => {
  const [showAd, setShowAd] = useState(false);
  const [showCloseIcon, setShowCloseIcon] = useState(false);
  const [adPopup, setAdPopup] = useState([]);
  const navigate = useNavigate();

  const localFallbacks = [{image: popup}];

  
  useEffect(() => {
    const adTimer = setTimeout(() => {
      setShowAd(true);

      // Show close icon 5 seconds after popup shows
      const closeIconTimer = setTimeout(() => {
        setShowCloseIcon(true);
      }, 5000);

      // Auto-close popup after 10 seconds
      const autoCloseTimer = setTimeout(() => {
        setShowAd(false);
      }, 10000);

      return () => {
        clearTimeout(closeIconTimer);
        // clearTimeout(autoCloseTimer);
      };
    }, 2000); // Show popup after 6 seconds

    return () => clearTimeout(adTimer);
  }, []);


  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await axios.get(`${API}/adverts`);
        
        const ads = response.data.filter(
          (ad) =>
            ad.slotId?.page === "home" &&
            ad.slotId?._id === "682eb7267ba840d99e3e37d7" &&
            ad.isActive
        );
        console.log("adPopup", response.data);
        
        

        let finalSlides = [];

        if (ads.length === 0) {
          finalSlides = localFallbacks.slice(0, 1);
        } 
        else {
          finalSlides = ads;
        }
        setAdPopup(finalSlides);
      } catch (error) {
        console.error("Error fetching ads:", error);
        setAdPopup(localFallbacks.slice(0, 1)); // Fallback if API fails
      }
    };

    fetchAds();
  }, []);

  const handleCategoryClick = (category) => {
        navigate(`/business/${category}`);
    };

  return (
    <>
      {showAd && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/60">
          <div className="relative h-[30vh] w-10/12 md:w-9/12 md:h-[40vh] lg:w-5/12 lg:h-[50vh] overflow-hidden shadow-lg cursor-pointer">
            {/* Background Image */}
            {
              adPopup.map((item, i) => (
                <img key={i}
              src={item.contentUrl || item.image}
              alt="Ad"
              className="absolute inset-0 w-full h-full z-0" onClick={() => handleCategoryClick(item.businessId?._id)}
            />
              ))
            }
            
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
