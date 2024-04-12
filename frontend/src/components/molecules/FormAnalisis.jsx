import React, { useEffect, useRef, useState } from 'react'
/* import { Button } from './../atoms/Button.jsx' */

const FormAnalisis = ({ handleSubmit, actionLabel }) => {

  return (
    <>
    <form method='post' onSubmit={handleSubmit}>
        <div className='flex flex-col'>
            <div className='flex flex-col'>
                <label className='text-xl font-bold'> Fecha: </label>
                <input className='p-2 rounded-lg w-80 h-12' type="date" value="" placeholder='Ingrese la fecha' />
            </div>
        <div className='flex-col md:flex'  >
            <label className='text-xl font-bold'> Analista: </label>
            <select name="" id="" className='p-2 rounded-lg w-80 h-12'>
                <option> Nombre del analista</option>
            </select>
        </div>
        <div className='flex-col md:flex'>
            <label className='text-xl font-bold'> Muestra: </label>
            <select name="" id="" className='p-2 rounded-lg w-80 h-12'>
              <option> Codigo muestra </option>
            </select>
        </div>
        <div className='flex-col md:flex'>
            <label className='text-xl font-bold'> Tipo de análisis: </label>
            <select name="" id="" className='p-2 rounded-lg w-80 h-12'>
              <option> Nombre analisis </option>
            </select>
        </div>
       {/*  <Button actionLabel={actionLabel} /> */}
        </div>
    </form>
    </>
  )
}

export default FormAnalisis