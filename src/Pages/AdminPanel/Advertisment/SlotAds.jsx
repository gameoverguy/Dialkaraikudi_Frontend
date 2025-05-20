import React, { useEffect, useState } from "react";
import axios from "axios";
import CustomModal from "../../../Components/modal";
import FloatingInput from "../../../Components/FloatingInput";
import FloatingSelect from "../../../Components/FloatingInput/DropDown";
import FloatingTextarea from "../../../Components/FloatingInput/FloatingTextarea";
import { API } from "../../../../config/config";
import { uploadToCloudinary } from "../../../utils/cloudinaryUpload";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

const SlotAds = ({ slotId, type }) => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [businesses, setBusinesses] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [formData, setFormData] = useState({
    slotId: slotId,
    businessId: "",
    type: type,
    contentUrl: "",
    description: "",
    priority: "",
    startDate: "",
    endDate: "",
  });
  console.log(formData.type);

  const [selectedSlot, setSelectedSlot] = useState(null);
  const [allowedBusinesses, setAllowedBusinesses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [adsResponse, slotResponse] = await Promise.all([
          axios.get(`${API}/adverts?slotId=${slotId}`),
          axios.get(`${API}/advertslots/${slotId}`),
        ]);
        console.log(adsResponse.data);
        console.log(slotResponse.data.allowedBusinesses);

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

  const [deleteConfirmation, setDeleteConfirmation] = useState({
    show: false,
    adId: null,
  });

  const handleDeleteClick = (id) => {
    setDeleteConfirmation({
      show: true,
      adId: id,
    });
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`${API}/adverts/${deleteConfirmation.adId}`);
      setAds(ads.filter((ad) => ad._id !== deleteConfirmation.adId));
      setDeleteConfirmation({ show: false, adId: null });
    } catch (error) {
      console.error("Error deleting ad:", error);
    }
  };

  const [editingAd, setEditingAd] = useState(null);

  const handleEdit = async (e) => {
    e.preventDefault();
    setUploadLoading(true);
    try {
      let contentUrl = editingAd.contentUrl;
      if (selectedImage) {
        contentUrl = await uploadToCloudinary(selectedImage);
      }

      const response = await axios.put(`${API}/adverts/${editingAd._id}`, {
        ...formData,
        contentUrl,
      });

      setAds(ads.map((ad) => (ad._id === editingAd._id ? response.data : ad)));
      setShowModal(false);
      setEditingAd(null);
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
      console.error("Error updating ad:", error);
    } finally {
      setUploadLoading(false);
    }
  };

  const openEditModal = (ad) => {
    setEditingAd(ad);
    setFormData({
      slotId: ad.slotId,
      businessId: ad.businessId._id,
      type: ad.type,
      description: ad.description,
      priority: ad.priority,
      startDate: new Date(ad.startDate).toISOString().split("T")[0],
      endDate: new Date(ad.endDate).toISOString().split("T")[0],
    });
    setShowModal(true);
  };

  const handleImageRemove = () => {
    setSelectedImage(null);
    if (editingAd) {
      setFormData((prev) => ({
        ...prev,
        contentUrl: "",
      }));
      setEditingAd((prev) => ({
        ...prev,
        contentUrl: "",
      }));
    }
  };
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (
        (type === "Image" && file.type.startsWith("image/")) ||
        (type === "Video" && file.type.startsWith("video/"))
      ) {
        setSelectedImage(file);
      } else {
        alert(`Please upload a ${type.toLowerCase()} file`);
      }
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.add("border-emerald-500");
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.remove("border-emerald-500");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.remove("border-emerald-500");

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      const file = files[0];
      if (
        (type === "Image" && file.type.startsWith("image/")) ||
        (type === "Video" && file.type.startsWith("video/"))
      ) {
        setSelectedImage(file);
      } else {
        alert(`Please upload a ${type.toLowerCase()} file`);
      }
    }
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
        ) : ads.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <div className="mb-4">
              <span className="text-4xl">🖼️</span>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No advertisements yet
            </h3>
            <p className="text-gray-500 max-w-sm mx-auto">
              This slot doesn't have any advertisements. Click "Add New Ad" to
              create your first advertisement.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {ads.map((ad) => (
              <div
                key={ad._id}
                className="bg-white border rounded-lg overflow-hidden hover:shadow-lg transition-shadow relative group"
              >
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2 z-50">
                  <button
                    onClick={() => openEditModal(ad)}
                    className="bg-white p-2 rounded-full text-sm md:text-xl shadow-lg hover:bg-gray-100 transition-colors"
                  >
                    <FaRegEdit className="text-blue-600" />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(ad._id)}
                    className="bg-white p-2 rounded-full text-sm md:text-xl shadow-lg hover:bg-gray-100 transition-colors"
                  >
                    <MdDeleteOutline className="text-red-500" />
                  </button>
                </div>
                <div className="aspect-video bg-gray-100">
                  {type === "Video" ? (
                    <video
                      src={ad.contentUrl}
                      className="w-full h-full object-cover"
                      controls
                    />
                  ) : (
                    <img
                      src={ad.contentUrl}
                      alt={ad.description}
                      className="w-full h-full object-cover"
                    />
                  )}
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
        onClose={() => {
          setShowModal(false);
          setEditingAd(null);
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
        }}
        title={editingAd ? "Edit Advertisement" : "Add New Advertisement"}
      >
        <form
          onSubmit={editingAd ? handleEdit : handleSubmit}
          className="space-y-4"
        >
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
              Upload {type}
            </label>
            <div
              className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-emerald-500 transition-colors"
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="space-y-1 text-center w-full">
                {selectedImage ||
                (editingAd && editingAd.contentUrl && !selectedImage) ? (
                  <div className="space-y-2 relative">
                    <button
                      type="button"
                      onClick={handleImageRemove}
                      className="absolute -top-2 -right-2 bg-white p-1.5 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
                    >
                      <MdDeleteOutline className="text-red-500 text-lg" />
                    </button>
                    <div className="flex items-center justify-center">
                      {type === "Video" ? (
                        <video
                          src={
                            selectedImage
                              ? URL.createObjectURL(selectedImage)
                              : editingAd?.contentUrl
                          }
                          className="h-32 w-auto"
                          controls
                        />
                      ) : (
                        <img
                          src={
                            selectedImage
                              ? URL.createObjectURL(selectedImage)
                              : editingAd?.contentUrl
                          }
                          alt="Preview"
                          className="h-32 w-auto object-contain"
                        />
                      )}
                    </div>
                    <p className="text-sm text-emerald-600">
                      {selectedImage ? selectedImage.name : "Current File"}
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center text-sm text-gray-600">
                    <label className="relative cursor-pointer bg-white rounded-md font-medium text-emerald-600 hover:text-emerald-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-emerald-500">
                      <span>Upload a file</span>
                      <input
                        type="file"
                        className="sr-only"
                        accept={type === "Video" ? "video/*" : "image/*"}
                        onChange={handleFileChange}
                        required={!editingAd}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {type === "Video"
                        ? "MP4, WebM up to 50MB"
                        : "PNG, JPG up to 10MB"}
                    </p>
                  </div>
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
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => {
                setShowModal(false);
                setEditingAd(null);
                setSelectedImage(null);
              }}
              className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200"
              disabled={uploadLoading}
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
              ) : editingAd ? (
                "Update Ad"
              ) : (
                "Create Ad"
              )}
            </button>
          </div>
        </form>
      </CustomModal>

      {/* Delete Confirmation Modal */}
      <CustomModal
        isOpen={deleteConfirmation.show}
        onClose={() => setDeleteConfirmation({ show: false, adId: null })}
        title="Confirm Delete"
      >
        <div className="p-6">
          <p className="text-gray-700 mb-6">
            Are you sure you want to delete this advertisement? This action
            cannot be undone.
          </p>
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setDeleteConfirmation({ show: false, adId: null })}
              className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmDelete}
              className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      </CustomModal>
    </div>
  );
};

export default SlotAds;
