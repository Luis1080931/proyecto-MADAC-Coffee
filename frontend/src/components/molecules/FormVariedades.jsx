import React, { useEffect, useRef, useState } from 'react'
import { Button } from '../atoms/Button'

const FormVariedades = ({ handleSubmit, actionLabel }) => {

  return (
    <>
    <form method='post' onSubmit={handleSubmit}>
        <div className='flex flex-col'>
            <div className='flex flex-col'>
                <label className=' text-xl font-bold'> Nombre: </label>
                <input className='p-2 rounded-lg w-80 h-12' type="text" value="" placeholder='Ingrese el nombre de la variedad' />
            </div>
            <Button actionLabel={actionLabel} />
        </div>
    </form>
    </>
  )
}

export default FormVariedades