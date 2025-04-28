import React, { useState } from "react";
import { RiCloseLine } from "react-icons/ri";
import { MdOutlineEmail } from "react-icons/md";
import FloatingInput from "../../../Components/FloatingInput";
import OTP from "../OTP";

const ForgotPassword = ({ isOpen, onClose }) => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [showOTP, setShowOTP] = useState(false);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const handleChange = (e) => {
        const value = e.target.value;
        const emailValue = value.replace(/\s/g, '').replace(/[^a-zA-Z0-9@.]/g, '').toLowerCase();
        setEmail(emailValue);

        let errorMessage = "";
        if (value.includes(' ')) {
            errorMessage = "Spaces are not allowed";
        } else if (value !== emailValue) {
            errorMessage = "Special characters are not allowed";
        } else if (emailValue.length > 50) {
            errorMessage = "Email must not exceed 50 characters";
        } else if (emailValue.includes('@')) {
            errorMessage = emailRegex.test(emailValue) ? "" : "Please enter a valid email";
        }
        setError(errorMessage);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const errorMessage = !email ? "Email is required" :
            email.length < 10 ? "Email must be at least 10 characters" :
                email.length > 50 ? "Email must not exceed 50 characters" :
                    !emailRegex.test(email) ? "Please enter a valid email" : "";

        if (errorMessage) {
            setError(errorMessage);
        } else {
            console.log("Reset password for:", email);
            onClose();
            setShowOTP(true);
        }
    };
    if (!isOpen) return null;

    return (
        <>
            <div className="fixed inset-0 bg-black/60 bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
                <div className="bg-white rounded-lg shadow-xl w-full max-w-md m-4 relative animate-fadeIn" onClick={(e) => e.stopPropagation()}>
                    <button onClick={onClose} className="absolute right-4 top-4 text-gray-500 hover:text-gray-700">
                        <RiCloseLine className="w-6 h-6" />
                    </button>

                    <div className="p-8">
                        <h1 className="text-3xl font-bold text-gray-800 mb-4">Forgot Password</h1>
                        <p className="text-gray-600 mb-6">Enter your email address to reset your password.</p>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <FloatingInput
                                type="email"
                                placeholder="Email Address"
                                name="email"
                                value={email}
                                onChange={handleChange}
                                required
                                icon={<MdOutlineEmail className="w-5 h-5" />}
                                iconPosition="left"
                                error={error}
                                maxLength={50}
                            />

                            <button
                                type="submit"
                                className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors duration-200 transform hover:scale-[1.02]"
                            >
                                RESET PASSWORD
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            {showOTP && <OTP email={email} onClose={() => setShowOTP(false)} />}
        </>
    );
};

export default ForgotPassword;