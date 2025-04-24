import React, { useState } from "react";
import FloatingInput from "../../Components/FloatingInput";

const ContactDetail = () => {
  const [mobile, setMobile] = useState("");
  console.log(mobile);
  
  return (
    <div className="mt-2">
      <FloatingInput
        id="mobile"
        name="mobile"
        value={mobile}
        required
        onChange={(e) => setMobile(e.target.value)}
        placeholder="Enter Mobile Number"
        maxLength={10}
        prefix={
          <div className="flex items-center gap-1">
            <img
              src="https://akam.cdn.jdmagicbox.com/images/icontent/listingbusiness/india_flag.svg"
              alt="India"
              className="w-5 h-5 object-cover"
            />
            +91
          </div>
        }
      />
    </div>
  );
};

export default ContactDetail;
