import React from 'react'
import { useNavigate } from 'react-router-dom';


function Category1({ productCategories, serviceCategories }) {
  const navigate = useNavigate();


    const handleCategoryClick = (category) => {
        navigate(`/businesslist/${category}`);
    };
  return (
    <div
            className="w-full px-2 md:px-0 md:w-11/12 md:mx-auto"
            data-aos="fade-up"
            data-aos-delay="700"
            data-aos-duration="1500"
          >
            <div className="grid gap-5 grid-cols-1 md:grid-cols-4">
              {serviceCategories.slice(0, 8).map((item, index) => (
                <a
                  key={item._id}
                  onClick={() => {
                                    handleCategoryClick(item._id);
                                     }}
                  href={item.href}
                  className="group bg-white rounded-xl shadow-md hover:shadow-blue-200 transition-all duration-500 transform hover:-translate-y-1 hover:scale-105 hover:ring-2 hover:ring-blue-100"
                  data-aos={index % 2 === 0 ? "zoom-in" : "fade-up"}
                  data-aos-delay={100 + index * 100}
                  data-aos-duration="600"
                >
                  <div className="overflow-hidden rounded-t-xl h-40">
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
                </a>
              ))}
            </div>
          </div>
  )
}

export default Category1