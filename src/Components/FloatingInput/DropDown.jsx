import React from "react";

const FloatingSelect = ({
  label,
  id,
  name,
  value,
  onChange,
  options = [],
  required = false,
  error = "",
  placeholder = " ",
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

  const getSelectPadding = () => {
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
      <div className="relative w-full">
        {icon && (
          <div
            className="absolute flex items-center text-gray-400 pointer-events-none z-10"
            style={getIconStyles()}
          >
            {icon}
          </div>
        )}
        <select
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className={`peer block w-full h-[48px] ${getSelectPadding()} pt- text-sm text-gray-900 bg-white border appearance-none focus:outline-none focus:ring-0 rounded-md
            ${error ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-blue-600"}`}
        >
          <option value="" disabled hidden>
            {''}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
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
        
        {/* Custom arrow icon */}
        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>

      <div className="flex justify-end h-6">
        {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default FloatingSelect;