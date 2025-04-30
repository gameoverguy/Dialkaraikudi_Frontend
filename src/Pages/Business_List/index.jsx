import React, { useState } from "react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { CiLocationOn } from "react-icons/ci";
import AmentiesModal from "./amentiesModal";
import SwiperModal from "./Swiper";
import { FaPhoneAlt, FaWhatsappSquare } from "react-icons/fa";
import FilterModal from "./filter";
import adds from "../../assets/adds.jpg";

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
        "https://d2kihw5e8drjh5.cloudfront.net/eyJidWNrZXQiOiJ1dGEtaW1hZ2VzIiwia2V5IjoicGxhY2VfaW1nL1QxX0FQOThkUXFLblFCVUM5QlJHTGciLCJlZGl0cyI6eyJyZXNpemUiOnsid2lkdGgiOjY0MCwiaGVpZ2h0Ijo2NDAsImZpdCI6Imluc2lkZSJ9LCJyb3RhdGUiOm51bGwsInRvRm9ybWF0IjogIndlYnAifX0=",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEtG1WpVqOwgFmCaZjAAuJp6NGICLH9NvoGw&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4G9tXT4UFFv3fhlPNyCPfTh7RPVQF8SjXXQ&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_uomCDxZosAdJTVtxDuFVqLbNPcKsp_oK4Q&s",
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
        "https://d2kihw5e8drjh5.cloudfront.net/eyJidWNrZXQiOiJ1dGEtaW1hZ2VzIiwia2V5IjoicGxhY2VfaW1nL1QxX0FQOThkUXFLblFCVUM5QlJHTGciLCJlZGl0cyI6eyJyZXNpemUiOnsid2lkdGgiOjY0MCwiaGVpZ2h0Ijo2NDAsImZpdCI6Imluc2lkZSJ9LCJyb3RhdGUiOm51bGwsInRvRm9ybWF0IjogIndlYnAifX0=",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEtG1WpVqOwgFmCaZjAAuJp6NGICLH9NvoGw&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4G9tXT4UFFv3fhlPNyCPfTh7RPVQF8SjXXQ&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_uomCDxZosAdJTVtxDuFVqLbNPcKsp_oK4Q&s",
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
        "https://d2kihw5e8drjh5.cloudfront.net/eyJidWNrZXQiOiJ1dGEtaW1hZ2VzIiwia2V5IjoicGxhY2VfaW1nL1QxX0FQOThkUXFLblFCVUM5QlJHTGciLCJlZGl0cyI6eyJyZXNpemUiOnsid2lkdGgiOjY0MCwiaGVpZ2h0Ijo2NDAsImZpdCI6Imluc2lkZSJ9LCJyb3RhdGUiOm51bGwsInRvRm9ybWF0IjogIndlYnAifX0=",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEtG1WpVqOwgFmCaZjAAuJp6NGICLH9NvoGw&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4G9tXT4UFFv3fhlPNyCPfTh7RPVQF8SjXXQ&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_uomCDxZosAdJTVtxDuFVqLbNPcKsp_oK4Q&s",
      ],
    },
    {
      id: 4,
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
        "https://d2kihw5e8drjh5.cloudfront.net/eyJidWNrZXQiOiJ1dGEtaW1hZ2VzIiwia2V5IjoicGxhY2VfaW1nL1QxX0FQOThkUXFLblFCVUM5QlJHTGciLCJlZGl0cyI6eyJyZXNpemUiOnsid2lkdGgiOjY0MCwiaGVpZ2h0Ijo2NDAsImZpdCI6Imluc2lkZSJ9LCJyb3RhdGUiOm51bGwsInRvRm9ybWF0IjogIndlYnAifX0=",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEtG1WpVqOwgFmCaZjAAuJp6NGICLH9NvoGw&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4G9tXT4UFFv3fhlPNyCPfTh7RPVQF8SjXXQ&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_uomCDxZosAdJTVtxDuFVqLbNPcKsp_oK4Q&s",
      ],
    },
    {
      id: 5,
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
        "https://d2kihw5e8drjh5.cloudfront.net/eyJidWNrZXQiOiJ1dGEtaW1hZ2VzIiwia2V5IjoicGxhY2VfaW1nL1QxX0FQOThkUXFLblFCVUM5QlJHTGciLCJlZGl0cyI6eyJyZXNpemUiOnsid2lkdGgiOjY0MCwiaGVpZ2h0Ijo2NDAsImZpdCI6Imluc2lkZSJ9LCJyb3RhdGUiOm51bGwsInRvRm9ybWF0IjogIndlYnAifX0=",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEtG1WpVqOwgFmCaZjAAuJp6NGICLH9NvoGw&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4G9tXT4UFFv3fhlPNyCPfTh7RPVQF8SjXXQ&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_uomCDxZosAdJTVtxDuFVqLbNPcKsp_oK4Q&s",
      ],
    },
    {
      id: 6,
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
        "https://d2kihw5e8drjh5.cloudfront.net/eyJidWNrZXQiOiJ1dGEtaW1hZ2VzIiwia2V5IjoicGxhY2VfaW1nL1QxX0FQOThkUXFLblFCVUM5QlJHTGciLCJlZGl0cyI6eyJyZXNpemUiOnsid2lkdGgiOjY0MCwiaGVpZ2h0Ijo2NDAsImZpdCI6Imluc2lkZSJ9LCJyb3RhdGUiOm51bGwsInRvRm9ybWF0IjogIndlYnAifX0=",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEtG1WpVqOwgFmCaZjAAuJp6NGICLH9NvoGw&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4G9tXT4UFFv3fhlPNyCPfTh7RPVQF8SjXXQ&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_uomCDxZosAdJTVtxDuFVqLbNPcKsp_oK4Q&s",
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
        <div className="xl:w-1/12"></div>

        <div className="w-full xl:w-8/12">
          <div className="flex justify-center w-full flex-col">
            <div className="md:p-4 w-full xl:w-10/12">
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
                  {/* <button className="border border-gray-400 px-2 py-1 rounded">
                  Filter
                </button> */}
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
            <div className="mt-7 xl:w-[83%] gap-5 flex flex-col md:p-4">
              {HotelDeatils.map((data, i) => (
                <div
                  key={i}
                  className="inline md:flex xl:w-[100%] md:gap-3 border border-[#edf0ed] shadow-xl p-3"
                >
                  {/* Swiper Image Slider */}
                  <div className="w-full md:w-[25%]">
                    <SwiperModal data={data} />
                  </div>

                  {/* Business Info */}
                  <div className="mt-5 md:mt-0 w-full md:w-[100%] space-y-4">
                    <h2 className="text-xl font-semibold">
                      {data.businessName}
                    </h2>
                    <h3>
                      <span className="bg-green-600 text-sm p-1 text-center rounded text-white">
                        {" "}
                        {data.starRating}⭐
                      </span>{" "}
                      {data.overallRating} Ratings
                    </h3>
                    <p className="flex items-center">
                      <CiLocationOn /> {data.address}
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
                        className="bg-green-600 hover:bg-green-400 group group-hover:text-black flex rounded px-2 py-1 items-center text-white"
                      >
                        <span className="text-md text-white px-1">
                          <FaPhoneAlt className="p-1 text-xl" />
                        </span>
                        {visiblePhoneId === data.id
                          ? data.phoneNumber
                          : "Show Number"}
                      </button>
                      {/* <button className="flex items-center border  border-gray-600 px-2 py-1 rounded font-medium group hover:bg-green-600">
                      <span className="text-xl px-1 text-green-600 group-hover:text-white">
                        <FaWhatsappSquare />
                      </span>{" "}
                      WhatsApp
                    </button> */}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="hidden xl:block xl:w-3/12">
          <div className="sticky top-40">
            <img
              src={adds}
              alt="Advertisement"
              className="max-h-[calc(100vh-200px)] object-contain"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Bussiness_List;
