import React from 'react'
import { FaSistrix } from 'react-icons/fa6'

export const Buscador = (props) => {
  return (
    <div className='w-96 bg-[#E5E5E5] flex justify-center items-center m-8 border-2 rounded-lg border-black md:flex'>
        <input className='p-2 bg-[#E5E5E5] text-black rounded-lg w-96' type="text" onChange={props.handler} placeholder='Buscar' />
        <FaSistrix size={25} />
    </div>
  )
}

export default Buscador

