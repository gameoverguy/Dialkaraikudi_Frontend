<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import Logo from "../assets/logo_01.png";
import { CiLocationOn } from "react-icons/ci";
import { IoSearchOutline } from "react-icons/io5";
import { MdNotificationsActive } from "react-icons/md";
import { LuCircleUserRound } from "react-icons/lu";
import AdminLogin from "../Pages/AdminLogin";
import SignupModal from "../Pages/SignUp";
import ForgotPassword from "../Pages/AdminLogin/ForgotPassword";
import OTP from "../Pages/AdminLogin/OTP";
import ResetPassword from "../Pages/AdminLogin/ResetPassword";
import { useLoginModal } from "../context/LoginContext";
import Cookies from "js-cookie";
import { useRef } from "react";
import { CiLogout } from "react-icons/ci";
import { Link } from "react-router-dom";
import LocationTracker from "./LocationTracker";
=======
import React, { useState, useEffect } from 'react'
import Logo from '../assets/logo_01.png'
import { CiLocationOn } from 'react-icons/ci'
import { IoSearchOutline } from 'react-icons/io5'
import { MdNotificationsActive } from 'react-icons/md'
import { LuCircleUserRound } from 'react-icons/lu'
import { useLoginModal } from '../context/LoginContext'
import Cookies from 'js-cookie';
import {  useRef } from 'react'
import { CiLogout } from 'react-icons/ci'
import { Link } from 'react-router-dom'
import LocationTracker from './LocationTracker';
import UserLogin from '../Pages/UserLogin'
import SignupModal from '../Pages/SignUp'
import ForgotPassword from '../Pages/UserLogin/ForgotPassword'
import OTP from '../Pages/UserLogin/OTP'
import ResetPassword from '../Pages/UserLogin/ResetPassword'
>>>>>>> 9eae4ae7bb07d974a5223991a9ec6e1feaa63840

