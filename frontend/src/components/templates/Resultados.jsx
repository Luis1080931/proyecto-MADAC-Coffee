import React from 'react'
import FormResultados from '../molecules/FormResultados.jsx';
import { ModalAcciones } from '../organisms/Modal.jsx';


function ResultadosModal ({ open, onClose, handleSubmit, actionLabel, title, mode }){
    
    return (
      <>

      <ModalAcciones open={open} onClose={onClose} title={title} > 
        <FormResultados mode={mode} handleSubmit={handleSubmit} onClose={onClose} actionLabel={actionLabel} />
      </ModalAcciones>
      </>
    )
} 

export default ResultadosModal