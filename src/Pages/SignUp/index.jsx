import React, { useEffect, useState } from "react";
import FloatingInput from "../../Components/FloatingInput";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import CustomModal from "../../Components/modal";
import axios from "axios";
import { API } from "../../../config/config";
import { CiCircleInfo } from "react-icons/ci";
import OTP from "../UserLogin/OTP";

const SignupModal = ({
  isOpen,
  onClose,
  onLoginClick,
  setShowLoginModal,
  setOtpEmail,
  setShowOTPModal,
  showOTPModal,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });
  const [errorOverall, setErrorOverall] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  // const [showOTPModal, setShowOTPModal] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setFormData({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
      });
      setErrors({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
      });
      setShowPassword({ password: false, confirmPassword: false });
      setSuccessMessage("");
      setErrorOverall("");
    }
  }, [isOpen]);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let errorMessage = "";

    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
      return;
    }
    switch (name) {
      case "name":
        const nameValue = value
          .replace(/[^a-zA-Z\s]/g, "")
          .replace(/\s+/g, " ")
          .trim();
        setFormData((prev) => ({ ...prev, [name]: nameValue }));
        if (value !== nameValue) {
        } else if (nameValue.length > 50) {
        }
        break;

      case "email":
        const emailValue = value.replace(/[^a-zA-Z0-9@.]/g, "").toLowerCase();
        setFormData((prev) => ({ ...prev, [name]: emailValue }));
        if (value !== emailValue) {
        } else if (emailValue.length > 50) {
        } else if (emailValue.includes("@")) {
        }
        break;

      case "phone":
        const phoneValue = value.replace(/[^0-9]/g, "");
        // Check if first digit is between 6-9
        if (
          phoneValue.length > 0 &&
          !["6", "7", "8", "9"].includes(phoneValue[0])
        ) {
          setFormData((prev) => ({ ...prev, [name]: prev.phone }));
          break;
        }
        const validPhoneValue = phoneValue.slice(0, 10);
        setFormData((prev) => ({ ...prev, [name]: validPhoneValue }));

        if (validPhoneValue.length > 0 && validPhoneValue.length !== 10) {
        }
        break;

      case "password":
      case "confirmPassword":
        const passwordValue = value.replace(/[^a-zA-Z0-9@$!%*?&]/g, "");
        setFormData((prev) => ({ ...prev, [name]: passwordValue }));
        if (value !== passwordValue) {
        } else if (passwordValue.length > 20) {
        }
        if (name === "confirmPassword" && passwordValue !== formData.password) {
          errorMessage = "Passwords do not match";
        }
        break;

      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: errorMessage }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage("");
    setErrorOverall("");
    const newErrors = {
      name: !formData.name
        ? "Name is required"
        : formData.name.length < 3
        ? "Name must be at least 3 characters"
        : "",
      email: !formData.email
        ? "Email is required"
        : formData.email.length < 10
        ? "Email must be at least 10 characters"
        : !emailRegex.test(formData.email)
        ? "Please enter a valid email address"
        : "",
      password: !formData.password
        ? "Password is required"
        : formData.password.length < 8
        ? "Password must be at least 8 characters"
        : "",
      confirmPassword: !formData.confirmPassword
        ? "Please confirm your password"
        : formData.password !== formData.confirmPassword
        ? "Passwords do not match"
        : "",
      phone: !formData.phone
        ? "Phone number is required"
        : formData.phone.length !== 10
        ? "Phone number must be 10 digits"
        : "",
      acceptTerms: !formData.acceptTerms
        ? "You must accept the terms and conditions"
        : "",
    };

    setErrors(newErrors);
    if (!Object.values(newErrors).some((error) => error !== "")) {
      try {
        const response = await axios.post(`${API}/user/signup`, {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
        });

        if (response.data) {
          setSuccessMessage(
            "Registration successful! Please verify your email."
          );
          console.log("Registration successful:", response.data);
          localStorage.setItem("tempEmail", formData.email);
          setOtpEmail(formData.email);
          setTimeout(() => {
            onClose();
            setShowOTPModal(true);
          }, 1500);
        }
      } catch (error) {
        console.error("Registration failed:", error);
        setErrorOverall(
          error.response?.data?.message ||
            "Registration failed. Please try again."
        );
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const handleLoginClick = () => {
    onClose();
    if (setShowLoginModal) {
      setShowLoginModal(true);
    }
    if (onLoginClick) {
      onLoginClick();
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
            REGISTER
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
              <FloatingInput
                type="text"
                placeholder="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
                maxLength={50}
                className="text-sm sm:text-base"
              />

              <FloatingInput
                type="text"
                placeholder="Email Address"
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                maxLength={50}
                className="text-sm sm:text-base"
              />

              <FloatingInput
                type="tel"
                placeholder="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                error={errors.phone}
                maxLength={10}
                className="text-sm sm:text-base"
              />

              <div className="relative">
                <FloatingInput
                  type={showPassword.password ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  error={errors.password}
                  maxLength={20}
                  className="text-sm sm:text-base"
                />
                {formData.password && (
                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword((prev) => ({
                        ...prev,
                        password: !prev.password,
                      }))
                    }
                    className="absolute right-2 sm:right-3 top-6 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none p-1"
                  >
                    {showPassword.password ? (
                      <AiOutlineEye className="w-4 h-4 sm:w-5 sm:h-5" />
                    ) : (
                      <AiOutlineEyeInvisible className="w-4 h-4 sm:w-5 sm:h-5" />
                    )}
                  </button>
                )}
              </div>

              <div className="relative">
                <FloatingInput
                  type={showPassword.confirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  error={errors.confirmPassword}
                  maxLength={20}
                  className="text-sm sm:text-base"
                />
                {formData.confirmPassword && (
                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword((prev) => ({
                        ...prev,
                        confirmPassword: !prev.confirmPassword,
                      }))
                    }
                    className="absolute right-2 sm:right-3 top-6 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none p-1"
                  >
                    {showPassword.confirmPassword ? (
                      <AiOutlineEye className="w-4 h-4 sm:w-5 sm:h-5" />
                    ) : (
                      <AiOutlineEyeInvisible className="w-4 h-4 sm:w-5 sm:h-5" />
                    )}
                  </button>
                )}
              </div>
            </div>

            <div className="flex items-center mt-1 sm:mt-2">
              <input
                type="checkbox"
                name="acceptTerms"
                id="acceptTerms"
                checked={formData.acceptTerms}
                onChange={handleChange}
                className="mr-2 h-3 w-3 sm:h-4 sm:w-4"
              />
              <label
                htmlFor="acceptTerms"
                className="text-[11px] sm:text-xs text-gray-600"
              >
                I agree to the{" "}
                <a
                  href="/terms"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="blue-link"
                >
                  Terms and Conditions
                </a>
              </label>
            </div>

            <div className="h-2 mb-2">
              {errors.acceptTerms && (
                <p className="text-red-500 text-[10px] sm:text-xs mt-0.5">
                  {errors.acceptTerms}
                </p>
              )}
            </div>

            <div className="h-3 mb-2">
              {successMessage && (
                // <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-md p-2 animate-fade-in">
                <>
                  <p className="flex items-center justify-center text-green-600 text-[10px] sm:text-xs font-medium">
                    <CiCircleInfo className="text-green-600 w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                    {successMessage}
                  </p>
                </>
              )}
              {errorOverall && (
                <>
                  {/* // <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-md p-2 animate-fade-in"> */}
                  <p className="flex items-center justify-center text-red-500 text-[10px] sm:text-xs">
                    <CiCircleInfo className="text-red-600 mr-2 w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
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
                  ? "bg-gray-400 cursor-not-allowed opacity-70"
                  : "bg-purple-600 hover:bg-purple-700 text-white cursor-pointer hover:shadow-md"
              }`}
            >
              {isSubmitting ? "REGISTERING..." : "REGISTER"}
            </button>
          </form>

          <div className="text-center mt-3 sm:mt-4 text-[11px] sm:text-xs">
            <span className="text-gray-600">Already have an account? </span>
            <button
              onClick={handleLoginClick}
              className="blue-link cursor-pointer hover:underline"
            >
              Login
            </button>
          </div>
        </div>
      </CustomModal>
      <OTP
        isOpen={showOTPModal}
        onClose={() => setShowOTPModal(false)}
        email={formData.email}
        setShowLoginModal={setShowLoginModal}
        role="user"
        isSignupFlow={true}
      />
    </>
  );
};

export default SignupModal;
