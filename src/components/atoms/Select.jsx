import React from 'react';

const Select = ({ value, onChange, options, required = false, className = '', ...props }) => {
  return (
    <select
      value={value}
      onChange={onChange}
      className={`w-full px-4 py-3 rounded-lg border border-surface-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors ${className}`}
      required={required}
      {...props}
    >
      {options.map((option, index) => (
        <option key={option.value || index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;