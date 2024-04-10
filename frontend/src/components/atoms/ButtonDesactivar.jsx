import React from 'react';
import { Link } from 'react-router-dom';

export const ButtonDesactivar = (props) => {
  return (
    <Link to={props.link}>
      <button className='bg-[#ff0000] p-2 rounded-lg text-sm font-bold' type="button">
        Desactivar
      </button> 
    </Link>
  )
}
