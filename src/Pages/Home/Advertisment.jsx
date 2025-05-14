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

const Advertisment = () => {
  return (
    <div className="w-11/12 mx-auto flex flex-col md:flex-row md:border md:h-fit md:border-gray-200">
      {/* Left Section - Video and Promo */}
      <div className="hidden text-white w-full md:block md:w-4/12">
        <video
          className="w-full h-full object-cover"
          src="https://res.cloudinary.com/dstm2ouer/video/upload/v1746612083/store_nh16ay.mp4"
          autoPlay
          muted
          loop
        ></video>
      </div>

      {/* Right Section - Products Slider */}
      <div className="w-full md:w-8/12 flex justify-center items-center">
        <div className="w-full px-2 md:px-8 py-4 md:h-[330px] flex justify-center items-center">
           <Swiper
        spaceBetween={15}
        centeredSlides={true}
        freeMode={true}
        grabCursor={true}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        breakpoints={{
              320: { slidesPerView: 1.5 },  // Added smaller breakpoint
              480: { slidesPerView: 1.5 }, // Added medium-small breakpoint
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 5 },
            }}
        modules={[Autoplay, FreeMode]}
        className="md:px-6 py-12"
      >
            {deals.map((deal) => (
              <SwiperSlide key={deal.id}>
                <div className="border border-gray-200 p-4 shadow-md flex flex-col items-start text-start md:h-[300px]">
                  <div className="text-xs bg-orange-400 text-white px-2 py-1 rounded mb-2">
                    {deal.label}
                  </div>
                  <img src={deal.image} alt={deal.title} className="md:h-32 object-contain mb-3" />
                  <h3 className="font-semibold text-sm mb-1 text-start">{deal.title}</h3>
                  <p className="text-sm text-gray-500 mb-1 text-start">By Lucky Supermarket</p>
                  {/* Uncomment this block if you want to show prices and rating
                  <p>
                    <span className="font-bold text-green-600">{deal.price}</span>
                    <span className="line-through text-gray-400 ml-2">{deal.oldPrice}</span>
                  </p>
                  <p className="text-yellow-500 text-sm mt-1">⭐ {deal.rating} ({deal.reviews})</p>
                  <button className="mt-auto bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold">
                    Add To Cart 🛒
                  </button>
                  */}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Advertisment;
