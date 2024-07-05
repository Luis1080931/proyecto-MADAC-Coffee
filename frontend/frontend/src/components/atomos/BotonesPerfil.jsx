// ButtonAtom.js
import React from 'react';
import { Button } from 'react-bootstrap';


const BotonesPerfil = ({ onClick, children, className,variant }) => {
 return (
    <Button  className={className} variant={variant} onClick={onClick} style={{width: '95px', height: '40px',background:'#121212', marginLeft:'12px', borderColor:"#121212" }}>
    {children}
    </Button>
 );
};

export default BotonesPerfil;
