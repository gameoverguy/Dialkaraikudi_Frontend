import React, { useState, useEffect, useRef } from "react";
import CustomModal from "../../../Components/modal";
import axios from "axios";
import { API } from "../../../../config/config";
import { CiCircleInfo } from "react-icons/ci";

const OTP = ({
  email,
  isOpen,
  onClose,
  setShowResetPasswordModal,
  setShowLoginModal,
  role,
  isSignupFlow,
}) => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(120);
  const [errorOverall, setErrorOverall] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  // const navigate = useNavigate();
  const otpemail = sessionStorage.getItem("verificationEmail");
  const otpRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  useEffect(() => {
    // Check for business registration flow
    const isBusinessRegistration =
      sessionStorage.getItem("isBusinessRegistration") === "true";
    if (isBusinessRegistration) {
      console.log("Business registration flow detected");
    }
  }, []);

  useEffect(() => {
    if (!isOpen) {
      setOtp(["", "", "", ""]);
      setError("");
      setErrorOverall("");
      setSuccessMessage("");
    }
  }, [isOpen]);
  useEffect(() => {
    let interval;
    if (isOpen && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isOpen, timer]);

  useEffect(() => {
    if (isOpen && otpRefs[0].current) {
      setTimeout(() => otpRefs[0].current.focus(), 0);
    }
  }, [isOpen]);

  const handleChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (newOtp.every((digit) => digit !== "")) {
      setError("");
    }

    if (value && index < 3) {
      otpRefs[index + 1].current.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs[index - 1].current.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage("");
    setErrorOverall("");
    const otpValue = otp.join("");
    const isComplete = otp.every((digit) => digit !== "");

    if (!isComplete) {
      setError("Please enter all fields");
      setIsSubmitting(false);
      return;
    }

    try {
      // const otpemail = sessionStorage.getItem("verificationEmail");
      const isBusinessRegistration =
        sessionStorage.getItem("isBusinessRegistration") === "true";
      console.log(isBusinessRegistration);
      const endpoint = isBusinessRegistration
        ? `${API}/business/verifyOtpAndCreateBusiness`
        : isSignupFlow && role === "user"
        ? `${API}/user/verifyOtpAndCreateAccount`
        : role === "business"
        ? `${API}/business/verifyOtp`
        : `${API}/user/verifyotp`;
      const response = await axios.post(endpoint, {
        email: otpemail || email,
        otp: otpValue,
      });
      console.log(role);
      console.log(endpoint, response.data, "with endpoint");

      if (response.data) {
        setSuccessMessage(
          isBusinessRegistration || isSignupFlow
            ? "Account verified successfully!"
            : "OTP verified successfully!"
        );
        sessionStorage.setItem("resetPasswordOtp", otpValue);
        setTimeout(() => {
          setOtp(["", "", "", ""]);
          setError("");
          setErrorOverall("");
          onClose();
          // setShowResetPasswordModal(true);
          if (isBusinessRegistration) {
            sessionStorage.removeItem("isBusinessRegistration");
            sessionStorage.removeItem("verificationEmail");
          }

          if (isBusinessRegistration || isSignupFlow) {
            if (setShowLoginModal) {
              setShowLoginModal(true);
            }
          } else {
            if (setShowResetPasswordModal) {
              sessionStorage.setItem("resetPasswordOtp", otpValue);
              setShowResetPasswordModal(true);
            }
          }
        }, 1500);
      }
    } catch (error) {
      console.error("OTP verification failed:", error);
      setErrorOverall(
        error.response?.data?.message || "Invalid OTP. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendOTP = async () => {
    try {
      const isBusinessRegistration =
        sessionStorage.getItem("isBusinessRegistration") === "true";

      const endpoint = isBusinessRegistration
        ? `${API}/business/resendBusinessOtp`
        : isSignupFlow && role === "user"
        ? `${API}/user/resendregisterotp`
        : role === "business"
        ? `${API}/business/forgotPassword`
        : `${API}/user/forgotpassword`;
      const response = await axios.post(endpoint, {
        email: otpemail || email,
      });

      if (response.data) {
        setOtp(["", "", "", ""]);
        setError("");
        setErrorOverall("");
        setTimer(120);
        setSuccessMessage("OTP resent successfully!");
        setTimeout(() => setSuccessMessage(""), 3000);
      }
    } catch (error) {
      console.error("Failed to resend OTP:", error);
      setErrorOverall(
        error.response?.data?.message ||
          "Failed to resend OTP. Please try again."
      );
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  const handlePaste = (event) => {
    event.preventDefault();
    const pastedValue = event.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 4);

    if (pastedValue) {
      const pastedOtp = pastedValue.split("");
      const newOtp = [...otp];
      for (let i = 0; i < 4; i++) {
        if (pastedOtp[i]) {
          newOtp[i] = pastedOtp[i];
        }
      }
      setOtp(newOtp);
      const nextEmptyIndex = newOtp.findIndex((digit) => digit === "");
      if (nextEmptyIndex !== -1) {
        otpRefs[nextEmptyIndex].current.focus();
      } else {
        otpRefs[3].current.focus();
      }
    }
  };
  if (!isOpen) return null;

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
            Enter Verification Code
          </h1>
          <p className="text-gray-600 text-[11px] sm:text-xs mb-4 sm:mb-6 text-center">
            We have sent a verification code to{" "}
            <span className="font-medium">{otpemail || email}</span>
          </p>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div className="flex justify-center gap-2 sm:gap-4">
              {otp.map((data, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  value={data}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  ref={otpRefs[index]}
                  className="w-8 h-8 text-center text-md border-2 border-gray-500 rounded-lg focus:border-purple-500 focus:outline-none"
                />
              ))}
            </div>

            {/* <div className='h-3'>
                            {error && (
                                <p className="text-red-500 text-xs text-center">{error}</p>
                            )}
                        </div> */}
            <div className="h-2 mb-2">
              {successMessage && (
                <>
                  {" "}
                  <p className="flex justify-center items-center text-green-600 text-[10px] sm:text-xs">
                    <CiCircleInfo className="mr-2 text-green-600 w-3 h-3 flex-shrink-0" />
                    {successMessage}
                  </p>
                </>
              )}
              {(error || errorOverall) && (
                <>
                  <p className="flex justify-center items-center text-red-500 text-[10px] sm:text-xs">
                    <CiCircleInfo className="mr-2 text-red-600 w-3 h-3 flex-shrink-0" />
                    {error || errorOverall}
                  </p>
                </>
              )}
            </div>

            <div className="flex flex-col gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full text-[11px] sm:text-xs font-semibold py-2.5 sm:py-3 rounded-lg transition-all duration-200 transform hover:scale-[1.02] ${
                  isSubmitting
                    ? "opacity-70 cursor-not-allowed"
                    : "hover:bg-purple-700 cursor-pointer hover:shadow-md"
                } bg-purple-600 text-white`}
              >
                {isSubmitting ? "VERIFYING..." : "VERIFY CODE"}
              </button>
              <div className="text-center">
                {timer > 0 ? (
                  <p className="text-[11px] sm:text-xs text-gray-600">
                    Time Left :{" "}
                    <span className="font-medium">{formatTime(timer)}</span>
                  </p>
                ) : (
                  <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={handleResendOTP}
                    className={`text-[11px] sm:text-xs blue-link ${
                      isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    Resend Code
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </CustomModal>
    </>
  );
};

export default OTP;
