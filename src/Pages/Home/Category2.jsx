import React, { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

function Category2({productCategories}) {

  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ once: false });
    AOS.refresh();
  }, [productCategories]);


  const shuffledCategories = useMemo(() => {
    if (!productCategories) return [];

    const shuffled = [...productCategories].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 6);
  }, [productCategories]);

  const handleCategoryClick = (category) => {
    navigate(`/businesslist/${category}`);
  };

  return (
    <div
        className="w-full px-2 md:px-0 md:w-11/12 mx-auto"
        data-aos="fade-up"
        data-aos-delay="100"
        data-aos-duration="800"
      >
        <div className="grid gap-3 md:gap-8 grid-cols-1 md:grid-cols-3">
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
              if (e.key === 'Enter') {
                handleCategoryClick(item._id);
              }
            }}
          >
              {/* Top image with float-in effect */}
              <div className="h-48 overflow-hidden relative rounded">
                <img
                  src={item.imageUrl}
                  alt={item.displayName}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
              </div>

              {/* Text content */}
              <div className="p-4 text-center">
                <h3 className="text-xl font-black text-gray-800 tracking-wide transition-colors duration-500 group-hover:text-blue-700 group-hover:translate-y-[-1px]">
                  {item.displayName}
                </h3>
                <p className="mt-2 text-sm text-gray-500 group-hover:text-gray-700 transition-colors duration-300">
                  Discover amazing {item.displayName.toLowerCase()} services around
                  you.
                </p>
                <span className="block mt-3 w-10 h-1 bg-blue-400 rounded-full mx-auto transition-all duration-500 group-hover:w-16 group-hover:bg-blue-700"></span>
              </div>

              {/* Bottom gradient line effect */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

              {/* Shine animation */}
              <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
                <div className="absolute top-0 left-[-60%] w-[50%] h-full bg-white/20 rotate-12 transform animate-[shimmer_2.5s_infinite]" />
              </div>
            </div>
          ))}
        </div>
      </div>
  )
}

export default Category2