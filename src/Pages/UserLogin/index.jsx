import React, { useEffect, useState } from "react";
import FloatingInput from "../../Components/FloatingInput";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import axios from "axios";
import CustomModal from "../../Components/modal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import { API } from "../../../config/config";
import { GoogleLogin } from "@react-oauth/google";

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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setFormData({ email: "", password: "" });
      setErrors({ email: "", password: "" });
      setErrorOverall("");
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
          ? "Please enter a valid email"
          : "";
      setErrors((prev) => ({ ...prev, email: errorMessage }));
    }

    if (name === "password") {
      const passwordValue = value.replace(/\s/g, "");
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
        ? "Please enter a valid email"
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
        console.log(data);

        if (data && data.token) {
          const userData = data.user || data.business || {};

          sessionStorage.setItem(
            role === "business" ? "businessData" : "userData",
            JSON.stringify({
              user_id: userData.id || userData._id,
              name: userData.name || "",
              email: userData.email || "",
              avatarUrl: userData.avatarUrl || "",
            })
          );

          toast.success("Login successful!");
          setTimeout(() => {
            setShowLoginModal(false);
            if (role === "business") {
              const userId = userData.id || userData._id;
              window.location.href = `/vendorpanel/${userId}`;
            }
          }, 1000);
        } else {
          throw new Error("Invalid response format");
        }
      } catch (error) {
        console.error("Login failed:", error);
        toast.error("Login failed!");
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
        title=""
        classname="w-full max-w-md"
      >
        <div className="p-2">
          <h1 className="text-lg text-center font-bold text-gray-800 mb-4">
            {role === "business" ? "Business Login" : "Member Login"}
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <FloatingInput
                type="email"
                placeholder="Email Address"
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                maxLength={50}
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
                />
                {formData.password && (
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-6 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                    title={showPassword ? "Hide password" : "Show password"}
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
              disabled={loading}
              className={`w-full text-xs font-bold bg-purple-600 text-white py-3 rounded-lg transition-colors duration-200 transform hover:scale-[1.02] ${
                loading
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-purple-700 cursor-pointer"
              }`}
            >
              {loading ? "LOGGING IN..." : "LOGIN"}
            </button>
          </form>

          <div className="flex justify-between items-center mt-4 text-xs">
            <div>
              <span className="text-gray-600">Don't have an account? </span>
              <button
                onClick={handleSignupClick}
                className="blue-link cursor-pointer"
              >
                Register
              </button>
            </div>
            <a
              onClick={handleForgotPasswordClick}
              className="blue-link cursor-pointer"
            >
              Forgot Password?
            </a>
          </div>
          {/* <div className="flex items-center justify-center text-center gap-3 my-6">
            <div className="flex-1 h-px bg-gray-400"></div>
            <p className="text-md text-gray-500 px-3 bg-white">or</p>
            <div className="flex-1 h-px bg-gray-400"></div>
          </div> */}

          {/* <div className="mt-2"> */}
          {/* <div className="relative group cursor-pointer overflow-hidden rounded-lg"> */}
          {/* <div className="absolute inset-0 w-full h-full transition duration-300"></div> */}
          {/* <div className="border border-gray-300 rounded-lg p-0.5 transition duration-300 group-hover:border-gray-400"> */}
          {/* <GoogleLogin
                onSuccess={credentialResponse => {
                  const credentialResponsedecoded = jwtDecode(credentialResponse.credential);
                  console.log(credentialResponsedecoded);
                }}
                onError={() => {
                  console.log('Login Failed');
                }}
                useOneTap
                theme="outline"
                size="large"
                shape="rectangular"
                width="100%"
                text="signin_with"
                locale="en"
                containerProps={{
                  className: "flex items-center justify-center w-full py-2.5 px-4"
                }}
              /> */}
          {/* </div> */}
          {/* </div> */}
          {/* </div> */}
        </div>
      </CustomModal>

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
      />
    </>
  );
};

export default UserLogin;
