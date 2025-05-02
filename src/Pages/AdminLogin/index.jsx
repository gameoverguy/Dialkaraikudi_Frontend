import React, { useEffect, useState } from "react";
import FloatingInput from "../../Components/FloatingInput";
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import axios from "axios";
import CustomModal from "../../Components/modal";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';

const AdminLogin = ({ isOpen, onClose, setShowLoginModal, setIsSignupOpen, setIsForgotPasswordOpen }) => {
    // const navigate = useNavigate();
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
    useEffect(() => {
        if (!isOpen) {
            setFormData({ email: "", password: "" });
            setErrors({ email: "", password: "" });
            setErrorOverall("");
            setShowPassword(false);
            // setIsSignupOpen(false);
        }
    }, [isOpen]);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const handleChange = (e) => {
        const { name, value } = e.target;
        const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
        let errorMessage = "";

        if (name === 'email') {
            const emailValue = value.replace(/[^a-zA-Z0-9@.]/g, '').toLowerCase();
            setFormData(prev => ({ ...prev, [name]: emailValue }));

            if (value !== emailValue) {
            } else if (emailValue.length > 50) {
            } else if (emailValue.includes('@')) {
                errorMessage = emailRegex.test(emailValue) ? "" : "";
            }
            setErrors(prev => ({ ...prev, email: errorMessage }));
        } else if (name === 'password') {
            const passwordValue = value.replace(/\s/g, '');
            setFormData(prev => ({ ...prev, [name]: passwordValue }));
            if (passwordValue.length > 20) {
            } else if (value !== passwordValue) {
            }

            setErrors(prev => ({ ...prev, password: errorMessage }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = {
            email: !formData.email ? "Email is required" :
                formData.email.length < 10 ? "Email must be at least 10 characters" :
                    formData.email.length > 50 ? "Email must not exceed 50 characters" :
                        !emailRegex.test(formData.email) ? "Please enter a valid email" : "",
            password: !formData.password ? "Password is required" :
                formData.password.length < 6 ? "Password must be at least 8 characters" :
                    formData.password.length > 20 ? "Password must not exceed 20 characters" : ""
        };
        setErrors(newErrors);
        setErrorOverall("");

        if (!newErrors.email && !newErrors.password) {
            try {
                const response = await axios.post('http://192.168.1.33:5000/user/login', {
                    email: formData.email,
                    password: formData.password
                });

                if (response.data) {
                    console.log('Login successful:', response.data);
                    if (response.data.token) {
                        Cookies.set('userToken', response.data.token, {
                            expires: 21,
                            secure: true,
                            sameSite: 'Strict'
                        });
                    }
                    localStorage.setItem('userData', JSON.stringify({
                        name: response.data.user.name,
                        email: response.data.user.email
                    }));
                    
                } toast.success('Login successful!');
                setTimeout(() => {
                    setShowLoginModal(false);
                }, 1500);
            }catch (error) {
            console.error('Login failed:', error);
            toast.error('Login failed!');
            setErrorOverall(error.response?.data?.message || 'Invalid email or password');
        }
    }
};
if (!isOpen) return null;
const handleSignupClick = () => {
    onClose();
    if (setIsSignupOpen) {
        setIsSignupOpen(true);
    }
};
const handleForgotPasswordClick = (e) => {
    e.preventDefault();
    onClose();
    if (setIsForgotPasswordOpen) {
        setIsForgotPasswordOpen(true); // Only open the ForgotPassword modal
    }
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
                <h1 className="text-lg font-bold text-gray-800 mb-4">Member Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <FloatingInput
                            type="email"
                            placeholder="Email Address"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            // required
                            // icon={<MdOutlineEmail className="w-5 h-5" />}
                            // iconPosition="left"
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
                                // required
                                // icon={<RiLockPasswordLine className="w-5 h-5" />}
                                // iconPosition="left"
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
                            <p className="text-red-500 text-xs text-center">{errorOverall}</p>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="w-full text-xs font-bold bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors duration-200 transform hover:scale-[1.02] cursor-pointer"
                    >
                        LOGIN
                    </button>
                </form>

                <div className="flex justify-between items-center mt-4 text-xs">
                    <div>
                        <span className="text-gray-600">Don't have an account? </span>
                        <button
                            onClick={handleSignupClick}
                            className="text-purple-600 hover:text-purple-800 font-medium cursor-pointer"
                        >
                            Register
                        </button>
                    </div>
                    <a
                        onClick={handleForgotPasswordClick}
                        className="text-purple-600 hover:text-purple-800 cursor-pointer"
                    >
                        Forgot Password?
                    </a>
                </div>
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

export default AdminLogin;