import React from "react";
import Logo from "../assets/logo_01.png";
import { FaInstagram } from "react-icons/fa";
import { TiSocialFacebook } from "react-icons/ti";
import { IoLogoWhatsapp } from "react-icons/io5";
import { CiYoutube, CiLinkedin } from "react-icons/ci";

const Footer = () => {
  const social = [
    { icon: <FaInstagram />, color: "#9F33AE" },
    { icon: <TiSocialFacebook />, color: "#395498" },
    { icon: <IoLogoWhatsapp />, color: "#17980E" },
    { icon: <CiYoutube />, color: "#D62B27" },
    { icon: <CiLinkedin />, color: "#0077AF" },
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
    <footer className="relative bg-gradient-to-br from-[#1a1c20] via-[#2d2f34] to-[#3d4046] text-white overflow-hidden">
      {/* Background animation */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,#1a1c20,#2d2f34)] opacity-95"></div>
        <div className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] animate-slow-spin">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#ffffff05_0%,transparent_70%)]"></div>
        </div>
      </div>

      {/* Footer Content */}
      <div className="relative max-w-7xl mx-auto px-4 py-6 sm:py-8 md:py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
          {/* Logo + Description */}
          <div className="lg:col-span-4">
            <div className="w-[100px] sm:w-[125px] h-[40px] sm:h-[50px] mb-3 sm:mb-4">
              <img src={Logo} alt="Logo" className="w-full h-full object-contain" />
            </div>
            <p className="text-gray-300 text-sm sm:text-[15px] mb-4">
              Dialkaraikudi is a premier digital platform in India that connects
              users with verified local service professionals.
            </p>
          </div>

          {/* Middle columns: Links, Contact, Offices */}
          <div className="md:col-span-2 lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Quick Links */}
            <div>
              <h3 className="text-base md:text-lg font-bold mb-3 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Quick Links
              </h3>
              <ul className="space-y-2">
                {footText1.map((item, i) => (
                  <li key={i}>
                    <a
                      href={item.path}
                      className="group flex items-center text-gray-300 hover:text-white transition-colors duration-300 text-sm"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 mr-3 group-hover:w-2.5 transition-all duration-300"></div>
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-base md:text-lg font-bold mb-3 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Contact Us
              </h3>
              <div className="space-y-2">
                <a href="tel:+911234567890" className="flex items-center group text-sm">
                  <FaPhoneAlt className="text-cyan-400 group-hover:text-cyan-300 mr-3" />
                  <span className="text-gray-300 group-hover:text-white">+91 1234567890</span>
                </a>
                <a href="mailto:info@dialkaraikudi.com" className="flex items-center group text-sm">
                  <FaEnvelope className="text-cyan-400 group-hover:text-cyan-300 mr-3" />
                  <span className="text-gray-300 group-hover:text-white">info@dialkaraikudi.com</span>
                </a>
              </div>
            </div>

            {/* Offices */}
            <div>
              <h3 className="text-base md:text-lg font-bold mb-3 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Our Offices
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <FaMapMarkerAlt className="text-cyan-400 mt-1" />
                  <div>
                    <h4 className="font-semibold text-white text-sm">CHENNAI OFFICE</h4>
                    <p className="text-sm text-gray-300">
                      153, 13th St, Maxworth Nagar, Kovilambakkam, Chennai, TN - 600117
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <FaMapMarkerAlt className="text-cyan-400 mt-1" />
                  <div>
                    <h4 className="font-semibold text-white text-sm">DEVELOPMENT OFFICE</h4>
                    <p className="text-sm text-gray-300">
                      8, Muthoorani East, Muthupatinam, Karaikudi - 630001
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="lg:col-span-1 flex flex-row md:flex-col items-center md:items-center justify-center md:justify-start gap-4">
            <h3 className="hidden md:block text-base font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
              Follow
            </h3>
            <div className="flex gap-4 md:flex-row lg:flex-col md:gap-4">
              {social.map((item, i) => (
                <a key={i} href="#" className="group">
                  <div
                    className="p-2 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 
                    group-hover:scale-110 group-hover:bg-white/10 transition-all duration-300"
                    style={{ color: item.color }}
                  >
                    {React.cloneElement(item.icon, { size: 20 })}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="border-t border-gray-700 mt-8 pt-5 text-center text-xs sm:text-sm text-gray-400">
          <p>© {new Date().getFullYear()} Digitaly Pvt ltd. All Rights Reserved.</p>
          <div className="flex justify-center gap-4 mt-2">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="w-full text-[11px] md:text-sm text-center shadow-inner py-4 text-[#4B5563] bg-[#F3F4F6] md:px-0 px-2">
        Copyrights @ 2025-26. All Rights Reserved. Digitaly Pvt ltd.
      </div>
    </>
  );
};

export default Footer;
