import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'

const MainLayout = () => {
    return (
        <div className='w-full mx-auto'>
            <Header />
            <div className='min-h-127 w-10/12 mx-auto p-2'>
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}

export default MainLayout
