import React, { useState } from "react";
import FloatingInput from "../../Components/FloatingInput";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdOutlineEmail } from "react-icons/md";
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const AdminLogin = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState({
        email: "",
        password: "",
    });
    const [showPassword, setShowPassword] = useState(false);

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        if (name === 'email') {
            const emailValue = value.replace(/\s/g, '');
            if (emailValue.length <= 50) {
                setFormData(prev => ({ ...prev, [name]: emailValue }));
                setErrors(prev => ({
                    ...prev,
                    email: !emailValue ? "Email is required" : 
                          !emailRegex.test(emailValue) ? "Please enter a valid email" : ""
                }));
            }
        } else if (name === 'password') {
            if (value.length <= 20) {
                setFormData(prev => ({ ...prev, [name]: value }));
                setErrors(prev => ({
                    ...prev,
                    password: !value ? "Password is required" : 
                              value.length > 20 ? "Password must not exceed 20 characters" : ""
                }));
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {
            email: !formData.email ? "Email is required" : 
                  formData.email.length < 10 ? "Email must be at least 10 characters" :
                  formData.email.length > 50 ? "Email must not exceed 50 characters" :
                  !emailRegex.test(formData.email) ? "Please enter a valid email" : "",
            password: !formData.password ? "Password is required" : 
                     formData.password.length < 6 ? "Password must be at least 6 characters" :
                     formData.password.length > 20 ? "Password must not exceed 20 characters" : ""
        };
        setErrors(newErrors);

        if (!newErrors.email && !newErrors.password) {
            console.log(formData);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-purple-600 p-4">
            <div className="container mx-auto flex flex-col lg:flex-row items-center justify-center gap-8 max-w-6xl">
                <div className="hidden lg:block lg:w-1/2">
                    <img
                        src="/src/assets/img.png"
                        alt="Login illustration"
                        className="w-full h-auto object-cover rounded-lg"
                    />
                </div>

                <div className="w-full lg:w-1/2 max-w-md">
                    <div className="bg-white p-8 rounded-lg shadow-xl">
                        <h1 className="text-3xl font-bold text-gray-800 mb-8">Welcome Back!</h1>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-8">
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
                                />

                                <div className="relative">
                                    <FloatingInput
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        icon={<RiLockPasswordLine className="w-5 h-5" />}
                                        iconPosition="left"
                                        error={errors.password}
                                    />
                                    {formData.password && (
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
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

                            <div className="flex items-center justify-end">
                                <a
                                    href="/forgot-password"
                                    className="text-sm text-purple-600 hover:text-purple-800"
                                >
                                    Forgot Password?
                                </a>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors duration-200 transform hover:scale-[1.02]"
                            >
                                LOGIN
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;