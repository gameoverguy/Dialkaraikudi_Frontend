import React, { useEffect, useState } from "react";
import { RiCloseLine } from "react-icons/ri";
import { MdOutlineEmail } from "react-icons/md";
import FloatingInput from "../../../Components/FloatingInput";
import CustomModal from "../../../Components/modal";

const ForgotPassword = ({ isOpen, onClose, setShowOTPModal, setOtpEmail }) => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    useEffect(() => {
        if (!isOpen) {
            setEmail("");
            setError("");
        }
    }, [isOpen]);
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
            if (setOtpEmail && setShowOTPModal) {
                setOtpEmail(email); // Set the email in Header
                setShowOTPModal(true); // Open the OTP modal directly
            }
            setEmail("");
            setError("");
            onClose(); // Close the ForgotPassword modal after triggering OTP
        }
    };

    if (!isOpen) return null;

    return (
        <>
            <CustomModal
                isOpen={isOpen}
                onClose={onClose}
                // title="Forgot Password"
                classname="w-full max-w-md"
            >
                <div className="p-2">
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
            </CustomModal>
        </>
    );
};

export default ForgotPassword;