import React, { useEffect, useState } from "react";
import limited from "../../assets/limited.png";
import limited3 from "../../assets/limited3.jpg";
import axios from "axios";
import { API } from "../../../config/config";
import { useNavigate } from "react-router-dom";

const LimitedOffer = () => {
  const localFallbacksLeft = [
    { id: 1001, contentUrl: limited },
    { id: 1002, contentUrl: limited3 },
  ];

  const localFallbacksRight = [
    { id: 1003, contentUrl: limited },
    { id: 1004, contentUrl: limited3 },
  ];

  const [leftIndex, setLeftIndex] = useState(0);
  const [rightIndex, setRightIndex] = useState(0);
  const [offerLeftBanner, setOfferLeftBanner] = useState([]);
  const [offerRightBanner, setOfferRightBanner] = useState([]);
  const [isInitialLeftLoad, setIsInitialLeftLoad] = useState(true);
const [isInitialRightLoad, setIsInitialRightLoad] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setLeftIndex((prev) => (prev + 1) % 2);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setRightIndex((prev) => (prev + 1) % 2);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  // Left banner
  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await axios.get(`${API}/adverts`);

        const ads = response.data.filter(
          (ad) =>
            ad.slotId?.page === "home" &&
            ad.slotId?._id === "682b12797e0c060d62669940" &&
            ad.isActive
        );
        console.log("limited", response.data);

        let finalSlides = [];

        if (ads.length === 0) {
          finalSlides = localFallbacksLeft.slice(0, 2);
        } else if (ads.length === 1) {
          finalSlides = [...ads, ...localFallbacksLeft.slice(0, 1)];
        } else {
          finalSlides = ads;
        }

        setOfferLeftBanner(finalSlides);
      } catch (error) {
        console.error("Error fetching ads:", error);
        setOfferLeftBanner(localFallbacksLeft.slice(0, 2)); // Fallback if API fails
      }
    };

    fetchAds();
  }, []);

  const handleCategoryClick = (category) => {
    navigate(`/business/${category}`);
  };

  // Right banner
  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await axios.get(`${API}/adverts`);

        const ads = response.data.filter(
          (ad) =>
            ad.slotId?.page === "home" &&
            ad.slotId?._id === "682c1a7b0c32012c369edade" &&
            ad.isActive
        );
        console.log("limited1", response.data);

        let finalSlides = [];

        if (ads.length === 0) {
          finalSlides = localFallbacksRight.slice(0, 2);
        } else if (ads.length === 1) {
          finalSlides = [...ads, ...localFallbacksRight.slice(0, 1)];
        } else {
          finalSlides = ads;
        }

        setOfferRightBanner(finalSlides);
      } catch (error) {
        console.error("Error fetching ads:", error);
        setOfferRightBanner(localFallbacksRight.slice(0, 2)); // Fallback if API fails
      }
    };

    fetchAds();
  }, []);


  useEffect(() => {
  setIsInitialLeftLoad(false);
}, []);

useEffect(() => {
  setIsInitialRightLoad(false);
}, []);

  return (
    <>
      <div
        className="w-11/12 mx-auto  flex justify-center items-center text-2xl lg:text-3xl font-bold text-green-800"
        id="offer"
      >
        Limited Offers
      </div>

      <div className="px-5 w-full lg:w-11/12 mx-auto flex flex-col lg:flex-row justify-center items-center md:px-0 gap-3 lg:gap-3 mb-6">
        {/* Left Slide */}
        <div className="w-full lg:w-6/12 h-[25vh] md:h-[30vh] lg:h-[40vh] relative rounded-lg overflow-hidden cursor-pointer">
          {offerLeftBanner.length > 0 &&
            offerLeftBanner
              .slice(0, 2)
              .map((item, idx) => (
                <img
                  key={item.id || idx}
                  src={item.contentUrl}
                  alt=""
                  className={`absolute inset-0 lg:object-cover w-full h-full transition-opacity duration-1000 ease-in-out ${
                    leftIndex === idx ? "opacity-100 z-20" : "opacity-0 z-0"
                  } ${
  isInitialLeftLoad ? "opacity-100" : "transition-opacity duration-1000 ease-in-out"
}`}
                  onClick={() => handleCategoryClick(item.businessId?._id)}
                />
              ))}
        </div>

        {/* Right Slide */}
        <div className="w-full lg:w-6/12 h-[25vh] md:h-[30vh] lg:h-[40vh] relative rounded-lg overflow-hidden cursor-pointer">
          {offerRightBanner.length > 0 &&
            offerRightBanner
              .slice(0, 2)
              .map((item, idx) => (
                <img
                  key={item.id || idx}
                  src={item.contentUrl}
                  alt=""
                  className={`absolute inset-0 lg:object-cover w-full h-full transition-opacity duration-1000 ease-in-out ${
                    rightIndex === idx ? "opacity-100 z-20" : "opacity-0 z-0"
                  } ${
  isInitialRightLoad ? "opacity-100" : "transition-opacity duration-1000 ease-in-out"
}`}
                  onClick={() => handleCategoryClick(item.businessId?._id)}
                />
              ))}
        </div>
      </div>
    </>
  );
};

export default LimitedOffer;
