import React from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";

const deals = [
  {
    id: 1,
    label: "New",
    image:
      "https://react.marketpro.wowtheme7.com/assets/images/thumbs/product-img18.png",
    title: "Tropicana 100% Juice, Orange, No Pulp",
    price: "$14.99",
    oldPrice: "$28.99",
    rating: 4.8,
    reviews: "17k",
  },
  {
    id: 2,
    label: "Sale 50%",
    image:
      "https://react.marketpro.wowtheme7.com/assets/images/thumbs/product-img8.png",
    title: "O Organics Milk, Whole, Vitamin D",
    price: "$14.99",
    oldPrice: "$28.99",
    rating: 4.8,
    reviews: "17k",
  },
  {
    id: 3,
    label: "Sale 50%",
    image:
      "https://react.marketpro.wowtheme7.com/assets/images/thumbs/product-img8.png",
    title: "O Organics Milk, Whole, Vitamin D",
    price: "$14.99",
    oldPrice: "$28.99",
    rating: 4.8,
    reviews: "17k",
  },
  {
    id: 4,
    label: "Best Sale",
    image:
      "https://react.marketpro.wowtheme7.com/assets/images/thumbs/product-img9.png",
    title: "O Organics Milk, Whole, Vitamin D",
    price: "$14.99",
    oldPrice: "$28.99",
    rating: 4.8,
    reviews: "17k",
  },
  {
    id: 5,
    label: "Sale 50%",
    image:
      "https://react.marketpro.wowtheme7.com/assets/images/thumbs/product-img8.png",
    title: "O Organics Milk, Whole, Vitamin D",
    price: "$14.99",
    oldPrice: "$28.99",
    rating: 4.8,
    reviews: "17k",
  },
  {
    id: 6,
    label: "Best Sale",
    image:
      "https://react.marketpro.wowtheme7.com/assets/images/thumbs/product-img10.png",
    title: "O Organics Milk, Whole, Vitamin D",
    price: "$14.99",
    oldPrice: "$28.99",
    rating: 4.8,
    reviews: "17k",
  },
];

export default function SesanoalProduct() {
  return (
    <>

    
      
      <div className="flex flex-col md:flex-row justify-center items-center w-11/12 mx-auto md:gap-5">

        <div className="flex flex-col justify-center items-center w-11/12 md:w-6/12">

        <div className="flex flex-col md:flex-row justify-center items-center w-11/12 mx-auto md:gap-5">
        <p className="text-2xl md:text-3xl font-semibold text-green-800">Product Offers</p>
      </div>
        
          <div className="w-full md:px-2 py-4 md:h-[330px] flex justify-center items-center">
            <Swiper
              spaceBetween={15}
              freeMode={true}
              grabCursor={true}
              loop={true}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
                reverseDirection: true,
              }}
              breakpoints={{
  0: { slidesPerView: 2 },      // real small phones
  360: { slidesPerView: 2 },    // larger phones
  480: { slidesPerView: 2 },      // wide phones (still mobile)
  640: { slidesPerView: 2 },      // small tablets (Tailwind sm)
  768: { slidesPerView: 3 },
  1024: { slidesPerView: 4 },
}}
              modules={[Autoplay, FreeMode]}
              className="px-4 md:px-6 py-12"
            >
              {deals.map((deal) => (
                <SwiperSlide key={deal.id}>
                  <div className="border border-gray-200 p-4 shadow-md flex flex-col items-start text-start md:h-[300px]">
                    <div className="text-xs bg-orange-400 text-white px-2 py-1 rounded mb-2">
                      {deal.label}
                    </div>
                    <img
                      src={deal.image}
                      alt={deal.title}
                      className="md:h-32 object-contain mb-3"
                    />
                    <h3 className="font-semibold text-sm mb-1 text-start">
                      {deal.title}
                    </h3>
                    <p className="text-sm text-gray-500 mb-1 text-start">
                      By Lucky Supermarket
                    </p>
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

        <div className="flex flex-col justify-center items-center w-11/12 md:w-6/12">
        <div className="flex flex-col md:flex-row justify-center items-center w-11/12 mx-auto md:gap-5">
        <p className="text-2xl md:text-3xl font-semibold text-cyan-700">Service Offers</p>
      </div>
          <div className="w-full md:px-2 py-4 md:h-[330px] flex justify-center items-center">
            <Swiper
  spaceBetween={15}
  freeMode={true}
  grabCursor={true}
  loop={true}
  autoplay={{
    delay: 3000,
    disableOnInteraction: false,
  }}
  breakpoints={{
  0: { slidesPerView: 2 },      // real small phones
  360: { slidesPerView: 2 },    // larger phones
  480: { slidesPerView: 2 },      // wide phones (still mobile)
  640: { slidesPerView: 2 },      // small tablets (Tailwind sm)
  768: { slidesPerView: 3 },
  1024: { slidesPerView: 4 },
}}
  modules={[Autoplay, FreeMode]}
  className="px-4 md:px-6 py-12"
>

              {deals.map((deal) => (
                <SwiperSlide key={deal.id}>
                  <div className="border border-gray-200 p-4 shadow-md flex flex-col items-start text-start md:h-[300px]">
                    <div className="text-xs bg-orange-400 text-white px-2 py-1 rounded mb-2">
                      {deal.label}
                    </div>
                    <img
                      src={deal.image}
                      alt={deal.title}
                      className="md:h-32 object-contain mb-3"
                    />
                    <h3 className="font-semibold text-sm mb-1 text-start">
                      {deal.title}
                    </h3>
                    <p className="text-sm text-gray-500 mb-1 text-start">
                      By Lucky Supermarket
                    </p>
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
    </>
  );
}
