import React, { useEffect, useRef, useState } from 'react'
import LogoProyecto from './../../assets/icons/logoProyeccto-removebg.png'
import axios from 'axios'


const FormAnalisis = ({ handleSubmit, actionLabel }) => {

    /* const [mode, setMode] = useState('create')

    const fecha = useRef(null)
    const 

    const handleSubmit = (e) => {
        e.preventDefault()
        if(mode === 'create'){
            const baseURL = 'http://localhost:3000/resultados/registrar'

            axios.post(baseURL).then((response) => {
                console.log("Registrado con exito")
                setModalOpen(false)
            })
        }else if(mode === 'update'){

        }
        setModalOpen(false)
    } */

    const [analisis, setAnalisis] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3000/analisis/listar').then((response) => {
            console.log(response.data)

            const analisisFilter = response.data.filter(analisi => analisi.estado == 'activo')
            setAnalisis(analisisFilter)
        })
    }, [])

    const [variables, setVariables] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3000/variables/listar').then((response) => {
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
                <input className='p-2 rounded-lg w-80 h-12' type="date" value="" placeholder='Ingrese la fecha' />
            </div>
        <div className='flex-col md:flex'  >
            <label className='text-xl font-bold'> Analisis: </label>
            <select name="" id="" className='p-2 rounded-lg w-80 h-12'>
                {analisis.map(anali => {
                    <option key={anali.codigo} value={anali.codigo}>
                        {anali.codigo}
                    </option>
                })}
            </select>
        </div>
        <div className='flex-col md:flex'>
            <label className='text-xl font-bold'> Variable: </label>
            <select name="" id="" className='p-2 rounded-lg w-80 h-12'>
                {variables.map(varia => {
                    <option key={varia.codigo} value={varia.codigo}>
                        {varia.nombre}
                    </option>
                })}
            </select>
        </div>
        <div className='flex-col md:flex'>
            <label className='text-xl font-bold'> Valor: </label>
            <input className='p-2 rounded-lg w-80 h-12' type="text" value="" placeholder='Ingrese la valor' />
        </div>
        <div className='flex-col md:flex'>
            <label className='text-xl font-bold'> Observaciones: </label>
            <textarea className='p-2 rounded-lg w-80' ame="" id="" cols="30" rows="3" placeholder='Observaciones'></textarea>
        </div>
        <div className='flex-col md:flex justify-center mt-5 items-center'>
            <button type='submit' className='bg-[#39A900] p-2 rounded-lg text-white font-bold w-32'>
                {actionLabel}
            </button>
        </div>
        </div>
    </form>
    
    <div className='flex justify-center items-center w-[60%] h-[60%] mt-24 '>
        <img src={LogoProyecto} alt="" />
    </div>
    </>
  )
}

export default FormAnalisis