import React, { useState } from "react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { CiLocationOn } from "react-icons/ci";
import AmentiesModal from "./amentiesModal";
import SwiperModal from "./Swiper";
import { FaPhoneAlt, FaWhatsappSquare } from "react-icons/fa";
import FilterModal from "./filter";

const Bussiness_List = () => {
  const [visiblePhoneId, setVisiblePhoneId] = useState(null);
  const HotelDeatils = [
    {
      id: 1,
      businessName: "GreenLeaf Cafe",
      starRating: 4.5,
      overallRating: 92,
      address: "123 Lakeview Road, Karaikudi",
      distanceKm: 2.3,
      amenities: [
        "Free WiFi",
        "Outdoor Seating",
        "Pet Friendly",
        "Live Music",
        "Parking Available",
        "Free WiFi",
        "Outdoor Seating",
        "Pet Friendly",
        "Live Music",
        "Parking Available",
        "Free WiFi",
        "Outdoor Seating",
        "Pet Friendly",
        "Live Music",
        "Parking Available",
      ],
      phoneNumber: "+91 98765 43210",
      whatsappNumber: "+91 98765 43210",
      images: [
        "https://dummyimage.com/180x180/000/fff",
        "https://dummyimage.com/180x180/000/fff",
        "https://dummyimage.com/180x180/000/fff",
        "https://dummyimage.com/180x180/000/fff",
      ],
    },
    {
      id: 2,
      businessName: "GreenLeaf Cafe",
      starRating: 4.5,
      overallRating: 92,
      address: "123 Lakeview Road, Karaikudi",
      distanceKm: 2.3,
      amenities: [
        "Free WiFi",
        "Outdoor Seating",
        "Pet Friendly",
        "Live Music",
        "Parking Available",
        "Free WiFi",
        "Outdoor Seating",
        "Pet Friendly",
        "Live Music",
        "Parking Available",
        "Free WiFi",
        "Outdoor Seating",
        "Pet Friendly",
        "Live Music",
        "Parking Available",
      ],
      phoneNumber: "+91 98765 43210",
      whatsappNumber: "+91 98765 43210",
      images: [
        "https://dummyimage.com/180x180/000/fff",
        "https://dummyimage.com/180x180/000/fff",
        "https://dummyimage.com/180x180/000/fff",
        "https://dummyimage.com/180x180/000/fff",
      ],
    },
    {
      id: 3,
      businessName: "GreenLeaf Cafe",
      starRating: 4.5,
      overallRating: 92,
      address: "123 Lakeview Road, Karaikudi",
      distanceKm: 2.3,
      amenities: [
        "Free WiFi",
        "Outdoor Seating",
        "Pet Friendly",
        "Live Music",
        "Parking Available",
        "Free WiFi",
        "Outdoor Seating",
        "Pet Friendly",
        "Live Music",
        "Parking Available",
        "Free WiFi",
        "Outdoor Seating",
        "Pet Friendly",
        "Live Music",
        "Parking Available",
      ],
      phoneNumber: "+91 98765 43210",
      whatsappNumber: "+91 98765 43210",
      images: [
        "https://dummyimage.com/180x180/000/fff",
        "https://dummyimage.com/180x180/000/fff",
        "https://dummyimage.com/180x180/000/fff",
        "https://dummyimage.com/180x180/000/fff",
      ],
    },
  ];

  const [expandedBusinessId, setExpandedBusinessId] = useState(null);

  const toggleAmenities = (id) => {
    setExpandedBusinessId(expandedBusinessId === id ? null : id);
  };

  const [filterOpen, setFilterOpen] = useState(false);

  return (
    <>
      <div className="flex">
        <div className="w-1/12"></div>

        <div className="flex justify-center w-full flex-col">
          <div className="md:p-4 w-full xl:w-8/12">
            <div>
              <p className="text-sm text-gray-500">
                Karaikudi &gt; Hotel &gt; kimikimi , kraikudi
              </p>
            </div>
            <div className="mt-2">
              <h1 className="text-lg font-bold">
                Best Deals - Top Hotels in Krishna Garden, Karaikudi
              </h1>
            </div>
            <div className="relative bg-white">
              <div className="sticky top-20 bg-white py-2">
                <button className="border border-gray-400 px-2 py-1 rounded">
                  Filter
                </button>
                <button
                  className="absolute right-0 top-0 border border-gray-400 px-2 py-1 rounded"
                  onClick={() => setFilterOpen(true)}
                >
                  All Filter
                </button>
              </div>
            </div>
            <FilterModal
              setFilterOpen={setFilterOpen}
              filterOpen={filterOpen}
            />
          </div>
          <div className="mt-2 w-full gap-5 flex flex-col md:p-4">
            {HotelDeatils.map((data, i) => (
              <div
                key={i}
                className="inline md:flex w-full xl:w-[70%] md:gap-10 border border-[#edf0ed] shadow-xl p-3"
              >
                {/* Swiper Image Slider */}
                <div className="w-full md:w-[25%]">
                  <SwiperModal data={data} />
                </div>

                {/* Business Info */}
                <div className="mt-5 md:mt-0 w-full md:w-[100%] space-y-4">
                  <h2 className="text-xl font-semibold">{data.businessName}</h2>
                  <h3>
                    <span className="bg-green-600 text-sm p-1 text-center rounded">
                      {" "}
                      {data.starRating}⭐
                    </span>{" "}
                    {data.overallRating} Ratings
                  </h3>
                  <p className="flex items-center">
                    <CiLocationOn /> {data.address} - {data.distanceKm} km
                  </p>
                  {/* <div>
                                <AmentiesModal
                                    data={data}
                                    isExpanded={expandedBusinessId === data.id}
                                    toggleExpand={() => toggleAmenities(data.id)}
                                />
                            </div> */}
                  <div className="text-sm flex gap-2">
                    <button
                      onClick={() => setVisiblePhoneId(data.id)}
                      className="bg-green-600 hover:bg-green-300 hover:text-black flex rounded px-2 py-1 items-center text-white"
                    >
                      <span className="text-md text-black px-1">
                        <FaPhoneAlt />
                      </span>
                      {visiblePhoneId === data.id ? "987654456" : "Show Number"}
                    </button>
                    <button className="flex items-center border  border-gray-600 px-2 py-1 rounded font-medium group hover:bg-green-600">
                      <span className="text-xl px-1 text-green-600 group-hover:text-white">
                        <FaWhatsappSquare />
                      </span>{" "}
                      WhatsApp
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div
          className="w-3/12"
        ></div>
      </div>
    </>
  );
};

export default Bussiness_List;
