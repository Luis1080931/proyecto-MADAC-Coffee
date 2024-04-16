import React from 'react'
import FormResultados from '../molecules/FormResultados.jsx';
import { ModalAcciones } from '../organisms/Modal.jsx';

function ResultadosModal ({ open, onClose, handleSubmit, actionLabel, initialData, mode }){

    return (
      <>

      <ModalAcciones open={open} onClose={onClose} > 
        <FormResultados handleSubmit={handleSubmit} initialData={initialData} mode={mode} actionLabel={actionLabel}/>
      </ModalAcciones>
      
      </>
    )
} 

export default ResultadosModal