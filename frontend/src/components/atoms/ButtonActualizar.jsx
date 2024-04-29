import React from 'react'
import { FiEdit3 } from "react-icons/fi";


export const ButtonActualizar = (props) => {
  
  return (
    <FiEdit3 className='cursor-pointer text-3xl text-gray-500 mr-10' onClick={props.click}/>
  )
}