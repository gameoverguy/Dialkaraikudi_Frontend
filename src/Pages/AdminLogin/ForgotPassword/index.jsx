import React, { useState } from "react";
import FloatingInput from "../../../Components/FloatingInput";
import { MdOutlineEmail } from "react-icons/md";
import OTP from "../OTP/index.jsx";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [showOTP, setShowOTP] = useState(false);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const handleChange = (e) => {
        const value = e.target.value.replace(/\s/g, '').toLowerCase();
        setEmail(value);
        
        if (value && !emailRegex.test(value)) {
            setError("Please enter a valid email");
        } else {
            setError("");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!email) {
            setError("Email is required");
            return;
        }

        if (!emailRegex.test(email)) {
            setError("Please enter a valid email");
            return;
        }

        // Here you would make an API call to send OTP
        setShowOTP(true);
    };

    if (showOTP) {
        return <OTP email={email} />;
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-purple-600 p-4">
            <div className="w-full max-w-md">
                <div className="bg-white p-8 rounded-lg shadow-xl">
                    <h1 className="text-3xl font-bold text-gray-800 mb-6">Forgot Password</h1>
                    <p className="text-gray-600 mb-8">
                        Enter your email address to receive a verification code.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6">
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
                        />

                        <div className="flex flex-col gap-4">
                            <button
                                type="submit"
                                className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors duration-200 transform hover:scale-[1.02]"
                            >
                                Send Verification Code
                            </button>
                            <a
                                href="/adminlogin"
                                className="text-center text-sm text-purple-600 hover:text-purple-800"
                            >
                                Back to Login
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;