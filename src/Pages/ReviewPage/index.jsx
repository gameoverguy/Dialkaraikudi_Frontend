import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import axios from 'axios';

const ReviewPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { rating, businessId } = location.state || { rating: 0, businessId: null };
    const [comment, setComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    // const { id } = useParams();
    const userData = JSON.parse(sessionStorage.getItem("userData"));
    const userId = userData?.user_id;
// console.log(businessId);

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
            const res = await axios.post('http://192.168.1.33:5000/reviews/', {
                user: userId,
                business: businessId,
                rating: rating || 0,
                comment: comment
            });
            // console.log(res);

            navigate(`/business/${businessId}`);
        } catch (err) {
            setError('Failed to submit review. Please try again.');
            console.error('Error submitting review:', err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-4 mt-8">
            <h1 className="text-2xl font-bold mb-6">Write a Review</h1>

            <div className="mb-6">
                <p className="text-gray-600 mb-2">Your Rating</p>
                <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, index) => (
                        <FaStar
                            key={index}
                            className={`text-2xl ${index + 1 <= rating ? 'text-yellow-400' : 'text-gray-300'
                                }`}
                        />
                    ))}
                </div>
            </div>

            <div className="space-y-4">
                <div>
                    <label className="block text-gray-700 mb-2">Your Review</label>
                    <textarea
                        className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${error ? 'border-red-500' : 'border-gray-300'
                            }`}
                        rows="4"
                        placeholder="Share your experience..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                </div>

                <button
                    className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors duration-200 disabled:bg-purple-300"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Submitting...' : 'Submit Review'}
                </button>
            </div>
        </div>
    );
};

export default ReviewPage;