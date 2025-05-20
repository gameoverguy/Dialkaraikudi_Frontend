import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const products = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  title: `Product ${i + 1} - Special Organic Grocery`,
  price: `By Lucky Supermarket`,
  image: `https://react.marketpro.wowtheme7.com/assets/images/thumbs/product-img${8 + (i % 6)}.png`,
  label: i % 2 === 0 ? "New" : "50% Offer",
}));

// Shuffle helper
const getRandomProducts = (array, count) => {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export default function SeasonalProducts() {
  const [itemsPerPage, setItemsPerPage] = useState(5); // default for lg
  const [visibleProducts, setVisibleProducts] = useState(
    getRandomProducts(products, 5)
  );

  // Update items per page on screen resize
  useEffect(() => {
    const updateItemsPerPage = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setItemsPerPage(2);
      } else if (width < 1024) {
        setItemsPerPage(3);
      } else {
        setItemsPerPage(5);
      }
    };

    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  // Refresh products randomly every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleProducts(getRandomProducts(products, itemsPerPage));
    }, 5000);
    return () => clearInterval(interval);
  }, [itemsPerPage]);

  return (
    <div className="w-full px-4 bg-white">
      <h2 className="text-2xl lg:text-3xl font-bold text-center text-green-800 mb-5 font-['Poppins']">
        🌟 Seasonal Products
      </h2>

      <AnimatePresence mode="wait">
        <motion.div
          key={visibleProducts.map((p) => p.id).join("-")} // Force re-render
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 1 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-7xl mx-auto min-h-[220px]"
        >
          {visibleProducts.map((product) => (
            <div
              key={product.id}
              className="relative bg-white shadow-md rounded-xl p-4 flex flex-col items-center text-center transition duration-300 hover:shadow-lg"
            >
              <span className="absolute top-3 left-3 text-xs font-bold text-white bg-gradient-to-r from-green-500 to-teal-400 px-3 py-1 rounded-full shadow">
                {product.label}
              </span>
              <img
                src={product.image}
                alt={product.title}
                className="w-24 h-24 object-contain mb-4"
              />
              <h3 className="font-semibold text-sm text-gray-800 mb-1 line-clamp-2 h-10">
                {product.title}
              </h3>
              <p className="text-gray-500">{product.price}</p>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
