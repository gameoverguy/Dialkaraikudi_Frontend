import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import coursal1 from "../../assets/coursal1.jpg";
import coursal2 from "../../assets/coursal2.jpg";
import coursal3 from "../../assets/coursal3.jpg";
import axios from "axios";
import { API } from "../../../config/config";
import { useNavigate } from "react-router-dom";

const Carousel = () => {
  const [heroBanner, setHeroBanner] = useState([]);
  const navigate = useNavigate();

  const localFallbacks = [
    { id: "local-1", contentUrl: coursal1 },
    { id: "local-2", contentUrl: coursal2 },
    { id: "local-3", contentUrl: coursal3 },
  ];

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await axios.get(`${API}/adverts`);
        
        const ads = response.data.filter(
          (ad) =>
            ad.slotId?.page === "home" &&
            ad.slotId?._id === "68272bafa52bbd6718f881f7" &&
            ad.isActive
        );
        console.log(response.data);

        let finalSlides = [];

        if (ads.length === 0) {
          finalSlides = localFallbacks.slice(0, 3);
        } else if (ads.length === 1) {
          finalSlides = [...ads, ...localFallbacks.slice(0, 2)];
        } else if (ads.length === 2) {
          finalSlides = [...ads, ...localFallbacks.slice(0, 1)];
        } else {
          finalSlides = ads;
        }

        setHeroBanner(finalSlides);
      } catch (error) {
        console.error("Error fetching ads:", error);
        setHeroBanner(localFallbacks.slice(0, 3)); // Fallback if API fails
      }
    };

    fetchAds();
  }, []);

const handleCategoryClick = (category) => {
        navigate(`/business/${category}`);
    };

  const settings = {
    dots: true,
    infinite: true,
    speed: 2500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: true,
    cssEase: "linear",
    lazyLoad: "progressive",
  };

  return (
    <div className="overflow-hidden w-full h-fit cursor-pointer relative">
      <Slider {...settings}>
        {heroBanner.map((banner, index) => (
          <img
            key={index}
            src={banner.contentUrl}
            alt={`Slide ${index + 1}`}
            className="bg-cover w-full lg:h-[60vh] relative z-0"
            loading="lazy" onClick={() => handleCategoryClick(banner.businessId?._id)}
          />
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
