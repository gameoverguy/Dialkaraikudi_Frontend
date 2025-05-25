import React, { useEffect, useState } from "react";
import FloatingInput from "../../Components/FloatingInput";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import axios from "axios";
import CustomModal from "../../Components/modal";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import { API } from "../../../config/config";
import { useNavigate } from "react-router-dom";
import { CiCircleInfo } from "react-icons/ci";
import GoogleAuthSection from "../../utils/GoogleAuth";

const UserLogin = ({
  isOpen,
  onClose,
  setShowLoginModal,
  setIsSignupOpen,
  setIsForgotPasswordOpen,
  setShowBusinessDetailForm,
  role,
}) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [errorOverall, setErrorOverall] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isOpen) {
      setFormData({ email: "", password: "" });
      setErrors({ email: "", password: "" });
      setErrorOverall("");
      setSuccessMessage("");
      setShowPassword(false);
    }
  }, [isOpen]);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "email") {
      const emailValue = value.replace(/[^a-zA-Z0-9@.]/g, "").toLowerCase();
      setFormData((prev) => ({ ...prev, email: emailValue }));

      const errorMessage =
        emailValue.length > 50
          ? "Email must not exceed 50 characters"
          : emailValue.includes("@") && !emailRegex.test(emailValue)
          ? "Please enter a valid email address"
          : "";
      setErrors((prev) => ({ ...prev, email: errorMessage }));
    }

    if (name === "password") {
      const passwordValue = value.replace(/[^a-zA-Z0-9@$!%*?&]/g, "");
      setFormData((prev) => ({ ...prev, password: passwordValue }));

      const errorMessage =
        passwordValue.length > 20
          ? "Password must not exceed 20 characters"
          : "";
      setErrors((prev) => ({ ...prev, password: errorMessage }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {
      email: !formData.email
        ? "Email is required"
        : formData.email.length < 10
        ? "Email must be at least 10 characters"
        : formData.email.length > 50
        ? "Email must not exceed 50 characters"
        : !emailRegex.test(formData.email)
        ? "Please enter a valid email address"
        : "",
      password: !formData.password
        ? "Password is required"
        : formData.password.length < 8
        ? "Password must be at least 8 characters"
        : formData.password.length > 20
        ? "Password must not exceed 20 characters"
        : "",
    };

    setErrors(newErrors);
    setSuccessMessage("");
    setErrorOverall("");

    if (!newErrors.email && !newErrors.password) {
      try {
        setLoading(true);
        const endpoint =
          role === "business" ? `${API}/business/login` : `${API}/user/login`;
        const response = await axios.post(endpoint, {
          email: formData.email,
          password: formData.password,
        });

        const data = response.data;

        if (data && data.token) {
          const userData = data.user || data.business || {};

          localStorage.setItem(
            role === "business" ? "businessData" : "userData",
            JSON.stringify({
              user_id: userData.id || userData._id,
              name: userData.name || "",
              email: userData.email || "",
              avatarUrl: userData.avatarUrl || "",
            })
          );
          setSuccessMessage("Login successful!");
          console.log("test 1");

          setTimeout(() => {
            setShowLoginModal(false);
            if (role === "business") {
              //const userId = userData.id || userData._id;
              navigate(`/vendorpanel`);
            }
          }, 1000);
        } else {
          throw new Error("Invalid response format");
        }
      } catch (error) {
        console.error("Login failed:", error);
        setErrorOverall(
          error.response?.data?.message || "Invalid email or password"
        );
      } finally {
        setLoading(false);
      }
    }
  };

  if (!isOpen) return null;

  const handleSignupClick = () => {
    onClose();
    if (role === "business") {
      // Open BusinessDetailForm modal
      setShowBusinessDetailForm(true);
    } else if (setIsSignupOpen) {
      // Open regular signup modal
      setIsSignupOpen(true);
    }
  };

  const handleForgotPasswordClick = (e) => {
    e.preventDefault();
    onClose();
    if (setIsForgotPasswordOpen) setIsForgotPasswordOpen(true);
  };

  return (
    <>
      <CustomModal
        isOpen={isOpen}
        onClose={onClose}
        title={`${role === "business" ? "BUSINESS LOGIN" : "MEMBER LOGIN"}`}
        classname="w-[95%] sm:w-full max-w-md mx-auto"
        titleAlignment="center"
      >
        <div className="p-1 sm:p-2 sm:pt-0">
          {/* <h1 className="text-base sm:text-lg text-center font-bold text-gray-800 mb-8 sm:mb-6">
            {role === "business" ? "BUSINESS LOGIN" : "MEMBER LOGIN"}
          </h1> */}
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
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

              <div className="relative">
                <FloatingInput
                  type={showPassword ? "text" : "password"}
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
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 sm:right-3 top-6 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none p-1"
                    title={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <AiOutlineEye className="w-4 h-4 sm:w-5 sm:h-5" />
                    ) : (
                      <AiOutlineEyeInvisible className="w-4 h-4 sm:w-5 sm:h-5" />
                    )}
                  </button>
                )}
              </div>
            </div>
            <div className="h-3 mb-2">
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
              disabled={loading}
              className={`w-full text-[12px] sm:text-xs font-bold bg-purple-600 text-white py-2.5 sm:py-3 rounded-lg transition-all duration-200 transform hover:scale-[1.02] ${
                loading
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-purple-700 cursor-pointer hover:shadow-md"
              }`}
            >
              {loading ? "LOGGING IN..." : "LOGIN"}
            </button>
          </form>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0 mt-3 sm:mt-4 text-[12px] sm:text-xs">
            <div>
              <span className="text-gray-600">Don't have an account? </span>
              <button
                onClick={handleSignupClick}
                className="blue-link cursor-pointer hover:underline"
              >
                Register
              </button>
            </div>
            <a
              onClick={handleForgotPasswordClick}
              className="blue-link cursor-pointer hover:underline"
            >
              Forgot Password?
            </a>
          </div>

          {role === "user" && (
            <GoogleAuthSection
              role={role}
              setSuccessMessage={setSuccessMessage}
              setShowLoginModal={setShowLoginModal}
            />
          )}
        </div>
      </CustomModal>
    </>
  );
};

export default UserLogin;
