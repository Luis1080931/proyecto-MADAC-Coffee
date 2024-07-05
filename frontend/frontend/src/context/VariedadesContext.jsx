import React, { createContext, useState } from 'react'
import axiosClient from '../components/axiosClient'

const VariedadesContext = createContext()

export const VariedadesProvider = ({ children }) => {

    const [variedades, setVariedades] = useState([])
    const [variedad, setVariedad] = useState([])
    const [variedadId, setVariedadId] = useState([])
    
    const getVariedades = () => {
        try {
            axiosClient.get('/variedades/listar').then((response) => {
                console.log(response.data)
                setVariedades(response.data)
            })
        } catch (error) {
            console.log('Error del servidor' + error);
        }
    }

    const getVariedad = (id) => {
        try {
            axiosClient.get(`/variedades/listar/${id}`).then((response) => {
                console.log(response.data)
                setVariedad(response.data)
            })
        } catch (error) {
            console.log('Error del servidor'+ error);
        }
    }

  return (
    <VariedadesContext.Provider
        value={{
            variedades,
            variedad,
            variedadId,
            setVariedades,
            setVariedad,
            setVariedadId,
            getVariedades,
            getVariedad
        }}
    >
        {children}
    </VariedadesContext.Provider>
  )
}

export default VariedadesContext