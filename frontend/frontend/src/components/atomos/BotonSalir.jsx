// ButtonAtom.js
import React from 'react';
import { Button } from 'react-bootstrap';


const BotonSalir = ({ onClick, children, className,variant }) => {
 return (
    <Button  className={className} variant={variant} onClick={onClick} style={{width: '90px', height: '40px',background:'#dc3545', marginLeft:'12px', borderColor:"#dc3545" }}>
    {children}
    </Button>
 );
};

export default BotonSalir;
