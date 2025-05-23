import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API } from '../../../../config/config';
import { IoNotifications } from 'react-icons/io5';
import SlotAds from './SlotAds';

const Notification = () => {
  const [pendingAds, setPendingAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPurchase, setSelectedPurchase] = useState(null);

  useEffect(() => {
    fetchPendingAds();
  }, []);

  const fetchPendingAds = async () => {
    try {
      const response = await axios.get(`${API}/slotPurchases/pending`);
      setPendingAds(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching pending ads:', error);
      setLoading(false);
    }
  };

  const handleNotificationClick = (purchase) => {
    setSelectedPurchase(purchase);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (selectedPurchase) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">
            Managing Slot: {selectedPurchase.slotId.name}
          </h1>
          <button
            onClick={() => setSelectedPurchase(null)}
            className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
          >
            <span>←</span> Back to Notifications
          </button>
        </div>
        <SlotAds slotId={selectedPurchase.slotId._id} type={selectedPurchase.slotId.slotType} />
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="bg-white shadow rounded-lg">
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <IoNotifications className="text-blue-600" />
            Pending Advertisement Uploads
          </h2>
        </div>
        
        <div className="divide-y">
          {pendingAds.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              No pending advertisements found
            </div>
          ) : (
            pendingAds.map((purchase) => (
              <div
                key={purchase._id}
                onClick={() => handleNotificationClick(purchase)}
                className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {purchase.businessId.businessName}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Purchased slot: {purchase.slotId.name}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Purchased on: {new Date(purchase.purchasedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                    Pending Upload
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Notification;
