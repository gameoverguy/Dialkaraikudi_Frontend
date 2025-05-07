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
        <div className="min-h-screen bg-gray-50 py-12 px-4 flex items-center justify-center">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8">
                <div className="md:col-span-4 bg-white p-6 rounded-lg shadow-md h-fit">
                    <div className="mb-6">
                        <img
                            src={formData?.business?.photos?.[0] || 'https://via.placeholder.com/400'}
                            alt={formData?.business?.businessName}
                            className="w-full h-48 object-cover rounded-lg mb-4"
                        />
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">
                            {formData?.business?.businessName}
                        </h2>
                        <p className="text-gray-600 text-sm">
                            {formData?.business?.address?.addressArea}
                        </p>
                    </div>

                    <div className="border-t border-gray-200 pt-4">
                        <div className="flex items-center gap-3 mb-4">
                            <img
                                src={userAvatar}
                                alt={userName}
                                className="w-12 h-12 rounded-full object-cover border-2 border-purple-100"
                            />
                            <div>
                                <p className="font-medium text-gray-800">{userName}</p>
                                <p className="text-sm text-gray-500">Posting publicly</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column - Review Form */}
                <div className="md:col-span-8 bg-white p-8 rounded-lg shadow-md">
                    <h1 className="text-2xl text-center font-bold mb-8 text-gray-800">
                        Write Your Review
                    </h1>

                    <div className="mb-8 bg-gray-50 text-center p-6 rounded-lg">
                        <p className="text-gray-700 mb-4 font-medium">Your Rating</p>
                        <div className="flex items-center space-x-2 justify-center">
                            {[...Array(5)].map((_, index) => (
                                <FaStar
                                    key={index}
                                    className={`text-3xl transition-colors duration-200 cursor-pointer hover:text-yellow-400 
                                        ${index + 1 <= selectedRating ? 'text-yellow-400' : 'text-gray-300'}`}
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
                                className={`w-full p-4 border rounded-lg focus:outline-none focus:ring-2 
                                    focus:ring-purple-500 transition-all duration-200 min-h-[150px] 
                                    ${error ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                                placeholder="Share your experience with others..."
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            ></textarea>
                            {error && (
                                <p className="text-red-500 text-sm mt-2">
                                    {error}
                                </p>
                            )}
                        </div>

                        <button
                            className={`w-full py-4 rounded-lg text-white font-medium transition-all duration-200 
                                ${isSubmitting ? 'bg-purple-400 cursor-not-allowed' :
                                    'bg-purple-600 hover:bg-purple-700 hover:shadow-lg'}`}
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit Review'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewPage;