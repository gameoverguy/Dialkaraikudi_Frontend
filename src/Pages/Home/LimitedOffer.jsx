import React, { useEffect, useState } from "react";
import limited from "../../assets/limited.png";
import limited3 from "../../assets/limited3.jpg";
import axios from "axios";
import { API } from "../../../config/config";

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
  const [fadeLeft, setFadeLeft] = useState(true);
  const [fadeRight, setFadeRight] = useState(true);
  const [offerLeftBanner, setOfferLeftBanner] = useState([]);
  const [offerRightBanner, setOfferRightBanner] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeLeft(false); // Start fade out
      setTimeout(() => {
        setLeftIndex((prev) => (prev + 1) % localFallbacksLeft.length);
        setFadeLeft(true); // Start fade in
      }, 500); // wait for fade out before switching
    }, 7000); // every 5 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeRight(false);
      setTimeout(() => {
        setRightIndex((prev) => (prev + 1) % localFallbacksRight.length);
        setFadeRight(true);
      }, 500);
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
        }  else {
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
        }  else {
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






  return (
    <>
      <div className="w-11/12 mx-auto flex justify-center items-center text-2xl lg:text-3xl font-bold text-green-800" id="offer">
        Limited Offers
      </div>

      <div className="w-11/12 mx-auto flex flex-col md:flex-row justify-center items-center gap-3 lg:gap-5 lg:mb-6">

        {/* Left Slide */}
        <div className="w-full lg:w-6/12 h-[20vh] lg:h-fit flex justify-center items-center rounded-lg overflow-hidden">
          <img
            src={offerLeftBanner[leftIndex]?.contentUrl || localFallbacksLeft[0].contentUrl}
            alt=""
            className={`object-scale-down w-full h-full transition-opacity duration-1000 ease-in-out ${
              fadeLeft ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>

        {/* Right Slide */}
        <div className="w-full lg:w-6/12 h-[20vh] lg:h-fit flex justify-center items-center rounded-lg overflow-hidden">
          <img
            src={offerRightBanner[rightIndex]?.contentUrl || localFallbacksRight[0].contentUrl}
            alt=""
            className={`object-scale-down w-full h-full transition-opacity duration-1000 ease-in-out ${
              fadeRight ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>

      </div>
    </>
  );
};

export default LimitedOffer;
