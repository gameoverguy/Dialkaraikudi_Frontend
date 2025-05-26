import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import axios from "axios";
import { API } from "../../../config/config";
import { motion, AnimatePresence } from "framer-motion";
axios.defaults.withCredentials = true;

const ReviewPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { rating, businessId, formData } = location.state || {
    rating: 0,
    businessId: null,
  };
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const userData = JSON.parse(localStorage.getItem("userData"));
  const userId = userData?.user_id;
  const userName = userData?.name;
  const userAvatar =
    userData?.avatarUrl ||
    "https://media.istockphoto.com/id/1393750072/vector/flat-white-icon-man-for-web-design-silhouette-flat-illustration-vector-illustration-stock.jpg?s=612x612&w=0&k=20&c=s9hO4SpyvrDIfELozPpiB_WtzQV9KhoMUP9R9gVohoU=";
  const [selectedRating, setSelectedRating] = useState(rating);
  const [existingReview, setExistingReview] = useState(null);

  useEffect(() => {
    const fetchExistingReview = async () => {
      if (!userId || !businessId) return;

      try {
        const response = await axios.get(`${API}/reviews/myreview`, {
          params: {
            user: userId,
            business: businessId,
          },
        });
        console.log(response.data);

        if (response.data?.data) {
          setExistingReview(response.data.data);
          setComment(response.data.data.comment || "");
          setSelectedRating(response.data.data.rating || rating);
        }
      } catch (error) {
        console.error("Error fetching review:", error);
        if (error.response) {
          console.log("Backend error response:", error.response.data);
        }
      }
    };

    fetchExistingReview();
  }, [userId, businessId]);

  const handleRatingClick = (newRating) => {
    setSelectedRating(newRating);
  };
  const handleSubmit = async () => {
    if (!comment.trim()) {
      setError("Please write your review");
      return;
    } else if (comment.trim().length < 3) {
      setError("Please write your review minimum 3 characters");
      return;
    }

    if (!businessId) {
      setError("Invalid business ID");
      return;
    }

    if (!userId) {
      setError("Please login to submit a review");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      if (existingReview?._id) {
        await axios.put(`${API}/reviews/${existingReview._id}`, {
          user: userId,
          business: businessId,
          rating: selectedRating,
          comment: comment,
        });
      } else {
        await axios.post(`${API}/reviews`, {
          user: userId,
          business: businessId,
          rating: selectedRating,
          comment: comment,
        });
      }
      navigate(`/business/${businessId}`);
    } catch (err) {
      setError("Failed to submit review. Please try again.");
      console.error("Error submitting review:", err);
    } finally {
      setIsSubmitting(false);
    }
  };
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  const starVariants = {
    hover: { scale: 1.2, rotate: 5 },
    tap: { scale: 0.95 },
  };
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={containerVariants}
      className="min-h-screen bg-gray-50 py-12 px-4 flex items-center justify-center"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8">
        <motion.div
          variants={itemVariants}
          className="md:col-span-4 bg-white p-6 rounded-lg shadow-md h-fit"
        >
          <motion.div variants={itemVariants} className="mb-6">
            <motion.img
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              src={
                formData?.business?.photos?.[0] ||
                "https://via.placeholder.com/400"
              }
              alt={formData?.business?.businessName}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <motion.h2
              variants={itemVariants}
              className="text-2xl font-bold text-gray-800 mb-2"
            >
              {formData?.business?.businessName}
            </motion.h2>
            <motion.p variants={itemVariants} className="text-gray-600 text-sm">
              {formData?.business?.address?.addressArea}
            </motion.p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="border-t border-gray-200 pt-4"
          >
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-3 mb-4"
            >
              <motion.img
                whileHover={{ scale: 1.1 }}
                src={userAvatar}
                alt={userName}
                className="w-12 h-12 rounded-full object-cover border-2 border-purple-100"
              />
              <motion.div variants={itemVariants}>
                <p className="font-medium text-gray-800">{userName}</p>
                <p className="text-sm text-gray-500">Posting publicly</p>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="md:col-span-8 bg-white p-8 rounded-lg shadow-md"
        >
          <motion.h1
            variants={itemVariants}
            className="text-2xl text-center font-bold mb-8 text-gray-800"
          >
            Write Your Review
          </motion.h1>

          <motion.div
            variants={itemVariants}
            className="mb-8 bg-gray-50 text-center p-6 rounded-lg"
          >
            <motion.p
              variants={itemVariants}
              className="text-gray-700 mb-4 font-medium"
            >
              Your Rating
            </motion.p>
            <div className="flex items-center space-x-2 justify-center">
              {[...Array(5)].map((_, index) => (
                <motion.div
                  key={index}
                  variants={starVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <FaStar
                    className={`text-3xl transition-colors duration-200 cursor-pointer hover:text-yellow-400 
                                            ${
                                              index + 1 <= selectedRating
                                                ? "text-yellow-400"
                                                : "text-gray-300"
                                            }`}
                    onClick={() => handleRatingClick(index + 1)}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-6">
            <motion.div variants={itemVariants}>
              <label className="block text-gray-700 mb-3 font-medium">
                Your Review
              </label>
              <motion.textarea
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className={`w-full p-4 border rounded-lg focus:outline-none focus:ring-2 
                                    focus:ring-purple-500 transition-all duration-200 min-h-[150px] 
                                    ${
                                      error
                                        ? "border-red-500 bg-red-50"
                                        : "border-gray-300"
                                    }`}
                placeholder="Share your experience with others..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                maxLength={500}
              />
              <AnimatePresence>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-red-500 text-sm mt-3 h-6"
                  >
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full py-4 rounded-lg text-white font-medium transition-all duration-200 
                                ${
                                  isSubmitting
                                    ? "bg-purple-400 cursor-not-allowed"
                                    : "bg-purple-600 hover:bg-purple-700 hover:shadow-lg"
                                }`}
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Review"}
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ReviewPage;
