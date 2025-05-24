import React, { useState, useEffect } from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Loader from "./Loader";
import axios from "axios";
import { API } from "../../config/config";
import AiChatbox from "./AiChatbox";
axios.defaults.withCredentials = true;
import { FaArrowUp } from "react-icons/fa";

const MainLayout = () => {
  const [loading, setLoading] = useState(true);
  const [showGoTop, setShowGoTop] = useState(false);


  useEffect(() => {
  const handleScroll = () => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;

    if (scrollY > windowHeight * 0.25) {
      setShowGoTop(true);
    } else {
      setShowGoTop(false);
    }
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);

const handleGoTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

  useEffect(() => {
    const clearAuthentication = async () => {
      try {
        const response = await axios.get(`${API}/authentication/verifytoken`);
        console.log(response.data);

        if (!response.data.isTokenValid) {
          sessionStorage.clear(); // ✅ Clear sessionStorage
          localStorage.clear(); // ✅ Optional: clear localStorage too
        }
      } catch (error) {
        console.log(error);
        sessionStorage.clear();
        localStorage.clear();
      }
    };
    clearAuthentication();
  }, []);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Show loader for 2 seconds

    return () => clearTimeout(timer);
  }, []);

  // Show only loader until loading is false
  if (loading) {
    return <Loader />;
  }

  

  // Main layout after loading is complete
  return (
    <>
    <div className="w-full mx-auto">
      <Header />
      <div className="min-h-127 mx-auto">
        <Outlet />
        <div className="md:hidden fixed bottom-4 right-4">
        <AiChatbox />
        </div>
      </div>
      <Footer />
    </div>
    {showGoTop && (
  <button
    onClick={handleGoTop}
    className="fixed bottom-20 right-4 z-30 bg-orange-500 hover:bg-orange-300 hover:scale-105 text-white p-3 rounded-full shadow-lg transition duration-300 cursor-pointer"
  >
    <FaArrowUp className="text-base" />
  </button>
)}
    </>
  );
};

export default MainLayout;
