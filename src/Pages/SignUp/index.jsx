import React, { useEffect, useState } from "react";
import FloatingInput from "../../Components/FloatingInput";
import { RiCloseLine, RiLockPasswordLine, RiUserLine } from "react-icons/ri";
import { MdOutlineEmail } from "react-icons/md";
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { BsTelephone } from "react-icons/bs";
import CustomModal from "../../Components/modal";

const SignupModal = ({ isOpen, onClose, onLoginClick, setShowLoginModal }) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: ""
    });
    const [errors, setErrors] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: ""
    });
    const [showPassword, setShowPassword] = useState({
        password: false,
        confirmPassword: false
    });

    useEffect(() => {
        if (!isOpen) {
            setFormData({ name: "", email: "", phone: "", password: "", confirmPassword: "" });
            setErrors({ name: "", email: "", phone: "", password: "", confirmPassword: "" });
            setShowPassword({ password: false, confirmPassword: false });
        }
    }, [isOpen]);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        let errorMessage = "";

        if (type === 'checkbox') {
            setFormData(prev => ({ ...prev, [name]: checked }));
            return;
        }
        switch (name) {
            case 'name':
                const nameValue = value.replace(/[^a-zA-Z]/g, '');
                setFormData(prev => ({ ...prev, [name]: nameValue }));
                if (value !== nameValue) {
                    errorMessage = "Only letters are allowed (no spaces, numbers, or special characters)";
                } else if (nameValue.length > 50) {
                    errorMessage = "Name must not exceed 50 characters";
                }
                break;

            case 'email':
                const emailValue = value.replace(/[^a-zA-Z0-9@.]/g, '').toLowerCase();
                setFormData(prev => ({ ...prev, [name]: emailValue }));
                if (value !== emailValue) {
                    errorMessage = "Special characters and spaces are not allowed";
                } else if (emailValue.length > 50) {
                    errorMessage = "Email must not exceed 50 characters";
                } else if (emailValue.includes('@')) {
                    errorMessage = emailRegex.test(emailValue) ? "" : "Please enter a valid email";
                }
                break;

            case 'phone':
                const phoneRegex = /^[6-9]\d{0,9}$/;
                const phoneValue = value.replace(/[^0-9]/g, '');
                const validPhoneValue = phoneValue.slice(0, 10);
                setFormData(prev => ({ ...prev, [name]: validPhoneValue }));

                if (!phoneRegex.test(phoneValue)) {
                    errorMessage = "Phone number must start with 6-9";
                } else if (phoneValue.length !== 10) {
                    errorMessage = "Phone number must be 10 digits";
                }
                break;

            case 'password':
            case 'confirmPassword':
                const passwordValue = value.replace(/\s/g, '');
                setFormData(prev => ({ ...prev, [name]: passwordValue }));
                if (value !== passwordValue) {
                    errorMessage = "Spaces are not allowed";
                } else if (passwordValue.length > 20) {
                    errorMessage = "Password must not exceed 20 characters";
                }
                if (name === 'confirmPassword' && passwordValue !== formData.password) {
                    errorMessage = "Passwords do not match";
                }
                break;

            default:
                break;
        }

        setErrors(prev => ({ ...prev, [name]: errorMessage }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {
            name: !formData.name ? "Name is required" :
                formData.name.length < 3 ? "Name must be at least 3 characters" : "",
            email: !formData.email ? "Email is required" :
                formData.email.length < 10 ? "Email must be at least 10 characters" :
                    !emailRegex.test(formData.email) ? "Please enter a valid email" : "",
            password: !formData.password ? "Password is required" :
                formData.password.length < 6 ? "Password must be at least 6 characters" : "",
            confirmPassword: !formData.confirmPassword ? "Please confirm your password" :
                formData.password !== formData.confirmPassword ? "Passwords do not match" : "",
            phone: !formData.phone ? "Phone number is required" :
                formData.phone.length !== 10 ? "Phone number must be 10 digits" : "",
            acceptTerms: !formData.acceptTerms ? "You must accept the terms and conditions" : ""
        };

        if (!Object.values(newErrors).some(error => error !== "")) {
            console.log(formData);
            onClose();
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
        <CustomModal
            isOpen={isOpen}
            onClose={onClose}
            // title="Create Account"
            classname="w-full max-w-md"
        >
            <div className="p-2">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Create Account</h1>
                <form onSubmit={handleSubmit} className="space-y-3">
                    <div className="space-y-3">
                        <FloatingInput
                            type="text"
                            placeholder="Full Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            icon={<RiUserLine className="w-5 h-5" />}
                            iconPosition="left"
                            error={errors.name}
                            maxLength={50}
                        />

                        <FloatingInput
                            type="email"
                            placeholder="Email Address"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            icon={<MdOutlineEmail className="w-5 h-5" />}
                            iconPosition="left"
                            error={errors.email}
                            maxLength={50}
                        />
                        <FloatingInput
                            type="tel"
                            placeholder="Phone Number"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            icon={<BsTelephone className="w-5 h-5" />}
                            iconPosition="left"
                            error={errors.phone}
                            maxLength={10}
                        />
                        <div className="relative">
                            <FloatingInput
                                type={showPassword.password ? "text" : "password"}
                                placeholder="Password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                icon={<RiLockPasswordLine className="w-5 h-5" />}
                                iconPosition="left"
                                error={errors.password}
                                maxLength={20}
                            />
                            {formData.password && (
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(prev => ({ ...prev, password: !prev.password }))}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                                >
                                    {showPassword.password ? (
                                        <AiOutlineEye className="w-5 h-5" />
                                    ) : (
                                        <AiOutlineEyeInvisible className="w-5 h-5" />
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
                                required
                                icon={<RiLockPasswordLine className="w-5 h-5" />}
                                iconPosition="left"
                                error={errors.confirmPassword}
                                maxLength={20}
                            />
                            {formData.confirmPassword && (
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(prev => ({ ...prev, confirmPassword: !prev.confirmPassword }))}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                                >
                                    {showPassword.confirmPassword ? (
                                        <AiOutlineEye className="w-5 h-5" />
                                    ) : (
                                        <AiOutlineEyeInvisible className="w-5 h-5" />
                                    )}
                                </button>
                            )}
                        </div>
                    </div>
                    <div className="flex items-start space-x-2 mt-4">
                        <input
                            type="checkbox"
                            name="acceptTerms"
                            id="acceptTerms"
                            checked={formData.acceptTerms}
                            onChange={handleChange}
                            className="mt-1"
                        />
                        <label htmlFor="acceptTerms" className="text-sm text-gray-600">
                            I agree to the{" "}
                            <a href="/terms" className="text-purple-600 hover:text-purple-800">
                                Terms and Conditions
                            </a>
                        </label>
                    </div>
                    {errors.acceptTerms && (
                        <p className="text-red-500 text-sm mt-1">{errors.acceptTerms}</p>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors duration-200 transform hover:scale-[1.02]"
                    >
                        SIGN UP
                    </button>
                </form>

                <div className="text-center mt-4 text-sm">
                    <span className="text-gray-600">Already have an account? </span>
                    <button
                        onClick={handleLoginClick}
                        className="text-purple-600 hover:text-purple-800 font-medium"
                    >
                        Login
                    </button>
                </div>
            </div>
        </CustomModal>
    );
};

export default SignupModal;