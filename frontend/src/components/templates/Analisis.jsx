import React from 'react'
import FormAnalisis from '../molecules/FormAnalisis.jsx';
import { ModalAcciones } from '../organisms/Modal.jsx';

function AnalisisModal ({ open, onClose, handleSubmit, actionLabel, mode, title }){

    return (
      <>

      <ModalAcciones open={open} onClose={onClose} title={title}> 
        <FormAnalisis handleSubmit={handleSubmit} actionLabel={actionLabel} mode={mode} onClose={onClose} />
      </ModalAcciones>
      
      </>
    )
} 

export default AnalisisModal