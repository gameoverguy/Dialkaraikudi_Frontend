import React from "react";

const ContactDetail = () => {
  return (
    <div className="bg-white shadow-xl">
      <div className="grid grid-cols-2">
        <div></div>
        <div>
          <h1 className="font-bold text-2xl">Add Contact Details</h1>
          <label
            className="block mb-2 font-medium text-gray-700"
            htmlFor="title"
          >
            Title
          </label>
          <select
            id="title"
            name="title"
            className="w-fit border border-gray-300 rounded-md px-3 py-2 focus:outline-none"
          >
            <option value="">Select</option>
            <option value="Mr">Mr</option>
            <option value="Mrs">Mrs</option>
            <option value="Ms">Ms</option>
          </select>
          <label className="block mb-2 font-medium text-gray-700" htmlFor="title">
            Contact Person
          </label>
          <input type="text" className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none"/>
        </div>
      </div>
    </div>
  );
};

export default ContactDetail;
