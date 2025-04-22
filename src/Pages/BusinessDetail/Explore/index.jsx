import React, { useState } from "react";
import { MdOutlineStar } from "react-icons/md";
import { SlLocationPin } from "react-icons/sl";
import { FaThumbsUp, FaRegComment, FaPhone } from "react-icons/fa6";
import { PiWhatsappLogoFill } from "react-icons/pi";
import { RiShareForwardLine } from "react-icons/ri";
import { HiOutlinePencil } from "react-icons/hi2";

const Explore = () => {
  const [exploreData] = useState([
    {
      category: "Pandits",
      businesses: [
        {
          id: 2,
          name: "Divine Blessings (Pandits)",
          image: "https://dummyimage.com/250x150/000/fff",
          star: 4.8,
          rating: 120,
          address: "Some Area, Karaikudi",
          experience: "5 years",
          contact: 9876543211,
        },
      ],
    },
    {
      category: "Beauty parlour",
      businesses: [
        {
          id: 1,
          name: "Sri Beauty Parlour",
          image: "https://dummyimage.com/250x150/000/fff",
          star: 4.6,
          rating: 85,
          address: "Near Bus Stand, Karaikudi",
          contact: 9988776655,
        },
        {
          id: 3,
          name: "KALS Bridal Studio & Academy",
          image: "https://dummyimage.com/250x150/000/fff",
          star: 4.9,
          rating: 150,
          address: "1st km, Karaikudi South...",
          contact: 8877665544,
        },
        {
          id: 4,
          name: "Sri Natural Trends",
          image: "https://dummyimage.com/250x150/000/fff",
          star: 4.7,
          rating: 95,
          address: "Opp. Annamalaiyar...",
          contact: 7766554433,
        },
      ],
    },
    {
      category: "Caterers",
      businesses: [
        {
          id: 5,
          name: "Annapoorna Caterers",
          image: "https://dummyimage.com/250x150/000/fff",
          star: 4.5,
          rating: 70,
          address: "Main Road, Karaikudi",
          contact: 6655443322,
        },
      ],
    },
    {
      category: "Band",
      businesses: [
        {
          id: 6,
          name: "Melody Makers Band",
          image: "https://dummyimage.com/250x150/000/fff",
          star: 4.7,
          rating: 110,
          address: "Central Area, Karaikudi",
          contact: 5544332211,
        },
      ],
    },
    {
      category: "Decorator",
      businesses: [
        {
          id: 7,
          name: "Shiva Decorators",
          image: "https://dummyimage.com/250x150/000/fff",
          star: 4.6,
          rating: 90,
          address: "East Street, Karaikudi",
          contact: 4433221100,
        },
      ],
    },
  ]);

  const [selectedCategory, setSelectedCategory] = useState("Pandits");

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const currentCategoryData = exploreData.find(
    (item) => item.category === selectedCategory
  );
  const currentBusinesses = currentCategoryData
    ? currentCategoryData.businesses
    : [];

  return (
    <React.Fragment>
      <div
        id="explore"
        className="rounded-md border border-gray-200 mx-4 p-2 mb-4"
      >
        <h1 className="flex items-center font-bold text-xl mb-4 p-2">
          You might want to explore
        </h1>
        <div className="flex overflow-x-auto gap-4 mb-4 p-2">
          {exploreData.map((item) => (
            <button
              key={item.category}
              className={`px-4 py-2 rounded text-sm font-medium focus:outline-none ${
                selectedCategory === item.category
                  ? "bg-blue-100 text-blue-600"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              onClick={() => handleCategoryClick(item.category)}
            >
              {item.category}
            </button>
          ))}
        </div>
        {currentBusinesses.map((business) => (
          <div
            key={business.id}
            className="flex mb-4 p-2 border border-gray-200 rounded-md"
          >
            <img src={business.image} alt="" />
            <h1 className="flex text-xl font-bold gap-2 md:text-xl lg:text-2xl">
              <span className="flex items-center w-fit text-sm px-2 bg-gray-600 rounded-md text-white">
                <FaThumbsUp />
              </span>
              {business.name}
            </h1>
            <div className="flex items-center mt-1 p-2">
              <div className="flex justify-between w-fit bg-green-600 px-2 rounded text-white items-center">
                <p>{business.star}</p>
                <span className="flex items-center">
                  <MdOutlineStar />
                </span>
              </div>
              <p className="px-2 font-light">{business.rating} Ratings</p>
            </div>
            <div className="flex flex-col md:flex-row p-2 gap-2">
              <p className="flex items-center font-semibold">
                <span className="px-2">
                  <SlLocationPin />
                </span>
                {business.address}
              </p>
              {business.experience && (
                <p className="font-light">{business.experience} in Business</p>
              )}
            </div>
            <div className="flex flex-wrap gap-2 p-2">
              {business.contact && (
                <div className="flex justify-between w-fit bg-green-600 px-2 rounded text-white items-center">
                  <p className="flex items-center p-2 gap-2">
                    <span
                      className="animate-bounce"
                      style={{ animationDuration: "0.7s" }}
                    >
                      <FaPhone />
                    </span>
                    {business.contact}
                  </p>
                </div>
              )}
              <div className="flex justify-between w-fit bg-blue-600 px-2 rounded text-white items-center">
                <p className="flex items-center p-2 gap-2 font-bold">
                  <span className="text-xl font-black">
                    <FaRegComment />
                  </span>
                  Enquire Now
                </p>
              </div>
              <div className="flex justify-between w-fit bg-white shadow-2xs border px-2 rounded text-black items-center">
                <p className="flex items-center p-2 gap-2 font-bold">
                  <span className="text-[#25D366] text-3xl">
                    <PiWhatsappLogoFill />
                  </span>
                  WhatsApp
                </p>
              </div>
              <div className="flex items-center text-2xl rounded-md border-gray-200 border p-3">
                <RiShareForwardLine className="text-gray-500" />
              </div>
              <div className="flex items-center text-2xl rounded-md border-gray-200 border p-3">
                <HiOutlinePencil className="text-gray-500" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </React.Fragment>
  );
};

export default Explore;
