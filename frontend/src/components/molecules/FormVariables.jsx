import { ButtonRegister } from '../atoms/ButtonRegister.jsx'
import React from 'react'
import logoProyecto from './../../assets/icons/logoProyeccto-removebg.png'
const FormVariables = () => {
  return (
    <>
    <div className='flex flex-col'>
        <div className='flex flex-col'>
            <label className='text-x1 font-bold'>Nombre: </label>
            <input className='p-2 rounded-lg w-80 h-12' type="text" placeholder='Ingrese el nombre de la variable' />
        <div className='flex-col md:flex'>
            <label className='text-xl font-bold'>fk tipo analisis</label>
            <select className='p-2 rounded-lg w-80 h-12'>
                <option value="">fisico</option>
                <option value="">sensorial</option>
            </select>
        </div>
        </div>
    </div>
    <div className='flex justify-center items-center w-[60%] h-[60%] mt-24'>
      <img src={logoProyecto} alt="logo" />
      </div>
    </>
  )
}

export default FormVariables