import React from 'react'
import FormResultados from '../molecules/FormResultados.jsx';
import { Modal } from '../organisms/Modal.jsx';
import { Logo } from '../atoms/LogoProyecto.jsx';

function ResultadosModal ({ open, onClose, handleSubmit, actionLabel, title, initialData}){

    return (
      <>

      <Modal open={open} onClose={onClose}> 
        <FormResultados handleSubmit={handleSubmit} actionLabel={actionLabel} initialData={initialData} />
        <Logo title={title} />
      </Modal>
      
      </>
    )
} 

export default ResultadosModal