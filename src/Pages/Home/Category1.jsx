import React, { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

function Category1({ serviceCategories }) {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ once: false });
    AOS.refresh();
  }, [serviceCategories]);

  const shuffledCategories = useMemo(() => {
    if (!serviceCategories) return [];

    const shuffled = [...serviceCategories].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 10);
  }, [serviceCategories]);

  const handleCategoryClick = (category) => {
    navigate(`/businesslist/${category}`);
  };

  return (
    <div
      className="w-full px-2 md:px-0 md:w-11/12 md:mx-auto bg-[#E9EEF6] lg:px-5 lg:py-5 rounded"
      data-aos="fade-up"
    >
      <div className="grid gap-3 md:gap-5 grid-cols-1 md:grid-cols-4 lg:grid-cols-5">
        {shuffledCategories?.map((item, index) => (
          <div
            key={item._id}
            onClick={() => handleCategoryClick(item._id)}
            className="group bg-white rounded shadow-md hover:shadow-blue-200 transition-all duration-500 transform hover:-translate-y-1 hover:scale-105 hover:ring-2 hover:ring-blue-100 cursor-pointer"
            data-aos="fade-up"
            data-aos-delay={100 + index * 100}
            data-aos-duration="600"
            role="button"
            tabIndex={0}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleCategoryClick(item._id);
              }
            }}
          >
            <div className="overflow-hidden rounded h-40">
              <img
                src={item.imageUrl}
                alt={item.displayName}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="p-3 text-center">
              <h3 className="text-md font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                {item.displayName}
              </h3>
              <div className="w-6 h-1 mt-2 mx-auto bg-blue-400 rounded-full transition-all duration-300 group-hover:w-10 group-hover:bg-blue-700"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Category1;
