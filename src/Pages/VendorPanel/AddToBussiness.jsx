import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API } from '../../../config/config';
import logo from '../../assets/logo_01.png';

const AddToBusiness = () => {
  const [hasBusiness, setHasBusiness] = useState(false);
  const [business, setBusiness] = useState(null);
  const navigate = useNavigate();

//   useEffect(() => {
//     const checkBusiness = async () => {
//       try {
//         const response = await axios.get(`${API}/business/vendor`);
//         if (response.data.data) {
//           setHasBusiness(true);
//           setBusiness(response.data.data);
//         }
//       } catch (error) {
//         console.error('Error checking business:', error);
//       }
//     };
//     checkBusiness();
//   }, []);

  return (
    <div className="bg-gray-50 flex">
      {/* Left Content */}
      <div className="flex-1 p-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            {hasBusiness ? 'Your Business' : 'Get Started with Your Business'}
          </h1>
          
          {!hasBusiness ? (
            <>
            <div className="space-y-6">
              <p className="text-lg text-gray-600">
                Welcome to our platform! Create your business profile and reach more customers.
                List your products or services, manage your business information, and grow your presence online.
              </p>
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-800">Benefits:</h2>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>Increase your online visibility</li>
                  <li>Manage your business information easily</li>
                  <li>Connect with potential customers</li>
                  <li>Track your business performance</li>
                </ul>
              </div>
              <button
                onClick={() => navigate('/detailform')}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Get Started
              </button>
            </div>

            
            <div className="bg-white cursor-pointer rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center space-x-4 mb-4">
              {business?.logo && (
                <img 
                  src={business.logo} 
                  alt="Business Logo" 
                  className="w-16 h-16 rounded-full object-cover"
                />
              )}
              <div>
                <h2 className="text-xl font-semibold text-gray-900">{business?.name}</h2>
                <p className="text-gray-500">{business?.category}</p>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-gray-600">{business?.description}</p>
              <div className="flex items-center justify-between pt-4">
                <div className="text-sm text-gray-500">
                  Status: <span className="text-green-600 font-medium">Active</span>
                </div>
                <button
                  onClick={() => navigate(`/vendor/edit-business/${business?._id}`)}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Edit Business
                </button>
              </div>
            </div>
          </div>
          </>
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <div className="flex items-center space-x-4 mb-4">
                {business?.logo && (
                  <img 
                    src={business.logo} 
                    alt="Business Logo" 
                    className="w-16 h-16 rounded-full object-cover"
                  />
                )}
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">{business?.name}</h2>
                  <p className="text-gray-500">{business?.category}</p>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-gray-600">{business?.description}</p>
                <div className="flex items-center justify-between pt-4">
                  <div className="text-sm text-gray-500">
                    Status: <span className="text-green-600 font-medium">Active</span>
                  </div>
                  <button
                    onClick={() => navigate(`/vendor/edit-business/${business?._id}`)}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Edit Business
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right Logo */}
      <div className="w-1/3 bg-white p-8 flex items-center justify-center">
        <img
          src={logo}
          alt="Company Logo"
          className="max-w-full h-auto"
        />
      </div>
    </div>
  );
};

export default AddToBusiness;