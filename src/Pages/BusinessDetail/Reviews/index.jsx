import React from "react";
import { MdOutlineStar } from "react-icons/md";
import StarRating from "../ReviewStar";
import { FaRegThumbsUp } from "react-icons/fa";

const Reviews = ({ formData }) => {
  const reviews = [
    {
      id: 1,
      name: "Sathish Raju",
      image: "https://dummyimage.com/250x150/000/fff",
      date: "29 Aug 2024",
      rating: 5,
      tags: ["Relaxing stay", "Budget friendly"],
      review:
        "I had a relaxing stay at Hotel Pl Grand. The rooms were cozy and the atmosphere was very calming. It’s budget friendly too, which is a big plus! I definitely recommend it for anyone looking for a peaceful and affordable leisure stay.",
    },
    {
      id: 2,
      name: "Virat Vijay",
      image: "https://dummyimage.com/250x150/000/fff",
      date: "29 Aug 2024",
      rating: 5,
      tags: ["Amazing experience", "Clean rooms", "Comfortable place"],
      review:
        "A reliable hotel in Karaikudi with classy and sophisticated rooms, suitable for foreign tourists and elite guests who want to explore in and around the city.",
    },
    {
      id: 3,
      name: "Venkatesh",
      image: "https://dummyimage.com/250x150/000/fff",
      date: "29 Aug 2024",
      rating: 5,
      tags: [],
      review: "Great service and nice environment. Will visit again!",
    },
  ];

  return (
    <div className="rounded-md border border-gray-200 p-4" id="quickinfo">
      <h1 className="font-normal text-xl">Reviews & Ratings</h1>
      <div className="flex flex-wrap items-center gap-2 mt-2 md:text-base">
        <div className="flex items-center justify-center bg-[#007a0c] text-white p-4 rounded-2xl text-3xl md:text-4xl font-bold">
          {formData.star}
        </div>
        <div>
          <span className="text-black font-semibold text-lg md:text-2xl">
            {formData.rating} Ratings
          </span>
          <p className="text-sm md:text-base">
            JD rating index based on {formData.rating} ratings across the web
          </p>
        </div>
      </div>
      <div className="mt-4">
        <p className="text-2xl font-semibold pt-4 pb-2">Start your Review</p>
        <StarRating />
      </div>
      <h2 className="text-xl font-semibold pt-6 pb-3">User Reviews</h2>
      {reviews.map((review) => (
        <div key={review.id} className="border-t border-gray-200 py-4">
          <div className="flex justify-between items-start mb-2">
            <div className="flex gap-3 items-center">
              <img
                src={review.image}
                alt={review.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold">{review.name}</p>
              </div>
            </div>
            <p className="text-sm text-gray-500">{review.date}</p>
          </div>
          <div className="flex items-center text-orange-400 mb-2">
            {Array.from({ length: review.rating }).map((_, index) => (
              <MdOutlineStar key={index} />
            ))}
          </div>
          {review.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-2">
              {review.tags.map((tag, index) => (
                <span
                  key={index}
                  className="flex items-center gap-2 bg-gray-100 text-green-700 px-3 py-1 text-sm rounded-full"
                >
                  <span>
                    <FaRegThumbsUp />
                  </span>
                  {tag}
                </span>
              ))}
            </div>
          )}
          <p className="text-sm text-gray-700 mb-3">{review.review}</p>
        </div>
      ))}
    </div>
  );
};

export default Reviews;
