import React from 'react'
import { FaFileDownload } from "react-icons/fa";

export const IconDownload = (props) => {
  
  return (
    <FaFileDownload  className='cursor-pointer text-3xl text-[#273468] mr-5' onClick={props.click}/>
  )
}