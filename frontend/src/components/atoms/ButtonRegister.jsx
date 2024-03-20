import React from 'react'
import { Link } from 'react-router-dom'

export const ButtonRegister = (props) => {
  return (
    <button className='bg-[#39A900] p-2 rounded-lg text-white font-bold w-32' type="button">
    <Link to={props.link}>Registrar</Link>
    </button>
  )
}
