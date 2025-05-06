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
  iconPosition = "left",
}) => {
  const getIconStyles = () => {
    if (typeof iconPosition === 'object') {
      return iconPosition;
    }
    return iconPosition === 'right'
      ? { right: '8px', top: '50%', transform: 'translateY(-50%)' }
      : { left: '8px', top: '50%', transform: 'translateY(-50%)' };
  };

  const getInputPadding = () => {
    if (!icon) return 'px-2.5';
    if (typeof iconPosition === 'object') return 'px-2.5';
    return iconPosition === 'right' ? 'pr-10 pl-2.5' : 'pl-10 pr-2.5';
  };

  const getLabelPosition = () => {
    if (!icon) return 'left-2.5';
    if (typeof iconPosition === 'object') return 'left-2.5';
    return iconPosition === 'right' ? 'left-2.5' : 'left-10';
  };

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

      <div className="flex w-full gap-2 items-center">
        {prefix && (
          <div className="flex items-center justify-center px-3 h-[48px] text-sm text-gray-700 bg-gray-100 border border-gray-300 rounded-md">
            {prefix}
          </div>
        )}

        <div className="relative w-full">
          {icon && (
            <div
              className="absolute flex items-center text-gray-400 pointer-events-none"
              style={getIconStyles()}
            >
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
            className={`peer block w-full h-[48px] ${getInputPadding()} pt-4 pb-4 text-sm text-gray-900 bg-white border appearance-none focus:outline-none focus:ring-0 rounded-md
              ${error ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-blue-600"}`}
          />
          <label
            htmlFor={id}
            className={`absolute ${getLabelPosition()} top-3 text-sm text-gray-500 bg-white px-1 transition-all duration-200 ease-in-out pointer-events-none
              peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-600 
              peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:text-xs
              ${icon && iconPosition === 'left' ? 'ml-0' : ''}
              ${error ? "peer-focus:text-red-500 peer-[:not(:placeholder-shown)]:text-red-500" : ""}`}
          >
            {placeholder}
          </label>
        </div>
      </div>

      <div className="flex justify-end h-4">
        {error && <p className="mt-1 text-xs mb-2 text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default FloatingInput;