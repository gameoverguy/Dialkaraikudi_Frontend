import React, { useState } from "react";
import BusinessInfo from "./BusinessInfo";
import Photos from "./Photos";
import Reviews from "./Reviews";
import Description from "./Description";

const BusinessDetails = () => {
  const [formData] = useState([
    {
      id: 1,
      name: "Hotel Pl Grand",
      star: 4.9,
      rating: 175,
      address: "Sekkalai, Karaikudi",
      experience: "1 year",
      contact: 98945426808,
      imageUrls: [
        { url: "https://dummyimage.com/250x150/000/fff", label: "All" },
        { url: "https://dummyimage.com/250x150/000/fff", label: "Exterior" },
        { url: "https://dummyimage.com/250x150/000/fff", label: "Interior" },
        { url: "https://dummyimage.com/250x150/000/fff", label: "Room" },
        { url: "https://dummyimage.com/250x150/000/fff", label: "Dining" },
        { url: "https://dummyimage.com/250x150/000/fff", label: "Dining" }, 
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
      <div className="bg-white shadow-xl">
        <BusinessInfo formData={formData} />
        <div className="flex overflow-x-auto whitespace-nowrap mx-4 p-2 sticky top-0 bg-white z-10 border-b border-gray-200 scrollbar-hide">
          {tabs.map((tab) => (
            <div
              key={tab.key}
              className={`px-4 py-2 font-medium text-sm md:text-md cursor-pointer shrink-0 ${
                activeTab === tab.key
                  ? "border-b-4 border-blue-500 text-blue-500"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => handleTabClick(tab.key, tab.id)}
            >
              {tab.name}
            </div>
          ))}
        </div>
        <div className="mx-4 space-y-8 pb-10">
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
