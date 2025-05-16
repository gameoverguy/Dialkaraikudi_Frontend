import React from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';

const deals = [
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
  return (
    <div className="w-11/12 mx-auto flex md:flex-row-reverse flex-col-reverse md:border h-fit md:border-gray-200">

      {/* Left Section - Video and Promo */}
      <div className="hidden md:block lg:block text-white w-full md:w-6/12 lg:w-4/12">
        <video
          className="w-full h-full object-cover"
          src="https://res.cloudinary.com/dstm2ouer/video/upload/v1746612083/store_nh16ay.mp4"
          autoPlay
          muted
          loop
        ></video>
      </div>

      {/* Right Section - Products Slider */}
      <div className="w-full md:w-6/12 lg:w-8/12 flex justify-center items-center">
        <div className="w-full md:px-5 lg:px-8 py-4 lg:h-[330px] flex justify-center items-center">
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
              1024: { slidesPerView: 5 },
            }}
            modules={[Autoplay, FreeMode]}
            className="px-2 lg:px-6 py-6"
          >
            {deals.map((deal) => (
              <SwiperSlide key={deal.id}>
                <div className="border border-gray-200 p-4 shadow-md flex flex-col items-start text-start md:h-[300px] bg-white rounded-md">
                  <div className="text-xs bg-orange-400 text-white px-2 py-1 rounded mb-2">
                    {deal.label}
                  </div>
                  <img
                    src={deal.image}
                    alt={deal.title}
                    className="h-32 object-contain mb-3 w-full"
                  />
                  <h3 className="font-semibold text-sm mb-1 text-start line-clamp-2">{deal.title}</h3>
                  <p className="text-sm text-gray-500 mb-1 text-start">By Lucky Supermarket</p>
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