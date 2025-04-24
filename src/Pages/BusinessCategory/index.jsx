import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import FloatingInput from "../../Components/FloatingInput";

const BusinessCategory = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <div className="grid grid-cols-2">
        <div></div>
        <div className="mt-4">
          <h1 className="font-bold text-2xl mt-2">Add Business Category</h1>
          <p className="text-md mt-2">
            Choose the right business categories so your customer can easily find you
          </p>

          <div className="mt-5">
            <FloatingInput
              id="categorySearch"
              name="categorySearch"
              placeholder="Type Business Category"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<FiSearch className="w-4 h-4" />}
              required
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default BusinessCategory;
