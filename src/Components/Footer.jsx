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
import Google_play from "../assets/Google_play.png";
import { Link, useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  const socialLinks = [
    {
      icon: FaInstagram,
      color: "#e602cb",
      href: "https://www.instagram.com/digitaly.live/?hl=en",
    },
    { icon: TiSocialFacebook, color: "#3f048c", href: "https://facebook.com" },
    { icon: IoLogoWhatsapp, color: "#04b504" },
    { icon: CiYoutube, color: "#FF0000" },
    { icon: CiLinkedin, color: "#0e4eb5" },
    // { icon: FaTwitter, color: "#1DA1F2", href: "https://twitter.com" },
  ];
  const footText1 = [
    { title: "About us", path: "/aboutus" },
    { title: "Contact us", path: "/contactus" },
    // { title: "Terms & Conditions", path: "/terms" },
    // { title: "Privacy Policy", path: "/privacypolicy" },
    { title: "Shipping Policy", path: "/shippingpolicy" },
    { title: "Refund and Cancellation Policy", path: "/cancellationpolicy" },
  ];

  // const footText3 = [
  //   { title: "Digitaly.Live", path: "#" },
  //   { title: "Dial Puthukotai", path: "#" },
  //   { title: "Gteceducation", path: "#" },
  // ];

  return (
    <footer className="bg-blue-300 transition-all duration-300 hover:shadow-lg">
      <div className="w-11/12 mx-auto md:px-2 pt-4 transition-all duration-300">
        <div className="flex flex-col w-full justify-between items-start">
          <div className="lg:w-full flex justify-between">
            <div className="lg:w-9/12 flex justify-between">
              {/* Logo and Description */}
              <div className="w-full flex flex-col items-center justify-center md:w-6/12 lg:w-6/12  p-3 transition-all duration-300 hover:transform hover:scale-102">
                <div className="w-full px-8 flex lg:gap-10 justify-between flex-row items-center">
                  <div className="w-35 flex justify-center items-center group">
                    <img
                      src={Logo}
                      onClick={() => navigate("/")}
                      alt="Dialkaraikudi"
                      className="w-full h-auto mb-4 transform transition-all duration-300 group-hover:scale-110 cursor-pointer"
                    />
                  </div>
                  <div className="flex flex-col justify-center gap-1 items-center group">
                    <p className="text-cyan-700 font-medium font-serif transition-all duration-300 group-hover:text-cyan-900">
                      a Product by
                    </p>
                    <div className="flex justify-start items-start gap-5 w-15 h-15 mb-5">
                      <img
                        src={digitaly}
                        onClick={() =>
                          window.open("https://www.digitaly.live/", "_blank")
                        }
                        alt="Digitaly"
                        className="w-36 h-auto mb-4 transform transition-all duration-300 group-hover:scale-110 cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
                <p className="text-sm leading-relaxed font-['Poppins'] text-cyan-900 text-justify md:text-left transition-all duration-300 hover:text-gray-900">
                  DialKaraikudi is a trusted digital platform that connects
                  users across India with verified local service professionals,
                  making it easy to discover and hire the right experts near
                  you.
                </p>
              </div>

              {/* Quick Links */}
              <div className="w-full md:w-3/12 p-3 transition-all duration-300 hover:transform hover:translate-y-[-5px]">
                <h4 className="lg:text-lg font-semibold mb-4 text-cyan-800 md:text-gray-800 relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-blue-500 after:transition-all after:duration-300 hover:after:w-[50px]">
                  Quick Links
                </h4>
                <ul className="space-y-3 text-sm">
                  {footText1.map((item, index) => (
                    <li
                      key={index}
                      className="transform transition-all duration-300 hover:translate-x-2"
                    >
                      <Link
                        to={item.path}
                        className="hover:text-blue-600 text-cyan-800 transition-all duration-300 block relative overflow-hidden after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-blue-500 after:transform after:translate-x-[-100%] hover:after:translate-x-0 after:transition-transform after:duration-300"
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact Info */}
              <div className="w-full md:w-3/12 p-3 transition-all duration-300 hover:transform hover:translate-y-[-5px]">
                <h4 className="lg:text-lg font-semibold mb-4 text-cyan-800 relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-blue-500 after:transition-all after:duration-300 hover:after:w-[50px]">
                  Contact Us
                </h4>
                <ul className="space-y-3 text-sm">
                  <li className="transform transition-all duration-300 hover:translate-x-2">
                    <a
                      // href="tel:+919442338670"
                      className="hover:text-blue-600 text-cyan-800 transition-all duration-300 flex items-center gap-2 group"
                    >
                      +91 9442338670
                    </a>
                  </li>
                  <li className="transform transition-all duration-300 hover:translate-x-2">
                    <a
                      // href="mailto:admin@dialkaraikudi.com"
                      className="hover:text-blue-600 transition-all text-cyan-800 duration-300 flex items-center gap-2 group"
                    >
                      admin@dialkaraikudi.com
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Office Locations */}
            <div className="w-full lg:w-3/12 p-3 transition-all duration-300 hover:transform hover:translate-y-[-5px]">
              <h4 className="lg:text-lg md:text-left lg:text-left font-semibold mb-4 text-cyan-800 relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-blue-500 after:transition-all after:duration-300 hover:after:w-[50px]">
                Our Offices
              </h4>
              <ul className="flex flex-col md:flex-row lg:flex-col space-y-2 text-sm">
                <li className="flex items-start gap-3 group transition-all duration-300 hover:bg-white/50 p-3 rounded-lg">
                  <FaMapMarkerAlt className="text-blue-500 mt-1 transform transition-all duration-300 group-hover:scale-125 group-hover:text-red-500" />
                  <div>
                    <strong className="block text-cyan-800 group-hover:text-blue-600 transition-all duration-300">
                      Chennai Office
                    </strong>
                    <span className="transition-all text-cyan-800 duration-300 group-hover:text-gray-900">
                      153, 13th St, Maxworth Nagar, Kovilambakkam, Chennai, TN -
                      600117
                    </span>
                  </div>
                </li>
                <li className="flex items-start gap-3 group transition-all duration-300 hover:bg-white/50 p-3 rounded-lg">
                  <FaMapMarkerAlt className="text-blue-500 mt-1 transform transition-all duration-300 group-hover:scale-125 group-hover:text-red-500" />
                  <div>
                    <strong className="block text-cyan-800 group-hover:text-blue-600 transition-all duration-300">
                      Development Office
                    </strong>
                    <span className="transition-all text-cyan-800 duration-300 group-hover:text-gray-900">
                      8, Muthoorani East, Muthupatinam, Karaikudi - 630001
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full flex justify-between px-4 pb-2 items-center group">
            {/* Social Icons */}
            <div className="hidden md:w-6/12 md:flex flex-wrap items-center justify-center gap-3 lg:justify-start">
              {socialLinks.map((item, index) => {
                const Icon = item.icon;
                return (
                  <a
                    key={index}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-center rounded-full transition-all duration-300 hover:bg-white/20"
                    style={{ color: item.color }}
                    aria-label={`Visit our ${
                      Icon.displayName || "social"
                    } page`}
                  >
                    <Icon className="text-3xl lg:text-5xl transition-all duration-300 group-hover:scale-125 group-hover:rotate-12" />
                  </a>
                );
              })}
            </div>
            <div className="w-full md:w-6/12 flex gap-3 justify-between md:justify-center lg:justify-end px-2 items-center">
              <p className="text-green-600 font-semibold">Coming Soon to </p>
              <img
                src={Google_play}
                alt=""
                className="w-20 h-20 transform transition-all duration-300 group-hover:scale-110"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-400 py-4 px-6 flex flex-col-reverse md:flex-col lg:flex-row justify-between items-center gap-2 lg:gap-4 transition-all duration-300 hover:bg-white/10">
        {/* Copyright */}
        <p className="text-xs sm:text-sm text-cyan-800 text-center md:text-left transition-all duration-300 hover:text-gray-900">
          © {new Date().getFullYear()} Sunglasschettinad Retail Private Limited.
          All Rights Reserved.
        </p>

        {/* Links */}
        <div className="flex gap-4 text-xs sm:text-sm">
          <a
            href="/privacypolicy"
            className="hover:text-blue-600 transition-all text-cyan-800 font-semibold duration-300 relative after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:w-full after:h-[1px] after:bg-blue-500 after:transform after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
          >
            Privacy Policy
          </a>
          <span className="text-gray-400">•</span>
          <a
            href="/terms"
            className="hover:text-blue-600 transition-all text-cyan-800 font-semibold duration-300 relative after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:w-full after:h-[1px] after:bg-blue-500 after:transform after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
          >
            Terms and Conditions
          </a>
        </div>

        {/* Social Icons */}
        <div className="md:hidden flex flex-wrap items-center justify-center gap-3 lg:justify-start">
          {socialLinks.map((item, index) => {
            const Icon = item.icon;
            return (
              <a
                key={index}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center rounded-full transition-all duration-300 hover:bg-white/20"
                style={{ color: item.color }}
                aria-label={`Visit our ${Icon.displayName || "social"} page`}
              >
                <Icon className="text-3xl lg:text-5xl transition-all duration-300 group-hover:scale-125 group-hover:rotate-12" />
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
