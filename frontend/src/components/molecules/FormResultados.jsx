import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import {ModalFooter, Button, Input, Select, SelectItem, Textarea } from "@nextui-org/react";

const FormResultados = ({ mode, initialData, handleSubmit, onClose, actionLabel }) => {

    const token = localStorage.getItem('token')

    const fecha = useRef(null)
    const fk_analisis = useRef(null)
    const fk_variables = useRef(null)
    const valor = useRef(null)
    const observaciones = useRef(null)

    useEffect(() => {
        if(mode == 'update' && initialData){
            /* const formatDate = initialData.fecha.substring(0,10) */
            fecha.current.value = initialData.fecha
            fk_analisis.current.value = initialData.fk_analisis
            fk_variables.current.value = initialData.fk_variables
            valor.current.value = initialData.valor
            observaciones.current.value = initialData.observaciones
        }
    }, [mode, initialData])

     const handleFormSubmit = async (e) => {
        e.preventDefault()
        try {

            const fechaValue = new Date(fecha.current.value).toISOString().slice(0, 10);
            const datosForm = {
                fecha: fechaValue,
                fk_analisis: parseInt(fk_analisis.current.value),
                fk_variables: parseInt(fk_variables.current.value),
                valor: valor.current.value,
                observaciones: observaciones.current.value
            }
            /* console.log('Datos:', data); */
            handleSubmit(datosForm, e)

        } catch (error) {
            alert('Error de servidor' + error)
        }
    }

    const [analisis, setAnalisis] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3000/analisis/listar', {headers: {token:token}}).then((response) => {
            console.log(response.data)

            const analisisFilter = response.data.filter(analisi => analisi.estado == 'activo')
            setAnalisis(analisisFilter)
        })
    }, [])

    const [variables, setVariables] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3000/variables/listarvariable', {headers: {token:token}}).then((response) => {
            console.log(response.data)

            const variableFilter = response.data.filter(variable => variable.estado == 'activo')
            setVariables(variableFilter)
        })
    }, [])

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
                    ref={fecha} 
                    required={true}
                />
            </div>
            <div className='flex w-full flex-wrap md:flex-nowrap mb-4'  >
                <Select 
                    label='Código de análisis'
                    name="" 
                    id="" 
                    ref={fk_analisis} 
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
                    ref={fk_variables}
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
                    ref={valor} 
                    required={true}
                />
            </div>
            <div className='flex w-full flex-wrap md:flex-nowrap mb-4'>
                <Textarea 
                    label='Observaciones'
                    name="observaciones" 
                    cols="30" 
                    rows="3" 
                    placeholder='Observaciones' 
                    ref={observaciones} 
                    required={true}
                ></Textarea>
            </div>
            {<ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button type='submit' color="primary">
                  {actionLabel}
                </Button>
                
            </ModalFooter>}
        </div>
        </form>
    </>
  )
}

export default FormResultados   