import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const products = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  title: `Product ${i + 1}`,
  price: `By Lucky Supermarket`,
  image: `https://react.marketpro.wowtheme7.com/assets/images/thumbs/product-img${(8 + (i % 6))}.png`,
  label: i % 2 === 0 ? "New" : "50% Offer",
}));

export default function SeasonalProducts() {
  const [showFirst, setShowFirst] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowFirst((prev) => !prev);
    }, 5000); // every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const visibleProducts = showFirst ? products.slice(0, 5) : products.slice(5, 10);

  return (
    <div className="w-full py-10 px-4 bg-white">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-8">
        🌟 Seasonal Products
      </h2>

      <AnimatePresence mode="wait">
        <motion.div
          key={showFirst ? "first" : "second"}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 1 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-7xl mx-auto"
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
              <h3 className="font-semibold text-sm text-gray-800 mb-1 line-clamp-2">
                {product.title}
              </h3>
              <p className="text-gray-500">{product.price}</p>
              {/* <button className="mt-3 text-xs bg-green-600 text-white px-3 py-1 rounded-full hover:bg-green-700 transition">
                View Offer
              </button> */}
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
