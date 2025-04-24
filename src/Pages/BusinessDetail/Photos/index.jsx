import React, { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";

const Photos = () => {
  const [imageUrls] = useState([
    { url: "https://dummyimage.com/250x150/000/fff", label: "All" },
    { url: "https://dummyimage.com/250x150/000/fff", label: "Exterior" },
    { url: "https://dummyimage.com/250x150/000/fff", label: "Interior" },
    { url: "https://dummyimage.com/250x150/000/fff", label: "Room" },
    { url: "https://dummyimage.com/250x150/000/fff", label: "Dining" },
  ]);

  return (
    <div className="rounded-md border border-gray-200 p-4 bg-white" id="photos">
      <h1 className="font-semibold text-lg md:text-xl">Photos</h1>
      
      <div className="overflow-x-auto mt-4">
        <div className="flex gap-4">
          {imageUrls.map((image, index) => (
            <div key={index} className="min-w-[10rem]">
              <img
                src={image.url}
                alt={`Photo ${index + 1}`}
                className="w-full h-32 object-cover rounded-md shadow-md"
              />
              <p className="text-sm font-bold text-gray-700 mt-1">{image.label}</p>
              <p className="text-sm text-gray-500">{image.label.length} Photos</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <button className="flex items-center justify-center gap-2 w-full md:w-auto bg-blue-600 text-white font-medium px-4 py-2 rounded-md shadow hover:bg-blue-700 transition">
          <FaCloudUploadAlt className="text-lg" />
          Upload Photos
        </button>
      </div>
    </div>
  );
};

export default Photos;
