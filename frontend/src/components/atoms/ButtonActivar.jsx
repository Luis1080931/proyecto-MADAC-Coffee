import React from 'react'
import { HiDocumentCheck } from "react-icons/hi2";
import { CiCircleCheck } from "react-icons/ci";

const ButtonActivar = (props) => {
  return (
    <CiCircleCheck className='cursor-pointer text-3xl text-[#539933]' onClick={props.click} />
  )
}

export default ButtonActivar; 
