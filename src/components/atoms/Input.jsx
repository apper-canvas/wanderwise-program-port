import React from 'react';

const Input = ({ type = 'text', value, onChange, placeholder, required = false, min, className = '', ...props }) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      className={`w-full px-4 py-3 rounded-lg border border-surface-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors ${className}`}
      placeholder={placeholder}
      required={required}
      min={min}
      {...props}
    />
  );
};

export default Input;