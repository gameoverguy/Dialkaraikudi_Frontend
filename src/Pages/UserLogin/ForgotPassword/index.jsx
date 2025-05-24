import React, { useEffect, useState } from "react";
import FloatingInput from "../../../Components/FloatingInput";
import CustomModal from "../../../Components/modal";
import axios from "axios";
import { API } from "../../../../config/config";
import { CiCircleInfo } from "react-icons/ci";

const ForgotPassword = ({
  isOpen,
  onClose,
  setShowOTPModal,
  setOtpEmail,
  role,
}) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [errorOverall, setErrorOverall] = useState("");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setEmail("");
      setError("");
      setErrorOverall("");
      setSuccessMessage("");
    }
  }, [isOpen]);
  const handleChange = (e) => {
    const value = e.target.value;
    const cleanedEmail = value
      .replace(/\s/g, "")
      .replace(/[^a-zA-Z0-9@.]/g, "")
      .toLowerCase();

    setEmail(cleanedEmail);
    let errorMessage = "";
    if (value.includes(" ")) {
      errorMessage = "Spaces are not allowed";
    } else if (value !== cleanedEmail) {
      errorMessage = "Only letters, numbers, @, and . are allowed";
    } else if (cleanedEmail.length > 50) {
      errorMessage = "Email must not exceed 50 characters";
    } else if (!cleanedEmail.includes("@")) {
      errorMessage = "Email must contain @";
    }
    setError(errorMessage);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage("");
    setErrorOverall("");
    const errorMessage = !email
      ? "Email is required"
      : email.length < 10
      ? "Email must be at least 10 characters"
      : email.length > 50
      ? "Email must not exceed 50 characters"
      : !emailRegex.test(email)
      ? "Please enter a valid email address"
      : "";

    if (errorMessage) {
      setError(errorMessage);
      setIsSubmitting(false);
    } else {
      try {
        const endpoint =
          role === "business"
            ? `${API}/business/forgotPassword`
            : `${API}/user/forgotpassword`;
        const response = await axios.post(endpoint, {
          email: email,
        });
        console.log(endpoint, "endpoint is");

        if (response.data) {
          setSuccessMessage("OTP sent successfully!");
          setTimeout(() => {
            if (setOtpEmail && setShowOTPModal) {
              setOtpEmail(email);
              setShowOTPModal(true);
            }
            setEmail("");
            setError("");
            onClose();
          }, 1500);
        }
      } catch (error) {
        console.error("Failed to send reset link:", error);
        setErrorOverall(
          error.response?.data?.message ||
            "Failed to send reset link. Please try again."
        );
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <>
      <CustomModal
        title={" "}
        isOpen={isOpen}
        onClose={onClose}
        classname="w-[95%] sm:w-full max-w-md mx-auto"
      >
        <div className="p-1 sm:p-2">
          <h1 className="text-base sm:text-lg font-bold text-gray-800 mb-3 sm:mb-4 text-center">
            FORGOT PASSWORD
          </h1>
          <p className="text-gray-600 text-[11px] sm:text-xs mb-4 sm:mb-6 text-center">
            Enter your email address to reset your password.
          </p>
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <FloatingInput
              type="text"
              placeholder="Email Address"
              name="email"
              value={email}
              onChange={handleChange}
              error={error}
              maxLength={50}
              className="text-sm sm:text-base"
            />
            <div className="h-2 mb-2">
              {successMessage && (
                <>
                  <p className="flex justify-center items-center text-green-600 text-[10px] sm:text-xs">
                    <CiCircleInfo className="mr-2 text-green-600 w-3 h-3 flex-shrink-0" />
                    {successMessage}
                  </p>
                </>
              )}
              {errorOverall && (
                <>
                  <p className="flex justify-center items-center text-red-500 text-[10px] sm:text-xs max-w-full break-words">
                    <CiCircleInfo className="mr-2 text-red-600 w-3 h-3 flex-shrink-0" />
                    {errorOverall}
                  </p>
                </>
              )}
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full text-[11px] sm:text-xs font-semibold py-2.5 sm:py-3 rounded-lg transition-all duration-200 transform hover:scale-[1.02] ${
                isSubmitting
                  ? "opacity-70 cursor-not-allowed"
                  : "hover:bg-purple-700 cursor-pointer hover:shadow-md"
              } bg-purple-600 text-white`}
            >
              {isSubmitting ? "SENDING OTP..." : "SEND OTP"}
            </button>
          </form>
        </div>
      </CustomModal>
    </>
  );
};

export default ForgotPassword;