const Header = () => {
  const { showLoginModal, setShowLoginModal } = useLoginModal();
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [otpEmail, setOtpEmail] = useState("");
  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const storedUserData = sessionStorage.getItem("userData");
    if (storedUserData && isMounted) {
      const parsedData = JSON.parse(storedUserData);
      setUserData(parsedData);
    }

    return () => {
      isMounted = false;
    };
  }, [showLoginModal]);

  const handleLogout = () => {
    console.log("Logout clicked");
    sessionStorage.removeItem("userData");
    Cookies.remove("userToken", {
      secure: true,
      sameSite: "Strict",
    });
    setUserData(null);
    window.location.reload(); // Add this to force a refresh
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLocationSelect = (location) => {
    // You can handle the location selection here
    console.log("Selected location:", location);
  };

  return (
    <>
      <div className="sticky top-0 bg-white z-40 w-full px-2 py-2 md:px-8 md:py-4 items-center shadow-md border-b border-gray-200">
        <div className="md:w-11/12 mx-auto flex">
          <div className="w-full xl:w-7/12 flex space-x-6 items-center">
            {/* Logo */}
            <Link to="/">
              <img
                src={Logo}
                alt="Logo"
                className="h-10 md:h-16 object-contain"
              />
            </Link>
            {/* Replace the Location Selector with LocationTracker */}
            <div className="hidden md:block">
              <LocationTracker onLocationSelect={handleLocationSelect} />
            </div>

<<<<<<< HEAD
            {/* Search Bar */}
            <div className="hidden lg:block relative w-full">
              <input
                type="search"
                placeholder="Search for services, products, brands..."
                className="w-full pl-12 pr-14 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:border-emerald-300 focus:ring-1 focus:ring-emerald-300 transition-all"
              />
              <IoSearchOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
              <button className="absolute top-1/2 -translate-y-1/2 right-2 bg-emerald-500 hover:bg-emerald-600 p-2 rounded-lg text-white transition-colors duration-200">
                <IoSearchOutline className="text-xl" />
              </button>
            </div>
          </div>

          {/* Right Section */}
          <div className="w-5/12 flex flex-row justify-end items-center gap-6">
            {/* Mobile Location */}
            <button className="md:hidden text-xl text-gray-700 hover:text-emerald-500 transition-colors">
              <CiLocationOn />
            </button>

            {/* Notifications */}
            <button className="relative text-2xl text-gray-700 hover:text-emerald-500 transition-colors">
              <MdNotificationsActive />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Auth Section */}
            {userData ? (
              <>
                <div className="hidden md:flex items-center gap-4 relative">
                  <div ref={dropdownRef} className="relative">
                    <div
                      className="flex items-center gap-2 cursor-pointer"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                      <div className="w-7 h-7 rounded-full bg-emerald-500 flex items-center justify-center text-white font-semibold">
                        {userData.name.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-gray-700 font-medium text-sm">
                        {userData.name}
                      </span>
                    </div>

                    {isDropdownOpen && (
                      <div className="absolute right-0 top-full mt-2 w-32 bg-blue-200 rounded-lg shadow-lg border border-gray-100 z-60">
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-blue-300 transition-colors duration-200"
                        >
                          <CiLogout className="text-xl text-red-500" />
                          <span>Logout</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Mobile Profile */}
                <div
                  className="md:hidden flex items-center gap-2 relative"
                  ref={dropdownRef}
                >
                  <div
                    className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white font-semibold text-sm"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    {userData.name.charAt(0).toUpperCase()}
                  </div>
                  {isDropdownOpen && (
                    <div className="absolute right-0 top-full mt-2 w-32 bg-white rounded-lg shadow-lg border border-gray-100 z-50">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                      >
                        <CiLogout className="text-xl text-red-500" />
                        <span>Logout</span>
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                {/* Desktop Login */}
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="hidden md:flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 cursor-pointer"
                >
                  <LuCircleUserRound className="text-xl" />
                  <span>Login</span>
                </button>
                {/* Mobile Login */}
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="block md:hidden text-2xl text-gray-700 hover:text-emerald-500 transition-colors"
                >
                  <LuCircleUserRound />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Mobile Search */}
        <div className="lg:hidden relative w-full mt-3">
          <input
            type="search"
            placeholder="Search for services, products, brands..."
            className="w-full pl-12 pr-14 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:border-emerald-300 focus:ring-1 focus:ring-emerald-300 transition-all"
          />
          <IoSearchOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
          <button className="absolute top-1/2 -translate-y-1/2 right-2 bg-emerald-500 hover:bg-emerald-600 p-2 rounded-lg text-white transition-colors duration-200">
            <IoSearchOutline className="text-xl" />
          </button>
        </div>
      </div>

      {/* Modals */}
      <AdminLogin
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        setShowLoginModal={setShowLoginModal}
        setIsSignupOpen={setIsSignupOpen}
        setIsForgotPasswordOpen={setIsForgotPasswordOpen}
      />
      <SignupModal
        isOpen={isSignupOpen}
        onClose={() => setIsSignupOpen(false)}
        onLoginClick={() => {
          setIsSignupOpen(false);
          setShowLoginModal(true);
        }}
        setShowLoginModal={setShowLoginModal}
      />
      <ForgotPassword
        isOpen={isForgotPasswordOpen}
        onClose={() => setIsForgotPasswordOpen(false)}
        setShowOTPModal={setShowOTPModal}
        setOtpEmail={setOtpEmail}
      />
      <OTP
        isOpen={showOTPModal}
        onClose={() => setShowOTPModal(false)}
        email={otpEmail}
        setShowResetPasswordModal={setShowResetPasswordModal}
      />
      <ResetPassword
        isOpen={showResetPasswordModal}
        onClose={() => setShowResetPasswordModal(false)}
        setShowLoginModal={setShowLoginModal}
        email={otpEmail}
      />
    </>
  );
};
=======
            {/* Modals */}
            <UserLogin
                isOpen={showLoginModal}
                onClose={() => setShowLoginModal(false)}
                setShowLoginModal={setShowLoginModal}
                setIsSignupOpen={setIsSignupOpen}
                setIsForgotPasswordOpen={setIsForgotPasswordOpen}
            />
            <SignupModal
                isOpen={isSignupOpen}
                onClose={() => setIsSignupOpen(false)}
                onLoginClick={() => {
                    setIsSignupOpen(false);
                    setShowLoginModal(true);
                }}
                setShowLoginModal={setShowLoginModal}
            />
            <ForgotPassword
                isOpen={isForgotPasswordOpen}
                onClose={() => setIsForgotPasswordOpen(false)}
                setShowOTPModal={setShowOTPModal}
                setOtpEmail={setOtpEmail}
            />
            <OTP
                isOpen={showOTPModal}
                onClose={() => setShowOTPModal(false)}
                email={otpEmail}
                setShowResetPasswordModal={setShowResetPasswordModal}
            />
            <ResetPassword
                isOpen={showResetPasswordModal}
                onClose={() => setShowResetPasswordModal(false)}
                setShowLoginModal={setShowLoginModal}
                email={otpEmail}
            />
        </>
    )
}
>>>>>>> 9eae4ae7bb07d974a5223991a9ec6e1feaa63840

export default Header;
