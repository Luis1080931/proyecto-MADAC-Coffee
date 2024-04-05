import React from 'react'

// import axios from 'axios'
import { Button } from '../atoms/Button'


const FormUsuarios = ({ handleSubmit, actionLabel }) => {

  return (
    <>
    <form method='post' onSubmit={handleSubmit}>
        <div className='flex flex-col'>
            <div className='flex flex-col'>
                <label className='text-xl font-bold'> Numero de documento </label>
                <input className='p-2 rounded-lg w-80 h-12' type="number" value="" placeholder='Ingrese su N° de identidad' />
            </div>
            <div className='flex-col md:flex'  >
                <label className='text-xl font-bold'> Nombre: </label>
                <input className='p-2 rounded-lg w-80 h-12' type="text" value="" placeholder='Ingrese su Nombre(s)' />
            </div>
            <div className='flex-col md:flex'>
                <label className='text-xl font-bold'> Telefono: </label>
                <input className='p-2 rounded-lg w-80 h-12' type="text" value="" placeholder='Ingrese su N° de Telefono' />
            </div>
            <div className='flex-col md:flex'>
                <label className='text-xl font-bold'> Contraseña: </label>
                <input className='p-2 rounded-lg w-80 h-12' type="text" value="" placeholder='Ingrese la Contraseña' />
            </div>
            <div className='flex-col md:flex'>
                <label className='text-xl font-bold'> Tipo de Usuario: </label>
                <input className='p-2 rounded-lg w-80 h-12' type="text" value="" placeholder='Ingrese el tipo de usuario' />
            </div>
            <Button actionLabel={actionLabel} />
        </div>
    </form>
    </>
  )
}

export default FormUsuarios