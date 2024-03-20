import React from 'react'
import { Link } from 'react-router-dom'

export const ButtonVolver = (props) => {
  return (
    <button className='bg-white text-black rounded-lg p-2 font-bold ml-8 w-24' type="button"> <Link to={props.link}> Volver </Link> </button>
  )
}
