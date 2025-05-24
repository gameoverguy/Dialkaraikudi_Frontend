import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import axios from "axios";
import { API } from "../../../config/config";
import { useNavigate } from "react-router-dom";

const localFallbacksProducts = [
  {
    id: 1,
    label: "New",
    image: "https://react.marketpro.wowtheme7.com/assets/images/thumbs/product-img18.png",
    title: "Tropicana 100% Juice, Orange, No Pulp",
    price: "$14.99",
    oldPrice: "$28.99",
    rating: 4.8,
    reviews: "17k",
  },
  {
    id: 2,
    label: "Sale 50%",
    image: "https://react.marketpro.wowtheme7.com/assets/images/thumbs/product-img8.png",
    title: "O Organics Milk, Whole, Vitamin D",
    price: "$14.99",
    oldPrice: "$28.99",
    rating: 4.8,
    reviews: "17k",
  },
  {
    id: 3,
    label: "Sale 50%",
    image: "https://react.marketpro.wowtheme7.com/assets/images/thumbs/product-img8.png",
    title: "O Organics Milk, Whole, Vitamin D",
    price: "$14.99",
    oldPrice: "$28.99",
    rating: 4.8,
    reviews: "17k",
  },
  {
    id: 4,
    label: "Best Sale",
    image: "https://react.marketpro.wowtheme7.com/assets/images/thumbs/product-img9.png",
    title: "O Organics Milk, Whole, Vitamin D",
    price: "$14.99",
    oldPrice: "$28.99",
    rating: 4.8,
    reviews: "17k",
  },
  {
    id: 5,
    label: "Sale 50%",
    image: "https://react.marketpro.wowtheme7.com/assets/images/thumbs/product-img8.png",
    title: "O Organics Milk, Whole, Vitamin D",
    price: "$14.99",
    oldPrice: "$28.99",
    rating: 4.8,
    reviews: "17k",
  },
  {
    id: 6,
    label: "Best Sale",
    image: "https://react.marketpro.wowtheme7.com/assets/images/thumbs/product-img10.png",
    title: "O Organics Milk, Whole, Vitamin D",
    price: "$14.99",
    oldPrice: "$28.99",
    rating: 4.8,
    reviews: "17k",
  },
];



export default function Offers() {
const [productOffers, setProductOffers] = useState([]);
const [serviceOffer, setServiceOffers] = useState([]);
const navigate = useNavigate();

// Product offers
useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await axios.get(`${API}/adverts`);
        
        const ads = response.data.filter(
          (ad) =>
            ad.slotId?.page === "home" &&
            ad.slotId?._id === "682c6cd2892d318a662b2226" &&
            ad.isActive
        );
        console.log("productOffers", response.data);
        
        

        let finalSlides = [];

        if (ads.length === 0) {
          finalSlides = localFallbacksProducts.slice(0, 5);
        } else if (ads.length === 1) {
          finalSlides = [...ads, ...localFallbacksProducts.slice(0, 4)];
        } else if (ads.length === 2) {
          finalSlides = [...ads, ...localFallbacksProducts.slice(0, 3)];
        }
        else if (ads.length === 3) {
          finalSlides = [...ads, ...localFallbacksProducts.slice(0, 2)];
        }
        else if (ads.length === 4) {
          finalSlides = [...ads, ...localFallbacksProducts.slice(0, 1)];
        }
        else {
          finalSlides = ads;
        }
        setServiceOffers(finalSlides);
      } catch (error) {
        console.error("Error fetching ads:", error);
        setServiceOffers(localFallbacksProducts.slice(0, 5)); // Fallback if API fails
      }
    };

    fetchAds();
  }, []);
// Services offers

useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await axios.get(`${API}/adverts`);
        
        const ads = response.data.filter(
          (ad) =>
            ad.slotId?.page === "home" &&
            ad.slotId?._id === "682c6cae892d318a662b2224" &&
            ad.isActive
        );
        console.log("serviceOffers", response.data);
        
        

        let finalSlides = [];

        if (ads.length === 0) {
          finalSlides = localFallbacksProducts.slice(0, 5);
        } else if (ads.length === 1) {
          finalSlides = [...ads, ...localFallbacksProducts.slice(0, 4)];
        } else if (ads.length === 2) {
          finalSlides = [...ads, ...localFallbacksProducts.slice(0, 3)];
        }
        else if (ads.length === 3) {
          finalSlides = [...ads, ...localFallbacksProducts.slice(0, 2)];
        }
        else if (ads.length === 4) {
          finalSlides = [...ads, ...localFallbacksProducts.slice(0, 1)];
        }
        else {
          finalSlides = ads;
        }
        setProductOffers(finalSlides);
      } catch (error) {
        console.error("Error fetching ads:", error);
        setProductOffers(localFallbacksProducts.slice(0, 5)); // Fallback if API fails
      }
    };

    fetchAds();
  }, []);

