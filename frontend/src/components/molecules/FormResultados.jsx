import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { Button } from '../atoms/Button'


const FormResultados = ({ actionLabel, mode, initialData, setModalOpen }) => {

    const token = localStorage.getItem('token')

    const fecha = useRef(null)
    const fk_analisis = useRef(null)
    const fk_variables = useRef(null)
    const valor = useRef(null)
    const observaciones = useRef(null)

    useEffect(() => {
        if(mode == 'update' && initialData){
            fecha.current.value = initialData.fecha
            fk_analisis.current.value = initialData.fk_analisis
            fk_variables.current.value = initialData.fk_variable
            valor.current.value = initialData.valor
            observaciones.current.value = initialData.observaciones
        }
    }, [mode, initialData])

     const handleSubmit = async (e) => {
        e.preventDefault()
        try {

            const data = {
                fecha: Date(fecha.current.value),
                fk_analisis: parseInt(fk_analisis.current.value),
                fk_variables: parseInt(fk_variables.current.value),
                valor: valor.current.value,
                observaciones: observaciones.current.value
            }

            if(mode === 'create'){
                const baseURL = 'http://localhost:3000/resultados/registrar'
    
                axios.post(baseURL, data).then((response) => {
                    console.log(response)

                    if(response.status == 200){
                        alert("Registrado con exito")
                        setModalOpen(false)
                    }else{
                        alert('Error de registro')
                    }
                    
                })
             } else if(mode === 'update'){
                const updateURL = `http://localhost:3000/resultados/actualizar/${initialData.codigo}`

                axios.put(updateURL, {headers: {token:token}}, data).then((response) => {
                    console.log(response)

                    if(response.status == 200){
                        alert('Se actualizo')
                        setModalOpen(false)
                    }else{
                        alert('Error de actualizar')
                    }
                })
            } 
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
                <input className='p-2 rounded-lg w-80 h-12' 
                name='fecha' 
                type="date" 
                placeholder='Ingrese la fecha' 
                ref={fecha} 
                required={true}
                />
            </div>
            <div className='flex-col md:flex'  >
                <label className='text-xl font-bold'> Analisis: </label>
                <select name="" id="" className='p-2 rounded-lg w-80 h-12' ref={fk_analisis}  required={true} >
                    {analisis.map(anali => (
                        <option key={anali.codigo} value={anali.codigo}>
                            {anali.codigo}
                        </option>
                    ))}
                </select>
            </div>
            <div className='flex-col md:flex'>
                <label className='text-xl font-bold'> Variable: </label>
                <select name="idvariable" id="" className='p-2 rounded-lg w-80 h-12' ref={fk_variables} required={true} >
                    {variables.map(varia => (
                        <option key={varia.codigo} value={varia.v_codigo}>
                            {varia.nombre}
                        </option>
                    ))}
                </select>
            </div>
            <div className='flex-col md:flex'>
                <label className='text-xl font-bold'> Valor: </label>
                <input 
                className='p-2 rounded-lg w-80 h-12' 
                name='valor' 
                type="text" 
                placeholder='Ingrese la valor' 
                ref={valor} 
                required={true}
                />
            </div>
            <div className='flex-col md:flex'>
                <label className='text-xl font-bold'> Observaciones: </label>
                <textarea 
                className='p-2 rounded-lg w-80' 
                name="observaciones" 
                cols="30" 
                rows="3" 
                placeholder='Observaciones' 
                ref={observaciones} 
                required={true}
                ></textarea>
            </div>
            <Button actionLabel={actionLabel} />
        </div>
    </form>
    </>
  )
}

export default FormResultados

/* const [mode, setMode] = useState(initialData ? 'create' : 'update') */

    /* const fecha = useRef(initialData ? initialData.fecha : null)
    const fk_analisis = useRef(initialData ? initialData.fk_analisis : null)
    const fk_variable = useRef(initialData ? initialData.fk_variable : null)
    const valor = useRef(initialData ? initialData.valor : null)
    const observaciones = useRef(initialData ? initialData.observaciones : null) */

   /*  useEffect(() => {
        if(initialData){
            fecha.current.value = initialData.fecha;
            fk_analisis.current.value = initialData.fk_analisis;
            fk_variable.current.value = initialData.fk_variable;
            valor.current.value = initialData.valor;
            observaciones.current.value = initialData.observaciones
        }
    }, [initialData]) */

    /* 
    
    const data = useRef({
        fecha: '',
        fk_analisis: '',
        fk_variable: '',
        valor: '',
        observaciones: ''
    })
    */

   