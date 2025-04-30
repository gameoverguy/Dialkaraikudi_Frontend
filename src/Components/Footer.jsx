import React from "react";
import Logo from "../assets/logo_01.png";
import { FaSquareInstagram } from "react-icons/fa6";
import { TiSocialFacebook } from "react-icons/ti";
import { IoLogoWhatsapp } from "react-icons/io5";
import { FaInstagram } from "react-icons/fa";
import { CiYoutube } from "react-icons/ci";
import { CiLinkedin } from "react-icons/ci";

const Footer = () => {
  const social = [
    { title: <FaInstagram size={25} /> },
    { title: <TiSocialFacebook size={25} /> },
    { title: <IoLogoWhatsapp size={25} /> },
    { title: <CiYoutube size={25} /> },
    { title: <CiLinkedin size={25} /> },
  ];

  const footText1 = [
    { title: "About us", path: "" },
    { title: "Contact us", path: "" },
    { title: "Ads / commercials", path: "" },
    { title: "Terms & conditions", path: "" },
    { title: "Copyright policy", path: "" },
  ];

  const footText2 = [
    { title: "Careers", path: "" },
    { title: "Media coverage", path: "" },
    { title: "Advertise on Dialkaraikudi", path: "" },
    { title: "Privacy policy", path: "" },
  ];

  const footText3 = [
    { title: "Study Abroad", path: "" },
    { title: "Property", path: "" },
    { title: "Real Estate", path: "" },
    { title: "Rentals", path: "" },
    { title: "PG", path: "" },
    { title: "Roommates", path: "" },
    { title: "Capshine", path: "" },
  ];

  return (
    <>
      <div className="flex flex-col xl:flex-row justify-center items-start w-12/12 bg-[#F3F4F6] py-5">
      
        <div className="w-1/12 py-10"></div>
        <div className="flex flex-col w-full xl:w-4/12 px-5 xl:px-0 gap-5 py-10">
          <p className="text-[15px] xl:text-xl font-bold">
            One-Stop for All Local Services Across India
          </p>
          <div className="w-[125px] h-[50px] flex justify-center items-center">
          <img src={Logo} alt="" />
          </div>
          <p className="text-sm text-[#4B5563] text-justify">
            Dialkaraikudi is a premier digital platform in India that connects
            users with verified local service professionals. Focused on
            personalized services across Home, Life, and Self, it leverages
            technology and domain expertise to understand user needs and deliver
            tailored solutions.
          </p>
          <p className="text-sm text-[#4B5563] font-bold">Connect with us</p>
          <div className="flex justify-start gap-1 items-center">
            {social.map((items, i) => (
              <div
                key={i}
                className={`border-0.5 p-0.5 transition-colors duration-300 rounded-3xl cursor-pointer
                ${i === 0 ? "hover:bg-[#9F33AE]" : ""}
                ${i === 1 ? "hover:bg-[#395498]" : ""}
                ${i === 2 ? "hover:bg-[#17980E]" : ""}
                ${i === 3 ? "hover:bg-[#D62B27]" : ""}
                ${i === 4 ? "hover:bg-[#0077AF]" : ""}
              `}
              >
                <p className="hover:text-white px-1 py-1">{items.title}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full xl:w-2/12 flex justify-center items-start flex-col px-5 xl:px-19 xl:py-10">
          <p className="text-xl font-bold pb-5">Quick Links</p>
          <div className="flex flex-col gap-3">
            {footText1.map((item, i) => (
              <div key={i}>
                <p className="text-sm text-[#4B5563] cursor-pointer">
                  {item.title}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full xl:w-2/12 flex justify-center items-start xl:py-10 flex-col px-5 xl:px-10">
          <p className="pb-10"></p>
          <div className="flex flex-col gap-3">
            {footText2.map((item, i) => (
              <div key={i}>
                <p className="text-sm text-[#4B5563] cursor-pointer">
                  {item.title}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full xl:w-2/12 flex justify-center items-start py-10 flex-col px-5">
          <p className="text-xl font-bold pb-5">Dialkaraikudi Domains</p>
          <div className="flex flex-col gap-3">
            {footText3.map((item, i) => (
              <div key={i}>
                <p className="text-sm text-[#4B5563] cursor-pointer">
                  {item.title}
                </p>
              </div>
            ))}
          </div>
        </div>
        
      </div>
    </>
  );
};

export default Footer;
