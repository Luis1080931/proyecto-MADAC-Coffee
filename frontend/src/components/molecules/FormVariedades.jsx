import React, { useEffect, useRef, useState } from 'react'
import { Button } from '../atoms/Button'
import TitleModal from '../atoms/TitleModal'

const FormVariedades = ({ handleSubmit, actionLabel, title }) => {

  return (
    <>
    
    <form method='post' onSubmit={handleSubmit}>
        <div className='flex flex-col'>
        <TitleModal title={title} />
            <div className='flex flex-col mt-12'>
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