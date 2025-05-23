import React from "react";
import { FaCheckCircle } from "react-icons/fa";

const VerificationStatus = ({ business }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Verification Status</h2>
      </div>
      <div className="space-y-4">
        <div className="flex items-center">
          <FaCheckCircle
            className={`text-2xl ${
              business?.business?.verified == true ? "text-green-500" : "text-gray-400"
            }`}
          />
          <span className="ml-2">
            {business?.business?.verified === true ? "Verified Business" : "Not Verified"}
          </span>
        </div>
        {/* <div className="flex items-center">
          <FaCheckCircle className={`text-2xl ${business?.trustBadge ? 'text-green-500' : 'text-gray-400'}`} />
          <span className="ml-2">{business?.trustBadge ? 'Trust Badge Earned' : 'Trust Badge Not Earned'}</span>
        </div> */}
      </div>
    </div>
  );
};

export default VerificationStatus;
