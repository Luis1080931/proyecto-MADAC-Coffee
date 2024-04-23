import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

const ResultadoContext = createContext();

export const ResultadoProvider = ({ children }) => {
  const [resultados, setResultados] = useState({});
  const token = localStorage.getItem('token')

  useEffect(() => {
    axios.get('http://localhost:3000/resultados/listar', {headers: {token: token}}).then((response) => {
      console.log(response.data)
      setResultados(response.data)
    }).catch((error) => {
        console.log(error)  
      })
  }, [])

  return (
    <ResultadoContext.Provider value={{ resultados, setResultados }}>
      {children}
    </ResultadoContext.Provider>
  );
};

export default ResultadoContext;
