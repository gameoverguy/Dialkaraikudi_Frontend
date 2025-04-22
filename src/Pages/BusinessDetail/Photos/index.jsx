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
    <React.Fragment>
      <div className="rounded-md border border-gray-200 p-4" id="photos">
        <h1 className="flex items-center font-normal text-xl">Photos</h1>
        <div className="overflow-x-auto mt-4">
          <div className="flex gap-4">
            {imageUrls.map((image, index) => (
              <div key={index} className="">
                <img
                  src={image.url}
                  alt={`Photo ${index + 1}`}
                  className="w-48 h-32 object-cover rounded-md shadow-md"
                />
                <p className="text-md font-bold text-gray-700 mt-1">{image.label}</p>
                <p className="text-md text-gray-500 mt-1">{image.label.length} Photos</p>
              </div>
            ))}
          </div>
          <button className="flex items-center gap-2 bg-blue-600 text-white p-2 rounded"><span><FaCloudUploadAlt/></span>Upload Photos</button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Photos;
