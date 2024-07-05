import React from 'react';

const Select = ({ label, id, name, value, onChange, children, placeholder, className, disabled }) => {
  return (
    <div>
      <label style={{ color: 'black', fontWeight: 'bold' }} htmlFor={id}>{label}</label>
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={className}
        style={{ width: '320px', height: '40px', borderColor: ' #1bc12e', borderWidth: '2px', borderStyle: 'solid', borderRadius: '6px' }}
      >
        {children} 
      </select>
    </div>
  );
};

export default Select;
