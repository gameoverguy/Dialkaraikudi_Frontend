import React, { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";

const Photos = () => {
  const [imageUrls] = useState([
    { url: "https://dummyimage.com/250x150/000/fff", label: "All" },
    { url: "https://dummyimage.com/250x150/000/fff", label: "Exterior" },
    { url: "https://dummyimage.com/250x150/000/fff", label: "Interior" },
    { url: "https://dummyimage.com/250x150/000/fff", label: "Room" },
    { url: "https://dummyimage.com/250x150/000/fff", label: "Dining" },
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Photos;
