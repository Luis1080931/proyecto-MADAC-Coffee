import React, { useEffect, useRef, useState } from 'react'
import {ModalFooter, Button, Input, Select, SelectItem, table } from "@nextui-org/react";
import axiosClient from '../axiosClient';

const FormResultados = ({ mode, initialData, handleSubmit, onClose, actionLabel }) => {

    const [fecha, setFecha] = useState('')
    const [analisisFk, setAnalisisFk] = useState('')
    const [variableFk, setVariableFk] = useState('')
    const [valor, setValor] = useState('')

    const [analisis, setAnalisis] = useState([])
    const [variables, setVariables] = useState([])

    useEffect(() => {
        axiosClient.get('/analisis/listar').then((response) => {
            console.log(response.data)

            const analisisFilter = response.data.filter(analisi => analisi.estado == 'activo')
            setAnalisis(analisisFilter)
        })
    }, [])

    useEffect(() => {
        axiosClient.get('/variables/listarvariable').then((response) => {
            console.log(response.data)

            const variableFilter = response.data.filter(variable => variable.estado == 'activo')
            setVariables(variableFilter)
        })
    }, [])

    useEffect(() => {
        if (mode === 'update' && initialData && initialData.fecha) {
            const fechaDate = new Date(initialData.fecha);
            if (!isNaN(fechaDate.getTime())) {
                const formattedDate = fechaDate.toISOString().split('T')[0];
                setFecha(formattedDate)
                setAnalisisFk(initialData.fk_analisis)
                setVariableFk(initialData.fk_variables)
                setValor(initialData.valor)
            } else {
                console.error('initialData.fecha no es una instancia válida de Date');
            }
        } else {
            console.error('No se proporcionó initialData o initialData.fecha está indefinido');
        }
    }, [mode, initialData]);
    

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
                <Select 
                    label='Código de análisis'
                    name="" 
                    id="" 
                    value={analisisFk} 
                    onChange={(e) => e.target.value}
                    required={true} 
                >
                        {analisis.map(anali => (
                            <SelectItem key={anali.codigo} value={anali.codigo} textValue={anali.codigo}>
                                {anali.codigo}
                            </SelectItem>
                        ))}
                </Select>
            </div>
            <div className='flex w-full flex-wrap md:flex-nowrap mb-4'>
                <Select 
                    label='Variable'
                    name="idvariable"
                    id=""
                    value={variableFk}
                    onChange={(e) => e.target.value}
                    required={true} 
                >
                        {variables.map(varia => (
                            <SelectItem key={varia.v_codigo} value={varia.v_codigo}>
                                {varia.nombre}
                            </SelectItem>
                        ))}
                </Select>
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