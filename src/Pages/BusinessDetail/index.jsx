import React, { useState } from "react";
import BusinessInfo from "./BusinessInfo";
import Photos from "./Photos";
import Reviews from "./Reviews";
import Description from "./Description";
import { IoIosArrowForward } from "react-icons/io";
const BusinessDetails = () => {
  const [formData] = useState([
    {
      businessId: 1,
      name: "Hotel Pl Grand",
      star: 4.9,
      rating: 175,
      address: "Sekkalai, Karaikudi",
      experience: "1 year",
      contact: 98945426808,
      imageUrls: [
        { url: "https://cdn.tiaraahotels.com/banner-2.webp", label: "All" },
        { url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbILhBpBiCUCChU99lOT7nhyB2ISL9uV2QUQ&s", label: "Exterior" },
        { url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIpbFQO6_ZDvtZeMKjY4keOyhZreBM82AqSw&s", label: "Interior" },
        { url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6SYOYRZy7RHTdgu-fsXo0klctOmTzwo7bzg&s", label: "Room" },
        { url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeE18phVk-BYZghklIvAJCYQEsyU7WI0sa8w&s", label: "Dining" },
        { url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6SYOYRZy7RHTdgu-fsXo0klctOmTzwo7bzg&s", label: "Dining" }, 
      ]
    },
  ]);
  const [activeTab, setActiveTab] = useState("overview");
  const handleTabClick = (tabName, sectionId) => {
    setActiveTab(tabName);
    const section = document.getElementById(sectionId);
    const navbarHeight = 120;

    if (section) {
      const offsetTop = section.offsetTop - navbarHeight;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth"
      });
    }
  };

  const tabs = [
    { name: "Overview", id: "overview", key: "overview" },
    { name: "Description", id: "description", key: "description" },
    { name: "Photos", id: "photos", key: "photos" },
    { name: "Reviews", id: "reviews", key: "reviews" },
  ];

  return (
    <React.Fragment>
      <div className="bg-white shadow-xl pt-2">
        <div className="flex p-4">
        <p className="flex items-center text-xs font-semibold hover:text-blue-500 cursor-pointer">Karaikudi <span><IoIosArrowForward/></span></p>
        <p className="flex items-center text-xs font-semibold hover:text-blue-500  cursor-pointer">Hotels in Karaikudi <span><IoIosArrowForward/></span></p>
        <p className="flex items-center text-xs font-semibold hover:text-blue-500  cursor-pointer">Hotel PL Grand</p>
        </div>
        <BusinessInfo formData={formData} businessId={formData[0].businessId}/>
        <div className="flex overflow-x-auto whitespace-nowrap mx-4 p-2 sticky top-0 bg-white z-10 border-b border-gray-200 scrollbar-hide">
          {tabs.map((tab) => (
            <div
              key={tab.key}
              className={`px-4 py-2 font-medium text-sm md:text-md cursor-pointer shrink-0 ${
                activeTab === tab.key
                  ? "border-b-4 border-blue-500 text-blue-500"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => handleTabClick(tab.key, tab.businessId)}
            >
              {tab.name}
            </div>
          ))}
        </div>
        <div className="mx-4 space-y-8 pb-10 mb-4">
          <div id="overview">
            <div id="description">
              <Description />
            </div>
            <div id="photos">
              <Photos formData={formData[0]}/>
            </div>
            <div id="reviews">
              <Reviews  formData={formData[0]}/>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default BusinessDetails;
