import React, { useState, useEffect, useRef } from 'react';
import CustomModal from '../../../Components/modal';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API } from '../../../../config/config';

const OTP = ({ email, isOpen, onClose, setShowResetPasswordModal }) => {
    const [otp, setOtp] = useState(['', '', '', '']);
    const [error, setError] = useState('');
    const [timer, setTimer] = useState(60);
    const [errorOverall, setErrorOverall] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    // const navigate = useNavigate();

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
            setErrorOverall('');
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

        if (newOtp.every(digit => digit !== '')) {
            setError('');
        }

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
        setIsSubmitting(true);
        const otpValue = otp.join('');
        const isComplete = otp.every(digit => digit !== '');

        if (!isComplete) {
            setError('Please enter all fields');
            setIsSubmitting(false);
            return;
        }

        try {
            const response = await axios.post(`${API}/user/verifyotp`, {
                email: email,
                otp: otpValue
            });

            if (response.data) {
                console.log('OTP Verified:', otpValue);
                toast.success('OTP verified successfully!');
                setOtp(['', '', '', '']);
                setError('');
                setErrorOverall('');
                onClose();
                setShowResetPasswordModal(true);
            }
        } catch (error) {
            console.error('OTP verification failed:', error);
            toast.error('OTP verification failed');
            setErrorOverall(error.response?.data?.message || 'Invalid OTP. Please try again.');
        } finally {
            setIsSubmitting(false); // Re-enable button
        }
    };

    const handleResendOTP = async () => {
        try {
            const response = await axios.post(`${API}/user/forgotpassword`, {
                email: email
            });

            if (response.data) {
                setOtp(['', '', '', '']);
                setError('');
                setErrorOverall('');
                setTimer(60);
                toast.success('OTP resent successfully!');
            }
        } catch (error) {
            console.error('Failed to resend OTP:', error);
            toast.error('Failed to resend OTP');
            setErrorOverall(error.response?.data?.message || 'Failed to resend OTP. Please try again.');
        }
    };
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const handlePaste = (event) => {
        event.preventDefault();
        const pastedValue = event.clipboardData.getData('text').replace(/\D/g, '').slice(0, 4);

        if (pastedValue) {
            const pastedOtp = pastedValue.split('');
            const newOtp = [...otp];
            for (let i = 0; i < 4; i++) {
                if (pastedOtp[i]) {
                    newOtp[i] = pastedOtp[i];
                }
            }
            setOtp(newOtp);
            const nextEmptyIndex = newOtp.findIndex(digit => digit === '');
            if (nextEmptyIndex !== -1) {
                otpRefs[nextEmptyIndex].current.focus();
            } else {
                otpRefs[3].current.focus();
            }
        }
    };
    if (!isOpen) return null;

    return (
        <>
            <CustomModal
                isOpen={isOpen}
                onClose={onClose}
                // title="Enter Verification Code"
                classname="w-full max-w-md"
            >
                <div className="p-2">
                    <h1 className="text-lg font-bold text-gray-800 mb-4">Enter Verification Code</h1>
                    <p className="text-gray-600 text-xs mb-4">
                        We have sent a verification code to <span className="font-medium">{email}</span>
                    </p>

                    <form onSubmit={handleSubmit}>
                        <div className="flex justify-center gap-4">
                            {otp.map((data, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    maxLength="1"
                                    value={data}
                                    onChange={e => handleChange(index, e.target.value)}
                                    onKeyDown={e => handleKeyDown(index, e)}
                                    onPaste={handlePaste}
                                    ref={otpRefs[index]}
                                    className="w-8 h-8 text-center text-md border-2 border-gray-500 rounded-lg focus:border-purple-500 focus:outline-none"
                                />
                            ))}
                        </div>

                        {/* <div className='h-3'>
                            {error && (
                                <p className="text-red-500 text-xs text-center">{error}</p>
                            )}
                        </div> */}
                        <div className='h-5'>
                            {(error || errorOverall) && (
                                <p className="text-red-500 text-xs text-center">
                                    {error || errorOverall}
                                </p>
                            )}
                        </div>

                        <div className="flex flex-col gap-4">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full cursor-pointer bg-purple-600 text-xs text-white py-3 rounded-lg transition-all duration-200 transform hover:scale-[1.02] ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-purple-700'
                                    }`}
                            >
                                {isSubmitting ? 'VERIFYING...' : 'VERIFY CODE'}
                            </button>
                            <div className="text-center">
                                {timer > 0 ? (
                                    <p className="text-xs text-gray-600">
                                        Time Left : <span className="font-medium">{formatTime(timer)}</span>
                                    </p>
                                ) : (
                                    <button
                                        type="button"
                                        disabled={isSubmitting}
                                        onClick={handleResendOTP}
                                        className={`text-xs blue-link ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                                            }`}
                                    >
                                        Resend Code
                                    </button>
                                )}
                            </div>
                        </div>
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

export default OTP;