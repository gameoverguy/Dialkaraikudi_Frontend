import React from "react";
import Logo from "../assets/logo_01.png";
import { FaInstagram } from "react-icons/fa";
import { TiSocialFacebook } from "react-icons/ti";
import { IoLogoWhatsapp } from "react-icons/io5";
import { CiYoutube, CiLinkedin } from "react-icons/ci";

const Footer = () => {
  const social = [
    { icon: <FaInstagram size={25} />, color: "#9F33AE" },
    { icon: <TiSocialFacebook size={25} />, color: "#395498" },
    { icon: <IoLogoWhatsapp size={25} />, color: "#17980E" },
    { icon: <CiYoutube size={25} />, color: "#D62B27" },
    { icon: <CiLinkedin size={25} />, color: "#0077AF" },
  ];

  const footText1 = [
    { title: "About us", path: "#" },
    { title: "Contact us", path: "#" },
    { title: "Ads / commercials", path: "#" },
    { title: "Terms & conditions", path: "#" },
    { title: "Copyright policy", path: "#" },
    { title: "Careers", path: "#" },
    { title: "Media coverage", path: "#" },
    { title: "Advertise on Dialkaraikudi", path: "#" },
    { title: "Privacy policy", path: "#" },
  ];

  const footText3 = [
    { title: "Study Abroad", path: "#" },
    { title: "Property", path: "#" },
    { title: "Real Estate", path: "#" },
    { title: "Rentals", path: "#" },
    { title: "PG", path: "#" },
    { title: "Roommates", path: "#" },
    { title: "Capshine", path: "#" },
  ];

  return (
    <>
    <div className="flex flex-col xl:flex-row justify-center items-center w-full bg-[#F3F4F6] py-5">
      {/* Left Section */}
      <div className="flex flex-col w-full xl:w-6/12 px-5 xl:px-40 gap-5 py-10">
        <p className="text-[15px] xl:text-xl font-bold">
          One-Stop for All Local Services Across India
        </p>
        <div className="w-[125px] h-[50px] flex justify-center items-center">
          <img src={Logo} alt="Dialkaraikudi Logo" />
        </div>
        <p className="text-sm text-[#4B5563] text-justify">
          Dialkaraikudi is a premier digital platform in India that connects
          users with verified local service professionals. Focused on
          personalized services across Home, Life, and Self, it leverages
          technology and domain expertise to understand user needs and deliver
          tailored solutions.
        </p>
        <p className="text-sm text-[#4B5563] font-bold">Connect with us</p>
        <div className="flex gap-2 items-center">
          {social.map((item, i) => (
            <div
              key={i}
              className="group rounded-full p-1 cursor-pointer transition-colors"
              style={{ transition: "background-color 0.3s" }}
            >
              <div
                className="rounded-full p-1 transition-colors"
                style={{ backgroundColor: "transparent" }}
              >
                <div
                  className="group-hover:text-white rounded-full p-1"
                  style={{ transition: "color 0.3s", color: item.color }}
                >
                  {item.icon}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full xl:w-6/12 flex flex-col xl:flex-row px-5 xl:px-20 xl:py-10 gap-y-10 xl:gap-x-40">
        <div className="flex flex-col gap-3">
          <p className="text-xl font-bold pb-5">Quick Links</p>
          {footText1.map((item, i) => (
            <a
              key={i}
              href={item.path}
              className="text-sm text-[#4B5563] hover:underline cursor-pointer"
            >
              {item.title}
            </a>
          ))}
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-xl font-bold pb-5">Dialkaraikudi Domains</p>
          {footText3.map((item, i) => (
            <a
              key={i}
              href={item.path}
              className="text-sm text-[#4B5563] hover:underline cursor-pointer"
            >
              {item.title}
            </a>
          ))}
        </div>
      </div>
    </div>
    <div className='text-sm text-center shadow-inner py-4 text-[#4B5563] bg-[#F3F4F6]'>
                Copyrights 2025-26.  All Rights Reserved. Digitaly Pvt ltd.
            </div>

    </>
    
  );
};

export default Footer;
