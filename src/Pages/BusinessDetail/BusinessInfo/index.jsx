import React from 'react';
import { MdOutlineStar } from "react-icons/md";
import { SlLocationPin } from "react-icons/sl";
import { FaThumbsUp, FaRegComment, FaPhone } from "react-icons/fa6";
import { PiWhatsappLogoFill } from "react-icons/pi";
import { RiShareForwardLine } from "react-icons/ri";
import { HiOutlinePencil } from "react-icons/hi2";

const BusinessInfo = ({formData}) => {
  return (
    <React.Fragment>
        {formData.map((business) => (
              <div key={business.id} className="rounded-md border border-gray-200 mx-4">
                <h1 className="flex text-xl font-bold gap-2 md:text-xl lg:text-2xl">
                  <span className="flex items-center text-sm px-2 bg-gray-600 rounded-md text-white">
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
                  <p className="font-light">
                    {business.experience} in Business
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 p-2">
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
    </React.Fragment>
  )
}

export default BusinessInfo