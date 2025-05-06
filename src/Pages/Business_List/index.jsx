import React, { useState, useEffect } from "react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { CiLocationOn } from "react-icons/ci";
import AmentiesModal from "./amentiesModal";
import SwiperModal from "./Swiper";
import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import FilterModal from "./filter";
import adds from "../../assets/adds.jpg";
import { IoIosStar } from "react-icons/io";
import axios from "axios";
import { useNavigate, useLocation, useParams, Link } from "react-router-dom";
import banner from "../../assets/banner.jpg";
import { API } from "../../../config/config";
import Cookies from "js-cookie";
import { useLoginModal } from "../../context/LoginContext";
import { toast, ToastContainer } from "react-toastify";

const Bussiness_List = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const search = useLocation();
  const searchList = search.state;
  console.log("searchList", searchList);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showContact, setShowContact] = useState(false);
  //const [expandedBusinessId, setExpandedBusinessId] = useState(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const { id } = useParams();
  const { handleOpenLoginModal } = useLoginModal();

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
        } else if (search.state) {
          const res = await axios.get(
            `${API}/business/search/${search.state.searchQuery}`
          );
          setData(res.data.data);
          console.log("elseifffffff");
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

  const cookies = Cookies.get("userToken");

  const handleShowContact = () => {
    if (cookies) {
      setShowContact((prev) => !prev);
    } else {
      toast.warning("Please Login to show contact number");
      setTimeout(() => {
        handleOpenLoginModal();
      }, 100);
    }
  };

  // const toggleAmenities = (id) => {
  //   setExpandedBusinessId(expandedBusinessId === id ? null : id);
  // };

  const handleBusinessClick = (businessId) => {
    navigate(`/business/${businessId}`, { state: { businessId } });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col md:flex-row mx-auto shadow-lg rounded-xl overflow-hidden md:h-[30vh]">
        <div className="w-full">
          <img
            src={banner}
            alt="Banner"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="flex cursor-pointer py-5">
        <div className="w-full xl:w-9/12 xl:mx-auto">
          <div className="flex justify-center items-center w-full flex-col">
            <div className="md:p-4 w-full  xl:w-10/12">
              <div className="flex">
                <Link className="text-sm text-gray-500 hover:text-blue-500 md:px-0 px-5">
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
              <div className="relative bg-white">
                <div className="sticky top-20 bg-white py-2">
                  {/* <button className="border border-gray-400 px-2 py-1 rounded">
                  Filter
                </button> */}
                  <button
                    className="absolute right-0 top-0 border border-gray-400 px-2 py-1 rounded mr-5 md:mr-0"
                    onClick={() => setFilterOpen(true)}
                  >
                    All Filter
                  </button>
                </div>
              </div>
              <FilterModal
                setFilterOpen={setFilterOpen}
                filterOpen={filterOpen}
              />
            </div>
            <div className="mt-7 w-full md:w-[85%]  gap-5 flex flex-col p-4 md:p-4">
              {data?.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-gray-500">
                    No businesses found in this category.
                  </p>
                </div>
              ) : (
                data.map((data, i) => (
                  <div
                    key={i}
                    className="inline md:flex w-full md:gap-3 border border-gray-300 p-3 rounded-lg"
                  >
                    {/* Swiper Image Slider */}
                    {/* <div className="w-full md:w-[25%]">
                    <SwiperModal data={data.photos} />
                  </div> */}

                    {/* Business Info */}
                    <div className="mt-1 md:mt-0 w-full space-y-4">
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
                      <p className="flex items-center">
                        <CiLocationOn /> {data.address.formattedAddress}
                      </p>

                      <div className="text-sm flex gap-1">
                        <button
                          onClick={handleShowContact}
                          className="bg-[#287094] group group-hover:text-black flex rounded pr-1 py-1 items-center text-white cursor-pointer"
                        >
                          <span className="text-md text-white px-1">
                            <FaPhoneAlt className="p-1 text-xl" />
                          </span>
                          {showContact
                            ? data.contactDetails?.phone
                            : "Show Number"}
                        </button>
                        <button className="flex items-center borde border-gray-600 px-2 py-1 rounded bg-green-600 text-white cursor-pointer">
                          <span className="text-xl px-1 text-white">
                            <FaWhatsapp size={16} className="text-white" />
                          </span>
                          WhatsApp
                        </button>
                      </div>
                    </div>
                  </div> // ✅ Closing div added
                ))
              )}
            </div>
          </div>
        </div>
        <div className="hidden xl:block xl:w-4/12">
          <div className="sticky top-30">
            <img src={adds} alt="Advertisement" className="h-[75%]" />
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default Bussiness_List;
