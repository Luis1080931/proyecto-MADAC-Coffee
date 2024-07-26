import React, { createContext, useState } from 'react'
import axiosClient from '../components/axiosClient'

const FincasContext = createContext()

//!EL CHILDREN SE PASA YA QUE SI QUEREMOS QUE NUESTRO CONTEXTO FUNCIONE, ESTE CHILDREN SIGNIFICA QUE VA A EXIRTIR UN HIJO QUE NOS VA A AYUDAR A ACCERDER A LA INFORMACION
export const FincasProvider = ({ children }) => {

    //*TODO ESTOS DATOS SE PASAN COMO VALOR DEL CONTEXTO
    const [fincas, setFincas] = useState([])
    const [finca, setFinca] = useState([])
    //!EN ESTE ARRAY SE ESTARA GUARDANDO LOS DATOS DE LA FINCA A LA CUAL SE PRECIONAR A ACTUALIZAR, ESTE ARRAY VIAJA NUEVAMENTE A LA VISTA LUEGO AL TEMPLATE Y POSTERIORMENTE AL FORMFINCAS Y SE EJECUTA
    //!LA FUNCION DE ACTUALIZAR Y SE LLENANA TODOS ESTOS DATOS CON ESTE ARRAY
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

    //*AQUI SE PASA COMO VALOR DEL CONTEXTO PARA PODERLO EXTRAER EN LAS DEMAS VISTAS
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
        {/*//!ESTE CHILDREN ES EL HIJO DE ARRIBA Y SIGINIFCA QUE AQUI ADENTRO VA A HABER UN COMPONENTE QUE NOS VA A AYUDAR A ACCEDER A LA INFROMACION 
        //!QUE NECESITAMOS*/}
        {children}
    </FincasContext.Provider>
  )
}

export default FincasContext
