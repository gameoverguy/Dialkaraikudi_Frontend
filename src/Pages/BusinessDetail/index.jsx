import React, { useState } from "react";
import BusinessInfo from "./BusinessInfo";
import Services from "./Services";
import QuickInfo from "./QuickInfo";
import Photos from "./Photos";
import Explore from "./Explore";
import Reviews from "./Reviews";

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
    },
  ]);
  const [activeTab, setActiveTab] = useState("overview");

  const handleTabClick = (tabName, sectionId) => {
    setActiveTab(tabName);
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <React.Fragment>
      <div className="bg-white shadow-xl">
        <BusinessInfo formData={formData} />

        <div className="flex gap-6 mx-4 p-2 sticky top-0 bg-white z-10">
          <div
            className={`py-2 font-medium text-md cursor-pointer ${
              activeTab === "overview"
                ? "border-b-4 border-blue-500 text-blue-500"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => handleTabClick("overview", "overview")}
          >
            Overview
          </div>
          <div
            className={`py-2 font-medium text-md cursor-pointer ${
              activeTab === "services"
                ? "border-b-4 border-blue-500 text-blue-500"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => handleTabClick("services", "services")}
          >
            Services
          </div>
          <div
            className={`py-2 font-medium text-md cursor-pointer ${
              activeTab === "quick-info"
                ? "border-b-4 border-blue-500 text-blue-500"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => handleTabClick("quick-info", "quickinfo")}
          >
            Quick Info
          </div>
          <div
            className={`py-2 font-medium text-md cursor-pointer ${
              activeTab === "photos"
                ? "border-b-4 border-blue-500 text-blue-500"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => handleTabClick("photos", "photos")}
          >
            Photos
          </div>
          <div
            className={`py-2 font-medium text-md cursor-pointer ${
              activeTab === "explore"
                ? "border-b-4 border-blue-500 text-blue-500"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => handleTabClick("explore", "explore")}
          >
            Explore
          </div>
          <div
            className={`py-2 font-medium text-md cursor-pointer ${
              activeTab === "reviews"
                ? "border-b-4 border-blue-500 text-blue-500"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => handleTabClick("reviews", "reviews")}
          >
            Reviews
          </div>
        </div>

        <div className="mx-4 space-y-8 pb-10">
          <div id="overview">
            <div id="services">
              <Services />
            </div>
            <div id="quickinfo">
              <QuickInfo />
            </div>
            <div id="photos">
              <Photos />
            </div>
            <div id="explore">
              <Explore />
            </div>
            <div id="reviews">
              <Reviews />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default BusinessDetails;
