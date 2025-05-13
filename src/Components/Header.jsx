import React, { useState, useEffect } from "react";
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
  console.log(businessData?.user_id);

  useEffect(() => {
    let isMounted = true;

    const storedUserData = sessionStorage.getItem("userData");
    const storedBusinessData = sessionStorage.getItem("businessData");

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
    sessionStorage.removeItem("userData");
    sessionStorage.removeItem("businessData");
    sessionStorage.removeItem("adminData");
    Cookies.remove("userToken");
    Cookies.remove("businessToken");
    Cookies.remove("adminToken");

    setUserData(null);
    setBusinessData(null);
    navigate("/");
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

  return (
    <>
      <div className="sticky top-0 bg-white z-40 w-full px-4 py-2 md:px-0 md:py-0 items-center shadow-md border-gray-200">
        <div className="md:w-11/12 mx-auto flex justify-between items-center">
          <div className="flex space-x-6 items-center">
            <Link to="/">
              <img
                src={Logo}
                alt="Logo"
                className="h-10 md:h-18 my-0 object-contain"
              />
            </Link>
            <div className="hidden md:block">
              <LocationTracker onLocationSelect={handleLocationSelect} />
            </div>
            <div className="hidden lg:block relative w-full">
              <form onSubmit={handleSearch}>
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for services, products, brands..."
                  className="w-full pl-3 pr-14 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:border-emerald-300 focus:ring-1 focus:ring-emerald-300 transition-all"
                />
                <button
                  type="submit"
                  className="absolute top-1/2 -translate-y-1/2 right-2 bg-emerald-500 hover:bg-emerald-600 p-2 rounded-lg text-white transition-colors duration-200 cursor-pointer"
                >
                  <IoSearchOutline className="text-lg" />
                </button>
              </form>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button className="md:hidden text-xl text-gray-700 hover:text-emerald-500 transition-colors">
              <span>
                <LocationTracker onLocationSelect={handleLocationSelect} />
              </span>
            </button>

            {userData || businessData ? (
              <div className="hidden md:flex items-center gap-4">
                {businessData?.user_id && (
                  <Link
                    to={`/vendorpanel/${businessData.user_id}`}
                    className="text-gray-700 hover:text-emerald-600 transition-colors duration-200 text-sm font-medium"
                  >
                    Dashboard
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-gray-700 hover:text-red-500 transition-colors duration-200 text-sm font-medium"
                >
                  <CiLogout className="text-lg" />
                  Logout
                </button>
                <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold shadow-md">
                  {(businessData?.businessName || userData?.name || "U")
                    .charAt(0)
                    .toUpperCase()}
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
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-700 hover:text-emerald-500 transition-colors"
              >
                <svg
                  className="w-6 h-6 fill-current"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {isMobileMenuOpen ? (
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829z"
                    />
                  ) : (
                    <path
                      fillRule="evenodd"
                      d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                    />
                  )}
                </svg>
              </button>
            </div>
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