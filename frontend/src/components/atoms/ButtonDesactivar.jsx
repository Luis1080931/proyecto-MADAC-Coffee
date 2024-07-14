import React from 'react'
import { TbFileOff } from "react-icons/tb";
import { IoIosCloseCircleOutline } from "react-icons/io";

export const ButtonDesactivar = (props) => {
  
  return (
    <IoIosCloseCircleOutline className='cursor-pointer text-3xl text-[#ED6158]' onClick={props.click}/>
  )
}