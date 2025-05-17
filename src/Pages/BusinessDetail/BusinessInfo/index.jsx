import React, { useEffect, useState } from "react";
import { MdOutlineStar } from "react-icons/md";
import { SlLocationPin } from "react-icons/sl";
import { FaPhone } from "react-icons/fa6";
import StarRating from "../ReviewStar";
import { useLoginModal } from "../../../context/LoginContext";
import CustomModal from "../../../Components/modal";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import axios from "axios";
import { API } from "../../../../config/config";

const BusinessInfo = ({ formData, businessId }) => {
  const [showContact, setShowContact] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { handleOpenLoginModal } = useLoginModal();
  const [showImageModal, setShowImageModal] = useState(false);
  const [initialSlide, setInitialSlide] = useState(0);
  const userData = JSON.parse(localStorage.getItem("userData"));
  const isLoggedin = !!userData;
  // console.log(userData.user_id);
  // console.log(businessId);

  const handleShowContact = () => {
    if (isLoggedin) {
      setShowContact((prev) => !prev);
    } else {
      handleOpenLoginModal();
    }
  };
  useEffect(() => {
    if (isLoggedin && businessId) {
      checkFavoriteStatus();
    }
  }, [businessId, isLoggedin]); // Added isLoggedin as a dependency

  const checkFavoriteStatus = async () => {
    try {
      const response = await axios.get(
        `${API}/favourites/check?user=${userData.user_id}&business=${businessId}`
      );
      setIsBookmarked(response.data.favourited);
    } catch (error) {
      console.error("Error checking favorite status:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleImageClick = (index) => {
    setInitialSlide(index);
    setShowImageModal(true);
  };

  const handleBookmarkClick = async () => {
    if (!isLoggedin) {
      handleOpenLoginModal();
      return;
    }

    try {
      setIsLoading(true);
      if (isBookmarked) {
        const response = await axios.post(`${API}/favourites/remove`, {
          user: userData.user_id,
          business: businessId,
        });
        console.log(response.data);

        if (response.data.success) {
          setIsBookmarked(false);
        } else {
          console.error("Failed to remove bookmark:", response.data.error);
        }
      } else {
        const response = await axios.post(`${API}/favourites/add`, {
          user: userData.user_id,
          business: businessId,
        });
        console.log(response.data);

        if (response.data.success) {
          setIsBookmarked(true);
        } else {
          console.error("Failed to add bookmark:", response.data.error);
        }
      }
    } catch (error) {
      console.error(
        "Error updating favorite status:",
        error?.response?.data || error.message
      );
    } finally {
      setIsLoading(false);
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
                  className="col-span-2 row-span-2 overflow-hidden cursor-pointer relative rounded-tl-lg"
                  onClick={() => handleImageClick(0)}
                >
                  <img
                    src={formData.business.photos[0]}
                    alt="Main"
                    className="w-full h-full object-cover absolute inset-0"
                  />
                </div>
                {formData.business.photos[1] && (
                  <div
                    className="col-span-2 row-span-2 overflow-hidden cursor-pointer relative"
                    onClick={() => handleImageClick(1)}
                  >
                    <img
                      src={formData.business.photos[1]}
                      alt="Secondary"
                      className="w-full h-full object-cover absolute inset-0"
                    />
                  </div>
                )}
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
                  relative cursor-pointer overflow-hidden
                  ${index === 5 ? "rounded-tr-lg" : ""}
                  ${index === 4 ? "rounded-br-lg" : ""}
                  ${index <= 3 ? "h-[148px]" : "h-[150px]"}
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
                      {formData?.business.photos?.length <= 2
                        ? "No More Images"
                        : "No More Images"}
                    </span>
                  </div>
                )}
                {index === 5 && formData?.business.photos?.length > 6 && (
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
            <button
              onClick={handleBookmarkClick}
              disabled={isLoading}
              className={`
                relative group p-2.5 rounded-full transition-all duration-300 transform
                ${
                  isLoading
                    ? "cursor-wait opacity-50"
                    : "hover:scale-110 active:scale-95"
                }
                ${
                  isLoggedin && isBookmarked
                    ? "text-red-600 hover:text-red-700 bg-red-50"
                    : "text-gray-400 hover:text-red-500 hover:bg-red-50"
                }
              `}
            >
              {isLoading ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="animate-spin h-5 w-5 border-2 border-red-600 border-t-transparent rounded-full" />
                </div>
              ) : (
                <>
                  {isLoggedin && isBookmarked ? (
                    <FaHeart className="text-2xl transition-transform" />
                  ) : (
                    <FaRegHeart className="text-2xl transition-transform" />
                  )}
                  {/* {isLoggedin && isBookmarked && (
                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" />
                    </span>
                  )} */}
                </>
              )}
            </button>
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
                <a
                  href={`tel:${formData?.business.contactDetails?.phone}`}
                  className="flex flex-col items-center w-20"
                >
                  <div className="bg-blue-600 text-white rounded flex items-center justify-center p-2">
                    <FaPhone
                      className="animate-bounce text-xl"
                      style={{ animationDuration: "0.7s" }}
                    />
                  </div>
                  <p className="mt-1 text-sm">Call Now</p>
                </a>
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
