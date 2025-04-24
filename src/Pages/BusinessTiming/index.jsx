import React from "react";
import FloatingInput from "../../Components/FloatingInput";
import { FiMail } from "react-icons/fi";
import { HiOutlineMail } from "react-icons/hi";

const BusinessTiming = () => {
  return (
    <>
      {/* <div className="grid grid-cols-2 "> */}
      <div></div>
      <div>
        <h1 className="font-bold text-2xl mt-2">Add Business Category</h1>
        <p className="text-md mt-2">
          Choose the right business categories so your customer can easily find
          you
        </p>
        <FloatingInput
          id="email"
          label="Email"
          name="email"
        //   value={email}
        //   onChange={(e) => setEmail(e.target.value)}
          icon={<HiOutlineMail className="w-5 h-5" />}
        />
      </div>
      {/* </div> */}
    </>
  );
};

export default BusinessTiming;
