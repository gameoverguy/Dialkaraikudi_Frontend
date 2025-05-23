import React from "react";
import Logo from "../assets/logo_01.png";
import {
  FaInstagram,
  FaMapMarkerAlt,
  FaFacebookF,
  FaTwitter,
} from "react-icons/fa";
import { TiSocialFacebook } from "react-icons/ti";
import { IoLogoWhatsapp } from "react-icons/io5";
import { CiYoutube, CiLinkedin } from "react-icons/ci";
import digitaly from "../assets/digitaly.png";
import play from "../assets/play.png";
import { Link } from "react-router-dom";

const Footer = () => {
  const socialLinks = [
    { icon: FaInstagram, color: "#C13584", href: "https://instagram.com" },
    { icon: TiSocialFacebook, color: "#3b5998", href: "https://facebook.com" },
    { icon: IoLogoWhatsapp, color: "#25D366" },
    { icon: CiYoutube, color: "#FF0000" },
    { icon: CiLinkedin, color: "#0077b5" },
    // { icon: FaTwitter, color: "#1DA1F2", href: "https://twitter.com" },
  ];
  const footText1 = [
    { title: "About us", path: "/aboutus" },
    { title: "Contact us", path: "/contactus" },
    { title: "Terms & Conditions", path: "/terms" },
    { title: "Advertise on Dialkaraikudi", path: "#" },
  ];

  // const footText3 = [
  //   { title: "Digitaly.Live", path: "#" },
  //   { title: "Dial Puthukotai", path: "#" },
  //   { title: "Gteceducation", path: "#" },
  // ];

  return (
    <footer className="bg-gradient-to-r from-blue-200 via-indigo-650 to-blue-400">
      <div className="w-11/12 mx-auto lg:px-6 md: px-2 pt-4">
        <div className="flex flex-col md:flex-row md:gap-2 w-full justify-between items-start">
          {/* Logo and Description */}
          <div className="w-full flex flex-col items-center justify-center md:w-4/12 p-3 ">
            <div className="flex gap-3 md:gap-0 lg:gap-10 md:flex-col lg:flex-row">
              <div className="w-35 flex justify-center items-center">
                <img
                  src={Logo}
                  alt="Dialkaraikudi"
                  className="w-full h-auto mb-4 hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="flex flex-col justify-center items-center">
                <p>a Product by</p>
                <div className="flex justify-start items-start gap-5 py-3 w-15 h-15 mb-5">
                  <img
                    src={digitaly}
                    alt="Dialkaraikudi"
                    className="w-36 h-auto mb-4 hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
            </div>
            <p className="text-base leading-relaxed font-['Poppins']">
              Dialkaraikudi is a premier digital platform in India that connects
              users with verified local service professionals.
            </p>
          </div>

          {/* Quick Links */}
          <div className="w-full md:w-2/12 p-3">
            <h4 className="lg:text-lg font-semibold mb-4 text-gray-800">
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm">
              {footText1.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.path}
                    className="hover:text-blue-600 hover:pl-1 transition-all duration-300 block"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="w-full md:w-2/12 p-3">
            <h4 className="lg:text-lg font-semibold mb-4 text-gray-800">
              Contact Us
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="tel:+911234567890"
                  className="hover:text-blue-600 transition"
                >
                  +91 1234567890
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@dialkaraikudi.com"
                  className="hover:text-blue-600 transition wrap-break-word"
                >
                  info@dialkaraikudi.com
                </a>
              </li>
            </ul>
          </div>

          {/* Office Locations */}
          <div className="w-full md:w-4/12 p-3">
            <h4 className="lg:text-lg md:text-left lg:text-center font-semibold mb-4 text-gray-800">
              Our Offices
            </h4>
            <ul className="space-y-5 text-sm">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-blue-500 mt-1" />
                <div>
                  <strong className="block text-gray-700">
                    Chennai Office
                  </strong>
                  153, 13th St, Maxworth Nagar, Kovilambakkam, Chennai, TN -
                  600117
                </div>
              </li>
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-blue-500 mt-1" />
                <div>
                  <strong className="block text-gray-700">
                    Development Office
                  </strong>
                  8, Muthoorani East, Muthupatinam, Karaikudi - 630001
                </div>
              </li>
            </ul>
            <div className="mt-4 flex justify-start items-center gap-5">
              <img src={play} alt="" className="w-25 h-10" />
              <p>Coming Soon!</p>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-400 py-4 px-6 flex flex-col-reverse md:flex-col lg:flex-row justify-between items-center gap-2 lg:gap-4">
        {/* Copyright */}
        <p className="text-xs sm:text-sm text-gray-600 text-center md:text-left">
          © {new Date().getFullYear()} Sunglasschettinad Retail Private Limited.
          All Rights Reserved.
        </p>

        {/* Links */}
        <div className="flex gap-4 text-xs sm:text-sm">
          <a href="#" className="hover:text-blue-600 transition-colors">
            Privacy Policy
          </a>
          <span className="text-gray-400">•</span>
          <a href="#" className="hover:text-blue-600 transition-colors">
            Terms of Service
          </a>
        </div>

        {/* Social Icons */}
        <div className="flex flex-wrap items-center justify-center gap-3 lg:justify-start">
          {socialLinks.map((item, index) => {
            const Icon = item.icon;
            return (
              <a
                key={index}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center rounded-full transition-transform duration-300 hover:scale-110 cursor-pointer"
                style={{ color: item.color }}
                aria-label={`Visit our ${Icon.displayName || "social"} page`}
              >
                <Icon className="lg:text-3xl transition-transform duration-300 group-hover:scale-125" />
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
