import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import FloatingInput from '../../Components/FloatingInput';
import img from '../../assets/img.png';
import ForgotPassword from '../UserLogin/ForgotPassword';
import OTPVerification from './OTPVerification';


const AdminLogin = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [showOTPModal, setShowOTPModal] = useState(false);
    const [otpEmail, setOtpEmail] = useState("");
    const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        setErrors(prev => ({
            ...prev,
            [name]: ''
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};

        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.password) newErrors.password = 'Password is required';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            const response = await axios.post('http://192.168.1.33:5000/admin/login', formData);
            if (response.data) {
                localStorage.setItem('adminToken', response.data.token);
                navigate('/admin/dashboard');
            }
        } catch (error) {
            setErrors({
                overall: error.response?.data?.message || 'Login failed. Please try again.'
            });
        }
    };

    return (
        <div className="min-h-screen flex">
            {/* Left side - Image */}
            <div className="hidden lg:flex lg:w-1/2">
                <img 
                    src={img} 
                    alt="Login" 
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Right side - Login Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-gray-900">
                            Admin Login
                        </h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Please sign in to your account
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                        <div className="space-y-4">
                            <FloatingInput
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                value={formData.email}
                                onChange={handleChange}
                                error={errors.email}
                            />

                            <FloatingInput
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                error={errors.password}
                            />
                        </div>

                        {errors.overall && (
                            <p className="text-red-500 text-sm text-center">
                                {errors.overall}
                            </p>
                        )}

                        <div className="flex items-center justify-end">
                            <button
                                type="button"
                                onClick={() => setShowForgotPassword(true)}
                                className="text-sm text-purple-600 hover:text-purple-500"
                            >
                                Forgot your password?
                            </button>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-200"
                        >
                            Sign In
                        </button>
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
        </div>
    );
};

export default AdminLogin;