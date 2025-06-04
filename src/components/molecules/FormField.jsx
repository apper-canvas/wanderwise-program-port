import React from 'react';
import Label from '../atoms/Label';
import Input from '../atoms/Input';
import Select from '../atoms/Select';

const FormField = ({ label, type = 'text', value, onChange, placeholder, required = false, min, options, className = '', ...props }) => {
  const renderInput = () => {
    switch (type) {
      case 'select':
        return (
          <Select
            value={value}
            onChange={onChange}
            options={options}
            required={required}
            {...props}
          />
        );
      default:
        return (
          <Input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            min={min}
            {...props}
          />
        );
    }
  };

  return (
    <div className={className}>
      <Label>{label} {required && '*'}</Label>
      {renderInput()}
    </div>
  );
};

export default FormField;