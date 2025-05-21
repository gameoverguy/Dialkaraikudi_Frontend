import React from 'react';
import { MdVerifiedUser } from 'react-icons/md';

const BusinessDetails = ({ selectedBusiness , setViewModalOpen, setSelectedBusiness}) => {
  return (
    <div className="space-y-6">
    <div className="grid grid-cols-2 gap-4">
      <div>
        <h3 className="text-lg font-medium text-gray-900">Business Name</h3>
        <p className="mt-1 text-gray-600">{selectedBusiness?.name}</p>
      </div>
      <div>
        <h3 className="text-lg font-medium text-gray-900">Category</h3>
        <p className="mt-1 text-gray-600">{selectedBusiness?.category?.displayName || 'N/A'}</p>
      </div>
      <div className="col-span-2">
        <h3 className="text-lg font-medium text-gray-900">Description</h3>
        <p className="mt-1 text-gray-600">{selectedBusiness?.description}</p>
      </div>
      <div>
        <h3 className="text-lg font-medium text-gray-900">Phone</h3>
        <p className="mt-1 text-gray-600">{selectedBusiness?.phone}</p>
      </div>
      <div>
        <h3 className="text-lg font-medium text-gray-900">Email</h3>
        <p className="mt-1 text-gray-600">{selectedBusiness?.email}</p>
      </div>
      <div className="col-span-2">
        <h3 className="text-lg font-medium text-gray-900">Address</h3>
        <p className="mt-1 text-gray-600">{selectedBusiness?.address}</p>
      </div>
      <div>
        <h3 className="text-lg font-medium text-gray-900">Verification Status</h3>
        <p className="mt-1 text-gray-600">
          {selectedBusiness?.verified ? (
            <span className="flex items-center gap-1">
              <MdVerifiedUser className="text-blue-500" /> Verified
            </span>
          ) : 'Not Verified'}
        </p>
      </div>
    </div>
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">Photos</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {selectedBusiness?.photos.map((photo, index) => (
          <div key={index} className="relative group">
            <img
              src={photo}
              alt={`${selectedBusiness?.name} photo ${index + 1}`}
              className="h-32 w-32  object-cover rounded-lg transition-transform duration-200 hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs py-1 px-2 rounded-b-lg">
              Photo {index + 1}
            </div>
          </div>
        ))}
      </div>

    </div>
    <div className="flex justify-end pt-4">
      <button
        type="button"
        onClick={() => {
          setViewModalOpen(false);
          setSelectedBusiness(null);
        }}
        className="px-6 py-2.5 rounded-lg text-gray-700 bg-gray-100 hover:bg-gray-200 transition duration-200"
      >
        Close
      </button>
    </div>
  </div>
  );
};

export default BusinessDetails;