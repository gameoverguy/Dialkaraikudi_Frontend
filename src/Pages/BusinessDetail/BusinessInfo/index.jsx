import React, { useState } from "react";
import { MdOutlineStar } from "react-icons/md";
import { SlLocationPin } from "react-icons/sl";
import { FaPhone } from "react-icons/fa6";
import StarRating from "../ReviewStar";
import { useLoginModal } from "../../../context/LoginContext";
import CustomModal from "../../../Components/modal";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { FaBookmark } from "react-icons/fa6";
import { FaRegBookmark } from "react-icons/fa";

const BusinessInfo = ({ formData, businessId }) => {
  const [showContact, setShowContact] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { handleOpenLoginModal } = useLoginModal();
  const [showImageModal, setShowImageModal] = useState(false);
  const [initialSlide, setInitialSlide] = useState(0);
  const userData = JSON.parse(localStorage.getItem("userData"));
  const isLoggedin = !!userData;

  const handleShowContact = () => {
    if (isLoggedin) {
      setShowContact((prev) => !prev);
    } else {
      handleOpenLoginModal();
    }
  };

  const handleImageClick = (index) => {
    setInitialSlide(index);
    setShowImageModal(true);
  };

  const handleBookmarkClick = () => {
    if (isLoggedin) {
      setIsBookmarked((prev) => !prev);
    } else {
      handleOpenLoginModal();
    }
  };

  return (
    <>
      <div className="rounded-md mx-4 bg-white">
        <div className="md:hidden mb-6 overflow-hidden">
          {formData?.business.photos?.length > 0 ? (
            <div className="cursor-pointer" onClick={() => handleImageClick(0)}>
              <img
                src={formData?.business.photos[0]}
                alt="Main"
                className="w-full h-80 object-cover rounded-t-lg"
              />
            </div>
          ) : (
            <div className="h-64 bg-gray-100 flex items-center justify-center rounded-t-lg">
              <span className="text-gray-400">No Images Available</span>
            </div>
          )}
        </div>
        <div className="hidden md:block mb-6 overflow-hidden">
          <div className="grid grid-cols-6 gap-2 h-[300px]">
            {formData?.business.photos?.length > 0 ? (
              <>
                <div
                  className="col-span-2 row-span-2 overflow-hidden cursor-pointer relative"
                  onClick={() => handleImageClick(0)}
                >
                  <img
                    src={formData.business.photos[0]}
                    alt="Main"
                    className="w-full h-full object-cover absolute inset-0 rounded-tl-lg"
                  />
                </div>
                <div
                  className="col-span-2 row-span-2 overflow-hidden cursor-pointer relative"
                  onClick={() => handleImageClick(0)}
                >
                  <img
                    src={formData.business.photos[1]}
                    alt="Main"
                    className="w-full h-full object-cover absolute inset-0 rounded-tl-lg"
                  />
                </div>
              </>
            ) : (
              <div className="col-span-2 row-span-2 bg-gray-100 flex items-center justify-center rounded-tl-lg">
                <span className="text-gray-400">No Images Available</span>
              </div>
            )}
            {[2, 3, 4, 5].map((index) => (
              <div
                key={index}
                className={`
      col-span-1
      ${index === 5 ? "rounded-tr-lg" : ""}
      ${index === 4 ? "rounded-br-lg" : ""}
      relative cursor-pointer overflow-hidden
      ${index <= 2 ? "h-[150px]" : "h-[148px]"}
    `}
                onClick={() =>
                  formData?.business.photos?.[index] && handleImageClick(index)
                }
              >
                {formData?.business.photos?.[index] ? (
                  <img
                    src={formData.business.photos[index]}
                    alt={`Image ${index + 1}`}
                    className="w-full h-full object-cover absolute inset-0"
                  />
                ) : (
                  <div className="bg-gray-100 h-full w-full flex items-center justify-center absolute inset-0">
                    <span className="text-gray-400 text-sm">
                      {formData?.business.photos?.length === 0
                        ? "No Images"
                        : "No More Images"}
                    </span>
                  </div>
                )}
                {index === 4 && formData?.business.photos?.length > 6 && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="text-white text-lg font-semibold">
                      +{formData.business.photos.length - 6} more
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <CustomModal
          isOpen={showImageModal}
          onClose={() => setShowImageModal(false)}
          classname="w-11/12 md:w-3/4 lg:w-4/5"
          title="Gallery"
        >
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            initialSlide={initialSlide}
            className="h-[70vh]"
          >
            {formData?.business.photos?.map((photo, index) => (
              <SwiperSlide key={index}>
                <div className="w-full h-full flex items-center justify-center">
                  <img
                    src={photo}
                    alt={`Gallery ${index + 1}`}
                    className="min-h-full min-w-full object-contain"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </CustomModal>

        <div className="p-4">
          <div className="flex justify-between">
            <h1 className="flex items-center gap-2 text-lg font-bold md:text-xl lg:text-2xl">
              {formData?.business.businessName}
            </h1>
            <div
              onClick={handleBookmarkClick}
              className="cursor-pointer text-xl text-purple-600 hover:text-purple-700 transition-colors"
            >
              {isBookmarked ? <FaBookmark /> : <FaRegBookmark />}
            </div>
          </div>
          <div className="flex items-center gap-2 mt-2 text-sm md:text-base">
            <div className="flex items-center bg-green-600 text-white px-2 py-1 rounded">
              {formData?.business.ratings}
              <MdOutlineStar className="ml-1" />
            </div>
            <span className="text-gray-600">
              {formData?.business.reviewCount} Ratings
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 mt-3 text-sm">
            <p className="flex items-center font-semibold text-gray-700">
              <SlLocationPin className="mr-1 text-base" />
              {formData?.business.address?.addressArea}{" "}
              {formData?.business.address?.city}{" "}
              {formData?.business.address?.state}{" "}
              {formData?.business.address?.pincode}
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
                {showContact && isLoggedin
                  ? formData?.business.contactDetails?.phone
                  : "Show Number"}
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
              </div>
            </div>
            <div className="hidden md:block">
              <p className="flex justify-end font-semibold">Click to Rate</p>
              <StarRating
                formData={formData}
                businessId={formData.business._id}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BusinessInfo;
