import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import FloatingInput from "../../Components/FloatingInput";
import img from "../../assets/img.png";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OTPVerification from "./OTPVerification";
import ForgotPassword from "./ForgotPasswordLogin";
import { API } from "../../../config/config";
import Cookies from "js-cookie";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [errorOverall, setErrorOverall] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [otpEmail, setOtpEmail] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    let errorMessage = "";

    if (name === "email") {
      const emailValue = value.replace(/[^a-zA-Z0-9@.]/g, "").toLowerCase();
      setFormData((prev) => ({ ...prev, [name]: emailValue }));

      if (value !== emailValue) {
      } else if (emailValue.length > 50) {
      } else if (emailValue.includes("@")) {
        errorMessage = emailRegex.test(emailValue) ? "" : "";
      }
      setErrors((prev) => ({ ...prev, email: errorMessage }));
    } else if (name === "password") {
      const passwordValue = value.replace(/\s/g, "");
      setFormData((prev) => ({ ...prev, [name]: passwordValue }));
      if (passwordValue.length > 20) {
      } else if (value !== passwordValue) {
      }
      setErrors((prev) => ({ ...prev, password: errorMessage }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const newErrors = {
      email: !formData.email
        ? "Email is required"
        : formData.email.length < 10
        ? "Email must be at least 10 characters"
        : formData.email.length > 50
        ? "Email must not exceed 50 characters"
        : !emailRegex.test(formData.email)
        ? "Please enter a valid email"
        : "",
      password: !formData.password
        ? "Password is required"
        : formData.password.length < 6
        ? "Password must be at least 8 characters"
        : formData.password.length > 20
        ? "Password must not exceed 20 characters"
        : "",
    };
    setErrors(newErrors);
    setErrorOverall("");
    if (!newErrors.email && !newErrors.password) {
      try {
        const response = await axios.post(`${API}/admin/login`, formData);

        if (response.data) {
          const { token, admin } = response.data;
          Cookies.set("adminToken", token, {
            expires: 21,
            secure: true,
            sameSite: "Strict",
          });
          sessionStorage.setItem(
            "adminData",
            JSON.stringify({
              admin_id: admin.id,
              email: admin.email,
            })
          );
          console.log("Response data:", response.data);
          toast.success("Login successful!");
          setTimeout(() => {
            navigate("/adminpanel");
          }, 500);
        }
      } catch (error) {
        console.error("Login failed:", error);
        toast.error("Login failed!");
        setErrorOverall(
          error.response?.data?.message || "Invalid email or password"
        );
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-indigo-600 via-purple-550 to-pink-500">
      {/* Left side - Image */}
      <div className="hidden lg:flex lg:w-1/2">
        <img
          src={img}
          alt="Login"
          className="w-full h-full object-cover rounded-r-3xl"
        />
      </div>

      {/* Right side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-3 bg-white p-8 rounded-2xl shadow-xl">
          <div className="text-leftr">
            <h2 className="text-lg font-bold text-gray-900">Admin Login</h2>
          </div>

          <form onSubmit={handleSubmit} className="mt-4 space-y-3">
            <div className="space-y-4">
              <FloatingInput
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                maxLength={50}
              />

              <div className="relative">
                <FloatingInput
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  error={errors.password}
                  maxLength={20}
                />
                {formData.password && (
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-6 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                  >
                    {showPassword ? (
                      <AiOutlineEye className="w-5 h-5" />
                    ) : (
                      <AiOutlineEyeInvisible className="w-5 h-5" />
                    )}
                  </button>
                )}
              </div>
            </div>

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
              className={`w-full text-xs font-bold bg-purple-600 text-white py-3 rounded-lg transition-all duration-200 transform hover:scale-[1.02] cursor-pointer ${
                isSubmitting
                  ? "opacity-70 cursor-not-allowed"
                  : "hover:bg-purple-700"
              }`}
            >
              {isSubmitting ? "LOGGING IN..." : "LOGIN"}
            </button>
            <div className="flex items-center justify-end">
              <button
                type="button"
                onClick={() => setShowForgotPassword(true)}
                className="cursor-pointer text-sm text-purple-600 hover:text-purple-500"
              >
                Forgot your password?
              </button>
            </div>
          </form>
        </div>
      </div>

      <ForgotPassword
        isOpen={showForgotPassword}
        onClose={() => setShowForgotPassword(false)}
        setShowOTPModal={setShowOTPModal}
        setOtpEmail={setOtpEmail}
      />

      <OTPVerification
        isOpen={showOTPModal}
        onClose={() => setShowOTPModal(false)}
        email={otpEmail}
        onVerificationSuccess={() => {
          setShowOTPModal(false);
          setOtpEmail("");
        }}
      />

      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        toastClassName="z-[9999]"
      />
    </div>
  );
};

export default AdminLogin;
