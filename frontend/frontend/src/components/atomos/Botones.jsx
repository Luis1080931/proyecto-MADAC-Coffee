import React from 'react';
import { Button } from 'react-bootstrap';

const Botones = ({ type, children, onClick, style, className, disabled }) => {
  return (
    <Button 
      type={type} 
      style={{
        width: '100px',
        height: '40px',
        background: '#1bc12e',
        marginLeft: '80px',
        borderColor: "#1bc12e",
        fontWeight: 'bold',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        outline: 'none', 
        boxShadow: 'none', 
        border: '1px solid transparent'
      }}
      onClick={onClick} 
      className={className} 
      disabled={disabled}
     
      onFocus={(e) => { e.target.style.borderColor = 'black'; }} 
      onBlur={(e) => { e.target.style.borderColor = '#1bc12e'; }} // Para restablecer el color cuando se pierde el foco
    >
      {children}
    </Button>
  );
};

export default Botones;
