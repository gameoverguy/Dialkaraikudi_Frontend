import React, { useEffect, useState } from "react";
import FloatingInput from "../../../Components/FloatingInput";
import CustomModal from "../../../Components/modal";
import axios from "axios";
import { API } from "../../../../config/config";
import { CiCircleInfo } from "react-icons/ci";

const ForgotPassword = ({ isOpen, onClose, setShowOTPModal, setOtpEmail }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [errorOverall, setErrorOverall] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    const emailValue = value
      .replace(/\s/g, "")
      .replace(/[^a-zA-Z0-9@.]/g, "")
      .toLowerCase();
    setEmail(emailValue);

    let errorMessage = "";
    if (value.includes(" ")) {
    } else if (value !== emailValue) {
    } else if (emailValue.length > 50) {
    } else if (emailValue.includes("@")) {
      errorMessage = emailRegex.test(emailValue) ? "" : "";
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
        const response = await axios.post(`${API}/admin/forgotpassword`, {
          email: email,
        });

        if (response.data) {
          setSuccessMessage("OTP sent successfully!");
          setEmail("");
          setError("");

          // Wait for success message to be visible
          setTimeout(() => {
            // Close forgot password modal first
            onClose();
            
            // Open OTP modal after another short delay
            setTimeout(() => {
              if (setOtpEmail && setShowOTPModal) {
                setOtpEmail(email);
                setShowOTPModal(true);
              }
            }, 300);
          }, 1000); // Give time for success message to be visible
        }
      } catch (error) {
        console.error("Failed to send OTP:", error);
        setErrorOverall(
          error.response?.data?.message ||
            "Failed to send OTP. Please try again."
        );
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <CustomModal isOpen={isOpen} onClose={onClose} classname="w-full max-w-md" title={"FORGOT PASSWORD "} titleAlignment="center">
      <div className="p-1 sm:pt-0 sm:p-2 text-center">
        {/* <h1 className="text-lg font-bold text-gray-800 mb-4">
          FORGOT PASSWORD
        </h1> */}
        <p className="text-gray-600 text-xs mb-6">
          Enter your email address to receive OTP.
        </p>
        <form onSubmit={handleSubmit} className="">
          <FloatingInput
            type="text"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={handleChange}
            error={error}
            maxLength={50}
          />
          <div className="h-2 mb-2">
            {successMessage && (
              <>
                {/* // <div className="flex items-center bg-green-50 border border-green-200 rounded-md animate-fade-in"> */}
                <p className="flex text-green-600 text-[10px] items-center justify-center sm:text-xs">
                  <CiCircleInfo className=" mr-2 text-green-600 w-3 h-3 flex-shrink-0" />
                  {successMessage}
                </p>
              </>
            )}
            {errorOverall && (
              // <div className="flex items-center bg-red-50 border border-red-200 rounded-md animate-fade-in">
              <>
                <p className="flex text-red-500 text-[10px] items-center justify-center sm:text-xs">
                  <CiCircleInfo className="mr-2 text-red-600 w-3 h-3 flex-shrink-0" />
                  {errorOverall}
                </p>
              </>
            )}
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full cursor-pointer text-xs bg-purple-600 text-white py-3 rounded-lg transition-all duration-200 transform hover:scale-[1.02] ${
              isSubmitting
                ? "opacity-70 cursor-not-allowed"
                : "hover:bg-purple-700"
            }`}
          >
            {isSubmitting ? "SENDING OTP..." : "SEND OTP"}
          </button>
        </form>
      </div>
    </CustomModal>
  );
};

export default ForgotPassword;
