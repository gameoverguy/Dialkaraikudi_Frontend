import React, { useState } from 'react';
import CustomModal from '../../../Components/modal';
import FloatingInput from '../../../Components/FloatingInput';
import axios from 'axios';
import { toast } from 'react-toastify';

const OTPVerification = ({ isOpen, onClose, email, onVerificationSuccess }) => {
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [step, setStep] = useState('otp'); // 'otp' or 'password'

    const handleOtpSubmit = async (e) => {
        e.preventDefault();
        if (!otp) {
            setError('Please enter OTP');
            return;
        }

        try {
            const response = await axios.post('http://192.168.1.33:5000/admin/verifyotp', {
                email: email,
                otp: otp
            });

            if (response.data) {
                setStep('password');
                setError('');
                toast.success('OTP verified successfully!');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid OTP');
            toast.error('OTP verification failed');
        }
    };

    const handlePasswordReset = async (e) => {
        e.preventDefault();
        if (!newPassword || !confirmPassword) {
            setError('Please fill all fields');
            return;
        }
        if (newPassword !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        if (newPassword.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        try {
            const response = await axios.post('http://192.168.1.33:5000/admin/resetpassword', {
                email: email,
                newPassword: newPassword,
                confirmPassword: confirmPassword
            });

            if (response.data) {
                toast.success('Password reset successful!');
                onClose();
                onVerificationSuccess?.();
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Password reset failed');
            toast.error('Password reset failed');
        }
    };

    return (
        <CustomModal isOpen={isOpen} onClose={onClose} classname="w-full max-w-md">
            <div className="p-6">
                <h2 className="text-xl font-bold mb-4">
                    {step === 'otp' ? 'Enter OTP' : 'Reset Password'}
                </h2>
                
                {step === 'otp' ? (
                    <form onSubmit={handleOtpSubmit} className="space-y-4">
                        <FloatingInput
                            type="text"
                            placeholder="Enter OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                            maxLength={6}
                        />
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                        <button
                            type="submit"
                            className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700"
                        >
                            Verify OTP
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handlePasswordReset} className="space-y-4">
                        <FloatingInput
                            type="password"
                            placeholder="New Password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <FloatingInput
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                        <button
                            type="submit"
                            className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700"
                        >
                            Reset Password
                        </button>
                    </form>
                )}
            </div>
        </CustomModal>
    );
};

export default OTPVerification;