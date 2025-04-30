import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const StarRating = ({ businessId }) => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const navigate = useNavigate();

    const handleRatingClick = (value) => {
        setRating(value);
        navigate('/review', { 
            state: { 
                rating: value,
                businessId: businessId 
            } 
        });
    };

    return (
        <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, index) => {
                const starValue = index + 1;
                return (
                    <FaStar
                        key={index}
                        className={`cursor-pointer text-2xl transition-colors duration-200 ${
                            starValue <= (hover || rating)
                                ? 'text-yellow-400'
                                : 'text-gray-300'
                        }`}
                        onClick={() => handleRatingClick(starValue)}
                        onMouseEnter={() => setHover(starValue)}
                        onMouseLeave={() => setHover(rating)}
                    />
                );
            })}
        </div>
    );
};

export default StarRating;