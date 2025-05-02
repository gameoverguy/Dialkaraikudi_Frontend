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
import { useNavigate } from "react-router-dom";

const Bussiness_List = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [visiblePhoneId, setVisiblePhoneId] = useState(null);

  useEffect(() => {
    const fetch = async () => {

      const res = await axios.get('http://192.168.1.33:5000/business')
      console.log("saki", res.data.data)
      setData(res.data.data);

    }
    fetch();
  }, [])

  const [expandedBusinessId, setExpandedBusinessId] = useState(null);

  const toggleAmenities = (id) => {
    setExpandedBusinessId(expandedBusinessId === id ? null : id);
  };

  const [filterOpen, setFilterOpen] = useState(false);
  console.log(data);
  const handleBusinessClick = (businessId) => {
    navigate(`/business/${businessId}`);
  };

  return (
    <>
      <div className="flex cursor-pointer">
        <div className="w-full xl:w-9/12">
          <div className="flex justify-center w-full flex-col">
            <div className="md:p-4 w-full xl:w-10/12">
              <div>
                <p className="text-sm text-gray-500">
                  Karaikudi &gt; Hotel &gt; kimikimi , kraikudi
                </p>
              </div>
              <div className="mt-2">
                <h1 className="text-lg font-bold">
                  Best Deals - Top Hotels in Krishna Garden, Karaikudi
                </h1>
              </div>
              <div className="relative bg-white">
                <div className="sticky top-20 bg-white py-2">
                  {/* <button className="border border-gray-400 px-2 py-1 rounded">
                  Filter
                </button> */}
                  <button
                    className="absolute right-0 top-0 border border-gray-400 px-2 py-1 rounded"
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
            <div className="mt-7 xl:w-[83%] gap-5 flex flex-col md:p-4">
              {data.map((data, i) => (
                <div
                  key={i}
                  className="inline md:flex xl:w-[100%] md:gap-3 border border-gray-300 p-3 rounded-lg"
                >
                  {/* Swiper Image Slider */}
                  {/* <div className="w-full md:w-[25%]">
                    <SwiperModal data={data.photos} />
                  </div> */}

                  {/* Business Info */}
                  <div className="mt-5 md:mt-0 w-full md:w-[100%] space-y-4">
                    <h2 className="text-xl font-semibold" onClick={() => handleBusinessClick(data._id)}>
                      {data.businessName}
                    </h2>
                    <div className="flex items-center gap-2">
                      <div className="bg-[#287094] text-sm px-2 py-1 text-center rounded text-white flex items-center gap-1">
                        {" "}
                        {data.ratings}
                        <IoIosStar
                          size={18}
                          color="#FFD700"
                          className="inline"
                        />
                      </div>{" "}
                      {data.reviewCount} Ratings
                    </div>
                    <p className="flex items-center">
                      <CiLocationOn /> {data.address.formattedAddress}
                    </p>
                    {/* <div>
                                <AmentiesModal
                                    data={data}
                                    isExpanded={expandedBusinessId === data.id}
                                    toggleExpand={() => toggleAmenities(data.id)}
                                />
                            </div> */}
                    <div className="text-sm flex gap-1">
                      <button
                        onClick={() => setVisiblePhoneId(data._id)}
                        className="bg-[#287094]  group group-hover:text-black flex rounded pr-3 py-1 items-center text-white cursor-pointer"
                      >
                        <span className="text-md text-white px-1">
                          <FaPhoneAlt className="p-1 text-xl" />
                        </span>
                        {visiblePhoneId === data._id
                          ? data.contactDetails.phone
                          : "Show Number"}
                      </button>
                      <button className="flex items-center borde border-gray-600 px-2 py-1 rounded bg-green-600 text-white cursor-pointer">
                        <span className="text-xl px-1 text-white">
                          <FaWhatsapp size={16} className="text-white" />
                        </span>{" "}
                        WhatsApp
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="hidden xl:block xl:w-3/12">
          <div className="sticky top-30">
            <img src={adds} alt="Advertisement" className="h-[75%]" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Bussiness_List;
