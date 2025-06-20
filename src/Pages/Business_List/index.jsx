import React, { useState, useEffect } from "react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { CiLocationOn } from "react-icons/ci";
import AmentiesModal from "./amentiesModal";
import SwiperModal from "./Swiper";
import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import FilterModal from "./filter";
import adds from "../../assets/adds.jpeg";
import { IoIosStar, IoMdStar } from "react-icons/io";
import axios from "axios";
import { useNavigate, useLocation, useParams, Link } from "react-router-dom";
import coursal11 from "../../assets/coursal11.jpg";
import { API } from "../../../config/config";
import Cookies from "js-cookie";
import { useLoginModal } from "../../context/LoginContext";
// import { toast, ToastContainer } from "react-toastify";
import Loader from "../../Components/Loader";
import { FaFilter } from "react-icons/fa6";
import FloatingAdBalloon from "../../Components/FloatAd";

const Bussiness_List = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const search = useLocation();
  const searchList = search.state;
  // console.log("searchList", searchList);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showContact, setShowContact] = useState(null);
  const [fetchBanner, setFetchBanner] = useState(null);
  const [sideBanner, setSideBanner] = useState(null);
  const [fetchBand, setFetchBand] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);
  // const [expandedBusinessId, setExpandedBusinessId] = useState(null);

  const [filterOpen, setFilterOpen] = useState(false);
  const { id } = useParams();
  const { handleOpenLoginModal, setLoginRole } = useLoginModal();

  const [activeFilter, setActiveFilter] = useState(null);
  const [filteredData, setFilteredData] = useState([]);

  const handleCategoryClick = (category) => {
    navigate(`/business/${category}`);
  };

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await axios.get(`${API}/adverts`);
        const ads = response.data.filter(
          (ad) => ad.slotId?.page === "businesslisting"
        );
        if (ads.length > 0) {
          setFetchBanner(
            ads.filter((ad) => ad.slotId?._id === "68283ba4158ec22d9c5bae48")
          );
          console.log("fetchAds", ads);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAds();
  }, []);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await axios.get(`${API}/adverts`);
        const ads = response.data.filter(
          (ad) => ad.slotId?.page === "businesslisting"
        );
        if (ads.length > 0) {
          setFetchBanner(
            ads.filter((ad) => ad.slotId?._id === "68283ba4158ec22d9c5bae48")
          );
          setSideBanner(
            ads.filter((ad) => ad.slotId?._id === "68283c12158ec22d9c5bae4e")
          );
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAds();
  }, []);

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        setLoading(true);
        // Get category ID from location state
        const categoryId = location.state?.category;
        console.log("Category ID from state:", categoryId);

        // Only fetch category businesses if we have an ID
        if (id) {
          const res = await axios.get(`${API}/business/category/${id}`);
          setData(res.data.data);
          console.log("if", res.data.data);
        } else if (search.state) {
          const res = await axios.get(
            `${API}/business/search/${search.state.searchQuery}`
          );
          setData(res.data.data);
          console.log("elseifffffff", res.data.data);
        } else {
          // Fetch all businesses if no category ID
          const res = await axios.get(`${API}/business`);
          setData(res.data.data);
          console.log("else");
        }
      } catch (error) {
        console.error("Error fetching businesses:", error);
        setData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchBusinesses();
  }, [id, search.state]);

  useEffect(() => {
    if (!activeFilter) {
      // Sort all data by reviewCount when no filter is active
      const sorted = [...data].sort((a, b) => b.reviewCount - a.reviewCount);
      setFilteredData(sorted);
      return;
    }

    const filtered = data.filter((business) => {
      if (activeFilter === "top") {
        return business.ratings >= 2;
      }
      return Math.floor(business.ratings) === activeFilter;
    });

    // Sort filtered results by reviewCount
    const sortedFiltered = filtered.sort(
      (a, b) => b.reviewCount - a.reviewCount
    );
    setFilteredData(sortedFiltered);
  }, [activeFilter, data]);

  const handleFilter = (rating) => {
    setActiveFilter(activeFilter === rating ? null : rating);
  };

  // const cookies = Cookies.get("userToken");
  const user = JSON.parse(localStorage.getItem("userData"));

  const handleShowContact = (id) => {
    if (user) {
      setShowContact((prev) => (prev === id ? null : id)); // Toggle specific contact
    } else {
      // toast.warning("Please Login to show contact number");
      setTimeout(() => {
        setLoginRole("user");
        handleOpenLoginModal();
      }, 100);
    }
  };

  const handleWhatsAppClick = (whatsappNumber) => {
    if (user) {
      // Format the WhatsApp number and create the chat URL
      const formattedNumber = whatsappNumber?.replace(/\D/g, "");
      const whatsappUrl = `https://wa.me/${formattedNumber}`;
      window.open(whatsappUrl, "_blank");
    } else {
      // toast.warning("Please Login to contact via WhatsApp");
      setTimeout(() => {
        handleOpenLoginModal();
      }, 100);
    }
  };

  useEffect(() => {
    if (fetchBanner && fetchBanner.length > 0) {
      const interval = setInterval(() => {
        setFadeIn(false); // Start fade out
        setTimeout(() => {
          setCurrentImageIndex(
            (prevIndex) => (prevIndex + 1) % fetchBanner.length
          );
          setFadeIn(true); // Start fade in
        }, 1000); // Wait for fade out to complete
      }, 5000); // Change image every 5 seconds

      return () => clearInterval(interval);
    }
  }, [fetchBanner]);

  // const toggleAmenities = (id) => {
  //   setExpandedBusinessId(expandedBusinessId === id ? null : id);
  // };

  const handleBusinessClick = (businessId) => {
    navigate(`/business/${businessId}`, { state: { businessId } });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col md:flex-row mx-auto shadow-lg overflow-hidden md:h-[30vh] lg:h-[50vh] cursor-pointer">
        <div className="w-full">
          {fetchBanner && fetchBanner.length > 0 && (
            <img
              src={fetchBanner[currentImageIndex]?.contentUrl}
              alt="Banner"
              className={`w-full h-full object-cover transition-opacity duration-500 ${
                fadeIn ? "opacity-100" : "opacity-0"
              }`}
              onClick={() =>
                handleCategoryClick(
                  fetchBanner[currentImageIndex]?.businessId?._id
                )
              }
            />
          )}
        </div>
      </div>

      <div className="flex  py-5 mb-5 w-full lg:w-11/12">
        <div className="w-full lg:w-9/12 mx-auto">
          <div className="flex justify-center items-center w-full flex-col">
            <div className="md:p-2 w-full  lg:w-10/12">
              {/* <div className="flex">
                <Link
                  to="/"
                  className="text-sm text-gray-500 hover:text-blue-500 md:px-0 px-5"
                >
                  Karaikudi &gt;
                </Link>
                <Link className="text-sm text-gray-500 hover:text-blue-500">
                  {data?.category?.displayName}
                </Link>
              </div> */}
              <div className="mt-2 md:px-0 px-5">
                <h1 className="text-lg font-bold">
                  Best Businesses in Karaikudi
                </h1>
              </div>
              <div className="relative bg-white w-full">
                <div className="sticky flex flex-wrap gap-2 sm:flex-nowrap sm:space-x-3 top-20 bg-white py-3 px-4">
                  <button
                    className="hidden sm:flex border items-center gap-2 border-gray-400 px-3 py-1.5 rounded hover:bg-gray-50 text-sm"
                    onClick={() => handleFilter(null)}
                  >
                    Reset <FaFilter className="text-gray-600" />
                  </button>
                  <button
                    className="border flex sm:hidden items-center gap-2 border-gray-400 px-3 py-1.5 rounded hover:bg-gray-50"
                    onClick={() => handleFilter(null)}
                  >
                    <FaFilter className="text-gray-600" />
                  </button>
                  {[5, 4, 3].map((rating) => (
                    <button
                      key={rating}
                      className={`border flex items-center border-gray-400 px-3 py-1.5 rounded cursor-pointer transition-colors duration-200 text-sm min-w-[70px] justify-center
          ${
            activeFilter === rating
              ? "bg-blue-600 text-white"
              : "hover:bg-gray-50"
          }`}
                      onClick={() => handleFilter(rating)}
                    >
                      {rating}{" "}
                      <IoMdStar className="text-lg ml-1 text-yellow-400" />
                    </button>
                  ))}
                  <button
                    className={`border flex border-gray-400 px-3 py-1.5 rounded cursor-pointer transition-colors duration-200 text-sm whitespace-nowrap
        ${
          activeFilter === "top" ? "bg-blue-600 text-white" : "hover:bg-gray-50"
        }`}
                    onClick={() => handleFilter("top")}
                  >
                    Top Rating
                  </button>
                </div>
              </div>
              <FilterModal
                setFilterOpen={setFilterOpen}
                filterOpen={filterOpen}
              />
            </div>

            <div className="mt-2 p-2 w-full md:w-[85%] gap-5 flex flex-col md:p-4">
              {filteredData?.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-gray-500">
                    No businesses found in this category.
                  </p>
                </div>
              ) : (
                <>
                  {filteredData.map((data, i) => (
                    <React.Fragment key={i}>
                      <div className="md:flex w-full md:gap-3 border cursor-pointer border-gray-300 rounded-lg gap-2">
                        {/* Business card content */}
                        <div
                          className="w-full md:w-6/12 lg:w-4/12"
                          onClick={() => handleBusinessClick(data._id)}
                        >
                          <img
                            src={data.photos[0]}
                            alt="Business"
                            className="w-full h-60 md:h-full lg:h-40 object-cover rounded"
                          />
                        </div>

                        <div className="w-full flex flex-col md:flex-row justify-between p-1 md:p-3 md:pr-6">
                          <div
                            className="space-y-4 mt-1 md:mt-0 w-full p-2"
                            onClick={() => handleBusinessClick(data._id)}
                          >
                            <h2 className="text-xl font-semibold">
                              {data.businessName}
                            </h2>
                            <div className="flex items-center gap-2">
                              <div className="bg-[#287094] text-sm px-2 py-1 text-center rounded text-white flex items-center gap-1">
                                {data.ratings}
                                <IoIosStar
                                  size={18}
                                  color="#FFD700"
                                  className="inline"
                                />
                              </div>
                              {data.reviewCount} Ratings
                            </div>
                            <div className="flex items-start gap-1 max-w-full overflow-hidden">
                              <CiLocationOn className="text-xl flex-shrink-0 text-green-800" />
                              <p className="text-sm text-gray-600 line-clamp-2 break-words">
                                {data?.address?.formattedAddress ||
                                  data?.address?.addressArea}
                              </p>
                            </div>
                          </div>
                          {/* <div>
                                    <AmentiesModal
                                        data={data}
                                        isExpanded={expandedBusinessId === data.id}
                                        toggleExpand={() => toggleAmenities(data.id)}
                                    />
                                </div> */}

                          <div className="text-sm flex md:flex-col flex-row gap-2 text-nowrap md:justify-center px-2 pb-2">
                            <button
                              onClick={() => handleShowContact(data._id)}
                              className="bg-[#287094] group flex items-center rounded pr-1 md:py-1 text-white cursor-pointer md:w-full w-6/12 justify-center md:justify-start"
                            >
                              <span className="text-md text-white px-1 py-1">
                                <FaPhoneAlt className="p-1 text-xl" />
                              </span>
                              {showContact === data._id
                                ? data?.contactDetails?.phone
                                : "Show Number"}
                            </button>
                            <button
                              onClick={() =>
                                handleWhatsAppClick(
                                  data?.contactDetails?.whatsapp
                                )
                              }
                              className={`flex items-center border-gray-600 px-2 py-2 rounded bg-green-600 text-white md:w-full w-6/12 justify-center md:justify-start ${
                                !data?.contactDetails?.whatsapp
                                  ? "opacity-50 cursor-not-allowed"
                                  : "cursor-pointer"
                              }`}
                              disabled={!data?.contactDetails?.whatsapp}
                            >
                              <span className="text-xl px-1 text-white">
                                <FaWhatsapp size={16} className="text-white" />
                              </span>
                              {/* {showContact === data._id
                                ? data?.contactDetails?.whatsapp
                                : "WhatsApp"} */}
                              Whatsapp
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Show side banner after every 2 items in mobile view */}
                      {(i + 1 === 2 || i + 1 === 4) &&
                        sideBanner &&
                        sideBanner.length > 0 && (
                          <div className="lg:hidden md:w-[50%] h-full my-4 mx-auto">
                            <img
                              src={
                                sideBanner[
                                  Math.floor(i / 2) % sideBanner.length
                                ]?.contentUrl
                              }
                              alt={`Mobile Side Banner ${
                                Math.floor(i / 2) + 1
                              }`}
                              className="w-full h-full object-cover rounded-lg"
                            />
                          </div>
                        )}
                    </React.Fragment>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
        {/* // Replace the side banner div with this: */}
        <div className="hidden lg:w-3/12 h-fit lg:flex flex-col gap-6 mt-16 sticky top-[16vh] mb-5 cursor-pointer">
          {sideBanner &&
            sideBanner.map((banner, index) => (
              <div key={index} className="h-[300px] w-full bg-black">
                <img
                  src={banner.contentUrl}
                  alt={`Side Banner ${index + 1}`}
                  className="w-full h-full object-cover"
                  onClick={() => handleCategoryClick(banner.businessId?._id)}
                />
              </div>
            ))}
        </div>
        {/* <ToastContainer /> */}
      </div>
      <FloatingAdBalloon />
    </>
  );
};

export default Bussiness_List;
