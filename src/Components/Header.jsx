import React, { useState, useEffect } from 'react'
import Logo from '../assets/logo_01.png'
import { CiLocationOn } from 'react-icons/ci'
import { IoSearchOutline } from 'react-icons/io5'
import { MdNotificationsActive } from 'react-icons/md'
import { LuCircleUserRound } from 'react-icons/lu'
import AdminLogin from '../Pages/AdminLogin'
import SignupModal from '../Pages/SignUp'
import ForgotPassword from '../Pages/AdminLogin/ForgotPassword'
import OTP from '../Pages/AdminLogin/OTP'
import ResetPassword from '../Pages/AdminLogin/ResetPassword'
import { useLoginModal } from '../context/LoginContext'
import Cookies from 'js-cookie';

const Header = () => {
    const { showLoginModal, setShowLoginModal } = useLoginModal();
    const [isSignupOpen, setIsSignupOpen] = useState(false);
    const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
    const [userData, setUserData] = useState(null);
    // const navigate = useNavigate()
    const [showOTPModal, setShowOTPModal] = useState(false); // New state for OTP modal
    const [otpEmail, setOtpEmail] = useState('');
    const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);

    useEffect(() => {
        const storedUserData = localStorage.getItem('userData');
        if (storedUserData) {
            setUserData(JSON.parse(storedUserData));
        }
    }, [showLoginModal]); // Re-check when login modal closes

    const handleLogout = () => {
        localStorage.removeItem('userData');
        Cookies.remove('userToken');
        setUserData(null);
    };

    return (
        <>
            <div className='sticky top-0 bg-white z-40 w-full px-2 py-2 md:px-8 md:py-4 items-center shadow-md border-b border-gray-200'>
                <div className='md:w-11/12 mx-auto flex'>
                    <div className='w-full xl:w-7/12 flex space-x-6 items-center'>
                        {/* Logo */}
                        <img src={Logo} alt="Logo" className='h-10 md:h-12 object-contain' />

                        {/* Location Selector */}
                        <div className='hidden md:flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 transition-colors duration-200 rounded-lg cursor-pointer border border-gray-200 group'>
                            <CiLocationOn className='text-xl text-emerald-500 group-hover:text-emerald-600' />
                            <div className='flex flex-col'>
                                <span className='text-sm font-medium text-gray-700'>Karaikudi</span>
                            </div>
                        </div>

                        {/* Search Bar */}
                        <div className="hidden lg:block relative w-full">
                            <input
                                type="search"
                                placeholder="Search for services, products, brands..."
                                className="w-full pl-12 pr-14 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:border-emerald-300 focus:ring-1 focus:ring-emerald-300 transition-all"
                            />
                            <IoSearchOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                            <button className="absolute top-1/2 -translate-y-1/2 right-2 bg-emerald-500 hover:bg-emerald-600 p-2 rounded-lg text-white transition-colors duration-200">
                                <IoSearchOutline className="text-xl" />
                            </button>
                        </div>
                    </div>

                    {/* Right Section */}
                    <div className='w-5/12 flex flex-row justify-end items-center gap-6'>
                        {/* Mobile Location */}
                        <button className='md:hidden text-xl text-gray-700 hover:text-emerald-500 transition-colors'>
                            <CiLocationOn />
                        </button>

                        {/* Notifications */}
                        <button className='relative text-2xl text-gray-700 hover:text-emerald-500 transition-colors'>
                            <MdNotificationsActive />
                            <span className='absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full'></span>
                        </button>

                        {/* Login Button */}
                        <button
                            onClick={() => setShowLoginModal(true)}
                            className='hidden md:flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 cursor-pointer'
                        >
                            <LuCircleUserRound className="text-xl" />
                            <span>Login</span>
                        </button>

                        {/* Mobile User Icon */}
                        <button onClick={() => setShowLoginModal(true)} className='block md:hidden text-2xl text-gray-700 hover:text-emerald-500 transition-colors'>
                            <LuCircleUserRound />
                        </button>
                    </div>
                </div>

                {/* Mobile Search */}
                <div className="lg:hidden relative w-full mt-3">
                    <input
                        type="search"
                        placeholder="Search for services, products, brands..."
                        className="w-full pl-12 pr-14 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:border-emerald-300 focus:ring-1 focus:ring-emerald-300 transition-all"
                    />
                    <IoSearchOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                    <button className="absolute top-1/2 -translate-y-1/2 right-2 bg-emerald-500 hover:bg-emerald-600 p-2 rounded-lg text-white transition-colors duration-200">
                        <IoSearchOutline className="text-xl" />
                    </button>
                </div>
            </div>
            <AdminLogin
                isOpen={showLoginModal}
                onClose={() => setShowLoginModal(false)}
                setShowLoginModal={setShowLoginModal}
                setIsSignupOpen={setIsSignupOpen}
                setIsForgotPasswordOpen={setIsForgotPasswordOpen}
            />
            <SignupModal
                isOpen={isSignupOpen}
                onClose={() => setIsSignupOpen(false)}
                onLoginClick={() => {
                    setIsSignupOpen(false);
                    setShowLoginModal(true);
                }}
                setShowLoginModal={setShowLoginModal}
            />
            <ForgotPassword
                isOpen={isForgotPasswordOpen}
                onClose={() => setIsForgotPasswordOpen(false)}
                setShowOTPModal={setShowOTPModal}
                setOtpEmail={setOtpEmail}
            />
            <OTP
                isOpen={showOTPModal}
                onClose={() => setShowOTPModal(false)}
                email={otpEmail}
                setShowResetPasswordModal={setShowResetPasswordModal}
            />
            <ResetPassword
                isOpen={showResetPasswordModal}
                onClose={() => setShowResetPasswordModal(false)}
                setShowLoginModal={setShowLoginModal}
            />
        </>
    )
}

export default Header;