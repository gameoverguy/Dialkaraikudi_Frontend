import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

function Advertisment() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-2 md:px-0 md:w-11/12 mx-auto">
        {/* First Swiper */}
        <div className="swiper-container w-full">
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="w-full h-[200px] md:h-[240px] bg-gray-200 rounded-lg"
          >
            {[
              "https://akam.cdn.jdmagicbox.com/images/icontent/newwap/web2022/banner_leads.webp",
              "https://akam.cdn.jdmagicbox.com/images/icontent/newwap/web2022/banner_bills_2024.webp",
              "https://akam.cdn.jdmagicbox.com/images/icontent/newwap/web2022/banner_hotels_2024.webp",
            ].map((src, i) => (
              <SwiperSlide
                key={i}
                className="flex items-center justify-center bg-gray-100"
              >
                <img
                  src={src}
                  alt={`Slide ${i + 1}`}
                  className="w-full h-full object-fit-cover rounded"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Second Swiper */}
        <div className="swiper-container w-full">
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="w-full h-[200px] md:h-[240px] bg-gray-200 rounded-lg"
          >
            {[
              "https://akam.cdn.jdmagicbox.com/images/icontent/newwap/web2022/summerweb.png",
              "https://akam.cdn.jdmagicbox.com/images/icontent/newwap/web2022/banner_interiordesigners_2024.webp",
              "https://akam.cdn.jdmagicbox.com/images/icontent/newwap/web2022/ipl2025web.png",
            ].map((src, i) => (
              <SwiperSlide
                key={i}
                className="flex items-center justify-center bg-gray-100"
              >
                <img
                  src={src}
                  alt={`Slide ${i + 4}`}
                  className="w-full h-full object-fit-cover rounded"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
  )
}

export default Advertisment