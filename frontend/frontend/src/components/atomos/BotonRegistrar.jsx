// ButtonAtom.js
import React from 'react';
import { Button } from 'react-bootstrap';

const BotonRegistrar = ({ onClick, children, className, variant }) => {
  const handleClick = (e) => {
    e.preventDefault();
    onClick(); // Llama a la función onClick proporcionada desde el componente padre
  };

  return (
    <Button
      className={className}
      variant={variant}
      onClick={handleClick} // Usa la función handleClick para manejar el evento onClick
      style={{ width: '90px', height: '40px', background: '#009100', marginLeft: '12px', borderColor: "#121212" }}
    >
      {children}
    </Button>
  );
};

export default BotonRegistrar;
