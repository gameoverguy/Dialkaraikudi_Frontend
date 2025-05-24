import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import BusinessInfo from "./BusinessInfo";
import Photos from "./Photos";
import Reviews from "./Reviews";
import Description from "./Description";
import { IoIosArrowForward } from "react-icons/io";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { API } from "../../../config/config";
import BusinessHours from "./Time/Index";
import LottieLoader from "../../Components/Loader";

const BusinessDetails = () => {
  const [formData, setFormData] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const location = useLocation();
  const selectedBusiness = location.state;
  const [categories, setCategories] = useState([]);

  const toggleAmenities = (id) => {
    setExpandedBusinessId(expandedBusinessId === id ? null : id);
  };
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBusinessDetails = async () => {
      if (!id) {
        navigate("/");
        return;
      }

      try {
        setLoading(true);
        const response = await axios.get(`${API}/business/${id}`);
        setFormData(response.data.data);
        console.log(response.data.data);
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      } catch (error) {
        console.error("Error fetching business details:", error);
      }finally {
        setLoading(false);
      }
    };

    fetchBusinessDetails();
  }, [id, navigate]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${API}/categories`);
        setCategories(response.data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryClick = (category) => {
    navigate(`/businesslist/${category}`);
  };


  const handleTabClick = (tabName, sectionId) => {
    setActiveTab(tabName);
    const section = document.getElementById(sectionId);
    const navbarHeight = 120;

    if (section) {
      const offsetTop = section.offsetTop - navbarHeight;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  };

  const tabs = [
    { name: "Overview", id: "overview", key: "overview" },
    { name: "Description", id: "description", key: "description" },
    { name: "Photos", id: "photos", key: "photos" },
    { name: "Time", id: "time", key: "time" },
    { name: "Reviews", id: "reviews", key: "reviews" },
  ];

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };


if(loading){
  return (
    <div className="flex justify-center items-center h-screen">
      <LottieLoader/>
    </div>
  );
}


  return (
    <React.Fragment>
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={fadeIn}
        className="bg-white shadow-xl w-11/12 mx-auto pt-2"
      >
        <motion.div
          variants={fadeIn}
          className="flex p-4 overflow-x-scroll truncate scrollbar-hide"
        >
          <Link
            to="/"
            className="flex items-center text-xs font-semibold hover:text-blue-500 cursor-pointer"
          >
            Karaikudi{" "}
            <span>
              <IoIosArrowForward />
            </span>
          </Link>
          <Link
            to={`/businesslist/${formData?.business.category._id}`}
            className="flex items-center text-xs font-semibold hover:text-blue-500 cursor-pointer"
          >
            {formData?.business.category.displayName} in Karaikudi{" "}
            <span>
              <IoIosArrowForward />
            </span>
          </Link>
          <p className="flex items-center text-xs font-semibold hover:text-blue-500 cursor-pointer">
            {formData?.business.businessName}
          </p>
        </motion.div>

        {formData && (
          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerChildren}
          >
            <motion.div variants={fadeIn}>
              <BusinessInfo formData={formData} businessId={formData.business._id} />
            </motion.div>

            <motion.div
              variants={fadeIn}
              className="flex overflow-x-auto whitespace-nowrap mx-4 p-2 sticky top-0 bg-white  border-b border-gray-200 scrollbar-hide"
            >
              {tabs.map((tab) => (
                <motion.div
                  key={tab.key}
                  variants={fadeIn}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-2 font-medium text-sm md:text-md cursor-pointer shrink-0 ${activeTab === tab.key
                    ? "border-b-4 border-blue-500 text-blue-500"
                    : "text-gray-500 hover:text-gray-700"
                    }`}
                  onClick={() => handleTabClick(tab.key, tab.id)}
                >
                  {tab.name}
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              variants={fadeIn}
              className="mx-4 space-y-8 pb-10 mb-4"
            >
              <motion.div
                id="overview"
                variants={staggerChildren}
              >
                <motion.div
                  id="description"
                  variants={fadeIn}
                >
                  <Description formData={formData} />
                </motion.div>
                <motion.div
                  id="photos"
                  variants={fadeIn}
                >
                  <Photos formData={formData} />
                </motion.div>
                <motion.div
                  id="time"
                  variants={fadeIn}
                >
                  <BusinessHours formData={formData} />
                </motion.div>
                <motion.div
                  id="reviews"
                  variants={fadeIn}
                >
                  <Reviews formData={formData} />
                </motion.div>

              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </React.Fragment>
  );
};

export default BusinessDetails;
