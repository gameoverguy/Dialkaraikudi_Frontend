import React from 'react';
import FloatingInput from '../../../../Components/FloatingInput';
import FloatingSelect from '../../../../Components/FloatingInput/DropDown';
import FloatingTextarea from '../../../../Components/FloatingInput/FloatingTextarea';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { MdCancel } from 'react-icons/md';

const BusinessForm = ({ 
  formData, 
  errors, 
  handleInputChange, 
  handleSubmit, 
  categories,
  imagePreview,
  getRootProps,
  getInputProps,
  isDragActive,
  removePhoto,
  setShowModal,
  setFormData,
  setImagePreview,
  setErrors,
  setSelectedBusiness,
  selectedBusiness 
}) => {
  return (
    <form onSubmit={handleSubmit} className="">

    <div className="flex gap-2">
      <div>
        <FloatingInput
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Business Name"
          maxLength={30}
          error={errors.name}
        />
      </div>

      <div>
        <FloatingSelect
          id="category"
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          placeholder="Select Category"
          error={errors.category}
          options={categories.map(category => ({
            value: category._id,
            label: category.displayName
          }))}
        />
      </div>
    </div>

    <div className="flex gap-2">
      <div>
        <FloatingInput
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          placeholder="Phone Number"
          maxLength={10}
          error={errors.phone}
        />

      </div>

      <div>
        <FloatingInput
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Email Address"
          error={errors.email}
        />
      </div>
    </div>

    <div className='mt-4'>

      <FloatingTextarea
        name="description"
        value={formData.description}
        onChange={handleInputChange}
        placeholder="Business Description"
        error={errors.description}
        rows={4}
      />
    </div>

    <div className='mt-4'>
      <FloatingTextarea
        name="address"
        value={formData.address}
        onChange={handleInputChange}
        placeholder="Business Address"
        error={errors.address}
        rows={4}
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Business Photos (Max 6)
      </label>
      {imagePreview.length < 6 && (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition duration-200 ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-500'
            }`}
        >
          <input {...getInputProps()} />
          <FaCloudUploadAlt className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2 text-sm text-gray-600">
            {isDragActive
              ? "Drop the images here"
              : "Drag 'n' drop images here, or click to select"}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Supported formats: JPG, PNG (Max size: 2MB)
          </p>
        </div>
      )}
      {imagePreview.length > 0 && (
        <div className="grid grid-cols-3 gap-4 mt-4">
          {imagePreview.map((preview, index) => (
            <div key={index} className="relative">
              <img
                src={preview}
                alt={`Preview ${index + 1}`}
                className="h-20 w-20 object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() => removePhoto(index)}
                className="absolute cursor-pointer -top-2 right-5 bg-red-500 text-white rounded-full hover:bg-red-600 transition duration-200"
              >
                <MdCancel />
              </button>
            </div>
          ))}
        </div>
      )}
      <div className='mt-1 h-4'>
        {errors.photos && (
          <p className="text-xs text-red-500 text-right">{errors.photos}</p>
        )}
      </div>
    </div>

    <div className="flex justify-end space-x-3 pt-4">
      <button
        type="button"
        onClick={() => {
          setShowModal(false);
          setFormData({ name: '', description: '', category: '', phone: '', email: '', address: '', photos: [] });
          setImagePreview([]);
          setErrors({});
          setSelectedBusiness(null);
        }}
        className="px-6 py-2.5 rounded-lg text-gray-700 bg-gray-100 hover:bg-gray-200 transition duration-200"
      >
        Cancel
      </button>
      <button
        type="submit"
        className="px-6 py-2.5 rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition duration-200"
      >
        {selectedBusiness ? "Update Business" : "Add Business"}
      </button>
    </div>
  </form>
  );
};

export default BusinessForm;