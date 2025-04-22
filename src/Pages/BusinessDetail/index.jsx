import React, { useState } from "react";
import BusinessInfo from "./BusinessInfo";
import Overview from "./Overview";
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

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    if (tabName === "quick-info") {
      const quickInfoSection = document.getElementById("quickinfo");
      if (quickInfoSection) {
        quickInfoSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <React.Fragment>
      <div className="bg-gray-100">
        <div className="mx-auto w-11/12 bg-white min-h-screen">
          <BusinessInfo formData={formData} />

          <div className="flex gap-6 mx-4">
            <div
              className={`py-2 font-medium text-md focus:outline-none ${
                activeTab === "overview"
                  ? "border-b-4 border-blue-500 text-blue-500"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => handleTabClick("overview")}
            >
              Overview
            </div>
            <div
              className={`py-2 font-medium text-md focus:outline-none ${
                activeTab === "services"
                  ? "border-b-4 border-blue-500 text-blue-500"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => handleTabClick("services")}
            >
              Services
            </div>
            <div
              className={`py-2 font-medium text-md focus:outline-none ${
                activeTab === "quick-info"
                  ? "border-b-4 border-blue-500 text-blue-500"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => handleTabClick("quick-info")}
            >
              Quick Info
            </div>
            <div
              className={`py-2 font-medium text-md focus:outline-none ${
                activeTab === "photos"
                  ? "border-b-4 border-blue-500 text-blue-500"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => handleTabClick("photos")}
            >
              Photos
            </div>
            <div
              className={`py-2 font-medium text-md focus:outline-none ${
                activeTab === "explore"
                  ? "border-b-4 border-blue-500 text-blue-500"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => handleTabClick("explore")}
            >
              Explore
            </div>
            <div
              className={`py-2 font-medium text-md focus:outline-none ${
                activeTab === "reviews"
                  ? "border-b-4 border-blue-500 text-blue-500"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => handleTabClick("reviews")}
            >
              Reviews
            </div>
          </div>
          <div className="mx-4">
            {activeTab === "overview" && <Overview />}
            {activeTab === "services" && <Services />}
            {activeTab === "quick-info" && <QuickInfo />}
            {activeTab === "photos" && <Photos />}
            {activeTab === "explore" && <Explore />}
            {activeTab === "reviews" && <Reviews />}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default BusinessDetails;
