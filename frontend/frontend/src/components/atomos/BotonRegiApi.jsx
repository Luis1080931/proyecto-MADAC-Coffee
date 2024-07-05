import React from 'react';
import { Button } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa'; // Importa el icono de "+" de FontAwesome

const Botones = ({ onClick, children, className, variant }) => {
   return (
      <Button
         className={className}
         variant={variant}
         onClick={onClick}
         style={{
            width: '140px',
            height: '40px',
            background: '#009100',
            marginLeft: '80px',
            borderColor: "#1bc12e",
            marginTop: '-55px',
            fontWeight: 'bold',
            transition: 'background-color 0.3s ease',
            border: 'none' // Agrega una transición suave
         }}
         // Agrega el efecto hover cambiando el color de fondo
         onMouseEnter={(e) => e.target.style.background = '#00c200'}
         onMouseLeave={(e) => e.target.style.background = '#009100'}
      >
         {children}
         <FaPlus style={{ marginLeft: '5px', marginBottom: '5px' }} /> {/* Icono de "+" */}
      </Button>
   );
};

export default Botones;
