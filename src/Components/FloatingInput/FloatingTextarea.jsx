import React from "react";

const FloatingTextarea = ({
  label,
  id,
  name,
  placeholder = " ",
  value,
  onChange,
  required = false,
  error = "",
  maxLength,
  rows = 4
}) => {
  return (
    <div className="mb-2 w-full">
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
        </label>
      )}

      <div className="relative w-full">
        <textarea
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          maxLength={maxLength}
          rows={rows}
          placeholder=" "
          className={`peer block w-full p-2.5 pt-4 text-sm text-gray-900 bg-white border appearance-none focus:outline-none focus:ring-0 rounded-md resize-none
            ${error ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-blue-600"}`}
        />
        <label
          htmlFor={id}
          className={`absolute left-2.5 top-3 text-sm text-gray-500 bg-white px-1 transition-all duration-200 ease-in-out pointer-events-none
            peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-600 
            peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:text-xs
            ${error ? "peer-focus:text-red-500 peer-[:not(:placeholder-shown)]:text-red-500" : ""}`}
        >
          {placeholder}
        </label>
      </div>

      <div className="flex justify-end h-3">
        {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default FloatingTextarea;