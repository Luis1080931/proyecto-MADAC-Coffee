import React from 'react';

export const ButtonDesactivar = (props) => {
  return (
    <button className='btn btn-danger btn-sm fw-semibold'onClick={props.click}>Desactivar</button>
  );
};