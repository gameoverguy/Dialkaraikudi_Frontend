import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { RiCloseLine } from "react-icons/ri";

const OTP = ({ email, isOpen, onClose, setShowResetPasswordModal }) => {
    const [otp, setOtp] = useState(['', '', '', '']);
    const [error, setError] = useState('');
    const [timer, setTimer] = useState(60);
    const navigate = useNavigate();

    const otpRefs = [
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
    ];
    useEffect(() => {
        if (!isOpen) {
            setOtp(['', '', '', '']);
            setError('');
        }
    }, [isOpen]);
    useEffect(() => {
        let interval;
        if (isOpen && timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isOpen, timer]);

    useEffect(() => {
        if (isOpen && otpRefs[0].current) {
            setTimeout(() => otpRefs[0].current.focus(), 0);
        }
    }, [isOpen]);

    const handleChange = (index, value) => {
        if (!/^\d?$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 3) {
            otpRefs[index + 1].current.focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            otpRefs[index - 1].current.focus();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const otpValue = otp.join('');
        const isComplete = otp.every(digit => digit !== '');

        if (!isComplete) {
            setError('Please enter all digits');
            return;
        }
        console.log('OTP Verified:', otpValue);
        setOtp(['', '', '', '']);
        setError('');
        onClose();
        setShowResetPasswordModal(true); // Open reset password modal instead of navigating
    };

    const handleResendOTP = () => {
        setOtp(['', '', '', '']);
        setError('');
        setTimer(60);
        console.log('Resending OTP to:', email);
    };
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const handlePaste = (event) => {
        const pastedValue = event.clipboardData.getData('Text');
        if (/^\d{4}$/.test(pastedValue)) {
            const pastedOtp = pastedValue.split('');
            setOtp(pastedOtp);
            // Focus the last input after successful paste
            otpRefs[3].current.focus();
        }
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

                    <form onSubmit={handleSubmit} className="space-y-3">
                        <div className="flex justify-center gap-4">
                            {otp.map((data, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    maxLength="1"
                                    value={data}
                                    onChange={e => handleChange(index, e.target.value)}
                                    onKeyDown={e => handleKeyDown(index, e)}
                                    onPaste={index === 0 ? handlePaste : undefined}
                                    ref={otpRefs[index]}
                                    className="w-14 h-14 text-center text-2xl border-2 rounded-lg focus:border-purple-500 focus:outline-none"
                                />
                            ))}
                        </div>

                        <div className='h-3'>
                            {error && (
                                <p className="text-red-500 text-sm text-center">{error}</p>
                            )}
                        </div>

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
                                        Time Left : <span className="font-medium">{formatTime(timer)}</span>
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