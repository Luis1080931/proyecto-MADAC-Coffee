import React from 'react'
import FormResultados from '../molecules/FormResultados.jsx';
import { ModalAcciones } from '../organisms/Modal.jsx';

function ResultadosModal ({ open, onClose, handleSubmit, actionLabel, title }){

    return (
      <>

      <ModalAcciones open={open} onClose={onClose} actionLabel={actionLabel} title={title}> 
        <FormResultados handleSubmit={handleSubmit} />
      </ModalAcciones>
      
      </>
    )
} 

export default ResultadosModal