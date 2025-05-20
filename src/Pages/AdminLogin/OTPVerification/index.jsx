import React, { useState, useRef, useEffect } from "react";
import CustomModal from "../../../Components/modal";
import FloatingInput from "../../../Components/FloatingInput";
import axios from "axios";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { API } from "../../../../config/config";
import { CiCircleInfo } from "react-icons/ci";

const OTPVerification = ({ isOpen, onClose, email, onVerificationSuccess }) => {
  const [otp, setOtp] = useState(new Array(4).fill(""));
  const otpRefs = useRef([...Array(4)].map(() => React.createRef()));
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [step, setStep] = useState("otp");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [timer, setTimer] = useState(60);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [otpSuccessMessage, setOtpSuccessMessage] = useState("");
  const [resetSuccessMessage, setResetSuccessMessage] = useState("");

  useEffect(() => {
    if (isOpen) {
      setOtp(new Array(4).fill(""));
      setNewPassword("");
      setConfirmPassword("");
      setError("");
      setOtpSuccessMessage(""); // This is clearing the message
      setResetSuccessMessage("");
      setStep("otp");
      setShowNewPassword(false);
      setShowConfirmPassword(false);
      setTimer(60);
      // Focus on the first OTP input when modal opens
      setTimeout(() => {
        if (otpRefs.current[0]) {
          otpRefs.current[0].focus();
        }
      }, 100);
    }
  }, [isOpen]);

  const handleChange = (index, value) => {
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value !== "" && index < 3) {
      otpRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && index > 0 && otp[index] === "") {
      otpRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 4);
    const newOtp = [...otp];

    pastedData.split("").forEach((char, index) => {
      if (index < 4 && !isNaN(char)) {
        newOtp[index] = char;
      }
    });

    setOtp(newOtp);
    if (newOtp[3]) {
      otpRefs.current[3].focus();
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    const otpValue = otp.join("");
    if (!otpValue || otpValue.length !== 4) {
      setError("Please enter complete OTP");
      setIsSubmitting(false);
      return;
    }
    setError("");
    setIsSubmitting(true);
    setOtpSuccessMessage("");
    try {
      const response = await axios.post(`${API}/admin/verifyotp`, {
        email: email,
        otp: otpValue,
      });

      if (response.data) {
        setError("");
        setOtpSuccessMessage("OTP verified successfully!");

        setTimeout(() => {
          setStep("password");
        }, 1500); // Show success message for 1.5 seconds
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid OTP");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    if (!newPassword || !confirmPassword) {
      setError("Please fill all fields");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setError("");
    setIsSubmitting(true);
    setResetSuccessMessage("");

    try {
      const response = await axios.post(`${API}/admin/resetpassword`, {
        email: email,
        newPassword: newPassword,
        confirmPassword: confirmPassword,
      });

      if (response.data) {
        setResetSuccessMessage("Password reset successful!");
        setTimeout(() => {
          onClose();
          onVerificationSuccess?.();
        }, 1000);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Password reset failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendOTP = async () => {
    try {
      const response = await axios.post(`${API}/admin/forgotpassword`, {
        email: email,
      });
      if (response.data) {
        setOtpSuccessMessage("OTP resent successfully!");
        setTimer(30);
        setOtp(new Array(4).fill(""));
        setError("");
        // Add a timeout to clear the success message after 3 seconds
        setTimeout(() => {
          setOtpSuccessMessage("");
        }, 3000);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to resend OTP");
    }
  };
  useEffect(() => {
    let interval;
    if (isOpen && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer, isOpen]);
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };
  return (
    <CustomModal isOpen={isOpen} onClose={onClose} classname="w-full max-w-md">
      <div className=" text-center p-2">
        <h2 className="text-lg font-bold mb-4">
          {step === "otp" ? "Enter Verification Code" : "Reset Password"}
        </h2>
        <p className="text-gray-600 text-xs mb-4">
          We have sent a verification code to{" "}
          <span className="font-medium">{email}</span>
        </p>

        {step === "otp" ? (
          <form onSubmit={handleOtpSubmit} className="space-y-3">
            <div className="flex justify-center gap-4">
              {otp.map((data, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  value={data}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={index === 0 ? handlePaste : undefined}
                  ref={(el) => (otpRefs.current[index] = el)}
                  className="w-8 h-8 text-center text-md border-2 border-gray-500 rounded-lg focus:border-purple-500 focus:outline-none"
                />
              ))}
            </div>
            {/* // In the render section, make sure the success message is displayed: */}
            <div className="h-2 mb-3">
              {otpSuccessMessage && (
                <p className="flex justify-center text-[10px] items-center text-green-600 text-xs">
                  <CiCircleInfo className="mr-2 w-4 h-4 flex-shrink-0" />
                  {otpSuccessMessage}
                </p>
              )}
              {error && (
                <p className="flex justify-center text-[10px] items-center text-red-500 text-xs">
                  <CiCircleInfo className="mr-2 w-4 h-4 flex-shrink-0" />
                  {error}
                </p>
              )}
            </div>
            <button
              type="submit"
              disabled={isSubmitting || otp.join("").length !== 4}
              className={`w-full cursor-pointer text-xs font-semibold bg-purple-600 text-white py-3 rounded-lg transition-all duration-200 transform hover:scale-[1.02] ${
                isSubmitting || otp.join("").length !== 4
                  ? "opacity-70 cursor-not-allowed"
                  : "hover:bg-purple-700"
              }`}
            >
              {isSubmitting ? "VERIFYING..." : "VERIFY OTP"}
            </button>
            <div className="text-center">
              {timer > 0 ? (
                <p className="text-xs text-gray-600">
                  Time Left :{" "}
                  <span className="font-medium">{formatTime(timer)}</span>
                </p>
              ) : (
                <button
                  type="button"
                  onClick={handleResendOTP}
                  className="text-xs blue-link"
                >
                  Resend Code
                </button>
              )}
            </div>
          </form>
        ) : (
          <form onSubmit={handlePasswordReset} className="">
            <div className="relative">
              <FloatingInput
                type={showNewPassword ? "text" : "password"}
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-6 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showNewPassword ? (
                  <AiOutlineEye className="w-5 h-5" />
                ) : (
                  <AiOutlineEyeInvisible className="w-5 h-5" />
                )}
              </button>
            </div>
            <div className="relative">
              <FloatingInput
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-6 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showConfirmPassword ? (
                  <AiOutlineEye className="w-5 h-5" />
                ) : (
                  <AiOutlineEyeInvisible className="w-5 h-5" />
                )}
              </button>
            </div>
            <div className="h-2 mb-2">
              {resetSuccessMessage && (
                <p className="flex text-green-600 text-[10px] items-center justify-center sm:text-xs">
                  <CiCircleInfo className="mr-2 text-green-600 w-3 h-3 flex-shrink-0" />
                  {resetSuccessMessage}
                </p>
              )}
              {error && (
                <p className="flex text-red-500 text-[10px] items-center justify-center sm:text-xs">
                  <CiCircleInfo className="mr-2 text-red-600 w-3 h-3 flex-shrink-0" />
                  {error}
                </p>
              )}
            </div>
            <button
              type="submit"
              disabled={isSubmitting || !newPassword || !confirmPassword}
              className={`w-full cursor-pointer text-sm font-semibold bg-purple-600 text-white py-3 rounded-lg transition-all duration-200 transform hover:scale-[1.02] ${
                isSubmitting || !newPassword || !confirmPassword
                  ? "opacity-70 cursor-not-allowed"
                  : "hover:bg-purple-700"
              }`}
            >
              {isSubmitting && !error ? "RESETTING..." : "RESET PASSWORD"}
            </button>
          </form>
        )}
      </div>
    </CustomModal>
  );
};

export default OTPVerification;
