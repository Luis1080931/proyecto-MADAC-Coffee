import React, { createContext, useState } from 'react'
import axiosClient from '../components/axiosClient'

const AnalisisContext = createContext()

export const AnalisisProvider = ({ children }) => {

    const [analisis, setAnalisis] = useState([])
    const [analisi, setAnalisi] = useState([])
    const [analisisId, setAnalisisId] = useState([])

    const getAnalisis = () => {
        try {
            axiosClient.get('/analisis/listar').then((response) => {
                console.log(response.data)
                setAnalisis(response.data)
            })
        } catch (error) {
            console.log('Error del servidor' + error);
        }
    }

    const getAnalisi = (id) => {
        try {
            axiosClient.get(`/analisis/buscar/${id}`).then((response) => {
                console.log(response.data)
                setAnalisi(response.data)
            })
        } catch (error) {
            console.log('Error del servodor' + error);
        }
    }
  return (
    <AnalisisContext.Provider
        value={{
            analisi,
            analisis,
            analisisId,
            setAnalisis,
            setAnalisi,
            setAnalisisId, 
            getAnalisis,
            getAnalisi
        }}
    >
        {children}
    </AnalisisContext.Provider>
  )
}

export default AnalisisContext