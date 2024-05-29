
import React, { createContext, useState } from 'react';

const ResultadoContext = createContext();

export const ResultadoProvider = ({ children }) => {
 
  const [resultadoSeleccionado, setResultadoSeleccionado] = useState([]);
  
  return (
    <ResultadoContext.Provider 
      value={{ 
        resultadoSeleccionado,
        setResultadoSeleccionado 
      }}>
        {children}
    </ResultadoContext.Provider>
  );
}

export default ResultadoContext;
