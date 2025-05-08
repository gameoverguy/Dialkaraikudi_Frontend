import React, { createContext, useContext, useState } from 'react';

export const LoginModalContext = createContext();

export const LoginModalProvider = ({ children }) => {
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [loginRole, setLoginRole] = useState(null)

    const handleOpenLoginModal = () => {
        setShowLoginModal(true);
    };

    return (
        <LoginModalContext.Provider value={{
            showLoginModal, setShowLoginModal, handleOpenLoginModal, loginRole,
            setLoginRole
        }}>
            {children}
        </LoginModalContext.Provider>
    );
};

export const useLoginModal = () => {
    const context = useContext(LoginModalContext);
    if (!context) {
        throw new Error('useLoginModal must be used within a LoginModalProvider');
    }
    return context;
};