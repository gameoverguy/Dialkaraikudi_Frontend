import React from 'react';
import { Link } from 'react-router-dom';
import  image from "../assets/404.png";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center p-8 max-w-md">
        <h1 className="text-4xl font-bold text-black mb-2">Oops!</h1>
        <h2 className="text-xl text-gray-600 mb-8">You are lost</h2>
        
        <div className="relative w-full aspect-square mb-8">
          <div className="absolute inset-0 bg-pink-50 rounded-full opacity-20" />
          <div className="relative w-full h-full flex items-center justify-center">
            {/* <svg className="w-3/4 h-3/4" viewBox="0 0 400 400">
             
              <g className="transform translate-x-[100] translate-y-[100]">
                <path d="M50,50 Q60,40 70,50 Q80,60 90,50 L100,60 L80,80 L60,80 L40,60 Z" 
                      fill="none" stroke="black" strokeWidth="2" />
                <circle cx="70" cy="40" r="20" fill="none" stroke="black" strokeWidth="2" />
                <path d="M50,80 Q70,100 90,80" fill="none" stroke="black" strokeWidth="2" />
              </g>
              <circle cx="200" cy="300" r="40" fill="none" stroke="black" strokeWidth="2" />
              <circle cx="180" cy="290" r="5" fill="black" />
              <circle cx="210" cy="310" r="5" fill="black" />
              <circle cx="300" cy="100" r="20" fill="none" stroke="black" strokeWidth="2" />
              <ellipse cx="300" cy="100" rx="30" ry="10" fill="none" stroke="black" strokeWidth="2" />
            </svg> */}
            <img src={image}  alt="404 Not Found" className="w-full h-full object-contain" />
          </div>
        </div>

        <Link 
          to="/" 
          className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;