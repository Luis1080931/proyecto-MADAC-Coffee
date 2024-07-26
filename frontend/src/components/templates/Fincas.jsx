import React from 'react'
import {FormFincass} from '../molecules/FormFincass.jsx';
import { ModalAcciones } from '../organisms/Modal.jsx';

function ResultadosModal ({ open, onClose, handleSubmit, actionLabel, title, mode}){
  //!Aqui podemos observar que en el formFincas le estamos pasando todos los parametros osea el hanldeSubmit que hace referencia a la funcion que teniamos anteriormente en el formulario y a la cual pasamos como un paremtro hijo
  
  //?si te preguntas, ahora estos hijos pasan a ser hijos del template y posteriormente a este template lo usamos en la vista de Fincas
  return (
      <>
      <ModalAcciones open={open} title={title} onClose={onClose} > 
        <FormFincass mode={mode} handleSubmit={handleSubmit} onClose={onClose} actionLabel={actionLabel} />
      </ModalAcciones>
      </>
    )
} 

export default ResultadosModal