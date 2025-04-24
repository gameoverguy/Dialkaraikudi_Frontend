import React from "react";
import { TiTick } from "react-icons/ti";


const Services = () => {
  return (
    <React.Fragment>
      <div className="rounded-md border border-gray-200 p-4" id="services">
        <h1 className="flex items-center font-normal text-xl">
          <span className="text-3xl font-extralight">
            <TiTick />
          </span>
          Banquet type
        </h1>
        <p className="text-sm underline text-black w-fit px-8 pt-2 cursor-pointer hover:text-blue-500">
          AC
        </p>
      </div>
    </React.Fragment>
  );
};

export default Services;
