import React from "react";

const FloatingInput = ({
  id,
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder = " ",
  required = false,
  className = "",
  error = "",
  icon = null, // 👈 Add icon prop
  ...rest
}) => {
  return (
    <div className="relative w-full mb-5">
      {icon && (
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
          {icon}
        </div>
      )}
      <input
        type={type}
        id={id}
        name={name}
        required={required}
        value={value}
        onChange={onChange}
        placeholder=" "
        className={`peer block w-full px-2.5 pb-2.5 pt-4 ${
          icon ? "pl-10" : ""
        } text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 ${
          error ? "border-red-500 focus:border-red-500" : ""
        } ${className}`}
        {...rest}
      />
      <label
        htmlFor={id}
        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white mx-2
          peer-placeholder-shown:scale-100
          peer-placeholder-shown:-translate-y-1/2
          peer-placeholder-shown:top-1/2
          peer-focus:top-2
          peer-focus:scale-75
          peer-focus:-translate-y-4
          peer-focus:text-blue-600"
      >
        {label}
      </label>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default FloatingInput;
