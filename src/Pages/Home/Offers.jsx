import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";

const deals = [
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
  return (
    <div className="flex flex-col md:flex-row justify-center items-center w-full md:w-11/12 mx-auto lg:gap-5 h-fit">
      {/* Product Offers */}
      <div className="flex flex-col justify-center items-center w-11/12 md:w-6/12 lg:w-6/12 py-3">
        <p className="text-2xl lg:text-3xl font-semibold text-green-800 mb-2">Product Offers</p>
        <div className="w-full md:px-4 lg:py-4 md:h-[330px] flex justify-center items-center">
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
                    className="px-2 md:px-6 py-6"
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

      {/* Service Offers */}
      <div className="flex flex-col justify-center items-center w-11/12 md:w-6/12 lg:w-6/12">
        <p className="text-2xl lg:text-3xl font-semibold text-cyan-700 mb-2">Service Offers</p>
        <div className="w-full md:px-4 lg:py-4 md:h-[330px] flex justify-center items-center">
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
                      1024: { slidesPerView: 5 },
                    }}
                    modules={[Autoplay, FreeMode]}
                    className="px-2 md:px-6 py-6"
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
}
