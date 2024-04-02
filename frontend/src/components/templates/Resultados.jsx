import React from 'react'
import FormResultados from '../molecules/FormResultados.jsx';
import { Modal } from '../organisms/Modal.jsx';
import { Logo } from '../atoms/LogoProyecto.jsx';

function ResultadosModal ({ open, onClose, handleSubmit, actionLabel }){

    return (
      <>

      <Modal open={open} onClose={onClose}> 
        <FormResultados handleSubmit={handleSubmit} actionLabel={actionLabel} />
        <Logo />
      </Modal>
      
      </>
    )
} 

export default ResultadosModal