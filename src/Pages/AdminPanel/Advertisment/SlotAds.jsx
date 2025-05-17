import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CustomModal from "../../../Components/modal";
import FloatingInput from "../../../Components/FloatingInput";
import FloatingTextarea from "../../../Components/FloatingInput/FloatingTextarea";
import { API } from "../../../../config/config";

const SlotAds = () => {
  const { slotId } = useParams();
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    slotId: slotId,
    businessId: "",
    type: "Image",
    contentUrl: "",
    description: "",
    priority: 1,
    startDate: ""
  });

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await axios.get(`${API}/adverts?slotId=${slotId}`);
        setAds(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching ads:", error);
        setLoading(false);
      }
    };

    fetchAds();
  }, [slotId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API}/adverts`, formData);
      setAds([...ads, response.data]);
      setShowModal(false);
      setFormData({
        slotId: slotId,
        businessId: "",
        type: "Image",
        contentUrl: "",
        description: "",
        priority: 1,
        startDate: ""
      });
    } catch (error) {
      console.error("Error creating ad:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
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
                  <p className="text-sm text-gray-600">{ad.description}</p>
                  <div className="mt-2 flex justify-between items-center text-xs text-gray-500">
                    <span>Priority: {ad.priority}</span>
                    <span>Start: {new Date(ad.startDate).toLocaleDateString()}</span>
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
          <FloatingInput
            type="text"
            name="businessId"
            value={formData.businessId}
            onChange={handleChange}
            placeholder="Business ID"
            required
          />
          <FloatingInput
            type="text"
            name="contentUrl"
            value={formData.contentUrl}
            onChange={handleChange}
            placeholder="Content URL"
            required
          />
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
              className="px-4 py-2 text-white bg-emerald-500 rounded-lg hover:bg-emerald-600"
            >
              Create Ad
            </button>
          </div>
        </form>
      </CustomModal>
    </div>
  );
};

export default SlotAds;