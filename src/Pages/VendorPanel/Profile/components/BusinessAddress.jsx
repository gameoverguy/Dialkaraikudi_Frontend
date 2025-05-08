import React, { useState, useEffect } from 'react';
import { FaEdit, FaMapMarkerAlt } from 'react-icons/fa';
import CustomModal from '../../../../Components/modal';
import FloatingInput from '../../../../Components/FloatingInput';

const BusinessAddress = ({ business, onEdit, fetchBusinessDetails, onSubmit }) => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    addressArea: '',
    city: '',
    state: '',
    pincode: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (business?.business?.address) {
      setFormData({
        addressArea: business?.business?.address?.addressArea || '',
        city: business?.business?.address?.city || '',
        state: business?.business?.address?.state || '',
        pincode: business?.business?.address?.pincode || ''
      });
    }
  }, [business]);

  const validateField = (name, value) => {
    switch (name) {
      case 'addressArea':
        return !value.trim() ? 'Address area is required' : '';
      case 'city':
        return !value.trim() ? 'City is required' : '';
      case 'state':
        return !value.trim() ? 'State is required' : '';
      case 'pincode':
        const pincodeRegex = /^\d{6}$/;
        if (!value) return 'Pincode is required';
        if (!pincodeRegex.test(value)) return 'Enter valid 6-digit pincode';
        return '';
      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'pincode') {
      const numbersOnly = value.replace(/[^0-9]/g, '');
      const limitedLength = numbersOnly.slice(0, 6);
      setFormData(prev => ({
        ...prev,
        [name]: limitedLength
      }));
      // Validate pincode immediately
      setErrors(prev => ({
        ...prev,
        [name]: validateField(name, limitedLength)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
      // Validate other fields immediately
      setErrors(prev => ({
        ...prev,
        [name]: validateField(name, value)
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const formattedAddress = `${formData.addressArea}, ${formData.city}, ${formData.state} ${formData.pincode}, India`;
      const updatedData = {
        address: {
          ...formData,
          formattedAddress
        }
      };

      try {
        const result = await onSubmit(updatedData);
        if (result?.success) {
          setShowModal(false);
        }
      } catch (error) {
        console.error('Error updating address:', error);
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold flex"><FaMapMarkerAlt className="text-red-500 mt-1 mr-2" />  Address  </h2>
        <button
          onClick={() => setShowModal(true)}
          className="text-blue-600 hover:text-blue-700 cursor-pointer"
        >
          <FaEdit className="text-xl" />
        </button>
      </div>
      <div className="space-y-3">
        <div className="flex items-start">
         
          <div>
            <p className=''>
              <span className='font-bold'>Address Area:</span> {business?.business?.address?.addressArea || '-'}
            </p>
            <p className="">
            <span className='font-bold'>City:</span> {business?.business?.address?.city || '-'}
            </p>
            <p className="">
            <span className='font-bold'>State:</span> {business?.business?.address?.state ||  '-'}
            </p>
            <p className="">
            <span className='font-bold'>Pincode:</span> {business?.business?.address?.pincode ||  '-'}
            </p>
          
          </div>
        </div>
      </div>

      <CustomModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Edit Address"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <FloatingInput
            id="addressArea"
            name="addressArea"
            value={formData.addressArea}
            onChange={handleChange}
            placeholder="Address Area"
            error={errors.addressArea}
          />

          <FloatingInput
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="City"
            error={errors.city}
          />

          <FloatingInput
            id="state"
            name="state"
            value={formData.state}
            onChange={handleChange}
            placeholder="State"
            error={errors.state}
          />

          <FloatingInput
            id="pincode"
            name="pincode"
            type='text'
            value={formData.pincode}
            onChange={handleChange}
            placeholder="Pincode"
            error={errors.pincode}
          />

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="px-4 py-2 text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </CustomModal>
    </div>
  );
};

export default BusinessAddress;