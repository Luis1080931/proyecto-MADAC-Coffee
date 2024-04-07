import React from 'react'
import FormResultados from '../molecules/FormResultados.jsx';
import { Modal } from '../organisms/Modal.jsx';
import { Logo } from '../atoms/LogoProyecto.jsx';

function ResultadosModal ({ open, onClose, handleSubmit, actionLabel, title}){

    return (
      <>

      <Modal open={open} onClose={onClose}> 
        <FormResultados handleSubmit={handleSubmit} actionLabel={actionLabel} />
        <Logo title={title} />
      </Modal>
      
      </>
    )
} 

export default ResultadosModal