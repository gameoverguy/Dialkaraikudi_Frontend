import React, { useState, useEffect } from "react";
import FloatingInput from "../../../Components/FloatingInput";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import CustomModal from "../../../Components/modal";
import axios from "axios";
import { API } from "../../../../config/config";
import { CiCircleInfo } from "react-icons/ci";

const ResetPassword = ({
  isOpen,
  onClose,
  setShowLoginModal,
  email,
  role,
  otpValue,
}) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [newPasswordError, setNewPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  useEffect(() => {
    if (!isOpen) {
      setNewPassword("");
      setConfirmPassword("");
      setError("");
      setSuccessMessage("");
      setNewPasswordError("");
      setConfirmPasswordError("");
    }
  }, [isOpen]);
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    if (value.includes(" ")) {
      setNewPasswordError("New password cannot contain spaces");
      return;
    }
    if (value.length > 20) {
      setNewPasswordError("Password must not exceed 20 characters");
      return;
    }
    setNewPassword(value);
    setNewPasswordError("");
    if (confirmPassword && value !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
    } else {
      setConfirmPasswordError("");
    }
  };
  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    if (value.includes(" ")) {
      setConfirmPasswordError("Confirm password cannot contain spaces");
      return;
    }
    setConfirmPassword(value);
    if (newPassword !== value) {
      setConfirmPasswordError("Passwords do not match");
    } else {
      setConfirmPasswordError("");
    }
  };
  const isFormValid = () => {
    return (
      newPassword &&
      confirmPassword &&
      newPassword.length >= 8 &&
      newPassword === confirmPassword &&
      !newPasswordError &&
      !confirmPasswordError
    );
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage("");
    setError("");
    const storedOtp = sessionStorage.getItem("resetPasswordOtp");
    if (!newPassword) {
      setNewPasswordError("New password is required");
      setIsSubmitting(false);
      return;
    }
    if (!confirmPassword) {
      setConfirmPasswordError("Confirm password is required");
      setIsSubmitting(false);
      return;
    }
    if (newPassword.length < 8) {
      setNewPasswordError("Password must be at least 8 characters");
      setIsSubmitting(false);
      return;
    }

    try {
      const endpoint =
        role === "business"
          ? `${API}/business/resetPassword`
          : `${API}/user/resetpassword`;
      const payload =
        role === "business"
          ? {
              email: email,
              otp: storedOtp,
              newPassword: newPassword,
              confirmPassword: confirmPassword,
            }
          : {
              email: email,
              newPassword: newPassword,
              confirmPassword: confirmPassword,
            };

      const response = await axios.post(endpoint, payload);

      if (response.data) {
        setSuccessMessage("Password reset successful! Redirecting to login...");
        console.log("Password reset successful!");
        sessionStorage.removeItem("resetPasswordOtp");

        setTimeout(() => {
          setNewPassword("");
          setConfirmPassword("");
          setNewPasswordError("");
          setConfirmPasswordError("");
          onClose();
          setShowLoginModal(true);
        }, 1500);
      }
    } catch (error) {
      console.error("Password reset failed:", error);
      setError(
        error.response?.data?.message ||
          "Password reset failed. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };
  if (!isOpen) return null;

  return (
    <>
      <CustomModal
        isOpen={isOpen}
        onClose={onClose}
        title=" "
        classname="w-full max-w-md"
      >
        <div className="p-1 sm:p-2">
          <h1 className="text-lg text-center font-bold text-gray-800 mb-4">
            RESET PASSWORD
          </h1>
          <p className="text-gray-600 text-center text-xs mb-6">
            Please enter your new password.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="relative">
              <FloatingInput
                type={showPassword ? "text" : "password"}
                placeholder="New Password"
                name="newPassword"
                value={newPassword}
                onChange={handlePasswordChange}
                // required
                // icon={<RiLockPasswordLine className="w-5 h-5" />}
                // iconPosition="left"
                error={
                  newPasswordError ||
                  (error && newPassword.length === 0
                    ? "New password is required"
                    : "")
                }
                maxLength={20}
              />
              {newPassword && (
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-6 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <AiOutlineEye className="w-5 h-5" />
                  ) : (
                    <AiOutlineEyeInvisible className="w-5 h-5" />
                  )}
                </button>
              )}
            </div>

            <div className="relative">
              <FloatingInput
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                // required
                // icon={<RiLockPasswordLine className="w-5 h-5" />}
                // iconPosition="left"
                error={
                  confirmPasswordError ||
                  (error && confirmPassword.length === 0
                    ? "Confirm password is required"
                    : "")
                }
                maxLength={20}
                disabled={!newPassword}
              />
              {confirmPassword && (
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
              )}
            </div>
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
              {error && (
                <>
                  <p className="flex justify-center items-center text-red-500 text-[10px] sm:text-xs">
                    <CiCircleInfo className="mr-2 text-red-600 w-3 h-3 flex-shrink-0" />
                    {error || errorOverall}
                  </p>
                </>
              )}
            </div>

            <button
              type="submit"
              disabled={!isFormValid() || isSubmitting}
              className={`w-full text-xs py-3 rounded-lg transition-all duration-200 transform hover:scale-[1.02] ${
                isFormValid() && !isSubmitting
                  ? "bg-purple-600 hover:bg-purple-700 text-white"
                  : "bg-gray-300 cursor-not-allowed text-gray-500"
              }`}
            >
              {isSubmitting ? "RESETTING PASSWORD..." : "RESET PASSWORD"}
            </button>
          </form>
        </div>
      </CustomModal>
    </>
  );
};

export default ResetPassword;
