import React, { useState, useEffect } from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Loader from "./Loader";
import axios from "axios";
import { API } from "../../config/config";
import AiChatbox from "./AiChatbox";
axios.defaults.withCredentials = true;

const MainLayout = () => {
  const [loading, setLoading] = useState(true);

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
    <div className="w-full mx-auto">
      <Header />
      <div className="min-h-127 mx-auto">
        <Outlet />
        <AiChatbox />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