const handleCategoryClick = (category) => {
        navigate(`/business/${category}`);
    };


  return (
    <div className="flex flex-col md:flex-row justify-center items-center w-full md:w-11/12 mx-auto h-fit">
      {/* Product Offers */}
      <div className="flex flex-col justify-center items-center w-11/12 md:w-6/12 lg:w-6/12">
        <p className="text-2xl lg:text-3xl font-semibold text-green-800 mb-3 md:mb-0">Product Offers</p>
        <div className="w-full md:px-4 md:h-[270px] lg:h-[280px] flex justify-center items-center">
                  <Swiper
                    spaceBetween={10}
                    freeMode={true}
                    grabCursor={true}
                    loop={true}
                    autoplay={{
                      delay: 3000,
                      disableOnInteraction: false,
                      reverseDirection: true,
                    }}
                    breakpoints={{
                      0: { slidesPerView: 2 },
                      480: { slidesPerView: 1.5 },
                      640: { slidesPerView: 2 },
                      768: { slidesPerView: 2 },
                      1024: { slidesPerView: 4 },
                    }}
                    modules={[Autoplay, FreeMode]}
                    className="px-2 md:px-6 py-6"
                  >
                    {productOffers.map((deal) => (
                      <SwiperSlide key={deal.id}>
                        <div className="border border-gray-200 p-4 shadow-md flex flex-col justify-start items-center text-start md:h-[230px] lg:h-[250px] bg-white rounded-md cursor-pointer">
                          {/* <div className="text-xs bg-orange-400 text-white px-2 py-1 rounded mb-2">
                            {deal.label}
                          </div> */}
                          <img
                            src={deal.contentUrl}
                            alt={deal.title}
                            className="h-32 object-cover mb-5 lg:mb-10 w-full" onClick={() => handleCategoryClick(deal.businessId?._id)}
                          />
                          <h3 className="font-semibold text-sm mb-1 text-start line-clamp-1">{deal.description}</h3>
                          <p className="text-sm text-gray-500 mb-1 text-start">{deal.businessId.businessName}</p>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
      </div>

      {/* Service Offers */}
      <div className="flex flex-col justify-center items-center w-11/12 md:w-6/12 lg:w-6/12">
        <p className="text-2xl lg:text-3xl font-semibold text-cyan-800 mt-5 mb-3 md:mb-0">Service Offers</p>
        <div className="w-full md:px-4 md:h-[270px] lg:h-[280px] flex justify-center items-center">
                  <Swiper
                    spaceBetween={15}
                    grabCursor={true}
                    loop={true}
                    autoplay={{
                      delay: 3000,
                      disableOnInteraction: false,
                      reverseDirection: false,
                      
                    }}
                    breakpoints={{
                      0: { slidesPerView: 2 },
                      480: { slidesPerView: 1.5 },
                      640: { slidesPerView: 2 },
                      768: { slidesPerView: 2 },
                      1024: { slidesPerView: 4 },
                    }}
                    modules={[Autoplay, FreeMode]}
                    className="px-2 md:px-6 py-6"
                  >
                    {serviceOffer.map((deal) => (
                      <SwiperSlide key={deal.id}>
                        <div className="border border-gray-200  shadow-md flex flex-col h-[230px] md:h-[230px] lg:h-[250px] bg-white rounded-md justify-start items-center cursor-pointer">
                          {/* <div className="text-xs bg-orange-400 text-white px-2 py-1 rounded mb-2">
                            {deal.label}
                          </div> */}
                          <img
                            src={deal.contentUrl}
                            alt={deal.title}
                            className="h-32 object-cover mb-13 w-full" onClick={() => handleCategoryClick(deal.businessId?._id)}
                          />
                          <h3 className="font-semibold text-sm mb-1 text-start line-clamp-1 px-3">{deal.description}</h3>
                          <p className="text-sm text-gray-500 mb-1 text-start">{deal.businessId.businessName}</p>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
      </div>
    </div>
  );
}
