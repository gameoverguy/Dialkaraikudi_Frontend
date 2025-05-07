import React from "react";
import StarRating from "../ReviewStar";
import { FaStar } from "react-icons/fa6";

const Reviews = ({ formData }) => {
  return (
    <div className="rounded-md border border-gray-200 p-4" id="quickinfo">
      <h1 className="font-normal text-xl">Reviews & Ratings</h1>
      <div className="flex flex-wrap items-center gap-2 mt-2 md:text-base">
        <div className="flex items-center justify-center bg-[#007a0c] text-white px-3 py-1 rounded-lg text-md md:text-xl font-bold">
          {formData.business.ratings}
        </div>
        <div>
          <span className="text-black font-semibold text-lg md:text-lg">
            {formData.business.reviewCount} Ratings
          </span>
        </div>
      </div>
      <div className="mt-4">
        <p className="text-2xl font-semibold pt-4 pb-2">Start your Review</p>
        <StarRating formData={formData} businessId={formData.business._id} />
      </div>
      <h2 className="text-xl font-semibold pt-6 pb-3">User Reviews</h2>
      {formData?.reviews?.length > 0 ? (
        formData.reviews.map((review) => (
          <div key={review._id} className="border-t border-gray-200 py-4">
            <div className="flex justify-between items-start mb-2">
              <div className="flex gap-3 items-center">
                <img
                  src={review.userImage || 'https://media.istockphoto.com/id/1393750072/vector/flat-white-icon-man-for-web-design-silhouette-flat-illustration-vector-illustration-stock.jpg?s=612x612&w=0&k=20&c=s9hO4SpyvrDIfELozPpiB_WtzQV9KhoMUP9R9gVohoU='}
                  alt={review.user.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold">{review.user.name}</p>
                </div>
              </div>
              <p className="text-sm text-gray-500">{new Date(review.createdAt).toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}</p>
            </div>
            <div className="flex items-center text-orange-400 mb-2">
              {[...Array(5)].map((_, index) => (
                <FaStar
                  key={index}
                  className={`text-xl ${index < review.rating ? 'text-orange-400' : 'text-gray-300'}`}
                />
              ))}
            </div>
            <p className="text-sm text-gray-700 mb-3">{review.comment}</p>
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-center py-4">No reviews yet</p>
      )}
    </div>
  );
};

export default Reviews;
