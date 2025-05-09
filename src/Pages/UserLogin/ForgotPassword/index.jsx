import React, { useEffect, useState } from "react";
import FloatingInput from "../../../Components/FloatingInput";
import CustomModal from "../../../Components/modal";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API } from "../../../../config/config";

const ForgotPassword = ({ isOpen, onClose, setShowOTPModal, setOtpEmail, role }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [errorOverall, setErrorOverall] = useState("");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [isSubmitting, setIsSubmitting] = useState(false);
  useEffect(() => {
    if (!isOpen) {
      setEmail("");
      setError("");
      setErrorOverall("");
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
    const errorMessage = !email
      ? "Email is required"
      : email.length < 10
        ? "Email must be at least 10 characters"
        : email.length > 50
          ? "Email must not exceed 50 characters"
          : !emailRegex.test(email)
            ? "Please enter a valid email"
            : "";

    setErrorOverall("");

    if (errorMessage) {
      setError(errorMessage);
      setIsSubmitting(false);
    } else {
      try {
        const endpoint = role === 'business' ? `${API}/business/forgotPassword` : `${API}/user/forgotpassword`;
        const response = await axios.post(
          endpoint,
          {
            email: email,
          }
        );
console.log(role);
console.log(response.data);


        if (response.data) {
          console.log("Reset password for:", email);
          toast.success("OTP sent successfully!", {
            position: "top-right",
            autoClose: 3000,
          });
          if (setOtpEmail && setShowOTPModal) {
            setOtpEmail(email);
            setShowOTPModal(true);
          }

          setEmail("");
          setError("");
          onClose();
        }
      } catch (error) {
        console.error("Failed to send reset link:", error);
        toast.error("Failed to send reset link");
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
        isOpen={isOpen}
        onClose={onClose}
        classname="w-full max-w-md"
      >
        <div className="p-2">
          <h1 className="text-lg font-bold text-gray-800 mb-4">
            Forgot Password
          </h1>
          <p className="text-gray-600 text-xs mb-4">
            Enter your email address to reset your password.
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <FloatingInput
              type="email"
              placeholder="Email Address"
              name="email"
              value={email}
              onChange={handleChange}
              error={error}
              maxLength={50}
            />
            <div className="h-2 mb-2">
              {errorOverall && (
                <p className="text-red-500 text-xs text-center">
                  {errorOverall}
                </p>
              )}
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full cursor-pointer text-xs bg-purple-600 text-white py-3 rounded-lg transition-all duration-200 transform hover:scale-[1.02] ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-purple-700'
                }`}
            >
              {isSubmitting ? 'SENDING OTP...' : 'SEND OTP'}
            </button>
          </form>
        </div>
      </CustomModal>
      <ToastContainer
        position="top-right"
        autoClose={7000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        style={{ zIndex: 9999 }}
      />
    </>
  );
};

export default ForgotPassword;
