import React, { useState, useEffect } from "react";
import axios from "axios";
import { API } from "../../../config/config";
import { Link } from "react-router-dom";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { CiLocationOn } from "react-icons/ci";
import { IoCallOutline } from "react-icons/io5";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const userData = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const response = await axios.get(
        `${API}/favourites/user?user=${userData?.user_id}`
      );
      setFavorites(response.data?.data || []);
      console.log(response.data?.data);

      setLoading(false);
    } catch (error) {
      setError("Failed to fetch favorites");
      setLoading(false);
    }
  };

  const handleRemoveFavorite = async (businessId) => {
    try {
      // Optimistically update UI
      setFavorites((prev) =>
        prev.filter((fav) => fav.business._id !== businessId)
      );
      // Make API call
      await axios.post(`${API}/favourites/remove`, {
        user: userData?.user_id,
        business: businessId,
      });
    } catch (error) {
      // Revert changes if API call fails
      console.error("Failed to remove from favorites:", error);
      fetchFavorites();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-lg md:text-xl font-bold text-gray-900 mb-8">My Favorites</h1>

        {favorites.length === 0 ? (
          <div className="text-center py-12">
            <AiOutlineHeart className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-4 text-gray-500">No favorites yet</p>
            <Link
              to="/"
              className="mt-4 inline-block text-emerald-600 hover:text-emerald-700"
            >
              Explore Businesses
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((business) => (
              <div
                key={business.business._id}
                className="bg-white relative rounded-lg shadow-md overflow-hidden sm:block flex"
              >
                <div className="h-28 md:h-48 sm:w-full w-1/3 flex-shrink-0">
                  <img
                    src={business.business.photos[0]}
                    alt={business.name}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => handleRemoveFavorite(business.business._id)}
                    className="absolute top-2 right-2 p-1 md:p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors"
                  >
                    <AiFillHeart className="h-4 w-4 md:h-6 md:w-6 text-red-500" />
                  </button>
                </div>

                <div className="p-4 sm:w-full w-2/3">
                <Link to={`/business/${business.business._id}`}>
                    <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
                      {business.business.businessName}
                    </h3>
                  </Link>

                  <p className="text-sm text-gray-600 mb-3 line-clamp-2 sm:block hidden">
                    {business.business.description}
                  </p>

                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <CiLocationOn className="h-4 w-4 mr-1 flex-shrink-0" />
                    <span className="line-clamp-1">
                      {business.business.address.addressArea}
                    </span>
                  </div>

                  <div className="flex items-center text-sm text-gray-500">
                    <IoCallOutline className="h-4 w-4 mr-1 flex-shrink-0" />
                    <span>{business.business.contactDetails.phone}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;