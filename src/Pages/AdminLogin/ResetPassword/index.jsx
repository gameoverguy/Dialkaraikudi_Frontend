import React, { useState, useEffect } from "react";
import FloatingInput from "../../../Components/FloatingInput";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import CustomModal from "../../../Components/modal";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ResetPassword = ({ isOpen, onClose, setShowLoginModal,email }) => {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [newPasswordError, setNewPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    useEffect(() => {
        if (!isOpen) {
            setNewPassword("");
            setConfirmPassword("");
            setError("");
        }
    }, [isOpen]);
    const handlePasswordChange = (e) => {
        const value = e.target.value;
        if (value.includes(' ')) {
            setNewPasswordError("New password cannot contain spaces");
            return;
        }
        if (value.length > 20) {
            setNewPasswordError("Password must not exceed 20 characters");
            return;
        }
        setNewPassword(value);
        setNewPasswordError("");
        if (confirmPassword && value !== confirmPassword) {
            setConfirmPasswordError("Passwords do not match");
        } else {
            setConfirmPasswordError("");
        }
    };
    const handleConfirmPasswordChange = (e) => {
        const value = e.target.value;
        if (value.includes(' ')) {
            setConfirmPasswordError("Confirm password cannot contain spaces");
            return;
        }
        setConfirmPassword(value);
        if (newPassword !== value) {
            setConfirmPasswordError("Passwords do not match");
        } else {
            setConfirmPasswordError("");
        }
    };
    const isFormValid = () => {
        return (
            newPassword &&
            confirmPassword &&
            newPassword.length >= 8 &&
            newPassword === confirmPassword &&
            !newPasswordError &&
            !confirmPasswordError
        );
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newPassword) {
            setNewPasswordError("New password is required");
            return;
        }
        if (!confirmPassword) {
            setConfirmPasswordError("Confirm password is required");
            return;
        }
        if (newPassword.length < 8) {
            setNewPasswordError("Password must be at least 8 characters");
            return;
        }

        try {
            const response = await axios.post('http://192.168.1.33:5000/user/resetpassword', {
                email: email,
                newPassword: newPassword,
                confirmPassword: confirmPassword
            });

            if (response.data) {
                console.log("Password reset successful!");
                toast.success('Password reset successful!', {
                    autoClose: 2000
                });

                setTimeout(() => {
                    setNewPassword("");
                    setConfirmPassword("");
                    setNewPasswordError("");
                    setConfirmPasswordError("");
                    onClose();
                    setShowLoginModal(true);
                }, 2000);
            }
        } catch (error) {
            console.error('Password reset failed:', error);
            toast.error(error.response?.data?.message || 'Password reset failed. Please try again.', {
                autoClose: 3000
            });
            setError(error.response?.data?.message || 'Password reset failed. Please try again.');
        }
    };
    if (!isOpen) return null;

    return (
        <>
            <CustomModal
                isOpen={isOpen}
                onClose={onClose}
                // title="Reset Password"
                classname="w-full max-w-md"
            >
                <div className="p-2">
                    <h1 className="text-lg font-bold text-gray-800 mb-4">Reset Password</h1>
                    <p className="text-gray-600 text-xs mb-6">Please enter your new password.</p>

                    <form onSubmit={handleSubmit}>
                        <div className="relative">
                            <FloatingInput
                                type={showPassword ? "text" : "password"}
                                placeholder="New Password"
                                name="newPassword"
                                value={newPassword}
                                onChange={handlePasswordChange}
                                // required
                                // icon={<RiLockPasswordLine className="w-5 h-5" />}
                                // iconPosition="left"
                                error={newPasswordError || (error && newPassword.length === 0 ? "New password is required" : "")}
                                maxLength={20}
                            />
                            {newPassword && (
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-6 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                >
                                    {showPassword ? <AiOutlineEye className="w-5 h-5" /> : <AiOutlineEyeInvisible className="w-5 h-5" />}
                                </button>
                            )}
                        </div>

                        <div className="relative">
                            <FloatingInput
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Confirm Password"
                                name="confirmPassword"
                                value={confirmPassword}
                                onChange={handleConfirmPasswordChange}
                                // required
                                // icon={<RiLockPasswordLine className="w-5 h-5" />}
                                // iconPosition="left"
                                error={confirmPasswordError || (error && confirmPassword.length === 0 ? "Confirm password is required" : "")}
                                maxLength={20}
                                disabled={!newPassword}
                            />
                            {confirmPassword && (
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-6 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                >
                                    {showConfirmPassword ? <AiOutlineEye className="w-5 h-5" /> : <AiOutlineEyeInvisible className="w-5 h-5" />}
                                </button>
                            )}
                        </div>
                        <div className="h-4">
                            {error && (
                                <p className="text-red-500 text-xs text-center">{error}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            className={`w-full text-xs py-3 rounded-lg transition-colors duration-200 transform hover:scale-[1.02] ${isFormValid()
                                ? "bg-purple-600 hover:bg-purple-700 text-white"
                                : "bg-gray-300 cursor-not-allowed text-gray-500"
                                }`}
                            disabled={!isFormValid()}
                        >
                            Reset Password
                        </button>
                    </form>
                </div>
            </CustomModal>
            <ToastContainer
                position="top-right"
                autoClose={2000}
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

export default ResetPassword;