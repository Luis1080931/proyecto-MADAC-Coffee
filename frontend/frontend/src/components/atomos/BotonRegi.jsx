// ButtonAtom.js
import React from 'react';
import { Button } from 'react-bootstrap';


const Botones = ({ onClick, children, className, variant }) => {
   return (
      <Button className={className} variant={variant} onClick={onClick} style={{ width: '100px', height: '40px', background: '#009100', borderColor: "#1bc12e", marginLeft: '80px' }}>
         {children}
      </Button>
   );
};

export default Botones;