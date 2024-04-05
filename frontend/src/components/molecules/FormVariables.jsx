import React from 'react'
import {Button} from './../atoms/Button.jsx'

const FormVariables = ({ handleSubmit, actionLabel }) => {
  return (
    <>
    <form onSubmit={handleSubmit}></form>
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
        <Button actionLabel={actionLabel} />
    </div>
   
    </>
  )
}

export default FormVariables