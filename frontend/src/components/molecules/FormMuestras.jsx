import React from 'react'
import { Button } from '../atoms/Button'

const FormMuestras = ({ handleSubmit, actionLabel }) => {
  return (
<> 
<form onSubmit={handleSubmit}>
    <div className='flex flex-col'>
        <div className='flex flex-col'>
            <label className='text-xl font-bold'> Fecha: </label>
            <input className='p-2 rounded-lg w-80 h-12' type="date" value="" placeholder='Ingresa la fecha' />
        </div>
        <div className='flex-col md:flex'>
            <label className='text-xl font-bold'> Cantidad: </label>
            <input className='p-2 rounded-lg w-80 h-12' type="Float" placeholder='Ingrese la cantidad'/>
        </div>
        <div className='flex-col md:flex'>
            <label className='text-xl font-bold'>   Quien recibe: </label>
            <input className='p-2 rounded-lg w-80 h-12' type="Text" placeholder='Ingrese Quien Recibe'/>
        </div>
        <div className='flex-col md:flex'>
            <label className='text-xl font-bold'>  Proceso de fermentación: </label>
            <input className='p-2 rounded-lg w-80 h-12' type="Float" placeholder='Ingrese el proceso de fermentación'/>
        </div>
        <div className='flex-col md:flex'>
            <label className='text-xl font-bold'>  Altura MSNM: </label>
            <input className='p-2 rounded-lg w-80 h-12' type="Float" placeholder='Ingrese la altura'/>
        </div>
        <div className='flex-col md:flex'>
            <label className='text-xl font-bold'>  Tipo de Secado: </label>
            <input className='p-2 rounded-lg w-80 h-12' type="Text" placeholder='Ingrese la Tipo de secado'/>
        </div>
        <div className='flex-col md:flex'>
            <label className='text-xl font-bold'> Observaciones: </label>
            <textarea className='p-2 rounded-lg w-80' ame="" id="" cols="30" rows="3" placeholder='Observaciones'></textarea>
        </div>
        <div className='flex-col md:flex'>
            <label className='text-xl font-bold'>  Fk Lote: </label>
            <input className='p-2 rounded-lg w-80 h-12' type="Number" placeholder='Ingrese la fk del lote'/>
        </div>
        <Button actionLabel={actionLabel} />
    </div>
</form>
</>
  )
}

export default FormMuestras