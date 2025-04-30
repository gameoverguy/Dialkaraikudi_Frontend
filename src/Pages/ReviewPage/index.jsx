import React from 'react';
import { useLocation } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';

const ReviewPage = () => {
    const location = useLocation();
    const { rating, businessId } = location.state || { rating: 0, businessId: null };

    return (
        <div className="max-w-2xl mx-auto p-4 mt-8">
            <h1 className="text-2xl font-bold mb-6">Write a Review</h1>
            
            <div className="mb-6">
                <p className="text-gray-600 mb-2">Your Rating</p>
                <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, index) => (
                        <FaStar
                            key={index}
                            className={`text-2xl ${
                                index + 1 <= rating ? 'text-yellow-400' : 'text-gray-300'
                            }`}
                        />
                    ))}
                </div>
            </div>

            <div className="space-y-4">
                <div>
                    <label className="block text-gray-700 mb-2">Your Review</label>
                    <textarea
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        rows="4"
                        placeholder="Share your experience..."
                    ></textarea>
                </div>

                <button className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors duration-200">
                    Submit Review
                </button>
            </div>
        </div>
    );
};

export default ReviewPage;