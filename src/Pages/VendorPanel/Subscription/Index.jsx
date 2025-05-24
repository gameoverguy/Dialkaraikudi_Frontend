import React, { useState, useEffect } from "react";
import axios from "axios";
import { API } from "../../../../config/config";
import { FaClock, FaImage, FaInfoCircle } from "react-icons/fa";
import LottieLoader from "../../../Components/Loader";
import { toast, ToastContainer } from "react-toastify";
import { useParams } from "react-router-dom";

const VendorSubscription = ({ businessData }) => {
  const [adSlots, setAdSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams(); // Get ID from URL params instead of localStorage
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [showMediaPopup, setShowMediaPopup] = useState(true);

  const fetchAdSlots = async () => {
    try {
      const response = await axios.get(`${API}/advertslots`);
      setAdSlots(response.data);
      console.log(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching ad slots:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdSlots();
  }, []);

  const handlePurchaseSlot = async (slotId) => {
    try {
      console.log(businessData.user_id);
      console.log(slotId);

      const response = await axios.post(`${API}/advertslots/assignbusiness`, {
        businessId: businessData.user_id,
        slotId,
      });
      console.log(response.data);

      if (response.data.success) {
        const res = await axios.post(`${API}/slotPurchases`, {
          businessId: businessData.user_id,
          slotId,
        });
        console.log(res.data);
      }

      toast.success("Slot purchased successfully!");
      // Fetch updated slots data after successful purchase
      fetchAdSlots();
    } catch (error) {
      console.error("Error purchasing slot:", error);
      toast.error(error.response?.data?.message || "Failed to purchase slot");
    }
  };

  const isSlotPurchased = (slot) => {
    return (
      slot.allowedBusinesses &&
      slot.allowedBusinesses.some(
        (businessId) => businessId === businessData.user_id
      )
    );
  };

  const isSlotFull = (slot) => {
    return slot.allowedBusinesses && slot.allowedBusinesses.length >= slot.maxAds;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LottieLoader />
      </div>
    );
  }

  const MediaRequirementsPopup = () => (
    <div className="fixed inset-0 bg-black/70  flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Important Notice</h3>
        <div className="text-gray-600 space-y-3">
          <p>Please note the following regarding media content:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>After payment, we will upload your provided videos/images to the website</li>
            <li>If you have media content ready, please provide it to us</li>
            <li>If you don't have media content, our team will create high-quality images and videos</li>
            <li>The media content created by our team will be final and cannot be changed</li>
          </ul>
        </div>
        <button
          onClick={() => setShowMediaPopup(false)}
          className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
        >
          I Understand
        </button>
      </div>
    </div>
  );

  return (
    <>
      <div className="p-2 h-screen flex flex-col pb-4">
      {showMediaPopup && <MediaRequirementsPopup />}
        <div className="bg-white shadow rounded mb-4 p-4">
          <h1 className="mb-2 text-2xl font-bold">Advertisement Slots</h1>
          <p>
            The review section displays customer feedback and ratings, helping
            vendors understand buyer satisfaction, address issues, and enhance
            product and service quality.
          </p>
          <button
            onClick={() => setShowDisclaimer(!showDisclaimer)}
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
          >
            <FaInfoCircle />
            View Advertising Guidelines
          </button>
        </div>
        {showDisclaimer && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
            <h3 className="font-semibold text-blue-900 mb-2">Important Information:</h3>
            <ul className="list-disc list-inside space-y-1 text-blue-800">
              <li>All advertisements are subject to review and approval</li>
              <li>Pricing is per advertisement slot for the specified duration</li>
              <li>Content must comply with our advertising policies</li>
              <li>Placement is subject to availability</li>
              <li>Refunds are not available for active advertisements</li>
              <li>For further queries Conatct Us @: xxxxx xxxxx</li>
            </ul>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {adSlots.map((slot, index) => (
            <div
              key={index}
              className={`bg-white mb-1 flex flex-col justify-between rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300
                ${isSlotPurchased(slot) ? "bg-green-50 ring-2 ring-green-500" : ""}
                ${isSlotFull(slot) && !isSlotPurchased(slot) ? "bg-red-50 ring-2 ring-red-500" : ""}`}
            >
              <div className="p-6 pb-0">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">
                    {slot.name}
                  </h3>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium
                  ${
                    isSlotPurchased(slot)
                      ? "bg-green-100 text-green-800"
                      : "bg-blue-100 text-blue-800"
                  }`}
                  >
                    {slot.page}
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
                
              </div>
              <div className="p-6 pt-0">
              <button
                  onClick={() => handlePurchaseSlot(slot._id)}
                  disabled={isSlotPurchased(slot) || isSlotFull(slot)}
                  className={`mt-6 w-full  py-2 px-4 rounded-lg transition-colors
                  ${isSlotPurchased(slot)
                    ? "bg-gray-300 cursor-not-allowed"
                    : isSlotFull(slot)
                    ? "bg-red-300 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 text-white cursor-pointer" 
                  }`}
                >
                  {isSlotPurchased(slot)
                    ? "Already Purchased"
                    : isSlotFull(slot)
                    ? "Slot Full"
                    : "Purchase Slot"}
                </button>
                </div>
            </div>
          ))}
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default VendorSubscription;
