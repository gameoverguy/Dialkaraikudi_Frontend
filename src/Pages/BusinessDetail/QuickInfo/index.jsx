import React from "react";

const QuickInfo = () => {
  return (
    <React.Fragment>
      <div className="rounded-md border border-gray-200 p-4" id="quickinfo">
        <h1 className="flex items-center font-normal text-xl">
          Quick Information
        </h1>
        <p className="text-md text-gray-500 pt-2">
          Year of Establishment
        </p>
        <h1 className="font-semibold">2024</h1>
      </div>
    </React.Fragment>
  );
};

export default QuickInfo;
