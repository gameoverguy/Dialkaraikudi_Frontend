import React from 'react'
import { SwiperSlide, Swiper } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const SwiperModal = ({ data }) => {
    return (
        <div className="relative">
            <div className="w-full">
                <Swiper
                    modules={[Navigation, Pagination]}
                    spaceBetween={10}
                    pagination={{
                        clickable: true
                    }}
                    slidesPerView={1}
                    breakpoints={{
                        0: { slidesPerView: 2.2 },
                        600: { slidesPerView: 3 },
                        768: { slidesPerView: 1 },
                    }}
                    className="mySwiper"
                >
                    {data?.images.map((imgUrl, index) => (
                        <SwiperSlide key={index}>
                            <img
                                src={imgUrl}
                                alt={`Slide ${index + 1}`}
                                className="h-40 w-40 object-cover rounded-lg"
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    )
}

export default SwiperModal