import React from "react";
import Logo from "../assets/logo_01.png";
import { FaInstagram, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
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
    <footer className="relative bg-[#111827] text-white overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,#0a0a0a,#2a2a2a)] opacity-95"></div>
        <div className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] animate-slow-spin">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#ffffff03_0%,transparent_70%)]"></div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-8">
        {/* Top Section with Logo and Description */}
        <div className="text-center mb-8">
          <div className="w-[125px] h-[50px] mx-auto mb-4 bg-white p-2 rounded-xl">
            <img src={Logo} alt="Dialkaraikudi Logo" className="w-full h-full object-contain" />
          </div>
          <p className="max-w-2xl mx-auto text-gray-400 text-sm">
            Dialkaraikudi is a premier digital platform in India that connects
            users with verified local service professionals.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {footText1.map((item, i) => (
                <li key={i}>
                  <a
                    href={item.path}
                    className="group flex items-center text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-3 group-hover:w-3 transition-all duration-300"></div>
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Our Links
            </h3>
            <ul className="space-y-2">
              {footText3.map((item, i) => (
                <li key={i}>
                  <a
                    href={item.path}
                    className="group flex items-center text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-3 group-hover:w-3 transition-all duration-300"></div>
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Contact Us
            </h3>
            <div className="space-y-2">
              <a href="tel:+1234567890" className="flex items-center group">
                <FaPhoneAlt className="text-blue-400 group-hover:text-blue-300 mr-3" />
                <span className="text-gray-400 group-hover:text-white transition-colors duration-300">
                  +91 1234567890
                </span>
              </a>
              <a href="mailto:info@dialkaraikudi.com" className="flex items-center group">
                <FaEnvelope className="text-blue-400 group-hover:text-blue-300 mr-3" />
                <span className="text-gray-400 group-hover:text-white transition-colors duration-300">
                  info@dialkaraikudi.com
                </span>
              </a>
            </div>
          </div>

          {/* Office Locations */}
          <div>
            <h3 className="text-lg font-bold mb-1 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Our Offices
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <FaMapMarkerAlt className="text-blue-400 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-white text-sm">CHENNAI OFFICE</h4>
                  <p className="text-xs text-gray-400">
                    153, 13th St, Maxworth Nagar, Kovilambakkam, Chennai, Tamil Nadu - 600117
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <FaMapMarkerAlt className="text-blue-400 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-white text-sm">DEVELOPMENT OFFICE</h4>
                  <p className="text-xs text-gray-400">
                    8, Muthoorani East, Muthupatinam, Karaikudi - 630001
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="border-t border-gray-800 pt-6">
          <div className="flex flex-wrap justify-center gap-4">
            {social.map((item, i) => (
              <a
                key={i}
                href="#"
                className="group"
              >
                <div
                  className="p-2 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 
                           group-hover:scale-110 group-hover:bg-white/10 
                           transition-all duration-300"
                  style={{ color: item.color }}
                >
                  {item.icon}
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center mt-6 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Digitaly Pvt ltd. All Rights Reserved.</p>
          <div className="flex justify-center items-center gap-4 mt-2">
            <a href="#" className="hover:text-gray-300 transition-colors duration-300">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-gray-300 transition-colors duration-300">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
