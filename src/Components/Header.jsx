import React from 'react'
import Logo from '../assets/logo_01.png'
import { CiLocationOn } from 'react-icons/ci'
import { IoSearchOutline } from 'react-icons/io5'
import { MdNotificationsActive } from 'react-icons/md'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <div className='w-full  px-8 py-4 items-center shadow-lg border-gray-200'>
            <div className='w-11/12 mx-auto flex'>
                <div className='w-7/12 flex space-x-6 items-center'>
                    <img src={Logo} alt="" className='h-14' />
                    <p className='border whitespace-nowrap border-gray-400 bg-gray-100 p-2 flex items-center gap-1 rounded shadow-md hover:bg-gray-300'><CiLocationOn /> Current Location, Karaikudi</p>
                    <div className="hidden md:block relative w-full">
                        <input
                            type="search"
                            placeholder="Search Products in Karaikudi"
                            className="w-full pl-5 pr-14 py-2  bg-white border shadow-md  border-gray-400 rounded text-gray-700 focus:outline-emerald-300"
                        />
                        <button className="absolute top-1/2 -translate-y-1/2 right-1 bg-emerald-300 p-1 rounded text-white">
                            <IoSearchOutline className="text-xl" />
                        </button>
                    </div>
                </div>
                <div className='w-5/12 flex flex-row justify-end items-center gap-4'>
                    <p className='text-2xl'><MdNotificationsActive /></p>
                    <button to='/' className='cursor-pointer bg-emerald-200 hover:bg-emerald-400 px-2 py-1 rounded-lg'>
                        Login/Sign In
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Header
