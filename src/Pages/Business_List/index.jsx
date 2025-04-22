import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const Bussiness_List = () => {

    const HotelDeatils = [
        {
            "businessName": "GreenLeaf Cafe",
            "starRating": 4.5,
            "overallRating": 92,
            "address": "123 Lakeview Road, Karaikudi, Tamil Nadu, India",
            "distanceKm": 2.3,
            "amenities": [
                "Free WiFi",
                "Outdoor Seating",
                "Pet Friendly",
                "Live Music",
                "Parking Available"
            ],
            "phoneNumber": "+91 98765 43210",
            "whatsappNumber": "+91 98765 43210",
            "images": [
                "https://dummyimage.com/180x180/000/fff",
                "https://dummyimage.com/180x180/000/fff",
                "https://dummyimage.com/180x180/000/fff"
            ]
        },
        {
            "businessName": "GreenLeaf Cafe",
            "starRating": 4.5,
            "overallRating": 92,
            "address": "123 Lakeview Road, Karaikudi, Tamil Nadu, India",
            "distanceKm": 2.3,
            "amenities": [
                "Free WiFi",
                "Outdoor Seating",
                "Pet Friendly",
                "Live Music",
                "Parking Available"
            ],
            "phoneNumber": "+91 98765 43210",
            "whatsappNumber": "+91 98765 43210",
            "images": [
                "https://dummyimage.com/180x180/000/fff",
                "https://dummyimage.com/180x180/000/fff",
                "https://dummyimage.com/180x180/000/fff"
            ]
        },
        {
            "businessName": "GreenLeaf Cafe",
            "starRating": 4.5,
            "overallRating": 92,
            "address": "123 Lakeview Road, Karaikudi, Tamil Nadu, India",
            "distanceKm": 2.3,
            "amenities": [
                "Free WiFi",
                "Outdoor Seating",
                "Pet Friendly",
                "Live Music",
                "Parking Available"
            ],
            "phoneNumber": "+91 98765 43210",
            "whatsappNumber": "+91 98765 43210",
            "images": [
                "https://dummyimage.com/180x180/000/fff",
                "https://dummyimage.com/180x180/000/fff",
                "https://dummyimage.com/180x180/000/fff"
            ]
        }
    ];

    return (
        <div className="p-4">
            <div>
                <p className="text-sm text-gray-500">Karaikudi &gt; Hotel &gt; kimikimi , kraikudi</p>
            </div>

            <div className="mt-2">
                <h1 className="text-lg font-bold">Best Deals - Top Hotels in Krishna Garden, Karaikudi</h1>
            </div>

            <div className="mt-4">
                <button className='border border-gray-400 px-2 py-1 rounded'>Filter</button>
            </div>

            <div className='mt-6 w-full gap-5 flex p-4 flex-wrap justify-center'>
                {HotelDeatils.map((data, i) => (
                    <div key={i} className="flex w-5/12 gap-4 border p-2">
                        {/* Swiper Image Slider */}
                        <div className="min-w-[160px] max-w-[160px]">
                            <Swiper
                                modules={[Navigation]}
                                spaceBetween={10}
                                slidesPerView={1}
                                // enables default arrows
                                className="mySwiper"
                            >
                                {data.images.map((imgUrl, index) => (
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

                        {/* Business Info */}
                        <div className="flex flex-col justify-between">
                            <div>
                                <h2 className="text-xl font-semibold">{data.businessName}</h2>
                                <p className="text-gray-600">{data.address}</p>
                                <p className="text-sm text-gray-500">{data.distanceKm} km away</p>
                            </div>
                            <div className="text-sm text-gray-700 mt-2">
                                ⭐ {data.starRating} Stars | {data.overallRating}% Positive Reviews
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default Bussiness_List;
