import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaHandshake,
  FaUsers,
  FaLightbulb,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AboutUs = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const navigate = useNavigate();
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const cardHoverEffect = {
    scale: 1.03,
    transition: { duration: 0.2 },
  };

  const coreValues = [
    {
      id: 1,
      icon: <FaHandshake className="w-8 h-8 text-purple-600" />,
      title: "Trust",
      description:
        "Building reliable connections between businesses and customers",
      bgColor: "bg-purple-100",
    },
    {
      id: 2,
      icon: <FaUsers className="w-8 h-8 text-blue-600" />,
      title: "Community",
      description: "Fostering a strong, connected local business ecosystem",
      bgColor: "bg-blue-100",
    },
    {
      id: 3,
      icon: <FaLightbulb className="w-8 h-8 text-indigo-600" />,
      title: "Innovation",
      description: "Continuously improving the way local businesses connect",
      bgColor: "bg-indigo-100",
    },
  ];

  const contactInfo = [
    {
      icon: <FaEnvelope className="w-6 h-6" />,
      text: "info@dialkaraikudi.com",
      href: "mailto:info@dialkaraikudi.com",
    },
    {
      icon: <FaPhone className="w-6 h-6" />,
      text: "+91 123-456-7890",
      href: "tel:+911234567890",
    },
    {
      icon: <FaMapMarkerAlt className="w-6 h-6" />,
      text: "Karaikudi, Tamil Nadu",
      href: "https://maps.google.com",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <motion.div
        className="max-w-7xl mx-auto text-center mb-12 sm:mb-16"
        initial={fadeIn.initial}
        animate={fadeIn.animate}
        transition={fadeIn.transition}
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
          About <span className="text-purple-600">Dialkaraikudi</span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Connecting Karaikudi's businesses with the community, making local
          services more accessible than ever.
        </p>
      </motion.div>

      {/* Mission & Vision Section */}
      <motion.div
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16"
        initial={fadeIn.initial}
        animate={fadeIn.animate}
        transition={{ ...fadeIn.transition, delay: 0.2 }}
      >
        <motion.div
          className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
          whileHover={cardHoverEffect}
        >
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
            Our Mission
          </h2>
          <p className="text-gray-600 leading-relaxed">
            To create a seamless digital platform that connects local businesses
            with customers, fostering community growth and economic development
            in Karaikudi.
          </p>
        </motion.div>
        <motion.div
          className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
          whileHover={cardHoverEffect}
        >
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
            Our Vision
          </h2>
          <p className="text-gray-600 leading-relaxed">
            To become the go-to platform for discovering and connecting with
            local businesses, making Karaikudi's services more accessible to
            everyone.
          </p>
        </motion.div>
      </motion.div>

      {/* Core Values Section */}
      <motion.div
        className="max-w-7xl mx-auto mb-12 sm:mb-16"
        initial={fadeIn.initial}
        animate={fadeIn.animate}
        transition={{ ...fadeIn.transition, delay: 0.4 }}
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-8 sm:mb-12">
          Our Core Values
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {coreValues.map((value) => (
            <motion.div
              key={value.id}
              className="bg-white rounded-xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow duration-300"
              whileHover={cardHoverEffect}
              onHoverStart={() => setHoveredCard(value.id)}
              onHoverEnd={() => setHoveredCard(null)}
            >
              <motion.div
                className={`w-16 h-16 ${value.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}
                animate={{
                  scale: hoveredCard === value.id ? 1.1 : 1,
                  rotate: hoveredCard === value.id ? 360 : 0,
                }}
                transition={{ duration: 0.3 }}
              >
                {value.icon}
              </motion.div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                {value.title}
              </h3>
              <p className="text-gray-600">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Contact Section */}
      <motion.div
        className="max-w-3xl mx-auto text-center bg-white rounded-2xl p-6 sm:p-8 shadow-lg"
        initial={fadeIn.initial}
        animate={fadeIn.animate}
        transition={{ ...fadeIn.transition, delay: 0.6 }}
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
          Get in Touch
        </h2>
        <p className="text-gray-600 mb-6">
          Have questions about Dialkaraikudi? We'd love to hear from you.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          {contactInfo.map((info, index) => (
            <motion.a
              key={index}
              href={info.href}
              className="flex items-center justify-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              target="_blank"
              rel="noopener noreferrer"
            >
              {info.icon}
              <span className="text-sm">{info.text}</span>
            </motion.a>
          ))}
        </div>
        <motion.button
          className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors duration-200 transform hover:scale-105"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/contactus")}
        >
          Contact Us
        </motion.button>
      </motion.div>
    </div>
  );
};

export default AboutUs;
