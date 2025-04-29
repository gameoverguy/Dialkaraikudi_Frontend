import React, { useState, useEffect } from "react";
import { RiCloseLine, RiLockPasswordLine } from "react-icons/ri";
import FloatingInput from "../../../Components/FloatingInput";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const ResetPassword = ({ isOpen, onClose, setShowLoginModal }) => {
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
    const handleSubmit = (e) => {
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
        console.log("Password reset successful!");
        setNewPassword("");
        setConfirmPassword("");
        setNewPasswordError("");
        setConfirmPasswordError("");
        onClose();
        setShowLoginModal(true);
    };
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md m-4 relative animate-fadeIn" onClick={(e) => e.stopPropagation()}>
                <button onClick={onClose} className="absolute right-4 top-4 text-gray-500 hover:text-gray-700">
                    <RiCloseLine className="w-6 h-6" />
                </button>

                <div className="p-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">Reset Password</h1>
                    <p className="text-gray-600 mb-6">Please enter your new password.</p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="relative">
                            <FloatingInput
                                type={showPassword ? "text" : "password"}
                                placeholder="New Password"
                                name="newPassword"
                                value={newPassword}
                                onChange={handlePasswordChange}
                                required
                                icon={<RiLockPasswordLine className="w-5 h-5" />}
                                iconPosition="left"
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
                                required
                                icon={<RiLockPasswordLine className="w-5 h-5" />}
                                iconPosition="left"
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
                        <div className="h-2">
                            {error && (
                                <p className="text-red-500 text-sm text-center">{error}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            className={`w-full py-3 rounded-lg transition-colors duration-200 transform hover:scale-[1.02] ${isFormValid()
                                    ? "bg-purple-600 hover:bg-purple-700 text-white"
                                    : "bg-gray-300 cursor-not-allowed text-gray-500"
                                }`}
                            disabled={!isFormValid()}
                        >
                            Reset Password
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;