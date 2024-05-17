import React, { createContext } from 'react'
import { AuthProvider } from './authContext.jsx'
import { AnalisisProvider } from './AnalisisContext.jsx'
import { ResultadoProvider } from './ResultadosContext.jsx'
import { VariablesProvider } from './VariablesContext.jsx'
import { VariedadesProvider } from './VariedadesContext.jsx'
import { LotesProvider } from './LotesContext.jsx'
import { FincasProvider } from './FincasContext.jsx'

export const GlobalContext = createContext()

const GlobalProvider = ({ children }) => {

const globalContextValue = {}

  return (
    <GlobalContext.Provider value={ globalContextValue }>
        <AuthProvider>
            <AnalisisProvider>
                <ResultadoProvider>
                    <VariablesProvider>
                        <VariedadesProvider>
                            <FincasProvider>
                                <LotesProvider>
                                    {children}
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
