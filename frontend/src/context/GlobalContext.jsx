import React, { createContext, useEffect, useState } from 'react'
import { AuthProvider } from './authContext.jsx'
import { AnalisisProvider } from './AnalisisContext.jsx'
import { ResultadoProvider } from './ResultadosContext.jsx'
import { VariablesProvider } from './VariablesContext.jsx'
import { VariedadesProvider } from './VariedadesContext.jsx'
import { LotesProvider } from './LotesContext.jsx'
import { FincasProvider } from './FincasContext.jsx'
import { MuestrasProvider } from './MuestrasContext.jsx'

export const GlobalContext = createContext()

const GlobalProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }, []);

const globalContextValue = {}

  return (
    <GlobalContext.Provider value={{ globalContextValue, user, setUser }}>
        <AuthProvider>
            <AnalisisProvider>
                <ResultadoProvider>
                    <VariablesProvider>
                        <VariedadesProvider>
                            <FincasProvider>
                                <LotesProvider>
                                    <MuestrasProvider>
                                        {children}
                                    </MuestrasProvider>
                                </LotesProvider>
                            </FincasProvider>
                        </VariedadesProvider>
                    </VariablesProvider>
                </ResultadoProvider>
            </AnalisisProvider>
        </AuthProvider>
    </GlobalContext.Provider>
  )
}

export default GlobalProvider
