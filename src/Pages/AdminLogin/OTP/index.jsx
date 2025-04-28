import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RiCloseLine } from "react-icons/ri";

const OTP = ({ email, isOpen, onClose }) => {
    const [otp, setOtp] = useState(['', '', '', '']);
    const [error, setError] = useState('');
    const [timer, setTimer] = useState(30);
    const navigate = useNavigate();

    useEffect(() => {
        let interval;
        if (isOpen && timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isOpen, timer]);

    const handleChange = (element, index) => {
        if (isNaN(element.value)) return false;

        setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

        if (element.nextSibling && element.value !== '') {
            element.nextSibling.focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            const prevInput = e.target.previousSibling;
            if (prevInput) {
                prevInput.focus();
            }
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
        onClose();
        navigate('/reset-password');
    };

    const handleResendOTP = () => {
        setOtp(['', '', '', '']);
        setError('');
        setTimer(30);
        // Add API call to resend OTP
        console.log('Resending OTP to:', email);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md m-4 relative animate-fadeIn" onClick={(e) => e.stopPropagation()}>
                <button onClick={onClose} className="absolute right-4 top-4 text-gray-500 hover:text-gray-700">
                    <RiCloseLine className="w-6 h-6" />
                </button>

                <div className="p-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">Enter Verification Code</h1>
                    <p className="text-gray-600 mb-8">
                        We have sent a verification code to <span className="font-medium">{email}</span>
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
                                    onKeyDown={e => handleKeyDown(e, index)}
                                    className="w-14 h-14 text-center text-2xl border-2 rounded-lg focus:border-purple-500 focus:outline-none"
                                    autoFocus={index === 0}
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
                            
                            <div className="text-center">
                                {timer > 0 ? (
                                    <p className="text-sm text-gray-600">
                                        Resend code in <span className="font-medium">{timer}s</span>
                                    </p>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={handleResendOTP}
                                        className="text-sm text-purple-600 hover:text-purple-800"
                                    >
                                        Resend Code
                                    </button>
                                )}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default OTP;