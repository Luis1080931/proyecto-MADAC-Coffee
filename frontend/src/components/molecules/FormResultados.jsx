import React from 'react'
import { ButtonRegister } from '../atoms/ButtonRegister.jsx'
import LogoProyecto from './../../assets/icons/logoProyeccto-removebg.png'

const FormResultados = () => {
  return (
    <>
    <div className='flex flex-col'>
        <div className='flex flex-col'>
        <label className='text-xl font-bold'> Fecha: </label>
        <input className='p-2 rounded-lg w-80 h-12' type="date" value="" placeholder='Ingrese la fecha' />
    </div>
    <div className='flex-col md:flex'  >
        <label className='text-xl font-bold'> Analisis: </label>
        <select name="" id="" className='p-2 rounded-lg w-80 h-12'>
        <option value="">Código del analisis</option>
        <option value="">1</option>
        </select>
    </div>
    <div className='flex-col md:flex'>
        <label className='text-xl font-bold'> Variable: </label>
        <select name="" id="" className='p-2 rounded-lg w-80 h-12'>
        <option value="">Código de la variable</option>
        <option value="">1</option>
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
        <ButtonRegister />
    </div>
    </div>
    <div className='flex justify-center items-center w-[60%] h-[60%] mt-24 '>
    <img src={LogoProyecto} alt="" />
    </div>
    </>
  )
}

export default FormResultados


