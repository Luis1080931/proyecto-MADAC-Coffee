
import React, { createContext, useContext, useState } from 'react';

const ResultadoContext = createContext();

export const ResultadoProvider = ({ children }) => {
 
  const [resultadoSeleccionado, setResultadoSeleccionado] = useState(null);

  const seleccionarResultado = (resultado) => {
    setResultadoSeleccionado(resultado);
  };
  
  return (
    <ResultadoContext.Provider value={{ resultadoSeleccionado, seleccionarResultado }}>
      {children}
    </ResultadoContext.Provider>
  );
}

export const useResultado = () => useContext(ResultadoContext)

export default ResultadoContext;
