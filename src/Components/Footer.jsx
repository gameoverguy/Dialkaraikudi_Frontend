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
    { title: "Terms & conditions", path: "#" },
    { title: "Advertise on Dialkaraikudi", path: "#" },
  ];

  const footText3 = [
    { title: "Digitaly.Live", path: "#" },
    { title: "Dial puthukotai", path: "#" },
    { title: "Gteceducation", path: "#" },
  ];

  return (
    <>
      <div className="flex flex-col xl:flex-row flex-wrap justify-evenly items-start w-full bg-[#F3F4F6] py-10 px-7 md:px-10 xl:px-20 gap-10">
        {/* Left Section */}
        <div className="w-full sm:w-10/12 md:w-6/12 xl:w-3/12 flex flex-col gap-5 text-left">
          <p className="text-[15px] xl:text-[18px] font-bold">
            One-Stop for All Local Services
          </p>
          <div className="w-[125px] h-[50px]">
            <img src={Logo} alt="Dialkaraikudi Logo" className="object-contain" />
          </div>
          <p className="text-sm text-[#4B5563] text-justify">
            Dialkaraikudi is a premier digital platform in India that connects
            users with verified local service professionals. Focused on
            personalized services across Home, Life, and Self, it leverages
            technology and domain expertise to understand user needs and deliver
            tailored solutions.
          </p>
        </div>

        {/* Center Section - Quick & Our Links */}
        <div className="w-full sm:w-10/12 md:w-6/12 xl:w-3/12 flex flex-col sm:flex-row justify-center sm:justify-start gap-10 xl:gap-25 text-left">
          <div className="flex flex-col gap-3">
            <p className="text-xl font-bold pb-3">Quick Links</p>
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
            <p className="text-xl font-bold pb-3">Our Links</p>
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

        {/* Right Section - Offices + Social */}
        <div className="w-full sm:w-10/12 xl:w-3/12 flex flex-col gap-6 text-left">
          <div className="flex flex-col gap-4">
            <p className="text-xl font-bold pb-3">Our Offices</p>
            <div>
              <h2 className="font-semibold">CHENNAI OFFICE</h2>
              <p className="text-sm text-[#4B5563]">
                153, 13th St, Maxworth Nagar, Kovilambakkam, Chennai, Tamil Nadu - 600117
              </p>
            </div>
            <div>
              <h2 className="font-semibold">DEVELOPMENT OFFICE</h2>
              <p className="text-sm text-[#4B5563]">
                8, Muthoorani East, Muthupatinam, Karaikudi - 630001
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-sm text-[#4B5563] font-bold">Connect with us</p>
            <div className="flex gap-2">
              {social.map((item, i) => (
                <div
                  key={i}
                  className="group rounded-full p-1 cursor-pointer transition-colors"
                >
                  <div className="rounded-full p-1 transition-colors">
                    <div
                      className="group-hover:text-white rounded-full p-1"
                      style={{ color: item.color }}
                    >
                      {item.icon}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="text-sm text-center shadow-inner py-4 text-[#4B5563] bg-[#F3F4F6]">
        Copyrights 2025-26. All Rights Reserved. Digitaly Pvt ltd.
      </div>
    </>
  );
};

export default Footer;
