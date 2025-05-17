import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CustomModal from "../../../Components/modal";
import FloatingInput from "../../../Components/FloatingInput";
import FloatingSelect from "../../../Components/FloatingInput/DropDown";
import FloatingTextarea from "../../../Components/FloatingInput/FloatingTextarea";
import { API } from "../../../../config/config";
import { uploadToCloudinary } from "../../../utils/cloudinaryUpload";
const SlotAds = ({ slotId }) => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [businesses, setBusinesses] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [formData, setFormData] = useState({
    slotId: slotId,
    businessId: "",
    type: "Image",
    contentUrl: "",
    description: "",
    priority: 1,
    startDate: "",
    endDate: "",
  });
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [allowedBusinesses, setAllowedBusinesses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [adsResponse, slotResponse] = await Promise.all([
          axios.get(`${API}/adverts?slotId=${slotId}`),
          axios.get(`${API}/advertslots/${slotId}`),
        ]);

        setAds(adsResponse.data);
        setSelectedSlot(slotResponse.data);
        setAllowedBusinesses(slotResponse.data.allowedBusinesses || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [slotId]);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploadLoading(true);
    try {
      let contentUrl = "";
      if (selectedImage) {
        contentUrl = await uploadToCloudinary(selectedImage);
      }

      const response = await axios.post(`${API}/adverts`, {
        ...formData,
        contentUrl,
      });

      setAds([...ads, response.data]);
      setShowModal(false);
      setFormData({
        slotId: slotId,
        businessId: "",
        type: "Image",
        description: "",
        priority: 1,
        startDate: "",
        endDate: "",
      });
      setSelectedImage(null);
    } catch (error) {
      console.error("Error creating ad:", error);
    } finally {
      setUploadLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="shadow bg-white p-6 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Slot Advertisements</h1>
          <button
            onClick={() => setShowModal(true)}
            className="bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition-colors"
          >
            Add New Ad
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {ads.map((ad) => (
              <div
                key={ad._id}
                className="bg-white border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="aspect-video bg-gray-100">
                  <img
                    src={ad.contentUrl}
                    alt={ad.description}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 mb-1">
                    {ad.businessId.businessName}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">{ad.description}</p>
                  <div className="space-y-1 text-xs text-gray-500">
                    <div className="flex justify-between">
                      <span>Start Date:</span>
                      <span>{formatDate(ad.startDate)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>End Date:</span>
                      <span>{formatDate(ad.endDate)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Priority:</span>
                      <span>{ad.priority}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <CustomModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Add New Advertisement"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <FloatingSelect
            name="businessId"
            value={formData.businessId}
            onChange={handleChange}
            options={allowedBusinesses.map((business) => ({
              value: business._id,
              label: business.businessName,
            }))}
            placeholder="Select Business"
            required
          />
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Upload Image
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-emerald-500 transition-colors">
              <div className="space-y-1 text-center">
                {selectedImage ? (
                  <div className="space-y-2">
                    <div className="flex items-center justify-center">
                      <img
                        src={URL.createObjectURL(selectedImage)}
                        alt="Preview"
                        className="h-32 w-auto object-contain"
                      />
                    </div>
                    <p className="text-sm text-emerald-600">
                      {selectedImage.name}
                    </p>
                    <button
                      type="button"
                      onClick={() => setSelectedImage(null)}
                      className="text-xs text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="flex text-sm text-gray-600">
                    <label className="relative cursor-pointer bg-white rounded-md font-medium text-emerald-600 hover:text-emerald-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-emerald-500">
                      <span>Upload a file</span>
                      <input
                        type="file"
                        className="sr-only"
                        accept="image/*"
                        onChange={handleImageChange}
                        required
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                )}
                {!selectedImage && (
                  <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                )}
              </div>
            </div>
          </div>
          <FloatingTextarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            required
          />
          <FloatingInput
            type="number"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            placeholder="Priority"
            required
          />
          <FloatingInput
            type="datetime-local"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            placeholder="Start Date"
            required
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-emerald-500 rounded-lg hover:bg-emerald-600 flex items-center gap-2"
              disabled={uploadLoading}
            >
              {uploadLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Uploading...</span>
                </>
              ) : (
                "Create Ad"
              )}
            </button>
          </div>
        </form>
      </CustomModal>
    </div>
  );
};

export default SlotAds;
