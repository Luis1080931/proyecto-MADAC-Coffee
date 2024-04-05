import React from 'react'
import FormResultados from '../molecules/FormVariedades.jsx';
import { Modal } from '../organisms/Modal.jsx';
import { Logo } from '../atoms/LogoProyecto.jsx';

function VariedadesModal ({ open, onClose, handleSubmit, actionLabel }){

    return (
      <>

      <Modal open={open} onClose={onClose}> 
        <FormResultados handleSubmit={handleSubmit} actionLabel={actionLabel} />
        <Logo />
      </Modal>
      
      </>
    )
} 

export default VariedadesModal