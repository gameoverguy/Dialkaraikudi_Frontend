import React from "react";

const FloatingInput = ({
  label,
  id,
  name,
  type = "text",
  placeholder = " ",
  value,
  onChange,
  required = false,
  prefix = null,
  error = "",
  maxLength,
  icon = null,
}) => {
  return (
    <div className="mb-5 w-full">
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
        </label>
      )}

      <div className="flex w-full gap-2 items-center">
        {prefix && (
          <div className="flex items-center justify-center px-3 h-[48px] text-sm text-gray-700 bg-gray-100 border border-gray-300 rounded-md">
            {prefix}
          </div>
        )}

        <div className="relative w-full">
          {icon && (
            <div className="absolute inset-y-0 left-2 flex items-center text-gray-400 pointer-events-none">
              {icon}
            </div>
          )}
          <input
            type={type}
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            maxLength={maxLength}
            placeholder=" "
            className={`peer block w-full h-[48px] ${
              icon ? "pl-8" : "px-2.5"
            } pt-4 pb-4 text-sm text-gray-900 bg-white border appearance-none focus:outline-none focus:ring-0 rounded-md
              ${error ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-blue-600"}`}
          />
          <label
            htmlFor={id}
            className={`absolute left-2.5 top-3 text-sm text-gray-500 bg-white px-1 transition-all duration-200 ease-in-out 
              peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-600 
              peer-valid:-top-2 peer-valid:text-xs ${icon ? "ml-6":"px-2.5"}
              ${error ? "peer-focus:text-red-500 peer-valid:text-red-500" : ""}`}
          >
            {placeholder}
          </label>
        </div>
      </div>

      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default FloatingInput;
