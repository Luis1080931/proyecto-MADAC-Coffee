import React, { createContext, useState } from 'react'
import axiosClient from '../components/axiosClient'

const MuestrasContext = createContext()

export const MuestrasProvider = ({ children }) => {

    const [muestras, setMuestras] = useState([])
    const [muestra, setMuestra] = useState([])
    const [idMuestras, setMuestrasId] = useState([])

    const getMuestras = () => {
        try {
            axiosClient.get('/muestras/listarMuetras').then((response) => {
                console.log(response.data)
                setMuestras(response.data)
            })
        } catch (error) {
            console.log('Error del servidor' + error);
        }
    }

    const getMuestra = (id) => {
        try {
            axiosClient.get(`/muestras/buscarMuesta/${id}`).then((response) => {
                console.log(response.data)
                setMuestra(response.data)
            })
        } catch (error) {
            console.log('Error del servidor' + error);
        }
    }

  return (
    <MuestrasContext.Provider
        value={{
            muestras,
            muestra,
            idMuestras,
            setMuestras,
            setMuestra,
            setMuestrasId,
            getMuestras,
            getMuestra
        }}
    >
        {children}
    </MuestrasContext.Provider>
  )
}

export default MuestrasContext