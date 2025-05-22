import React from "react";
import { useLoginModal } from "../../context/LoginContext";
import { motion } from "framer-motion";
import { IoStorefrontOutline } from "react-icons/io5";
import { LuUsers } from "react-icons/lu";
import CustomModal from "../modal";

const LoginModal = ({ isOpen, onClose }) => {
  const { setShowLoginModal, setLoginRole } = useLoginModal();

  const handleLoginClick = (role) => {
    onClose();
    setLoginRole(role);
    setShowLoginModal(true);
  };

  return (
    <CustomModal
      title={" "}
      isOpen={isOpen}
      onClose={onClose}
      classname="w-[95%] sm:w-[85%] md:w-[80%] lg:w-[75%] xl:w-[70%] max-w-6xl mx-auto px-3 sm:px-4 pb-8 sm:pb-12"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
        {/* Business Owner Section */}
        <motion.div
          className="space-y-3 sm:space-y-4 p-4 sm:p-6 lg:p-8 bg-orange-50 rounded-xl text-center flex flex-col h-full"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <motion.div
            className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <IoStorefrontOutline className="text-2xl sm:text-3xl text-orange-600" />
          </motion.div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
            Are you a Business Owner?
          </h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-md mx-auto flex-grow">
            List your business on our platform and reach more customers
          </p>
          <motion.button
            onClick={() => handleLoginClick("business")}
            className="w-full max-w-xs mx-auto bg-orange-500 hover:bg-orange-600 text-white py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg font-medium text-sm sm:text-base transition-colors duration-200 cursor-pointer shadow-sm hover:shadow-md"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Business Login
          </motion.button>
        </motion.div>

        {/* End User Section */}
        <motion.div
          className="space-y-3 sm:space-y-4 p-4 sm:p-6 lg:p-8 bg-emerald-50 rounded-xl text-center flex flex-col h-full"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <motion.div
            className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <LuUsers className="text-2xl sm:text-3xl text-emerald-600" />
          </motion.div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
            Looking for Services?
          </h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-md mx-auto flex-grow">
            Discover the best local businesses and services in Karaikudi
          </p>
          <motion.button
            onClick={() => handleLoginClick("user")}
            className="w-full max-w-xs mx-auto bg-emerald-500 hover:bg-emerald-600 text-white py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg font-medium text-sm sm:text-base transition-colors duration-200 cursor-pointer shadow-sm hover:shadow-md"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            User Login
          </motion.button>
        </motion.div>
      </div>
    </CustomModal>
  );
};

export default LoginModal;
