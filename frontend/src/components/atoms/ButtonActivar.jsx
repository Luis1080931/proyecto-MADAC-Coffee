import React from 'react'
import { HiDocumentCheck } from "react-icons/hi2";

const ButtonActivar = (props) => {
  return (
    <HiDocumentCheck className='cursor-pointer text-3xl text-[#539933]' onClick={props.click} />
  )
}

export default ButtonActivar
