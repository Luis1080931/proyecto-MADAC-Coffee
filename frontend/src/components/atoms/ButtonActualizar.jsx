import React from 'react'
import { FiEdit3 } from "react-icons/fi";
import { CiEdit } from "react-icons/ci";

export const ButtonActualizar = (props) => {
  
  return (
    <CiEdit  className='cursor-pointer text-3xl text-gray-500 mr-5' onClick={props.click}/>
  )
}