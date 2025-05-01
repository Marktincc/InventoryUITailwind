import React from 'react';

export const FloatingSelect = ({ label, id, options = [], className = '', valuedisable, ...props }) => {
  return (
    <div className="relative w-full h-14 outline  outline-gray-300 rounded-md">
      <select
        id={id}
        className={`peer block w-full h-full appearance-none rounded-md bg-gray-800 px-3 pt-5 pb-2 text-sm text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-gray-600 ${className}`}
        defaultValue=""
        {...props}
      >
        <option value="" disabled hidden>
          {valuedisable || label}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value} className="bg-gray-700 text-white">
            {option.label}
          </option>
        ))}
      </select>
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-3 top-2 text-xs text-white transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-white-500 peer-focus:top-2 peer-focus:text-xs peer-focus:text-white-400 "
      >
        {label}
      </label>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
        <i className="bi bi-chevron-down text-gray-400"></i>
      </div>
    </div>
  );
};
