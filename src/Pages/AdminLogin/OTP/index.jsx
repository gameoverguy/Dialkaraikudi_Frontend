import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const OTP = ({ email }) => {
    const [otp, setOtp] = useState(['', '', '', '']);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (element, index) => {
        if (isNaN(element.value)) return false;

        setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

        if (element.nextSibling) {
            element.nextSibling.focus();
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const otpValue = otp.join('');
        
        if (otpValue.length !== 4) {
            setError('Please enter all digits');
            return;
        }

        // Here you would verify OTP with API
        console.log('OTP Verified');
        navigate('/reset-password');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-purple-600 p-4">
            <div className="w-full max-w-md">
                <div className="bg-white p-8 rounded-lg shadow-xl">
                    <h1 className="text-3xl font-bold text-gray-800 mb-6">Enter Verification Code</h1>
                    <p className="text-gray-600 mb-8">
                        We have sent a verification code to {email}
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="flex justify-center gap-4">
                            {otp.map((data, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    maxLength="1"
                                    value={data}
                                    onChange={e => handleChange(e.target, index)}
                                    className="w-14 h-14 text-center text-2xl border-2 rounded-lg focus:border-purple-500 focus:outline-none"
                                />
                            ))}
                        </div>

                        {error && (
                            <p className="text-red-500 text-sm text-center">{error}</p>
                        )}

                        <div className="flex flex-col gap-4">
                            <button
                                type="submit"
                                className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors duration-200 transform hover:scale-[1.02]"
                            >
                                Verify Code
                            </button>
                            <button
                                type="button"
                                onClick={() => window.location.reload()}
                                className="text-center text-sm text-purple-600 hover:text-purple-800"
                            >
                                Resend Code
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default OTP;