import React from 'react'
import { useLoginModal } from '../../context/LoginContext'
import { motion } from 'framer-motion'
import { IoStorefrontOutline } from 'react-icons/io5'
import { LuUsers } from 'react-icons/lu'
import CustomModal from '../modal'

const LoginModal = ({ isOpen, onClose }) => {
  const { setShowLoginModal, setLoginRole } = useLoginModal()

  const handleLoginClick = (role) => {
    onClose()
    setLoginRole(role)
    console.log(role);
    setShowLoginModal(true)
  }

  return (
    <CustomModal
      title={" "}
      isOpen={isOpen}
      onClose={onClose}
      classname="w-11/12 md:w-10/12 lg:w-9/12 px-4 pb-12"
    >
      <div className="grid md:grid-cols-2 gap-6">
        {/* Business Owner Section */}
        <motion.div
          className="space-y-4 p-6 bg-orange-50 rounded-xl text-center"
          whileHover={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <motion.div
            className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <IoStorefrontOutline className="text-3xl text-orange-600" />
          </motion.div>
          <h2 className="text-2xl font-bold text-gray-800">Are you a Business Owner?</h2>
          <p className="text-gray-600">List your business on our platform and reach more customers</p>
          <motion.button
            onClick={() => handleLoginClick('business')}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-lg font-medium transition-colors duration-200 cursor-pointer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Business Login
          </motion.button>
        </motion.div>

        {/* End User Section */}
        <motion.div
          className="space-y-4 p-6 bg-emerald-50 rounded-xl text-center"
          whileHover={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <motion.div
            className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <LuUsers className="text-3xl text-emerald-600" />
          </motion.div>
          <h2 className="text-2xl font-bold text-gray-800">Looking for Services?</h2>
          <p className="text-gray-600">Discover the best local businesses and services in Karaikudi</p>
          <motion.button
            onClick={() => handleLoginClick('user')}
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3 px-6 rounded-lg font-medium transition-colors duration-200 cursor-pointer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            User login
          </motion.button>
        </motion.div>
      </div>
    </CustomModal>
  )
}

export default LoginModal