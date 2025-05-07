import React, { useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import CustomModal from '../../../../Components/modal';
import FloatingInput from '../../../../Components/FloatingInput';
import FloatingTextarea from '../../../../Components/FloatingInput/FloatingTextarea';


const BusinessDetails = ({ business, onEdit, fetchBusinessDetails, onSubmit }) => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    businessName: business?.business?.businessName || '',
    description: business?.business?.description || '',
    phone: business?.business?.contactDetails?.phone || '',
    whatsapp: business?.business?.contactDetails?.whatsapp || '',
    email: business?.business?.contactDetails?.email || '',
    website: business?.business?.contactDetails?.website || ''
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const phoneRegex = /^[6-9]\d{9}$/;
    const nameRegex = /^[a-zA-Z\s]+$/;

    if (!formData.businessName.trim()) {
      newErrors.businessName = 'Business name is required';
    } else if (!nameRegex.test(formData.businessName)) {
      newErrors.businessName = 'Only letters and spaces are allowed';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.length < 25) {
      newErrors.description = 'Description must be at least 25 characters';
    }

    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Enter valid 10 digit phone number';
    }

    if (formData.whatsapp && !phoneRegex.test(formData.whatsapp)) {
      newErrors.whatsapp = 'Enter valid 10 digit WhatsApp number';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Enter valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const updatedData = {
        businessName: formData.businessName,
        description: formData.description,
        contactDetails: {
          phone: formData.phone,
          whatsapp: formData.whatsapp,
          email: formData.email,
          website: formData.website
        }
      };
      
      try {
        await onSubmit(updatedData);
        setShowModal(false);
       
      } catch (error) {
        console.error('Error updating business:', error);
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Business Details</h2>
        <button
          onClick={() => setShowModal(true)}
          className="text-blue-600 hover:text-blue-700"
        >
          <FaEdit className="text-xl" />
        </button>
      </div>
      <div className="space-y-3">
        <h3 className="text-2xl font-semibold">{business?.business?.businessName}</h3>
        <p className="text-gray-600 ">{business?.business.description}</p>
        <div className="flex items-center">
          <span className="font-medium">Category:</span>
          <span className="ml-2">{business?.business?.category?.displayName}</span>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center">
            <span className="font-medium">Phone:</span>
            <span className="ml-2">{business?.business?.contactDetails?.phone}</span>
          </div>
          <div className="flex items-center">
            <span className="font-medium">WhatsApp:</span>
            <span className="ml-2">{business?.business?.contactDetails?.whatsapp || '-'}</span>
          </div>
          <div className="flex items-center">
            <span className="font-medium">Email:</span>
            <span className="ml-2">{business?.business?.contactDetails?.email}</span>
          </div>

            <div className="flex items-center">
              <span className="font-medium">Website:</span>
              <a href={business?.business?.contactDetails?.website} className="ml-2 text-blue-600 hover:text-blue-700">
                {business?.business?.contactDetails?.website || '-'}
              </a>
            </div>
        
        </div>
      </div>
      <CustomModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Edit Business Details"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <FloatingInput
            id="businessName"
            name="businessName"
            value={formData.businessName}
            onChange={handleChange}
            placeholder="Business Name"
            error={errors.businessName}
          />

          <FloatingTextarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Business Description"
            error={errors.description}
          />

          <FloatingInput
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            error={errors.phone}
          />

          <FloatingInput
            id="whatsapp"
            name="whatsapp"
            value={formData.whatsapp}
            onChange={handleChange}
            placeholder="WhatsApp Number (Optional)"
            error={errors.whatsapp}
          />

          <FloatingInput
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            error={errors.email}
          />

          <FloatingInput
            id="website"
            name="website"
            value={formData.website}
            onChange={handleChange}
            placeholder="Website (Optional)"
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

export default BusinessDetails;