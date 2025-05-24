import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaHandshake,
  FaUsers,
  FaLightbulb,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaGlobe,
  FaShieldAlt,
  FaPuzzlePiece,
  // New icons for "Why Choose Us?" section,
  // You would import specific icons like FaGlobe, FaMapMarkedAlt, FaShieldAlt, FaPuzzlePiece
  // depending on your preference from 'react-icons/fa'
} from "react-icons/fa"; // Assuming you've installed react-icons
import { useNavigate } from "react-router-dom"; // If you're using React Router for navigation

const AboutUs = () => {
  const [hoveredCard, setHoveredCard] = useState(null); // State for hover effects on cards
  const navigate = useNavigate(); // For navigation, if applicable

  // Framer Motion animation variants for fading in sections
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  // Framer Motion variant for card hover effect
  const cardHoverEffect = {
    scale: 1.03,
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)", // Enhanced shadow on hover
    transition: { duration: 0.2 },
  };

  // Data for the "What We Do" section (with specific icons and background colors for interaction)
  const whatWeDoItems = [
    {
      id: 1,
      icon: <FaLightbulb className="w-8 h-8 text-blue-600" />, // Example icon for AI Tech
      title: "AI Technology Solutions",
      description: "Helping businesses implement AI tools for improved productivity and innovation.",
      bgColor: "bg-blue-100",
    },
    {
      id: 2,
      icon: <FaUsers className="w-8 h-8 text-green-600" />, // Example icon for Software Training
      title: "Software Training",
      description: "Offering courses to individuals and organizations looking to enhance their technical skills.",
      bgColor: "bg-green-100",
    },
    {
      id: 3,
      icon: <FaHandshake className="w-8 h-8 text-purple-600" />, // Example icon for Event Management
      title: "Event Management",
      description: "Connecting users with event planners for all types of personal and corporate events.",
      bgColor: "bg-purple-100",
    },
    {
      id: 4,
      icon: <FaGlobe className="w-8 h-8 text-red-600" />, // Example icon for FMCG Distribution
      title: "FMCG Distribution",
      description: "Distributing a wide range of fast-moving consumer goods to local retailers.",
      bgColor: "bg-red-100",
    },
  ];

  // Data for the "Why Choose Us?" section (each with its own icon and color scheme)
  const whyChooseUsPoints = [
    {
      id: 1,
      icon: <FaGlobe className="w-8 h-8 text-indigo-600" />, // Example icon
      title: "Wide Range of Services",
      description: "From technology solutions to event planning and daily essentials, we offer it all.",
      bgColor: "bg-indigo-100",
    },
    {
      id: 2,
      icon: <FaMapMarkerAlt className="w-8 h-8 text-teal-600" />, // Example icon
      title: "Local Focus",
      description: "We’re dedicated to supporting local businesses and connecting them with the community.",
      bgColor: "bg-teal-100",
    },
    {
      id: 3,
      icon: <FaShieldAlt className="w-8 h-8 text-orange-600" />, // Example icon
      title: "Trustworthy Listings",
      description: "We ensure that all businesses listed are vetted and provide quality services.",
      bgColor: "bg-orange-100",
    },
    {
      id: 4,
      icon: <FaPuzzlePiece className="w-8 h-8 text-pink-600" />, // Example icon
      title: "User-Friendly Interface",
      description: "Our platform is simple to use and designed to meet your service discovery needs.",
      bgColor: "bg-pink-100",
    },
  ];

  // Contact Information data
  const contactInfo = [
    {
      icon: <FaEnvelope className="w-6 h-6" />,
      text: "admin@dialkaraikudi.com",
      href: "mailto:admin@dialkaraikudi.com",
    },
    {
      icon: <FaPhone className="w-6 h-6" />,
      text: "+919442338670",
      href: "tel:+919442338670",
    },
    {
      icon: <FaMapMarkerAlt className="w-8 h-8" />,
      text: "No.8 Dial Karaikudi Muthoorani East, Muthupattinam Karaikudi – 630 001",
      href: "https://maps.app.goo.gl/YourExactLocationLinkHere", // Replace with actual Google Maps link
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
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
          Welcome to <span className="text-purple-600">Dial Karaikudi!</span>
        </h1>
        <p className="text-sm sm:text-md md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
          We are a trusted service listing platform and business directory designed to help people discover and connect with local service providers, vendors, and professionals. Whether you're looking for a plumber, electrician, tutor, event planner, or any other expert, Dial Karaikudi is here to simplify your search.
        </p>
      </motion.div>

      {/* Mission Section */}
      <motion.div
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-1 gap-6 sm:gap-8 mb-12 sm:mb-16"
        initial={fadeIn.initial}
        animate={fadeIn.animate}
        transition={{ ...fadeIn.transition, delay: 0.2 }}
      >
        <motion.div
          className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
          whileHover={cardHoverEffect}
        >
          <h2 className="text-xl sm:text-2xl text-center font-bold text-gray-900 mb-4">
            Our Mission
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Our mission is simple — to empower businesses and connect consumers with reliable, top-notch service providers in and around Karaikudi, India. By offering a user-friendly platform, we ensure that local businesses can promote their services effectively and customers can find trusted professionals with ease.
          </p>
        </motion.div>
      </motion.div>

      {/* What We Do Section */}
      <motion.div
        className="max-w-7xl mx-auto mb-12 sm:mb-16"
        initial={fadeIn.initial}
        animate={fadeIn.animate}
        transition={{ ...fadeIn.transition, delay: 0.4 }}
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-8 sm:mb-12">
          What We Do
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {whatWeDoItems.map((item) => (
            <motion.div
              key={item.id}
              className="bg-white rounded-xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow duration-300 flex flex-col items-center"
              whileHover={cardHoverEffect}
              onHoverStart={() => setHoveredCard(item.id)}
              onHoverEnd={() => setHoveredCard(null)}
            >
              <motion.div
                className={`w-16 h-16 ${item.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}
                animate={{
                  scale: hoveredCard === item.id ? 1.1 : 1,
                  rotate: hoveredCard === item.id ? 10 : 0, // A subtle rotation on hover
                }}
                transition={{ duration: 0.3 }}
              >
                {item.icon}
              </motion.div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">{item.description}</p>
            </motion.div>
          ))}
        </div>
        <p className="text-gray-600 leading-relaxed mt-8 text-center">
          Through our platform, Dial Karaikudi ensures businesses gain more visibility while users get access to the best services available nearby. We take pride in being a reliable bridge between the two.
        </p>
      </motion.div>

      {/* Why Choose Us? Section */}
      <motion.div
        className="max-w-7xl mx-auto mb-12 sm:mb-16"
        initial={fadeIn.initial}
        animate={fadeIn.animate}
        transition={{ ...fadeIn.transition, delay: 0.6 }}
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-8 sm:mb-12">
          Why Choose Us?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {whyChooseUsPoints.map((point) => (
            <motion.div
              key={point.id}
              className="bg-white rounded-xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow duration-300 flex flex-col items-center"
              whileHover={cardHoverEffect}
              onHoverStart={() => setHoveredCard(`why-choose-${point.id}`)} // Unique key for hover
              onHoverEnd={() => setHoveredCard(null)}
            >
              <motion.div
                className={`w-16 h-16 ${point.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}
                animate={{
                  scale: hoveredCard === `why-choose-${point.id}` ? 1.1 : 1,
                  // Add a subtle glow or color change on icon hover
                  boxShadow: hoveredCard === `why-choose-${point.id}` ? `0 0 15px ${point.bgColor.replace('bg-', '')}` : 'none',
                }}
                transition={{ duration: 0.3 }}
              >
                {point.icon}
              </motion.div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                {point.title}
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">{point.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Final Statement */}
      <motion.div
        className="max-w-3xl mx-auto text-center bg-white rounded-2xl p-6 sm:p-8 shadow-lg"
        initial={fadeIn.initial}
        animate={fadeIn.animate}
        transition={{ ...fadeIn.transition, delay: 0.8 }}
      >
        <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
          At Dial Karaikudi, we believe that the right connections can lead to great opportunities. Whether you're a user or a business, we’re here to make your experience easier and more reliable.
        </p>
      </motion.div>

      {/* Contact Section */}
      <motion.div
        className="max-w-4xl mx-auto text-center bg-white rounded-2xl p-6 sm:p-8 shadow-lg mt-8 sm:mt-12"
        initial={fadeIn.initial}
        animate={fadeIn.animate}
        transition={{ ...fadeIn.transition, delay: 1.0 }}
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
          Get in Touch
        </h2>
        <p className="text-gray-600 mb-6">
          Have questions about Dial Karaikudi? We'd love to hear from you.
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