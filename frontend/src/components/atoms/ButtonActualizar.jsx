import React from 'react'
import { FaEdit } from "react-icons/fa";

export const ButtonActualizar = (props) => {
  
  return (
    <FaEdit className='cursor-pointer text-2xl text-[#FFC700] mr-5' onClick={props.click}/>
  )
}