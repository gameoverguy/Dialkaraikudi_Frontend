import React, { useState } from "react";
import { MdOutlineStar } from "react-icons/md";
import { SlLocationPin } from "react-icons/sl";
import { FaPhone } from "react-icons/fa6";
import { RiShareForwardLine } from "react-icons/ri";
import { HiOutlinePencil } from "react-icons/hi2";
import { CiLocationArrow1 } from "react-icons/ci";
import StarRating from "../ReviewStar";
import { useLoginModal } from "../../../context/LoginContext";

const BusinessInfo = ({ formData }) => {
  const [showContact, setShowContact] = useState(false);
  const [isLoggedin, setIsLoggedin] = useState(false);
  const { handleOpenLoginModal } = useLoginModal();
  const handleShowContact = () => {
    if (isLoggedin) {
      setShowContact(prev => !prev);
    } else {
      handleOpenLoginModal();
    }
  };
  return (
    <>
      {formData.map((business) => (
        <div
          key={business.id}
          className="rounded-md border border-gray-200 mx-4 bg-white"
        >
          <div className="mb-6">
            <div className="grid grid-cols-4 gap-2">
              {/* Main large image */}
              {business.imageUrls.length > 0 ? (
                <div className="col-span-2 row-span-2 overflow-hidden max-h-90">
                  <img
                    src={business.imageUrls[0].url}
                    alt="Main"
                    className="w-full h-full object-cover rounded-tl-lg"
                  />
                </div>
              ) : (
                <div className="col-span-2 row-span-2 bg-gray-100 flex items-center justify-center rounded-tl-lg">
                  <span className="text-gray-400">No Images Available</span>
                </div>
              )}

              {/* Remaining image slots */}
              {[1, 2, 3, 4].map((index) => (
                <div
                  key={index}
                  className={`${index === 2 ? 'rounded-tr-lg' :
                      index === 4 ? 'rounded-br-lg' : ''
                    } relative`}
                >
                  {business.imageUrls[index] ? (
                    <img
                      src={business.imageUrls[index].url}
                      alt={`Image ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="bg-gray-100 h-full flex items-center justify-center">
                      <span className="text-gray-400 text-sm">
                        {business.imageUrls.length === 0 ? 'No Images' : 'No More Images'}
                      </span>
                    </div>
                  )}
                  {index === 4 && business.imageUrls.length > 5 && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <span className="text-white text-lg font-semibold">
                        +{business.imageUrls.length - 5} more
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="p-4">
            <h1 className="flex items-center gap-2 text-lg font-bold md:text-xl lg:text-2xl">
              {business.name}
            </h1>
            <div className="flex items-center gap-2 mt-2 text-sm md:text-base">
              <div className="flex items-center bg-green-600 text-white px-2 py-1 rounded">
                {business.star}
                <MdOutlineStar className="ml-1" />
              </div>
              <span className="text-gray-600">{business.rating} Ratings</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 mt-3 text-sm">
              <p className="flex items-center font-semibold text-gray-700">
                <SlLocationPin className="mr-1 text-base" />
                {business.address}
              </p>
            </div>
            <div className="flex justify-between">
              <div className="md:flex flex-wrap gap-2 mt-4 text-sm">
                <div
                  className="hidden bg-green-600 text-white rounded md:flex items-center px-3 py-2 cursor-pointer hover:bg-green-700"
                  onClick={handleShowContact}
                >
                  <FaPhone
                    className="animate-bounce mr-2"
                    style={{ animationDuration: "0.7s" }}
                  />
                  {showContact && isLoggedin ? business.contact : "Show Number"}
                </div>
                <div className="md:hidden flex justify-around text-center">
                  <div className="flex flex-col items-center w-20">
                    <div className="bg-blue-600 text-white rounded flex items-center justify-center p-2">
                      <FaPhone
                        className="animate-bounce text-xl"
                        style={{ animationDuration: "0.7s" }}
                      />
                    </div>
                    <p className="mt-1 text-sm">Call Now</p>
                  </div>
                  <div className="flex flex-col items-center w-20">
                    <div className="border shadow-sm bg-white rounded flex items-center justify-center p-2 text-black font-bold">
                      <CiLocationArrow1 className="text-black text-xl" />
                    </div>
                    <p className="mt-1 text-sm">Direction</p>
                  </div>

                  <div className="flex flex-col items-center w-20">
                    <div className="border shadow-sm bg-white rounded flex items-center justify-center p-2 text-black font-bold">
                      <RiShareForwardLine className="text-black text-xl" />
                    </div>
                    <p className="mt-1 text-sm">Share</p>
                  </div>
                </div>
                <div className="hidden border md:block rounded-md p-2 text-gray-600 text-xl">
                  <RiShareForwardLine />
                </div>
                <div className="hidden border md:block rounded-md p-2 text-gray-600 text-xl">
                  <HiOutlinePencil />
                </div>
              </div>
              <div className="hidden md:block">
                <p className="flex justify-end font-semibold">Click to Rate</p>
                <StarRating />
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default BusinessInfo;
