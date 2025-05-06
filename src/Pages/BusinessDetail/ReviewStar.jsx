import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useLoginModal } from '../../context/LoginContext';

const StarRating = ({ formData, businessId }) => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const navigate = useNavigate();
    const userData = JSON.parse(sessionStorage.getItem("userData"));
    const isLoggedin = !!userData;
    const { handleOpenLoginModal } = useLoginModal();

    const handleRatingClick = (value) => {
        if (!isLoggedin) {
            handleOpenLoginModal();
            return;
        }

        setRating(value);
        navigate('/review', {
            state: {
                rating: value,
                businessId: businessId,
                formData: formData
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
                        className={`cursor-pointer text-2xl transition-colors duration-200 ${starValue <= (hover || rating)
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