import React, { useState, useEffect } from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Loader from "./Loader";

const MainLayout = () => {
  const [loading, setLoading] = useState(true);

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
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
