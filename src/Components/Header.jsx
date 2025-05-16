import React, { useState, useEffect, useRef } from "react";
import Logo from "../assets/logo_01.png";
import { CiLocationOn } from "react-icons/ci";
import { IoSearchOutline } from "react-icons/io5";
import { LuCircleUserRound } from "react-icons/lu";
import { useLoginModal } from "../context/LoginContext";
import Cookies from "js-cookie";
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
import axios from "axios";
import { API } from "../../config/config";
import { AiOutlineHeart } from "react-icons/ai";

const Header = () => {
  const { showLoginModal, setShowLoginModal, loginRole } = useLoginModal();
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [businessData, setBusinessData] = useState(null);
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [otpEmail, setOtpEmail] = useState("");
  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);
  const [showUserBusinessModal, setShowUserBusinessModal] = useState(false);
  const [showBusinessDetailForm, setShowBusinessDetailForm] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    const storedUserData = localStorage.getItem("userData");
    const storedBusinessData = localStorage.getItem("businessData");

    console.log(storedUserData, storedBusinessData);

    if (storedUserData && isMounted) {
      const parsedData = JSON.parse(storedUserData);
      setUserData(parsedData);
    }

    if (storedBusinessData && isMounted) {
      const parsedData = JSON.parse(storedBusinessData);
      setBusinessData(parsedData);
    }

    return () => {
      isMounted = false;
    };
  }, [showLoginModal]);

  const handleLogout = () => {
    const clearAuthentication = async () => {
      try {
        const response = await axios.post(`${API}/authentication/logout`, {
          withCredentials: true, // needed to send cookies
        });

        console.log(response.data);

        if (response.data.success) {
          localStorage.removeItem("userData");
          localStorage.removeItem("businessData");
          sessionStorage.removeItem("adminData");
          setUserData(null);
          setBusinessData(null);
          navigate("/");
        }
      } catch (error) {
        console.log(error);
      }
    };

    clearAuthentication();
  };

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate("/businesslist", { state: { searchQuery } });
    }
  };

  const handleLocationSelect = (location) => {
    console.log("Selected location:", location);
  };

  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <div className="sticky top-0 bg-white z-40 w-full px-4 py-2 md:px-0 md:py-0 items-center shadow-md border-gray-200">
        <div className="px-4 py-3 md:w-11/12 mx-auto flex justify-between items-center">
          <div className="flex space-x-6 items-center">
            <Link to="/">
              <img
                src={Logo}
                alt="Logo"
                className="h-10 md:h-12 lg:h-14 my-0 object-contain"
              />
            </Link>
            {/* <div className="hidden md:block">
              <LocationTracker onLocationSelect={handleLocationSelect} />
            </div> */}
          </div>
          <div className="hidden md:block relative w-6/12 xl:w-4/12">
            <form onSubmit={handleSearch}>
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for services, products, brands..."
                className="w-full md:text-sm xl:text-base pl-3 pr-14 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:border-emerald-300 focus:ring-1 focus:ring-emerald-300 transition-all"
              />
              <button
                type="submit"
                className="absolute top-1/2 -translate-y-1/2 right-1 bg-emerald-500 hover:bg-emerald-600 p-2 rounded-lg text-white transition-colors duration-200 cursor-pointer"
              >
                <IoSearchOutline className="" />
              </button>
            </form>
          </div>

          <div className="flex items-center gap-6">
            {/* <button className="md:hidden text-xl text-gray-700 hover:text-emerald-500 transition-colors">
              <span>
                <LocationTracker onLocationSelect={handleLocationSelect} />
              </span>
            </button> */}

            {userData || businessData ? (
              <div className=" md:flex items-center gap-4">
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold shadow-md">
                      {(businessData?.name || userData?.name || "U")
                        .charAt(0)
                        .toUpperCase()}
                    </div>
                    <svg
                      className={`w-4 h-4 text-gray-600 transition-transform ${
                        showDropdown ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {showDropdown && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50">
                      {businessData?.user_id ? (
                        <Link
                          to={`/vendorpanel/${businessData.user_id}`}
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-emerald-600 transition-colors duration-200"
                          onClick={() => setShowDropdown(false)}
                        >
                          Dashboard
                        </Link>
                      ) : (
                        <>
                          <Link
                            to="/profile"
                            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-emerald-600 transition-colors duration-200"
                            onClick={() => setShowDropdown(false)}
                          >
                            <span className="flex items-center gap-2">
                              <LuCircleUserRound className="text-lg" />
                              Edit Profile
                            </span>
                          </Link>
                          <Link
                            to="/favorites"
                            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-emerald-600 transition-colors duration-200"
                            onClick={() => setShowDropdown(false)}
                          >
                            <span className="flex items-center gap-2">
                              <AiOutlineHeart className="text-lg" />
                              Favorites
                            </span>
                          </Link>
                        </>
                      )}
                      <button
                        onClick={() => {
                          handleLogout();
                          setShowDropdown(false);
                        }}
                        className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-red-500 transition-colors duration-200 cursor-pointer"
                      >
                        <span className="flex items-center gap-2">
                          <CiLogout className="text-lg" />
                          Logout
                        </span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <button
                onClick={() => setShowUserBusinessModal(true)}
                className="hidden md:flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 cursor-pointer"
              >
                <LuCircleUserRound className="text-xl" />
                <span>Login / Sign Up</span>
              </button>
            )}

            {/* Mobile Menu Button */}
            {userData || businessData ? (
              ""
            ) : (
              <div className="md:hidden">
                <button
                  onClick={() => setShowUserBusinessModal(true)}
                  className="text-gray-700 hover:text-emerald-500 transition-colors"
                >
                  <LuCircleUserRound className="text-3xl" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden relative w-full md:w-11/12 mx-auto mt-3">
          <form onSubmit={handleSearch}>
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for services, products, brands..."
              className="w-full pl-2 pr-10 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:border-emerald-300 focus:ring-1 focus:ring-emerald-300 transition-all text-sm"
            />
            <button
              type="submit"
              className="absolute top-1/2 -translate-y-1/2 right-1 md:right-1 bg-emerald-500 hover:bg-emerald-600 p-2 rounded-lg text-white transition-colors duration-200"
            >
              <IoSearchOutline className="text-base" />
            </button>
          </form>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full right-0 left-0 bg-white shadow-md border-b border-gray-200 z-50">
            <div className="px-4 py-3">
              {businessData?.user_id && (
                <Link
                  to={`/vendorpanel/${businessData.user_id}`}
                  className="block py-2 text-gray-700 hover:text-emerald-600 transition-colors duration-200"
                >
                  Dashboard
                </Link>
              )}
              {userData || businessData ? (
                <button
                  onClick={handleLogout}
                  className="block py-2 text-gray-700 hover:text-red-500 transition-colors duration-200"
                >
                  Logout
                </button>
              ) : (
                <button
                  onClick={() => setShowUserBusinessModal(true)}
                  className="block py-2 text-gray-700 hover:text-emerald-500 transition-colors duration-200"
                >
                  Login / Sign Up
                </button>
              )}
            </div>
          </div>
        )}
      </div>

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
