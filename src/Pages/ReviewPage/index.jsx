import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import axios from 'axios';
import { API } from '../../../config/config';

const ReviewPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { rating, businessId, formData } = location.state || { rating: 0, businessId: null };
    const [comment, setComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    // const { id } = useParams();
    const userData = JSON.parse(sessionStorage.getItem("userData"));
    const userId = userData?.user_id;
    const userName = userData?.name;
    const userAvatar = userData?.avatarUrl || 'https://via.placeholder.com/40';
    const [selectedRating, setSelectedRating] = useState(rating);
    const [existingReview, setExistingReview] = useState(null);


    useEffect(() => {
        const fetchExistingReview = async () => {
            if (!userId || !businessId) return;

            try {
                const response = await axios.get(`${API}/reviews/myreview`, {
                    params: {
                        user: userId,
                        business: businessId
                    }
                });
                console.log(response.data);

                if (response.data?.data) {
                    setExistingReview(response.data.data);
                    setComment(response.data.data.comment || '');
                    setSelectedRating(response.data.data.rating || rating);
                }
            } catch (error) {
                console.error('Error fetching review:', error);
            }
        };

        fetchExistingReview();
    }, [userId, businessId]);

    const handleRatingClick = (newRating) => {
        setSelectedRating(newRating);
    };
    const handleSubmit = async () => {
        if (!comment.trim()) {
            setError('Please write your review');
            return;
        }

        if (!businessId) {
            setError('Invalid business ID');
            return;
        }

        if (!userId) {
            setError('Please login to submit a review');
            return;
        }

        setIsSubmitting(true);
        setError('');

        try {
            if (existingReview?._id) {
                await axios.put(`${API}/reviews/${existingReview._id}`, {
                    user: userId,
                    business: businessId,
                    rating: selectedRating,
                    comment: comment
                });
            } else {
                await axios.post(`${API}/reviews`, {
                    user: userId,
                    business: businessId,
                    rating: selectedRating,
                    comment: comment
                });
            }

            navigate(`/business/${businessId}`);
        } catch (err) {
            setError('Failed to submit review. Please try again.');
            console.error('Error submitting review:', err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
                {/* Business Info Section */}
                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-200">
                    <img 
                        src={formData?.business?.photos?.[0] || 'https://via.placeholder.com/60'} 
                        alt={formData?.business?.businessName} 
                        className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div>
                        <h2 className="text-xl font-semibold text-gray-800">
                            {formData?.business?.businessName}
                        </h2>
                        <p className="text-sm text-gray-600">
                            Writing a review for {formData?.business?.businessName}
                        </p>
                    </div>
                </div>

                {/* User Info Section */}
                <div className="flex items-center gap-3 mb-8">
                    <img 
                        src={userAvatar} 
                        alt={userName} 
                        className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                        <p className="text-sm font-medium text-gray-800">{userName}</p>
                        <p className="text-xs text-gray-500">Posting publicly</p>
                    </div>
                </div>

                <h1 className="text-2xl font-bold mb-8 text-gray-800">
                    Write Your Review
                </h1>

                <div className="mb-8 bg-gray-50 p-6 pl-0 rounded-lg">
                    <p className="text-gray-700 mb-3 font-medium">Your Rating</p>
                    <div className="flex items-center space-x-2 justify-center">
                        {[...Array(5)].map((_, index) => (
                            <FaStar
                                key={index}
                                className={`text-3xl transition-colors duration-200 cursor-pointer hover:text-yellow-400 ${index + 1 <= selectedRating ? 'text-yellow-400' : 'text-gray-300'
                                    }`}
                                onClick={() => handleRatingClick(index + 1)}
                            />
                        ))}
                    </div>
                </div>

                <div className="space-y-6">
                    <div>
                        <label className="block text-gray-700 mb-3 font-medium">
                            Your Review
                        </label>
                        <textarea
                            className={`w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200 min-h-[150px] ${error ? 'border-red-500 bg-red-50' : 'border-gray-300'
                                }`}
                            placeholder="Share your experience with others..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        ></textarea>
                        {error && (
                            <p className="text-red-500 text-sm mt-2 flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                {error}
                            </p>
                        )}
                    </div>

                    <button
                        className={`w-full py-4 rounded-lg text-white font-medium transition-all duration-200 
                            ${isSubmitting
                                ? 'bg-purple-400 cursor-not-allowed'
                                : 'bg-purple-600 hover:bg-purple-700 hover:shadow-lg transform hover:-translate-y-0.5'
                            }`}
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <div className="flex items-center justify-center">
                                <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                Submitting...
                            </div>
                        ) : (
                            'Submit Review'
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReviewPage;