import React, { useState, useEffect } from 'react';
import { FaStar, FaSort } from 'react-icons/fa';
import axios from 'axios';
import { API } from '../../../../config/config';
import { useParams } from 'react-router-dom';
import Loader from '../../../Components/Loader';

const VendorReview = () => {
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('latest');
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    fetchReviews();
  }, [id]);

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`${API}/business/${id}`);
      setReviews(response.data.data.reviews || []);
      calculateAverageRating(response.data.data.reviews);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      setLoading(false);
    }
  };

  const calculateAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) {
      setAverageRating(0);
      return;
    }
    const total = reviews.reduce((acc, review) => acc + review.rating, 0);
    setAverageRating((total / reviews.length).toFixed(1));
  };

  const filterReviews = () => {
    let sortedReviews = [...reviews];
    switch (filter) {
      case 'latest':
        return sortedReviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      case 'oldest':
        return sortedReviews.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      case 'highest':
        return sortedReviews.sort((a, b) => b.rating - a.rating);
      case 'lowest':
        return sortedReviews.sort((a, b) => a.rating - b.rating);
      default:
        return sortedReviews;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) return <div className="p-6"><Loader /></div>;

  return (
    <div className="p-2 h-screen flex flex-col">
       <div className='bg-white shadow rounded mb-4 p-4'>
        <h1 className='mb-2 text-2xl font-bold '>Review</h1>
        <p>The review section displays customer feedback and ratings, helping vendors understand buyer satisfaction, address issues, and enhance product and service quality.</p>
      </div>
      <div className="bg-white rounded-lg shadow p-6 mb-6">
     
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold mb-2"> Rating</h2>
            <div className="flex items-center">
              <span className="text-2xl bg-green-700 p-2 text-white rounded font-bold mr-2">{averageRating}</span>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar
                    key={star}
                    className={`text-2xl ${
                      star <= averageRating
                        ? 'text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="ml-2 text-gray-600">
                ({reviews.length} {reviews.length === 1 ? 'review' : 'reviews'})
              </span>
            </div>
          </div>
          <div className="flex items-center">
            <span className="mr-2">Sort by:</span>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border rounded-md px-3 py-1"
            >
              <option value="latest">Latest</option>
              <option value="oldest">Oldest</option>
              <option value="highest">Highest Rating</option>
              <option value="lowest">Lowest Rating</option>
            </select>
          </div>
        </div>
      </div>

      <div className="overflow-y-auto flex-1">
        <div className="grid grid-cols-2 gap-4 pr-2">
          {filterReviews().map((review) => (
            <div key={review._id} className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-lg">{review.user.name}</h3>
                  <p className="text-gray-600 text-sm">{formatDate(review.createdAt)}</p>
                </div>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      className={`${
                        star <= review.rating ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-gray-700">{review.comment}</p>
            </div>
          ))}
        </div>
        {reviews.length === 0 && (
          <div className="text-center text-gray-600 py-8">
            No reviews yet
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorReview;
