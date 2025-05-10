import React, { useEffect, useState } from "react";
import FloatingInput from "../../../Components/FloatingInput";
import CustomModal from "../../../Components/modal";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ForgotPassword = ({ isOpen, onClose, setShowOTPModal, setOtpEmail }) => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [errorOverall, setErrorOverall] = useState("");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    useEffect(() => {
        if (!isOpen) {
            setEmail("");
            setError("");
            setErrorOverall("");
        }
    }, [isOpen]);
    const handleChange = (e) => {
        const value = e.target.value;
        const emailValue = value.replace(/\s/g, '').replace(/[^a-zA-Z0-9@.]/g, '').toLowerCase();
        setEmail(emailValue);

        let errorMessage = "";
        if (value.includes(' ')) {
        } else if (value !== emailValue) {
        } else if (emailValue.length > 50) {
        } else if (emailValue.includes('@')) {
        }
        setError(errorMessage);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const errorMessage = !email ? "Email is required" :
            email.length < 10 ? "Email must be at least 10 characters" :
                email.length > 50 ? "Email must not exceed 50 characters" :
                    !emailRegex.test(email) ? "Please enter a valid email" : "";

        setErrorOverall("");

        if (errorMessage) {
            setError(errorMessage);
        } else {
            try {
                const response = await axios.post('http://192.168.1.33:5000/user/forgotpassword', {
                    email: email
                });

                if (response.data) {
                    console.log("Reset password for:", email);
                    if (setOtpEmail && setShowOTPModal) {
                        setOtpEmail(email);
                        setShowOTPModal(true);
                    }
                    toast.success('Reset password link sent successfully!');

                    setEmail("");
                    setError("");
                    onClose();
                }
            } catch (error) {
                console.error('Failed to send reset link:', error);
                toast.error('Failed to send reset link');
                setErrorOverall(error.response?.data?.message || 'Failed to send reset link. Please try again.');
            }
        }
    };

    return (
        <>
            <CustomModal
                isOpen={isOpen}
                onClose={onClose}
                classname="w-full max-w-md"
            >
                <div className="p-2">
                    <h1 className="text-lg font-bold text-gray-800 mb-4">Forgot Password</h1>
                    <p className="text-gray-600 text-xs mb-4">Enter your email address to reset your password.</p>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <FloatingInput
                            type="email"
                            placeholder="Email Address"
                            name="email"
                            value={email}
                            onChange={handleChange}
                            error={error}
                            maxLength={50}
                        />
                        <div className="h-2 mb-2">
                            {errorOverall && (
                                <p className="text-red-500 text-xs text-center">{errorOverall}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="w-full cursor-pointer text-xs bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors duration-200 transform hover:scale-[1.02]"
                        >
                            RESET PASSWORD
                        </button>
                    </form>
                </div>
            </CustomModal>
            <ToastContainer
                position="top-right"
                autoClose={7000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                style={{ zIndex: 9999 }}
            />
        </>
    );
};

export default ForgotPassword;