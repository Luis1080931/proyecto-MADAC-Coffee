import React, { useContext, useEffect, useRef, useState } from 'react'
import {ModalFooter, Button, Input, Select, SelectItem, table } from "@nextui-org/react";
import axiosClient from '../axiosClient';
import ResultadoContext from '../../context/ResultadosContext.jsx';

const FormResultados = ({ mode, handleSubmit, onClose, actionLabel }) => {

    const [fecha, setFecha] = useState('')
    const [analisisFk, setAnalisisFk] = useState('')
    const [variableFk, setVariableFk] = useState('')
    const [valor, setValor] = useState('')

    const [analisis, setAnalisis] = useState([])
    const [variables, setVariables] = useState([])
    const { resultadosSeleccionado } = useContext(ResultadoContext)

    useEffect(() => {
        axiosClient.get('/analisis/activos').then((response) => {
            console.log(response.data)
            setAnalisis(response.data)
        })
    }, [])

    useEffect(() => {
        axiosClient.get('/variables/activas').then((response) => {
            console.log(response.data)
            setVariables(response.data)
        })
    }, [])

    useEffect(() => {
        if (mode === 'update' && resultadosSeleccionado ) {
            
                setFecha(resultadosSeleccionado.fecha)
                setAnalisisFk(resultadosSeleccionado.fk_analisis)
                setVariableFk(resultadosSeleccionado.fk_variables)
                setValor(resultadosSeleccionado.valor)
           
        } 
    }, [mode, resultadosSeleccionado]);
    

     const handleFormSubmit = async (e) => {
        e.preventDefault()
        try {

            const fechaValue = new Date(fecha).toISOString().slice(0, 10);
            const datosForm = {
                fecha: fechaValue,
                fk_analisis: parseInt(analisisFk),
                fk_variables: parseInt(variableFk),
                valor: valor,
            }
            handleSubmit(datosForm, e)
            
        } catch (error) {
            alert('Error de servidor' + error)
        }
    }

  return (
    <>

    <form method='post' onSubmit={handleFormSubmit}>
        <div>
            <div className='flex w-full flex-wrap md:flex-nowrap mb-4'>
                <Input 
                    label='Fecha' 
                    name='fecha' 
                    type="date" 
                    placeholder='Ingrese la fecha' 
                    value={fecha} 
                    onChange={(e) => setFecha(e.target.value)}
                    required={true}
                />
            </div>
            <div className='flex w-full flex-wrap md:flex-nowrap mb-4'  >
                <select 
                    label='Código de análisis'
                    className='w-[400px] rounded-xl bg-gray-100 h-[40px]'
                    name="" 
                    id="" 
                    value={analisisFk} 
                    onChange={(e) => e.target.value}
                    required={true} 
                >
                        {analisis.map(anali => (
                            <option key={anali.codigo} value={anali.codigo} >
                                {anali.codigo}
                            </option>
                        ))}
                </select>
            </div>
            <div className='flex w-full flex-wrap md:flex-nowrap mb-4'>
                <select 
                    label='Variable'
                    name="idvariable"
                    className='w-[400px] rounded-xl bg-gray-100 h-[40px]'
                    id=""
                    value={variableFk}
                    onChange={(e) => e.target.value}
                    required={true} 
                >
                        {variables.map(varia => (
                            <option key={varia.v_codigo} value={varia.v_codigo}>
                                {varia.nombre}
                            </option>
                        ))}
                </select>
            </div>
            <div className='flex w-full flex-wrap md:flex-nowrap mb-4'>
                <Input 
                    label='Valor:'
                    name='valor' 
                    type="text" 
                    placeholder='Ingrese la valor' 
                    value={valor}
                    onChange={(e) => setValor(e.target.value)} 
                    required={true}
                />
            </div>
            <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button type='submit' color="primary">
                  {actionLabel}
                </Button>
                
            </ModalFooter>
        </div>
        </form>
    </>
  )
}

export default FormResultados   