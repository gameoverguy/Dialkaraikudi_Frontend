import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { API } from '../../../../config/config';
import { FaEdit, FaStar, FaMapMarkerAlt, FaClock, FaCheckCircle } from 'react-icons/fa';

const VendorDashboard = () => {
  const { id } = useParams();
  const [business, setBusiness] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBusinessDetails = async () => {
      try {
        const response = await axios.get(`${API}/business/${id}`);
        setBusiness(response.data.data);
        console.log(response.data.data);
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching business details:', error);
      }
    };

    fetchBusinessDetails();
  }, [id]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Business Details Box */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Business Details</h2>
            <button className="text-blue-600 hover:text-blue-700">
              <FaEdit className="text-xl" />
            </button>
          </div>
          <div className="space-y-3">
            <h3 className="text-2xl font-semibold">{business.businessName}</h3>
            <p className="text-gray-600">{business.description}</p>
            <div className="flex items-center text-gray-500">
              <span className="font-medium">Category:</span>
              <span className="ml-2">{business.category}</span>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center">
                <span className="font-medium">Phone:</span>
                <span className="ml-2">{business.contactDetails?.phone}</span>
              </div>
              <div className="flex items-center">
                <span className="font-medium">Email:</span>
                <span className="ml-2">{business.contactDetails?.email}</span>
              </div>
              {business.contactDetails?.website && (
                <div className="flex items-center">
                  <span className="font-medium">Website:</span>
                  <a href={business.contactDetails?.website} className="ml-2 text-blue-600 hover:text-blue-700">
                    {business.contactDetails?.website}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Address Box */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Address</h2>
            <button className="text-blue-600 hover:text-blue-700">
              <FaEdit className="text-xl" />
            </button>
          </div>
          <div className="space-y-3">
            <div className="flex items-start">
              <FaMapMarkerAlt className="text-red-500 mt-1 mr-2" />
              <div>
                <p className="text-gray-700">{business.address?.addressArea}</p>
                <p className="text-gray-700">{business.address?.city}, {business.address?.state}</p>
                <p className="text-gray-700">{business.address?.pincode}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Business Timings Box */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Business Hours</h2>
            <button className="text-blue-600 hover:text-blue-700">
              <FaEdit className="text-xl" />
            </button>
          </div>
          {/* <div className="space-y-2">
            {Object?.entries(business?.businessTimings).map(([day, timing]) => (
              <div key={day} className="flex justify-between items-center">
                <span className="capitalize">{day}</span>
                <span className="text-gray-600">
                  {timing.isOpen ? `${timing.openTime} - ${timing.closeTime}` : 'Closed'}
                </span>
              </div>
            ))}
          </div> */}
        </div>

        {/* Verification Status Box */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Verification Status</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center">
              <FaCheckCircle className={`text-2xl ${business.verified ? 'text-green-500' : 'text-gray-400'}`} />
              <span className="ml-2">{business?.verified ? 'Verified Business' : 'Not Verified'}</span>
            </div>
            <div className="flex items-center">
              <FaCheckCircle className={`text-2xl ${business.trustBadge ? 'text-green-500' : 'text-gray-400'}`} />
              <span className="ml-2">{business?.trustBadge ? 'Trust Badge Earned' : 'Trust Badge Not Earned'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Subscription Status */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Subscription Status</h2>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-lg font-medium">Current Plan: <span className="text-blue-600">Basic</span></p>
            <p className="text-gray-600">Valid until: December 31, 2024</p>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Upgrade Plan
          </button>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Customer Reviews</h2>
          <div className="flex items-center">
            <div className="flex items-center mr-4">
              <FaStar className="text-yellow-400 mr-1" />
              <span className="font-medium">{business.ratings}</span>
              <span className="text-gray-500 ml-1">({business?.reviewCount} reviews)</span>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          {/* Sample review cards - Replace with actual reviews data */}
          <div className="border rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-medium">John Doe</h3>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className={`${i < 4 ? 'text-yellow-400' : 'text-gray-300'}`} />
                  ))}
                </div>
              </div>
              <span className="text-gray-500 text-sm">2 days ago</span>
            </div>
            <p className="text-gray-600">Great service and professional staff. Highly recommended!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;