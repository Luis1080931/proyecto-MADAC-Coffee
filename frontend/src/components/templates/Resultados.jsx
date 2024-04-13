import React from 'react'
import FormResultados from '../molecules/FormResultados.jsx';
import { ModalAcciones } from '../organisms/Modal.jsx';

function ResultadosModal ({ open, onClose, handleSubmit, actionLabel, title, initialData, mode}){

    return (
      <>

      <ModalAcciones open={open} onClose={onClose} actionLabel={actionLabel} title={title} handleSubmit={handleSubmit} > 
        <FormResultados initialData={initialData} mode={mode} actionLabel={actionLabel} handleSubmit={handleSubmit} />
      </ModalAcciones>
      
      </>
    )
} 

export default ResultadosModal