import React from 'react'
import { TbFileOff } from "react-icons/tb";

export const ButtonDesactivar = (props) => {
  
  return (
    <TbFileOff className='cursor-pointer text-3xl text-[#ED6158]' onClick={props.click}/>
  )
}

