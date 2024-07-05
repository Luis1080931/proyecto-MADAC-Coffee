import React from 'react';

function Select({ value, onChange, options = {} }) {
  return (
    <div>
      <select
        className="form-select form-select-lg mb-3 mr-4"
        style={{ height: '38px', fontSize: '15px', boxShadow: '0px 4px 6px #00800' }}
        value={value}
        onChange={onChange}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;