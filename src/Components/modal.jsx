/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { IoClose } from "react-icons/io5";
import "./modal.css";

const CustomModal = ({
  children,
  title,
  header,
  isOpen,
  onClose,
  classname,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Define modal size classes
  // const modalSizeClass =
  //   {
  //     xs: "w-3/12 max-h-10/12", // Extra small modal
  //     sm: "w-9/12 max-h-10/12", // Small modal
  //     md: "w-9/12 max-h-10/12", // Medium modal
  //     lg: "w-6/12 max-h-10/12", // Large modal
  //   }[size] || "w-9/12 max-h-10/12"; // Default to medium size

  return (
    <>
      {/* Modal backdrop */}
      <div
        onClick={onClose}
        className="modal fixed inset-0 w-full h-full bg-black/50 z-50"
      ></div>

      {/* Modal content */}
      <div
        className={`content ${classname} rounded-lg max-h-[90vh] bg-white z-100 fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-lg flex flex-col overflow-hidden`}
      >
        {/* Header */}
        {header && (
          <div className="w-full py-2 px-3 border-b border-gray-300 flex justify-between items-center">
            <h4 className="text-[20px] font-bold text-title uppercase">
              {header}
            </h4>
            {/* <IoClose
              className="cursor-pointer text-xl"
              onClick={onClose}
            /> */}
          </div>
        )}

        {/* Title & Close Button */}
        {title && (
          <div className="w-full p-1 bg-white flex justify-between items-center">
            <h4 className="text-[20px] font-bold text-title uppercase">
              {title}
            </h4>
            <span
              onClick={onClose}
              className="cursor-pointer text-red-400 font-bold text-2xl  duration-500 hover:text-red-700"
            >
              <IoClose />
            </span>
          </div>
        )}

        {/* Modal Content */}
        <div className="p-3 w-full h-full overflow-y-auto scrollbar-hide">
          {children}
        </div>
      </div>
    </>
  );
};

export default CustomModal;
