import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

const StarRating = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  return (
    <div className="flex items-center space-x-1">
      {[...Array(5)].map((_, index) => {
        const starValue = index + 1;
        return (
          <div className="flex justify-center items-center w-12 py-2 rounded border-1 border-gray-200" key={index}>
            <FaStar
              key={index}
              className={`cursor-pointer text-2xl transition-colors duration-200 ${
                starValue <= (hover || rating)
                  ? "text-orange-400"
                  : "text-gray-300"
              }`}
              onClick={() => setRating(starValue)}
              onMouseEnter={() => setHover(starValue)}
              onMouseLeave={() => setHover(rating)}
            />
          </div>
        );
      })}
    </div>
  );
};

export default StarRating;
