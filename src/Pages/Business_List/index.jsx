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
import { toast, ToastContainer } from "react-toastify";
import Loader from "../../Components/Loader";
import { FaFilter } from "react-icons/fa6";
import FloatingAdBalloon from "../../Components/FloatAd";

const Bussiness_List = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const search = useLocation();
  const searchList = search.state;
  console.log("searchList", searchList);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showContact, setShowContact] = useState(null);
  const [fetchBanner , setFetchBanner] = useState(null);
  const [fetchBand , setFetchBand] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);
  // const [expandedBusinessId, setExpandedBusinessId] = useState(null);

  const [filterOpen, setFilterOpen] = useState(false);
  const { id } = useParams();
  const { handleOpenLoginModal } = useLoginModal();

  const [activeFilter, setActiveFilter] = useState(null);
  const [filteredData, setFilteredData] = useState([]);

  
  useEffect(()=>{
    const fetchAds = async ()=>{
      try{
        const response = await axios.get(`${API}/adverts`);        
        const ads = response.data.filter(ad => ad.slotId?.page === "businesslisting");
        if (ads.length > 0) {
          setFetchBanner(ads.filter(ad => ad.slotId?._id === "68283ba4158ec22d9c5bae48"));
          console.log("fetchAds", ads);
        }
      }
      catch(error){
        console.log(error);
      }
    } 
    fetchAds();
  }, [])

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
      toast.warning("Please Login to show contact number");
      setTimeout(() => {
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
      toast.warning("Please Login to contact via WhatsApp");
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
          setCurrentImageIndex((prevIndex) => 
            (prevIndex + 1) % fetchBanner.length
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
      <div className="flex flex-col md:flex-row mx-auto shadow-lg overflow-hidden lg:h-[36vh]">
      <div className="w-full">
          {fetchBanner && fetchBanner.length > 0 && (
            <img
              src={fetchBanner[currentImageIndex]?.contentUrl}
              alt="Banner"
              className={`w-full h-full object-cover transition-opacity duration-500 ${
                fadeIn ? 'opacity-100' : 'opacity-0'
              }`}
            />
          )}
        </div>
      </div>

      <div className="flex  py-5 mb-5 w-full lg:w-11/12">
        <div className="w-full lg:w-9/12 mx-auto">
          <div className="flex justify-center items-center w-full flex-col">
            <div className="md:p-2 w-full  lg:w-10/12">
              <div className="flex">
                <Link
                  to="/"
                  className="text-sm text-gray-500 hover:text-blue-500 md:px-0 px-5"
                >
                  Karaikudi &gt;
                </Link>
                <Link className="text-sm text-gray-500 hover:text-blue-500">
                  {data?.category?.displayName}
                </Link>
              </div>
              <div className="mt-2 md:px-0 px-5">
                <h1 className="text-lg font-bold">
                  Best Businesses in Karaikudi
                </h1>
              </div>
              <div className="relative  bg-white">
                <div className="sticky flex space-x-3 top-20 bg-white py-2 px-2">
                  <button
                    className="hidden md:flex border  items-center gap-2 border-gray-400 px-2 py-1 rounded"
                    onClick={() => handleFilter(null)}
                  >
                    Filter <FaFilter />
                  </button>
                  <button
                    className="border flex md:hidden items-center gap-2 border-gray-400 px-2 py-1 rounded"
                    onClick={() => handleFilter(null)}
                  >
                    <FaFilter />
                  </button>
                  <button
                    className={`border flex items-center border-gray-400 px-2 py-1 rounded cursor-pointer transition-colors duration-200
            ${
              activeFilter === 5
                ? "bg-blue-600 text-white"
                : "hover:bg-gray-100"
            }`}
                    onClick={() => handleFilter(5)}
                  >
                    5 <IoMdStar className="text-lg m-1 text-yellow-400" />
                  </button>
                  <button
                    className={`border flex items-center border-gray-400 px-2 py-1 rounded cursor-pointer transition-colors duration-200
            ${
              activeFilter === 4
                ? "bg-blue-600 text-white"
                : "hover:bg-gray-100"
            }`}
                    onClick={() => handleFilter(4)}
                  >
                    4 <IoMdStar className="text-lg m-1 text-yellow-400" />
                  </button>
                  <button
                    className={`border flex items-center border-gray-400 px-2 py-1 rounded cursor-pointer transition-colors duration-200
            ${
              activeFilter === 3
                ? "bg-blue-600 text-white"
                : "hover:bg-gray-100"
            }`}
                    onClick={() => handleFilter(3)}
                  >
                    3 <IoMdStar className="text-lg m-1 text-yellow-400" />
                  </button>
                  <button
                    className={`border flex border-gray-400 px-2 py-1 rounded cursor-pointer transition-colors duration-200
            ${
              activeFilter === "top"
                ? "bg-blue-600 text-white"
                : "hover:bg-gray-100"
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
            <div className="mt-2 p-2 w-full md:w-[85%]  gap-5 flex flex-col md:p-4">
              {filteredData?.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-gray-500">
                    No businesses found in this category.
                  </p>
                </div>
              ) : (
                filteredData.map((data, i) => (
                  <div
                    key={i}
                    className="md:flex w-full md:gap-3 border cursor-pointer border-gray-300 rounded-lg gap-2"
                  >
                    {/* Swiper Image Slider */}
                    {/* <div className="w-full md:w-[25%]">
                    <SwiperModal data={data.photos} />
                  </div> */}
                    <div className="w-full md:w-[25%]">
                      <img
                        src={data.photos[0]}
                        alt="Business"
                        className="w-full h-60 md:h-40 object-cover rounded"
                      />
                    </div>

                    {/* Business Info */}
                    <div className="w-full flex flex-col md:flex-row  justify-between p-1 md:p-3 md:pr-6">
                      <div className="space-y-4 mt-1 md:mt-0 w-full p-2">
                        <h2
                          className="text-xl font-semibold"
                          onClick={() => handleBusinessClick(data._id)}
                        >
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
                        <p className="md:flex">
                          <CiLocationOn className="text-lg" />
                          {data?.address?.formattedAddress ||
                            data?.address?.addressArea}
                        </p>
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
                            handleWhatsAppClick(data?.contactDetails?.whatsapp)
                          }
                          className="flex items-center border-gray-600 px-2 py-2 rounded bg-green-600 text-white cursor-pointer md:w-full w-6/12 justify-center md:justify-start"
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
                ))
              )}
            </div>
          </div>
        </div>
        <div className=" hidden lg:w-3/12 h-fit lg:flex flex-col gap-6 mt-16 sticky top-[16vh] mb-5">
          <div className="h-[300px] w-full bg-black">
            <img src="./square.jfif" alt="" />

          </div>
          <div className="h-[300px] w-full bg-black">
            <img src="./square2.jpg" alt="" />

          </div>
          


        </div>
        <ToastContainer />
      </div>
      <FloatingAdBalloon />
    </>
  );
};

export default Bussiness_List;
