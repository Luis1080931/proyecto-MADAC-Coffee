import React from 'react';

export const ButtonActualizar = (props) => {
  return (
    <button className='btn btn-warning  btn-sm  mr-3 text-white fw-semibold ' onClick={props.click}>Actualizar</button>
  );
};