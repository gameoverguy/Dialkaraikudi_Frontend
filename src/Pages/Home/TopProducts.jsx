import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import axios from "axios";
import { API } from "../../../config/config";

const localFallbacks  = [
  {
    id: 1,
    label: 'New',
    image: 'https://react.marketpro.wowtheme7.com/assets/images/thumbs/product-img18.png',
    title: 'Tropicana 100% Juice, Orange, No Pulp',
    price: '$14.99',
    oldPrice: '$28.99',
    rating: 4.8,
    reviews: '17k'
  },
  {
    id: 2,
    label: 'Sale 50%',
    image: 'https://react.marketpro.wowtheme7.com/assets/images/thumbs/product-img8.png',
    title: 'O Organics Milk, Whole, Vitamin D',
    price: '$14.99',
    oldPrice: '$28.99',
    rating: 4.8,
    reviews: '17k'
  },
  {
    id: 3,
    label: 'Sale 50%',
    image: 'https://react.marketpro.wowtheme7.com/assets/images/thumbs/product-img8.png',
    title: 'O Organics Milk, Whole, Vitamin D',
    price: '$14.99',
    oldPrice: '$28.99',
    rating: 4.8,
    reviews: '17k'
  },
  {
    id: 4,
    label: 'Best Sale',
    image: 'https://react.marketpro.wowtheme7.com/assets/images/thumbs/product-img9.png',
    title: 'O Organics Milk, Whole, Vitamin D',
    price: '$14.99',
    oldPrice: '$28.99',
    rating: 4.8,
    reviews: '17k'
  },
  {
    id: 5,
    label: 'Sale 50%',
    image: 'https://react.marketpro.wowtheme7.com/assets/images/thumbs/product-img8.png',
    title: 'O Organics Milk, Whole, Vitamin D',
    price: '$14.99',
    oldPrice: '$28.99',
    rating: 4.8,
    reviews: '17k'
  },
  {
    id: 6,
    label: 'Best Sale',
    image: 'https://react.marketpro.wowtheme7.com/assets/images/thumbs/product-img10.png',
    title: 'O Organics Milk, Whole, Vitamin D',
    price: '$14.99',
    oldPrice: '$28.99',
    rating: 4.8,
    reviews: '17k'
  },
];




const TopService = () => {

const [topProduct, setTopProduct] = useState([]);


useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await axios.get(`${API}/adverts`);
        
        const ads = response.data.filter(
          (ad) =>
            ad.slotId?.page === "home" &&
            ad.slotId?._id === "682c49b912b9ecff83baf9c6" &&
            ad.isActive
        );
        console.log("topProduct", response.data);
        

        let finalSlides = [];

        if (ads.length === 0) {
          finalSlides = localFallbacks.slice(0, 5);
        } else if (ads.length === 1) {
          finalSlides = [...ads, ...localFallbacks.slice(0, 4)];
        } else if (ads.length === 2) {
          finalSlides = [...ads, ...localFallbacks.slice(0, 3)];
        }
        else if (ads.length === 3) {
          finalSlides = [...ads, ...localFallbacks.slice(0, 2)];
        }
        else if (ads.length === 4) {
          finalSlides = [...ads, ...localFallbacks.slice(0, 1)];
        }
        else {
          finalSlides = ads;
        }
        setTopProduct(finalSlides);
      } catch (error) {
        console.error("Error fetching ads:", error);
        setTopProduct(localFallbacks.slice(0, 5)); // Fallback if API fails
      }
    };

    fetchAds();
  }, []);




  return (
    <div className="w-11/12 flex md:border md:h-[24vh] lg:h-[32vh] md:border-gray-200 justify-between">

      {/* Left Section - Video and Promo */}
      <div className="hidden md:block text-white w-full md:w-4/12 lg:w-4/12 lg:h-[32vh] md:h-[24vh]">
        <video
          className="w-full h-full object-cover"
          src="https://res.cloudinary.com/dstm2ouer/video/upload/v1746612083/store_nh16ay.mp4"
          autoPlay
          muted
          loop
        ></video>
      </div>

      {/* Right Section - Products Slider */}
      <div className="w-full md:w-8/12 lg:w-8/12 flex justify-center items-center lg:h-[32vh] md:h-[24vh]">
        <div className="w-full px-2 md:px-8 md:h-[24vh] lg:h-[32vh] flex justify-center items-center">
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
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 5 },
            }}
            modules={[Autoplay, FreeMode]}
            className="px-2 flex justify-center"
          >
            {topProduct.map((deal) => (
              <SwiperSlide key={deal.id}>
                <div className="border border-gray-200 py-3 shadow-md flex flex-col text-start md:h-fit bg-white rounded-md justify-between items-center">
                  {/* <div className="text-xs bg-orange-400 text-white px-2 py-1 rounded mb-2">
                    {deal.label}
                  </div> */}
                  <img
                    src={deal.contentUrl}
                    alt={deal.title}
                    className="h-32 object-contain mb-10 w-full"
                  />
                  <h3 className="font-semibold text-sm mb-1 text-start line-clamp-1 px-3">{deal.description}</h3>
                  <p className="text-sm text-gray-500 mb-1 text-start px-3">{deal.businessId.businessName}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default TopService;