import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API } from '../../../../config/config';
import { FaClock, FaImage, FaInfoCircle } from 'react-icons/fa';
import LottieLoader from '../../../Components/Loader';
import { toast, ToastContainer } from 'react-toastify';
import { useParams } from 'react-router-dom';

const VendorSubscription = ({businessData}) => {
  const [adSlots, setAdSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams(); // Get ID from URL params instead of localStorage

  const fetchAdSlots = async () => {
    try {
      const response = await axios.get(`${API}/advertslots`);
      setAdSlots(response.data);
      console.log(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching ad slots:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdSlots();
  }, []);

  const handlePurchaseSlot = async (slotId) => {
    try {
      const response = await axios.post(`${API}/advertslots/assignbusiness`, {
        businessId: businessData.user_id,
        slotId
      });
      toast.success('Slot purchased successfully!');
      // Fetch updated slots data after successful purchase
      fetchAdSlots();
    } catch (error) {
      console.error('Error purchasing slot:', error);
      toast.error(error.response?.data?.message || 'Failed to purchase slot');
    }
  };

  const isSlotPurchased = (slot) => {
    return slot.allowedBusinesses && 
      slot.allowedBusinesses.some(business => business._id === id);
  };

  if (loading) {
    return (
      <div className="">
        <LottieLoader/>
      </div>
    );
  }

  return (
    <div className="p-2 h-screen flex flex-col">
      <ToastContainer/>
      <div className='bg-white shadow rounded mb-4 p-4'>
        <h1 className='mb-2 text-2xl font-bold'>Advertisement Slots</h1>
        <p>The review section displays customer feedback and ratings, helping vendors understand buyer satisfaction, address issues, and enhance product and service quality.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {adSlots.map((slot, index) => (
          <div 
            key={index} 
            className={`bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300
              ${isSlotPurchased(slot) ? 'bg-green-50 ring-2 ring-green-500' : ''}`}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">{slot.name}</h3>
                <span className={`px-3 py-1 rounded-full text-sm font-medium
                  ${isSlotPurchased(slot) 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-blue-100 text-blue-800'}`}
                >
                  {isSlotPurchased(slot) ? 'Purchased' : slot.page}
                </span>
              </div>
              <p className="text-gray-600 mb-4">{slot.description}</p>
              <div className="space-y-3">
                <div className="flex items-center text-gray-600">
                  <FaImage className="mr-2" />
                  <span>Type: {slot.slotType}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <FaClock className="mr-2" />
                  <span>Duration: {slot.adDurationInDays} days</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <FaInfoCircle className="mr-2" />
                  <span>Max Ads: {slot.maxAds}</span>
                </div>
              </div>
              <button 
                onClick={() => handlePurchaseSlot(slot._id)}
                disabled={isSlotPurchased(slot)}
                className={`cursor-pointer mt-6 w-full py-2 px-4 rounded-lg transition-colors
                  ${isSlotPurchased(slot)
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
              >
                {isSlotPurchased(slot) ? 'Already Purchased' : 'Purchase Slot'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VendorSubscription;
