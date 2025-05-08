import React from 'react';
import logo from '../assets/loder.gif';

const Loader = () => {
  return (
    <div className='h-screen w-full'>
      <div className="flex items-center justify-center h-full">
        <img
          src={logo}
          alt="Logo"
          className="w-[25%]"
        />
      </div>
    </div>

  );
};

export default Loader;