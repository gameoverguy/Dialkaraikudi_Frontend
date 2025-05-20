import React, { useEffect, useState } from "react";
import limited from "../../assets/limited.png";
import limited3 from "../../assets/limited3.jpeg";
import axios from "axios";
import { API } from "../../../config/config";

const LimitedOffer = () => {
  const [heroOfferBanner, setHeroOfferBanner] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);

  const localImages = [
    { id: 1001, contentUrl: limited },
    { id: 1002, contentUrl: limited3 },
  ];

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await axios.get(`${API}/adverts`);
        const ads = response.data.filter(
          (ad) => ad.slotId?.page === "home" && ad.slotId?._id === "682b12797e0c060d62669940"
        );
        let combinedAds = [];

        if (ads.length >= 4) {
          combinedAds = ads.slice(0, 4);
        } else if (ads.length === 3 || ads.length === 1) {
          combinedAds = [...ads, localImages[0]];
        } else if (ads.length === 2 || ads.length === 0) {
          combinedAds = [...ads, ...localImages.slice(0, 2)];
        }

        setHeroOfferBanner(combinedAds);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAds();
  }, []);

  useEffect(() => {
    if (heroOfferBanner.length > 0) {
      const interval = setInterval(() => {
        setFadeIn(false);
        setTimeout(() => {
          setCurrentImageIndex(
            (prevIndex) => (prevIndex + 1) % heroOfferBanner.length
          );
          setFadeIn(true);
        }, 1000);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [heroOfferBanner]);

  return (
    <>
      <div className="w-11/12 mx-auto flex justify-center items-center text-2xl lg:text-3xl font-bold text-green-800">
        Limited Offers
      </div>
      <div className="w-11/12 mx-auto flex flex-col md:flex-row justify-center items-center gap-3 lg:gap-5 lg:mb-6">
        {heroOfferBanner.map((banner, i) => (
          <div
            key={i}
            className="w-full lg:w-6/12 h-[20vh] lg:h-[36vh] flex justify-center items-center rounded-lg overflow-hidden"
          >
            <img
              src={banner.contentUrl}
              alt=""
              className={`object-cover w-full h-full transition-opacity duration-1000 ${
                fadeIn ? "opacity-100" : "opacity-0"
              }`}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default LimitedOffer;
