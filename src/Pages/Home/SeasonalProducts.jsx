import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { API } from "../../../config/config";
import { useNavigate } from "react-router-dom";


const localFallbacks = Array.from({ length: 20 }, (_, i) => ({
  id: `local-${i + 1}`,
  title: `Product ${i + 1} - Special Organic Grocery`,
  price: `By Lucky Supermarket`,
  image: `https://react.marketpro.wowtheme7.com/assets/images/thumbs/product-img${8 + (i % 6)}.png`,
  label: i % 2 === 0 ? "New" : "50% Offer",
}));

const getRandomProducts = (array, count) => {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export default function SeasonalProducts() {
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [sesonalProducts, setSesonalProducts] = useState(getRandomProducts(localFallbacks, 5));
  const [animationKey, setAnimationKey] = useState(Date.now());
  const navigate = useNavigate();

  // Handle responsive items
  useEffect(() => {
    const updateItemsPerPage = () => {
      const width = window.innerWidth;
      if (width < 768) setItemsPerPage(2);
      else if (width < 1024) setItemsPerPage(3);
      else setItemsPerPage(5);
    };

    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  // Fetch API data
  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await axios.get(`${API}/adverts`);
        const ads = response.data.filter(
          (ad) =>
            ad.slotId?.page === "home" &&
            ad.slotId?._id === "682d858da38e20fc35a70530" &&
            ad.isActive
        );

        let finalSlides = [];
        if (ads.length >= itemsPerPage) {
          finalSlides = ads.slice(0, itemsPerPage);
        } else {
          finalSlides = [...ads, ...getRandomProducts(localFallbacks, itemsPerPage - ads.length)];
        }

        setSesonalProducts(finalSlides);
      } catch (error) {
        console.error("Error fetching ads:", error);
        setSesonalProducts(getRandomProducts(localFallbacks, itemsPerPage));
      }
    };

    fetchAds();
  }, [itemsPerPage]);

  // Change every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setSesonalProducts((prev) => {
        const updated = getRandomProducts(prev, itemsPerPage);
        setAnimationKey(Date.now()); // Change key to trigger re-render + animation
        return updated;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [itemsPerPage]);

  const handleCategoryClick = (category) => {
        navigate(`/business/${category}`);
    };

  return (
    <div className="w-full px-4 bg-white">
      <h2 className="text-2xl lg:text-3xl font-bold text-center text-green-700 mb-5 font-['Poppins']">
        🌟 Seasonal Products
      </h2>

      <AnimatePresence mode="wait">
        <motion.div
          key={animationKey}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 1.3 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-7xl mx-auto min-h-[220px]"
        >
          {sesonalProducts.map((product) => (
            <div
              key={product.id}
              className="relative bg-white shadow-md rounded-xl p-4 flex flex-col justify-center items-center text-center transition duration-300 hover:shadow-lg cursor-pointer"
            >
              <img
                src={product.contentUrl || product.image}
                alt={product.title || product.description}
                className="w-24 h-24 object-cover mb-4" onClick={() => handleCategoryClick(product.businessId?._id)}
              />
              <h3 className="font-semibold text-sm text-gray-800 mb-1 line-clamp-2">
                {product.description || product.title}
              </h3>
              <p className="text-sm text-gray-500">{product.businessId?.businessName || product.price}</p>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
