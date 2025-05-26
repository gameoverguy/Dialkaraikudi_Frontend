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
    gst: business?.business?.gst || '',
    whatsapp: business?.business?.contactDetails?.whatsapp || '',
    email: business?.business?.email || '',
    website: business?.business?.contactDetails?.website || ''
  });
  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const phoneRegex = /^[6-9]\d{9}$/;
    const nameRegex = /^[a-zA-Z\s]+$/;
    const websiteRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
    const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;

    switch (name) {
      case 'businessName':
        if (!value.trim()) return 'Business name is required';
        if (!nameRegex.test(value)) return 'Only letters and spaces are allowed';
        return '';
      case 'description':
        if (!value.trim()) return 'Description is required';
        if (value.length < 25) return 'Description must be at least 25 characters';
        return '';
      case 'phone':
        if (!value) return 'Phone number is required';
        if (!phoneRegex.test(value)) return 'Enter valid 10 digit phone number';
        return '';
      case 'whatsapp':
        if (value && !phoneRegex.test(value)) return 'Enter valid 10 digit WhatsApp number';
        return '';
      case 'email':
        if (!value) return 'Email is required';
        if (!emailRegex.test(value)) return 'Enter valid email address';
        return '';
      case 'website':
        if (value && !websiteRegex.test(value)) return 'Enter valid website URL';
        return '';
      case 'gst':
        if (value && !gstRegex.test(value)) return 'Enter valid GST number';
        return '';
      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'phone' || name === 'whatsapp') {
      const numbersOnly = value.replace(/[^0-9]/g, '');
      const limitedLength = numbersOnly.slice(0, 10);
      setFormData(prev => ({
        ...prev,
        [name]: limitedLength
      }));
      setErrors(prev => ({
        ...prev,
        [name]: validateField(name, limitedLength)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
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
      const updatedData = {
        email: formData.email,
        businessName: formData.businessName,
        description: formData.description,
        contactDetails: {
          phone: formData.phone,
          whatsapp: formData.whatsapp,
          website: formData.website
        },
        gst: formData.gst
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
          className="text-blue-600 hover:text-blue-700 cursor-pointer"
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
        <div className="flex items-center">
          <span className="font-medium">Gst No:</span>
          <span className="ml-2">{business?.business.gst}</span>
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
            <span className="ml-2">{business?.business?.email}</span>
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
        <form onSubmit={handleSubmit} className="space-y-4 ">
          <div className=" grid grid-cols-2 gap-2">
            <FloatingInput
              id="businessName"
              name="businessName"
              value={formData.businessName}
              onChange={handleChange}
              placeholder="Business Name"
              error={errors.businessName}
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
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              error={errors.email}
            />

            <FloatingInput
              id="gst"
              name="gst"
              value={formData.gst}
              onChange={handleChange}
              placeholder="GST Number (Optional)"
              error={errors.gst}
            />

            <FloatingInput
              id="website"
              name="website"
              value={formData.website}
              onChange={handleChange}
              placeholder="Website (Optional)"
              error={errors.website}
            />


            <FloatingInput
              id="whatsapp"
              name="whatsapp"
              value={formData.whatsapp}
              onChange={handleChange}
              placeholder="W.Number (Optional)"
              error={errors.whatsapp}
            />
          </div>
          <FloatingTextarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Business Description"
            error={errors.description}
          />

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="cursor-pointer px-4 py-2 text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="cursor-pointer px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
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