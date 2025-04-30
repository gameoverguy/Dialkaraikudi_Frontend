import React from 'react'
import Logo from '../assets/logo_01.png'
import { FaSquareInstagram } from "react-icons/fa6";
import { TiSocialFacebook } from "react-icons/ti";
import { IoLogoWhatsapp } from "react-icons/io5";
import { FaInstagram } from "react-icons/fa";
import { CiYoutube } from "react-icons/ci";

const Footer = () => {

    const social = [
        { title: <FaInstagram size={25} /> },
        { title: <TiSocialFacebook size={25} /> },
        { title: <IoLogoWhatsapp size={25} /> },
        { title: <CiYoutube size={25} /> },
        
      ];
    return (
        <>
        <div className='flex justify-center items-center w-12/12 bg-[#F3F4F6]'>
        <div className='w-1/12'></div>
            <div className='flex flex-col w-4/12 py-2 gap-5'>
            <p className='text-xl font-bold'>One-Stop for All Local Services Across India</p>
            <img src={Logo} alt="" className='w-[150px] h-10 md:h-14' />
            <p className='text-sm text-[#4B5563] text-justify'>Dialkaraikudi is a leading digital platform for local service businesses in India. Dialkaraikudi focuses on expert services clustered around Home, Life and Self and where the user need is customized. Using technology and domain intelligence, the platform seeks to understand the user need in detail and matches it to verified service professionals.</p>
            <p className='text-sm text-[#4B5563] font-bold'>Connect with us</p>
            <div className="flex justify-start gap-1 items-center">
            {social.map((items, i) => (
              <div key={i} className={`border-0.5 p-1 transition-colors duration-300 rounded-3xl cursor-pointer
                ${i === 0 ? "hover:bg-[#9F33AE]" : ""}
                ${i === 1 ? "hover:bg-[#395498]" : ""}
                ${i === 2 ? "hover:bg-[#17980E]" : ""}
              `}
            >
                <p className="hover:text-white px-1 py-1">{items.title}</p>
              </div>
            ))}
          </div>

            </div>

            <div className='w-1/12'>

            </div>

            <div className='w-1/12'>

            </div>

            <div className='w-2/12'>

            </div>
            <div className='w-2/12'></div>


        </div>

        </>
    )
}

export default Footer
