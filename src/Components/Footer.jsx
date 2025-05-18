import React from "react";
import Logo from "../assets/logo_01.png";
import { FaInstagram, FaMapMarkerAlt } from "react-icons/fa";
import { TiSocialFacebook } from "react-icons/ti";
import { IoLogoWhatsapp } from "react-icons/io5";
import { CiYoutube, CiLinkedin } from "react-icons/ci";

const Footer = () => {
  const social = [
    { icon: <FaInstagram />, color: "#C13584" },
    { icon: <TiSocialFacebook />, color: "#3b5998" },
    { icon: <IoLogoWhatsapp />, color: "#25D366" },
    { icon: <CiYoutube />, color: "#FF0000" },
    { icon: <CiLinkedin />, color: "#0077b5" },
  ];

  const footText1 = [
    { title: "About us", path: "#" },
    { title: "Contact us", path: "#" },
    { title: "Terms & Conditions", path: "#" },
    { title: "Advertise on Dialkaraikudi", path: "#" },
  ];

  const footText3 = [
    { title: "Digitaly.Live", path: "#" },
    { title: "Dial Puthukotai", path: "#" },
    { title: "Gteceducation", path: "#" },
  ];

  return (
    <footer className="bg-gradient-to-t from-blue-300 to-white text-teal-800">
      <div className="w-11/12 mx-auto px-6 pt-18">
        <div className="flex flex-col lg:flex-row w-full justify-between items-start">
          {/* Logo and Description */}
          <div className="w-4/12 p-3 ">
            <img
              src={Logo}
              alt="Dialkaraikudi"
              className="w-36 h-auto mb-4 hover:scale-105 transition-transform duration-300"
            />
            <p className="text-base leading-relaxed">
              Dialkaraikudi is a premier digital platform in India that connects
              users with verified local service professionals.
            </p>
          </div>

          {/* Quick Links */}
          <div className="w-2/12 p-3">
            <h4 className="text-lg font-semibold mb-4 text-gray-800">
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm">
              {footText1.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.path}
                    className="hover:text-blue-600 hover:pl-1 transition-all duration-300 block"
                  >
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="w-2/12 p-3">
            <h4 className="text-lg font-semibold mb-4 text-gray-800">
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
                  className="hover:text-blue-600 transition"
                >
                  info@dialkaraikudi.com
                </a>
              </li>
            </ul>
          </div>

          {/* Office Locations */}
          <div className="w-4/12 p-3">
            <h4 className="text-lg text-center font-semibold mb-4 text-gray-800">
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
          </div>
        </div>

        {/* Divider */}
        <div className="mt-10 border-t border-gray-400 py-4 px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Copyright */}
          <p className="text-xs sm:text-sm text-gray-600 text-center md:text-left">
            © {new Date().getFullYear()} Digitaly AI Technolgy Solutions. All
            Rights Reserved.
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
          <div className="flex flex-wrap gap-3 items-center justify-center md:justify-start">
            {social.map((item, index) => (
              <a
                key={index}
                href="#"
                className="group flex items-center justify-center hover:scale-110 transition-all duration-300"
                style={{ color: item.color }}
                aria-label={`Visit our ${
                  item.icon.type?.displayName || "social"
                } page`}
              >
                {React.cloneElement(item.icon, {
                  size: 32,
                  className:
                    "group-hover:scale-110 transition-transform duration-300",
                })}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
