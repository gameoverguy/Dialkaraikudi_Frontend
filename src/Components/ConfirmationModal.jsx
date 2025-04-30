import React from 'react';
import CustomModal from './modal';

const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message }) => {
  return (
    <CustomModal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="flex flex-col items-center">
        <p className="text-center text-gray-600 mb-6">{message}</p>
        <div className="flex gap-4">
          <button
            onClick={onConfirm}
            className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Yes
          </button>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </CustomModal>
  );
};

export default ConfirmationModal;