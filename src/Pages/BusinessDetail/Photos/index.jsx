import React, { useState } from "react";
import CustomModal from "../../../Components/modal";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Photos = ({formData}) => {
  const [showImageModal, setShowImageModal] = useState(false);
  const [initialSlide, setInitialSlide] = useState(0);

  const handleImageClick = (index) => {
    setInitialSlide(index);
    setShowImageModal(true);
  };

  return (
    <div className="rounded-md border border-gray-200 p-4 bg-white" id="photos">
      <h1 className="font-semibold text-lg md:text-xl">Photos</h1>
      
      <div className="overflow-x-auto mt-4">
        <div className="flex gap-4">
          {formData?.photos?.map((image, index) => (
            <div 
              key={index} 
              className="min-w-[10rem] cursor-pointer" 
              onClick={() => handleImageClick(index)}
            >
              <img
                src={image}
                alt={`Photo ${index + 1}`}
                className="w-full h-32 object-cover rounded-md shadow-md hover:opacity-90 transition-opacity"
              />
            </div>
          ))}
        </div>
      </div>

      <CustomModal
        isOpen={showImageModal}
        onClose={() => setShowImageModal(false)}
        classname="w-11/12 md:w-3/4 lg:w-4/5"
        title="Photo Gallery"
      >
        <Swiper
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          initialSlide={initialSlide}
          className="h-[70vh]"
        >
          {formData?.photos?.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="w-full h-full flex items-center justify-center">
                <img
                  src={image}
                  alt={`Gallery ${index + 1}`}
                  className="min-h-full min-w-full object-contain"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </CustomModal>
    </div>
  );
};

export default Photos;