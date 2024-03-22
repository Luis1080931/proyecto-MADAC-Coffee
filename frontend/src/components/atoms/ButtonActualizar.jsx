import React from 'react'
import { Link } from 'react-router-dom'

export const ButtonActualizar = (props) => {
  return (
    <button className='bg-[#FFC700] p-2 rounded-lg text-sm font-bold' type="button">
        <Link to={props.link}>Actualizar</Link>
    </button> 
  )
}