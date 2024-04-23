import React from 'react'
import { RiDeleteBin5Fill } from "react-icons/ri";

export const ButtonDesactivar = (props) => {
  
  return (
    <RiDeleteBin5Fill className='cursor-pointer text-2xl text-[#ED6158]' onClick={props.click}/>
    /* <button className='bg-[#FFC700] p-2 rounded-lg text-sm font-bold' type="button" onClick={props.click}>
        <Link to={props.link}>Actualizar</Link>
    </button>  */
  )
}

