import React, { useEffect, useRef, useState } from 'react'

import axios from 'axios'
import { Button } from '../atoms/Button'


const FormResultados = ({ actionLabel, initialData }) => {

    const token = localStorage.getItem('token')
    const [mode, setMode] = useState(initialData ? 'create' : 'update')

    const fecha = useRef(null)
    const fk_analisis = useRef(null)
    const fk_variable = useRef(null)
    const valor = useRef(null)
    const observaciones = useRef(null)

    useEffect(() => {
        if(initialData){
            fecha.current.value = initialData.fecha;
            fk_analisis.current.value = initialData.fk_analisis;
            fk_variable.current.value = initialData.fk_variable;
            valor.current.value = initialData.valor;
            observaciones.current.value = initialData.observaciones
        }
    }, [initialData])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {

            const data = {
                fecha: fecha.current.value,
                fk_analisis: parseInt(fk_analisis.current.value),
                fk_variable: parseInt(fk_variable.current.value),
                valor: valor.current.value,
                observaciones: observaciones.current.value
            }

            if(mode === 'create'){
                const baseURL = 'http://localhost:3000/resultados/registrar'
    
                axios.post(baseURL, data).then((response) => {
                    console.log(response)
                    alert("Registrado con exito")

                })
            }/* else if(mode === 'update'){
                const updateURL = `http://localhost:3000/resultados/actualizar/${initialData.codigo}`

                axios.put(updateURL , {headers: {token:token}}, data ).then((response) => {
                    console.log(response)
                    if(response.status == 200){
                        alert('Se actualizo')
                    }else{
                        alert('Error de actualizar')
                    }
                })
            } */
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
    <form method='post' onSubmit={handleSubmit}>
        <div className='flex flex-col'>
            <div className='flex flex-col'>
                <label className='text-xl font-bold'> Fecha: </label>
                <input className='p-2 rounded-lg w-80 h-12' name='fecha' type="date" placeholder='Ingrese la fecha' ref={fecha} />
            </div>
            <div className='flex-col md:flex'  >
                <label className='text-xl font-bold'> Analisis: </label>
                <select name="" id="" className='p-2 rounded-lg w-80 h-12' ref={fk_analisis} >
                    <option> Código del analisis </option>
                    {analisis.map(anali => (
                        <option key={anali.codigo} value={anali.codigo}>
                            {anali.codigo}
                        </option>
                    ))}
                </select>
            </div>
            <div className='flex-col md:flex'>
                <label className='text-xl font-bold'> Variable: </label>
                <select name="idvariable" id="" className='p-2 rounded-lg w-80 h-12' ref={fk_variable} >
                    <option> Nombre variable </option>
                    {variables.map(varia => (
                        <option key={varia.codigo} value={varia.codigo}>
                            {varia.nombre}
                        </option>
                    ))}
                </select>
            </div>
            <div className='flex-col md:flex'>
                <label className='text-xl font-bold'> Valor: </label>
                <input className='p-2 rounded-lg w-80 h-12' name='valor' type="text" placeholder='Ingrese la valor' ref={valor} />
            </div>
            <div className='flex-col md:flex'>
                <label className='text-xl font-bold'> Observaciones: </label>
                <textarea className='p-2 rounded-lg w-80' name="observaciones" id="" cols="30" rows="3" placeholder='Observaciones' ref={observaciones} ></textarea>
            </div>
            <Button click={handleSubmit} actionLabel={actionLabel} />
        </div>
    </form>
    </>
  )
}

export default FormResultados

