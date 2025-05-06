import React, { useEffect, useState } from "react";
import BusinessInfo from "./BusinessInfo";
import Photos from "./Photos";
import Reviews from "./Reviews";
import Description from "./Description";
import { IoIosArrowForward } from "react-icons/io";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { API } from "../../../config/config";

const BusinessDetails = () => {
  const [formData, setFormData] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
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
        navigate("/"); // Redirect to home if no ID
        return;
      }

      try {
        const response = await axios.get(`${API}/business/${id}`);
        setFormData(response.data.data);
        console.log(response.data.data);
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      } catch (error) {
        console.error("Error fetching business details:", error);
        // Optionally redirect on error
        // navigate('/');
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
    { name: "Reviews", id: "reviews", key: "reviews" },
  ];

  return (
    <React.Fragment>
      <div className="bg-white shadow-xl pt-2">
        <div className="flex p-4">
          <Link
            to="/"
            className="flex items-center text-xs font-semibold hover:text-blue-500 cursor-pointer"
          >
            Karaikudi{" "}
            <span>
              <IoIosArrowForward />
            </span>
          </Link>
          <Link to={`/businesslist/${formData?.business.category._id}`} className="flex items-center text-xs font-semibold hover:text-blue-500  cursor-pointer">
            {formData?.business.category.displayName} in Karaikudi{" "}
            <span>
              <IoIosArrowForward />
            </span>
          </Link>
          <p className="flex items-center text-xs font-semibold hover:text-blue-500  cursor-pointer">
            {formData?.business.businessName}
          </p>
        </div>
        {formData && (
          <>
            <BusinessInfo formData={formData} businessId={formData._id} />
            <div className="flex overflow-x-auto whitespace-nowrap mx-4 p-2 sticky top-0 bg-white z-10 border-b border-gray-200 scrollbar-hide">
              {tabs.map((tab) => (
                <div
                  key={tab.key}
                  className={`px-4 py-2 font-medium text-sm md:text-md cursor-pointer shrink-0 ${
                    activeTab === tab.key
                      ? "border-b-4 border-blue-500 text-blue-500"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => handleTabClick(tab.key, tab.id)}
                >
                  {tab.name}
                </div>
              ))}
            </div>
            <div className="mx-4 space-y-8 pb-10 mb-4">
              <div id="overview">
                <div id="description">
                  <Description formData={formData} />
                </div>
                <div id="photos">
                  <Photos formData={formData} />
                </div>
                <div id="reviews">
                  <Reviews formData={formData} />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </React.Fragment>
  );
};

export default BusinessDetails;
