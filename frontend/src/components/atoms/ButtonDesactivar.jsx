import React from 'react'
import { RiDeleteBin5Fill } from "react-icons/ri";

export const ButtonDesactivar = (props) => {
  
  return (
    <RiDeleteBin5Fill className='cursor-pointer text-2xl text-[#ED6158]' onClick={props.click}/>

  )
}