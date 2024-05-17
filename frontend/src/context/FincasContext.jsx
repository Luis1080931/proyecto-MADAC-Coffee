import React, { createContext, useState } from 'react'
import axiosClient from '../components/axiosClient'

const FincasContext = createContext()

export const FincasProvider = ({ children }) => {

    const [fincas, setFincas] = useState([])
    const [finca, setFinca] = useState([])
    const [idFinca, setIdFinca] = useState([])

    const getFincas = async () => {
        try {
            axiosClient.get('/fincas/listar').then((response) => {
                setFincas(response.data)
            })
        } catch (error) {
            console.log('Error del servidor' + error);
        }
    }

    const getFincaId = (id) => {
        try {
            axiosClient.get(`/fincas/buscar/${id}`).then((response) => {
                setIdFinca(response.data)
            })
        } catch (error) {
            console.log('Error del servidor' + error);
        }
    }

  return (
    <FincasContext.Provider
        value={{
            fincas,
            idFinca,
            finca,
            setFincas, 
            setFinca,
            setIdFinca,
            getFincaId,
            getFincas
        }}
    >
        {children}
    </FincasContext.Provider>
  )
}

export default FincasContext
