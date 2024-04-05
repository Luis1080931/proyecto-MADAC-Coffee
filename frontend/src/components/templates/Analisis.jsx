import React from 'react'
import FormAnalisis from '../molecules/FormAnalisis.jsx';
import { Modal } from '../organisms/Modal.jsx';
import { Logo } from '../atoms/LogoProyecto.jsx';

function AnalisisModal ({ open, onClose, handleSubmit, actionLabel }){

    return (
      <>

      <Modal open={open} onClose={onClose}> 
        <FormAnalisis handleSubmit={handleSubmit} actionLabel={actionLabel} />
        <Logo />
      </Modal>
      
      </>
    )
} 

export default AnalisisModal