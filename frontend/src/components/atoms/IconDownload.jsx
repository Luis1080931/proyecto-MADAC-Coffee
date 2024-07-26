import React from 'react'
import { FaFileDownload } from "react-icons/fa";

export const IconDownload = (props) => {
  
  return (
    <FaFileDownload  className='cursor-pointer text-3xl text-gray-500 mr-5' onClick={props.click}/>
  )
}