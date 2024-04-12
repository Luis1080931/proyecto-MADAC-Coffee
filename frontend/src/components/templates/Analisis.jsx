import React from 'react'
import FormAnalisis from '../molecules/FormAnalisis.jsx';
import { ModalAcciones } from '../organisms/Modal.jsx';
import { Logo } from '../atoms/LogoProyecto.jsx';

function AnalisisModal ({ open, onClose, handleSubmit, actionLabel }){

    return (
      <>

      <ModalAcciones open={open} onClose={onClose}> 
        <FormAnalisis handleSubmit={handleSubmit} actionLabel={actionLabel} />
        <Logo />
      </ModalAcciones>
      
      </>
    )
} 

export default AnalisisModal