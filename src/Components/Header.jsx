import React, { useState, useEffect } from "react";
import Logo from "../assets/logo_01.png";
import { CiLocationOn } from "react-icons/ci";
import { IoSearchOutline } from "react-icons/io5";
import { LuCircleUserRound } from "react-icons/lu";
import { useLoginModal } from "../context/LoginContext";
import Cookies from "js-cookie";
import { useRef } from "react";
import { CiLogout } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import LocationTracker from "./LocationTracker";
import UserLogin from "../Pages/UserLogin";
import SignupModal from "../Pages/SignUp";
import ForgotPassword from "../Pages/UserLogin/ForgotPassword";
import OTP from "../Pages/UserLogin/OTP";
import ResetPassword from "../Pages/UserLogin/ResetPassword";
import LoginModal from "./User_Business_Modal";
import BusinessDetailForm from "../business/BusinessDetailForm";

const Header = () => {
  const { showLoginModal, setShowLoginModal, loginRole } = useLoginModal();
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [otpEmail, setOtpEmail] = useState("");
  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);
  const [showUserBusinessModal, setShowUserBusinessModal] = useState(false);
  const [showBusinessDetailForm, setShowBusinessDetailForm] = useState(false);

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
    sessionStorage.removeItem("userData");
    Cookies.remove("userToken", {
      secure: true,
      sameSite: "Strict",
    });
    setUserData(null);
    window.location.reload();
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const desktopDropdownRef = useRef(null);
  const mobileDropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        (desktopDropdownRef.current &&
          !desktopDropdownRef.current.contains(event.target)) ||
        (mobileDropdownRef.current &&
          !mobileDropdownRef.current.contains(event.target))
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLocationSelect = (location) => {
    console.log("Selected location:", location);
  };

  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate('/businesslist', {
        state: {
          searchQuery
        }
      });
    }
  };

  return (
    <>
      <div className="sticky top-0 bg-white z-40 w-full px-4 py-2 md:px-2 items-center shadow-md border-b border-gray-200">
        <div className="md:w-11/12 mx-auto flex">
          <div className="w-full xl:w-7/12 flex space-x-6 items-center">
            {/* Logo */}
            <Link to="/">
              <img
                src={Logo}
                alt="Logo"
                className="h-10 md:h-24 my-0 object-contain"
              />
            </Link>
            {/* Location Tracker */}
            <div className="hidden md:block">
              <LocationTracker onLocationSelect={handleLocationSelect} />
            </div>

            {/* Search Bar */}
            <div className="hidden lg:block relative w-full">
              <form onSubmit={handleSearch}>
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for services, products, brands..."
                  className="w-full pl-12 pr-14 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:border-emerald-300 focus:ring-1 focus:ring-emerald-300 transition-all"
                />
                <IoSearchOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                <button
                  type="submit"
                  className="absolute top-1/2 -translate-y-1/2 right-2 bg-emerald-500 hover:bg-emerald-600 p-2 rounded-lg text-white transition-colors duration-200"
                >
                  <IoSearchOutline className="text-xl" />
                </button>
              </form>
            </div>
          </div>

          {/* Right Section */}
          <div className="w-5/12 flex flex-row justify-end items-center gap-6">
            {/* Mobile Location */}
            <button className="md:hidden text-xl text-gray-700 hover:text-emerald-500 transition-colors">
              <LocationTracker onLocationSelect={handleLocationSelect} />
            </button>

            {/* Add business button */}
            <Link
              to={userData ? (userData.hasBusiness ? "/business-profile" : "/add-business") : "#"}
              onClick={(e) => {
                if (!userData) {
                  e.preventDefault();
                  setShowLoginModal(true);
                }
              }}
              className="hidden md:flex justify-center items-center gap-2 bg-[#ee6510] hover:bg-[#ee2314] text-white px-4 py-2 rounded-lg transition-colors duration-200"
            >
              {userData && userData.hasBusiness ? (
                <span className="text-sm font-medium">My Business Profile</span>
              ) : (
                <>+<span className="text-sm font-medium">Add Business</span></>
              )}
            </Link>

            {/* Auth Section */}
            {userData ? (
              <>
                {/* Desktop Profile */}
                <div className="hidden md:flex items-center gap-4 relative bg-white rounded-2xl px-3 py-2">
                  <div ref={desktopDropdownRef} className="relative">
                    <div
                      className="flex items-center gap-2 cursor-pointer group"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                      <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold shadow-md">
                        {userData.name.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-gray-800 font-semibold text-sm group-hover:text-emerald-600 transition">
                        {userData.name}
                      </span>
                      <svg
                        className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>

                    {isDropdownOpen && (
                      <div className="absolute right-0 top-full w-full mt-2 bg-white rounded-lg shadow-xl border border-gray-100 z-50 animate-fadeIn">
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200 rounded-md cursor-pointer"
                        >
                          <CiLogout className="text-lg text-red-500" />
                          <span className="text-sm font-medium">Logout</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Mobile Profile */}
                <div
                  className="md:hidden flex items-center gap-2 relative"
                  ref={mobileDropdownRef}
                >
                  <Link
                    to={userData.hasBusiness ? "/business-profile" : "/add-business"}
                    className="flex md:hidden items-center justify-center w-8 h-8 bg-[#ee6510] hover:bg-[#ee2314] text-white rounded-full transition-colors duration-200 pb-1"
                  >
                    {userData.hasBusiness ? "B" : "+"}
                  </Link>
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
                  onClick={() => setShowUserBusinessModal(true)}
                  className="hidden md:flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 cursor-pointer"
                >
                  <LuCircleUserRound className="text-xl" />
                  <span>Login</span>
                </button>
                {/* Mobile Login */}
                <button
                  onClick={() => setShowUserBusinessModal(true)}
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
          <form onSubmit={handleSearch}>
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for services, products, brands..."
              className="w-full pl-12 pr-14 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:border-emerald-300 focus:ring-1 focus:ring-emerald-300 transition-all"
            />
            <IoSearchOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
            <button
              type="submit"
              className="absolute top-1/2 -translate-y-1/2 right-2 bg-emerald-500 hover:bg-emerald-600 p-2 rounded-lg text-white transition-colors duration-200"
            >
              <IoSearchOutline className="text-xl" />
            </button>
          </form>
        </div>
      </div>

      {/* Modals */}
      {showUserBusinessModal && (
        <LoginModal
          isOpen={showUserBusinessModal}
          onClose={() => setShowUserBusinessModal(false)}
        />
      )}
      <UserLogin
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        setShowLoginModal={setShowLoginModal}
        setIsSignupOpen={setIsSignupOpen}
        setIsForgotPasswordOpen={setIsForgotPasswordOpen}
        setShowBusinessDetailForm={setShowBusinessDetailForm}
        setShowUserBusinessModal={setShowUserBusinessModal}
        role={loginRole}
      />
      <BusinessDetailForm
        isOpen={showBusinessDetailForm}
        onClose={() => setShowBusinessDetailForm(false)}
        setShowLoginModal={setShowLoginModal}
        setShowBusinessDetailForm={setShowBusinessDetailForm}
      />
      <SignupModal
        isOpen={isSignupOpen}
        onClose={() => setIsSignupOpen(false)}
        onLoginClick={() => {
          setIsSignupOpen(false);
          setShowLoginModal(true);
        }}
        setShowLoginModal={setShowLoginModal}
        role={loginRole}
      />
      <ForgotPassword
        isOpen={isForgotPasswordOpen}
        onClose={() => setIsForgotPasswordOpen(false)}
        setShowOTPModal={setShowOTPModal}
        setOtpEmail={setOtpEmail}
        role={loginRole}
      />
      <OTP
        isOpen={showOTPModal}
        onClose={() => setShowOTPModal(false)}
        email={otpEmail}
        setShowResetPasswordModal={setShowResetPasswordModal}
        role={loginRole}
      />
      <ResetPassword
        isOpen={showResetPasswordModal}
        onClose={() => setShowResetPasswordModal(false)}
        setShowLoginModal={setShowLoginModal}
        email={otpEmail}
        role={loginRole}
      />
    </>
  );
};

export default Header;