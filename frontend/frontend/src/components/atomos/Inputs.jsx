// InputAtom.js
import React from 'react';

const InputAtom = ({ label, id, name, type, value, onChange,placeholder,className,disabled}) => {
    return (
        <div>
          <label style={{ color: 'black', fontWeight: 'bold' }}htmlFor={id}>{label}</label>
          <input type={type || "text"} id={id} name={name} value={value} onChange={onChange} placeholder={placeholder}disabled={disabled}
          className={className}
          
      style={ {  width:'320px', height:'40px' , borderColor: '#1bc12e', borderStyle: 'solid', borderRadius: '6px',}}/>
        </div>
      );
};

export default InputAtom;


