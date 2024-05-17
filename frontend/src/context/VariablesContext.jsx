import React, { createContext, useState } from 'react'
import axiosClient from '../components/axiosClient'

const VariablesContext = createContext()

export const VariablesProvider = ({ children }) => {

    const [variables, setVariables] = useState([])
    const [variable, setVariable] = useState([])
    const [variableId, setVariableId] = useState([])

    const getVariables = () => {
        try {
            axiosClient.get('/variables/listarvariable').then((response) => {
                console.log(response.data)
                setVariables(response.data)
            })
        } catch (error) {
            console.log('Error del servidor' + error);
        }
    }

    const getVariable = (id) => {
        try {
            axiosClient.get(`/variables/buscarvariable/${id}`).then((response) => {
                console.log(response.data)
                setVariable(response.data)
            })
        } catch (error) {
            console.log('Error del servidor' + error)
        }
    }

  return (
    <VariablesContext.Provider
        value={{
            variables,
            variable, 
            variableId,
            setVariable,
            setVariables,
            setVariableId,        
            getVariables,
            getVariable
        }}
    >
        {children}
    </VariablesContext.Provider>
  )
}

export default VariablesContext
